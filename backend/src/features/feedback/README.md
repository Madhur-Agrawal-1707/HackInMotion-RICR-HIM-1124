# Feedback Module

The Feedback Module is responsible for analyzing completed interviews and producing detailed, transparent, and actionable performance reports for candidates using LangGraph agents.

## Architecture

* **Backend**: Node.js, Express, TypeScript, Mongoose, LangGraph.
* **Frontend**: React, Vite, Tailwind CSS v4, Recharts, Zustand, TanStack Query.
* **Storage**: MongoDB for persisting feedback reports.
* **PDF**: `pdfkit` for generating professional downloadable reports.

## LangGraph Workflow

The feedback analysis follows a structured LangGraph DAG:
1. `loadInterviewNode`: Loads raw interview answers and questions.
2. `loadCandidateContextNode`: Loads role and experience level.
3. `analyzeAnswersNode`: AI node that scores each answer and extracts raw strengths/weaknesses using strict Zod schemas.
4. `calculateScoresNode`: Deterministic node that calculates category weights and overall scores.
5. `identifyStrengthsNode` & `identifyWeaknessesNode`: Post-processes identified traits.
6. `identifySkillGapsNode`: Derives technical skill gaps from weaknesses.
7. `generateRecommendationsNode`: AI node generating actionable steps.
8. `generateSummaryNode`: AI node writing an unbiased executive summary.
9. `persistFeedbackNode`: Compiles and saves the final report.

## Setup

1. Install dependencies in `/backend` and `/frontend`.
2. Configure `.env` in backend with `MONGODB_URI`, `OPENAI_API_KEY`.
3. Start backend: `npm run dev`.
4. Start frontend: `npm run dev`.

## APIs Exposed

- `POST /api/feedback/generate/:interviewId`
- `GET /api/feedback/interview/:interviewId`
- `GET /api/feedback/:interviewId/pdf`
