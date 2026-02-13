# CSV Insights Dashboard

A modern, AI-powered web application that allows users to upload CSV files, preview data in real-time, and generate actionable insights using Claude 3.5 Sonnet (via OpenRouter).

## Features

- **CSV Upload & Preview**: Drag-and-drop interface with live table preview.
- **AI Insights**: One-click analysis for trends, outliers, and recommendations.
- **Report Management**: Automatic saving of the last 5 reports for easy retrieval.
- **Export Functionality**: Copy insights to clipboard or download as Markdown.
- **System Health**: Dedicated status page for Backend, DB, and AI connectivity.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS 4
- **Database**: SQLite with Prisma
- **AI**: Claude 3.5 Sonnet (OpenRouter API)
- **Icons**: Lucide React
- **Parsing**: Papa Parse

## Getting Started

### Prerequisites

- Node.js 18+
- NPM

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   Create a `.env` file in the root and add:
   ```env
   OPENROUTER_API_KEY=your_key_here
   DATABASE_URL="file:./dev.db"
   ```

### Running Locally

1. Initialize the database:
   ```bash
   npx prisma migrate dev --name init
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```text
├── app/                  # Next.js App Router
│   ├── api/              # API Routes (Insights, Reports, Health)
│   ├── reports/          # Historical Reports page
│   └── status/           # System Health page
├── components/           # Reusable UI components
├── lib/                  # Library configurations (Prisma, OpenRouter)
├── prisma/               # Database schema and migrations
└── docs/                 # Original requirements and guide
```
