export interface OpenRouterResponse {
  choices: {
    message: {
      content: string;
    };
  }[];
}

export async function generateInsights(csvData: string) {
  const apiKey = process.env.OPENROUTER_API_KEY;
  const model = process.env.OPENROUTER_MODEL || 'openrouter/auto';

  if (!apiKey) {
    throw new Error('OPENROUTER_API_KEY is not set');
  }

  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'https://github.com/vivektomar0158/csv-insights-dashboard',
      'X-Title': 'CSV Insights Dashboard',
    },
    body: JSON.stringify({
      model,
      messages: [
        {
          role: 'system',
          content:
            'You are a data analyst. Analyze the provided CSV data and provide insights, trends, and actionable recommendations. Format your response in clean Markdown.',
        },
        {
          role: 'user',
          content: `Analyze this CSV data:\n\n${csvData}`,
        },
      ],
    }),
  });

  if (!response.ok) {
    const rawBody = await response.text();
    try {
      const error = JSON.parse(rawBody) as { error?: { message?: string } };
      throw new Error(error.error?.message || `OpenRouter returned HTTP ${response.status}`);
    } catch {
      throw new Error(`OpenRouter returned HTTP ${response.status}`);
    }
  }

  const data: OpenRouterResponse = await response.json();
  const content = data.choices?.[0]?.message?.content;

  if (!content) {
    throw new Error('OpenRouter response did not include insights content');
  }

  return content;
}
