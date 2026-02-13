'use client';

import { useState } from 'react';
import CSVUploader from '@/components/CSVUploader';
import DataTable from '@/components/DataTable';
import { Sparkles, BarChart3, Clock, LayoutDashboard, AlertCircle } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { getErrorMessage } from '@/lib/errors';
import type { CsvRow } from '@/lib/types';

export default function Home() {
  const [data, setData] = useState<CsvRow[] | null>(null);
  const [filename, setFilename] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [insights, setInsights] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleDataLoaded = (loadedData: CsvRow[], name: string) => {
    setData(loadedData);
    setFilename(name);
    setInsights(null);
    setError(null);
  };

  const handleGenerateInsights = async () => {
    if (!data) return;

    setIsGenerating(true);
    setError(null);

    try {
      // Send only a sample if data is too large for context limits
      const sampleData = data.slice(0, 50);
      const csvString = JSON.stringify(sampleData).slice(0, 12000);

      const response = await fetch('/api/insights', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ csvData: csvString, filename }),
      });

      if (!response.ok) {
        const text = await response.text();
        let serverError: string | undefined;

        try {
          const json = JSON.parse(text) as { error?: string };
          serverError = json.error;
        } catch {}

        throw new Error(serverError || `Server returned ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();

      setInsights(result.insights);
    } catch (err: unknown) {
      setError(getErrorMessage(err) || 'Something went wrong');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      {/* Hero Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              <span>AI-Powered Data Analysis</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
              CSV Insights Dashboard
            </h1>
            <p className="max-w-2xl text-lg text-gray-500">
              Transform your raw CSV data into actionable insights in seconds.
              Upload, preview, and let AI analyze your data for trends and anomalies.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        {!data ? (
          <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 p-8 sm:p-12 border border-gray-100">
            <CSVUploader onDataLoaded={handleDataLoaded} />
          </div>
        ) : (
          <div className="space-y-8">
            {/* Actions Bar */}
            <div className="bg-white rounded-xl border border-gray-200 p-4 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gray-100 rounded-lg text-gray-500">
                  <BarChart3 className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{filename}</p>
                  <p className="text-xs text-gray-400">{data.length} rows detected</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setData(null)}
                  className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  Upload Different File
                </button>
                <button
                  onClick={handleGenerateInsights}
                  disabled={isGenerating}
                  className={`flex items-center gap-2 px-6 py-2 rounded-lg font-semibold text-sm transition-all shadow-md
                    ${isGenerating
                      ? 'bg-blue-100 text-blue-400 cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700 active:scale-95'}`}
                >
                  {isGenerating ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      Generate AI Insights
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Data Preview */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 px-2">
                  <LayoutDashboard className="w-4 h-4 text-gray-400" />
                  <h2 className="text-lg font-bold text-gray-800">Data Preview</h2>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  <DataTable data={data} />
                </div>
              </div>

              {/* Insights Display */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 px-2">
                  <Sparkles className="w-4 h-4 text-blue-500" />
                  <h2 className="text-lg font-bold text-gray-800">AI Insights</h2>
                </div>

                <div className="h-full min-h-[400px] bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  {isGenerating ? (
                    <div className="flex flex-col items-center justify-center h-full py-12 space-y-4 text-gray-400">
                      <div className="w-12 h-12 border-4 border-blue-50 border-t-blue-500 rounded-full animate-spin" />
                      <p className="animate-pulse">AI is crunching your numbers...</p>
                    </div>
                  ) : insights ? (
                    <div className="prose prose-blue max-w-none text-gray-900 prose-headings:text-gray-900 prose-p:text-gray-800 prose-strong:text-gray-900 prose-li:text-gray-800">
                      <ReactMarkdown>{insights}</ReactMarkdown>
                    </div>
                  ) : error ? (
                    <div className="flex flex-col items-center justify-center h-full py-12 text-center">
                      <AlertCircle className="w-12 h-12 text-red-100 mb-4" />
                      <p className="text-red-600 font-medium mb-2">Analysis Failed</p>
                      <p className="text-red-400 text-sm max-w-[250px]">{error}</p>
                      <button
                        onClick={handleGenerateInsights}
                        className="mt-6 text-sm font-semibold text-blue-600 hover:underline"
                      >
                        Try Again
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full py-12 text-center text-gray-400">
                      <Clock className="w-12 h-12 text-gray-100 mb-4" />
                      <p>Click &quot;Generate AI Insights&quot; to start analysis</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
