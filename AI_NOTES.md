# AI Assistance Notes

This project was built with the assistance of Antigravity, an AI coding assistant.

## Features Developed with AI Assistance

- **Project Initialization**: Scaffolding the Next.js 14 project and configuring Prisma 7.
- **OpenRouter Integration**: Implementing the fetch-based client for AI insights.
- **UI Components**: Designing and implementing the `CSVUploader`, `DataTable`, and floating `Navbar`.
- **Database Schema**: Designing the `Report` model and handling Prisma 7 migration quirks.
- **Error Handling**: Implementing robust error states for CSV parsing and API failures.

## Human Review & Verification

As the developer, I reviewed and verified the following:
- **Prisma 7 Configuration**: Manually adjusted `schema.prisma` and `prisma.config.ts` to accommodate the latest datasource URL requirements in Prisma 7.
- **API Security**: Verified that `OPENROUTER_API_KEY` is handled exclusively on the server side via API routes.
- **Data Truncation**: Implemented logic to slice large CSV datasets before sending them to the AI to prevent context window overflow.
- **UI/UX**: Refined the Tailwind styling for a premium, modern feel.

## AI Choice Justification

We used **Claude 3.5 Sonnet** (via OpenRouter) because:
1. It excels at structured data analysis and CSV interpretation.
2. It provides concise, actionable insights rather than generic summaries.
3. It has a high tokens-per-second rate, ensuring a snappy user experience.
