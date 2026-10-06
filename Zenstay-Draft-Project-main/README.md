# ZENSTAY Property Management System – AI/RAG Demo

Zenstay is a full-stack, AI-powered property management and operations platform designed for Manager/Admins and Housekeepers.

## Features & AI Capabilities
- **AI Intelligence Navigation**: Intuitive access for Manager/Admin and Housekeeper roles.
- **Static RAG Knowledge Assistant**: Grounded answer cards and source citations based on context.
- **Interactive Prompts**: Suggested RAG prompts and answer switching capabilities.
- **AI Operations Copilot**: Highlights risk signals for active management.
- **AI Message Assistant**: Automated alternate reply generation.
- **Review & Sentiment Intelligence**: Insights from guest feedback.
- **Predictive Daily Briefing**: Property readiness intelligence, financial anomaly detection, route/workload suggestions.
- **Audit & Guardrails**: AI audit trail for tracking system decisions.

*Note: The AI behavior is primarily simulated with static demo data for client presentation. No live LLM, vector database, Guesty API, or payment gateway is strictly required for the core demo mode.*

## Project Structure (Monorepo)
- `apps/web`: React Frontend (Vite)
- `apps/api`: Express.js / Node.js Backend API
- `packages/database`: Prisma ORM setup and database schemas

## Setup and Installation

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or above recommended)
- npm or yarn

### 1. Install Dependencies
From the project root (`zenstay` folder), install all workspace dependencies:
```bash
cd zenstay
npm install
```

### 2. Environment Setup
Configure your environment variables for both the API and Web applications (e.g., database connection strings, API keys).
- Create a `.env` in `apps/api` (refer to any provided `.env.example`).
- Create a `.env` in `apps/web`.

### 3. Database Migration
Run the database migrations to set up the local database:
```bash
cd packages/database
npx prisma generate
npx prisma db push
```

### 4. Running the Project
You can run the frontend and backend development servers from the monorepo root (`zenstay` directory):

**To run the frontend (Web):**
```bash
npm run dev:web
```
The frontend will be available at `http://localhost:5173`.

**To run the backend API:**
```bash
npm run dev:api
```
The backend API will be available at `http://localhost:3000`.
