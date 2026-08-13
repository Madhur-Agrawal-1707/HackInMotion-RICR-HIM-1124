# Resume Intelligence Module

The Resume Intelligence Module is a core component of the AI Resume Analyzer & Multi-Agent Interview Platform. It provides end-to-end resume optimization, parsing, building, and ATS analysis.

## Architecture

This module follows a Feature-First Architecture and SOLID principles.

## Folder Structure

\`\`\`text
src/
├── features/
│   └── resume/
│       ├── builder/        # Logic to structure a new resume
│       ├── controller/     # Express route handlers
│       ├── model/          # Mongoose schemas
│       ├── parser/         # Resume parsing logic (PDF/DOCX -> JSON)
│       ├── repository/     # Database interaction
│       ├── routes/         # Express routes
│       ├── service/        # Core business logic
│       ├── types/          # TypeScript interfaces
│       ├── validation/     # Zod schemas for request validation
│       └── index.ts        # Module exports
├── ai/
│   ├── agents/
│   │   └── ResumeAgent/    # Langchain Agent for resume tasks
│   ├── graphs/
│   │   └── resumeGraph/    # LangGraph workflow for analysis and improvements
│   ├── prompts/
│   │   └── resume/         # System prompts
│   └── tools/              # Custom AI tools
└── common/
    └── utils/
        └── cloudinary.util.ts
\`\`\`

## Resume Processing Flow (LangGraph)

1. **Upload Resume**: User uploads PDF/DOCX.
2. **Parse Resume**: AI extracts structured JSON (Name, Experience, etc.).
3. **Extract Structured Data**: Save to DB.
4. **ATS Analysis**: Evaluate formatting, keywords, readability.
5. **Profile Strength Evaluation**: Evaluate experience, education, skills.
6. **Skill Gap Analysis**: Identify missing technologies.
7. **Generate AI Suggestions**: Provide rewritten bullet points and summary.
8. **Store Results**: Update MongoDB and cache in Redis.

## API Documentation

| Method | Endpoint                       | Description                     |
| ------ | ------------------------------ | ------------------------------- |
| POST   | \`/api/resume/upload\`           | Upload & Parse a resume         |
| POST   | \`/api/resume/build\`            | Build a new resume from JSON    |
| POST   | \`/api/resume/analyze\`          | Perform ATS Analysis            |
| POST   | \`/api/resume/improve\`          | Generate AI improvements        |
| GET    | \`/api/resume\`                  | Get current resume              |
| GET    | \`/api/resume/:id\`              | Get specific resume by ID       |
| GET    | \`/api/resume/history\`          | Get version history             |
| PATCH  | \`/api/resume/:id\`              | Update resume (creates version) |
| DELETE | \`/api/resume/:id\`              | Delete a resume                 |
| POST   | \`/api/resume/version/restore\`  | Restore a previous version      |

## Setup Instructions

1. Configure \`.env\` file.
2. Install dependencies: \`npm install\`
3. Run the server: \`npm run dev\`
