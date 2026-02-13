# 📊 CSV Insights Dashboard

A premium, AI-powered numerical analysis platform. Transform raw CSV data into actionable business intelligence in seconds.

[![Built with Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![Styled with Tailwind](https://img.shields.io/badge/Tailwind-4.0-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![Database: Prisma](https://img.shields.io/badge/Prisma-7.0-2D3748?logo=prisma)](https://www.prisma.io/)
[![AI: Claude 3.5 Sonnet](https://img.shields.io/badge/AI-Claude%203.5%20Sonnet-D97757?logo=anthropic)](https://www.anthropic.com/)

---

## ✨ Features

- **🚀 Instant Analysis**: Drag and drop any CSV to get immediate insights.
- **🧠 AI-Powered**: Uses Claude 3.5 Sonnet (via OpenRouter) for intelligent trend analysis and outlier detection.
- **📈 Data Preview**: Interactive data table for real-time verification before analysis.
- **📜 History Tracking**: Persistent storage of your latest 5 reports.
- **🛡️ System Health**: Real-time monitoring of API and Database connectivity.
- **📄 Export Support**: Copy insights directly or download them as high-quality Markdown.

---

## 🛠️ Tech Stack

- **Frontend**: Next.js 16 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS 4.0 (Modern Glassmorphism)
- **Database**: SQLite (Local) / Compatible with PostgreSQL (Production)
- **ORM**: Prisma 7
- **AI Integration**: OpenRouter API (Claude 3.5 Sonnet)
- **Utilities**: PapaParse (CSV), Lucide-React (Icons), React-Markdown

---

## 🚀 Getting Started

### Prerequisites
- Node.js 20+
- NPM or PNPM

### Installation

1. **Clone the repository**:
   ```bash
   git clone <your-repo-url>
   cd csv-insights-dashboard
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the root:
   ```env
   OPENROUTER_API_KEY=your_openrouter_key
   DATABASE_URL="file:./dev.db"
   PRISMA_CLIENT_ENGINE_TYPE="binary"
   ```

4. **Initialize Database**:
   ```bash
   npx prisma db push
   npx prisma generate
   ```

5. **Run Development Server**:
   ```bash
   npm run dev
   ```

---

## ☁️ Deployment (Vercel)

The project is optimized for Vercel deployment.

### 1. Database Configuration
For production persistence on Vercel, it is recommended to use **Vercel Postgres** or **Neon**.
Update your `DATABASE_URL` in Vercel settings to point to your hosted database.

### 2. Deployment Steps
1. Push your code to GitHub.
2. Connect your repository to Vercel.
3. Configure the following **Environment Variables**:
   - `OPENROUTER_API_KEY`
   - `DATABASE_URL`
   - `PRISMA_CLIENT_ENGINE_TYPE` (Set to `library` or `binary` based on environment)
4. The build command is automatically handled via the `vercel-build` script in `package.json`.

---

## ⚙️ Prisma 7 Notes
We use the `binary` engine type for maximum compatibility with Windows and standard Next.js environments. If you encounter initialization errors, ensure `PRISMA_CLIENT_ENGINE_TYPE=binary` is set in your environment.

---

## 📂 Project Structure
- `/app`: API routes and Page layouts.
- `/components`: Reusable UI elements (Uploader, Table, Navbar).
- `/lib`: Singleton configurations for Prisma and OpenRouter.
- `/prisma`: Database schema definitions.

---

Developed by **Vivek** as part of the Internship Assessment.
