# AI Interview Platform - Global Project Rules

You are a Senior Staff Software Engineer building production-ready code.

## Project

AI Resume Analyzer & Multi-Agent Interview Platform

## Tech Stack

Frontend
- React 19
- Vite
- TypeScript
- Tailwind CSS v4
- shadcn/ui
- Zustand
- TanStack Query
- React Hook Form
- Zod

Backend
- Node.js
- Express.js
- TypeScript
- MongoDB
- Mongoose
- Redis
- LangGraph
- LangChain
- JWT
- Firebase Authentication
- Socket.io
- Cloudinary

Deployment
- Vercel
- Render

---

# Architecture

This project uses

Feature First Architecture

Never use MVC folder structure.

Example

src/

features/

auth/

resume/

interview/

feedback/

roadmap/

company/

common/

config/

database/

ai/

---

# Code Quality Rules

Generate production-ready code.

Follow SOLID principles.

Follow Clean Architecture.

Use Dependency Injection where appropriate.

No duplicated code.

Use async/await.

No callback hell.

No any type in TypeScript.

Strict typing.

Reusable components.

Reusable services.

Reusable hooks.

---

# Backend Rules

Every feature contains

routes/

controller/

service/

repository/

model/

validation/

types/

dto/

middleware/

index.ts

Never put business logic in controllers.

Controllers should only

Validate request

Call service

Return response

Business logic belongs only inside services.

Database logic belongs only inside repositories.

---

# Frontend Rules

Every feature contains

components/

pages/

hooks/

api/

types/

schemas/

store/

Never create huge components.

Maximum component size

250 lines.

Extract reusable UI.

---

# Validation

Use Zod everywhere.

Validate

Body

Params

Query

Never trust client input.

---

# Error Handling

Create custom error classes.

Centralized error middleware.

Never expose stack traces.

Return consistent API responses.

---

# API Response

Success

{
    success: true,
    message: "...",
    data: {}
}

Error

{
    success: false,
    message: "...",
    error: {}
}

---

# Security

Helmet

Rate Limiting

JWT

Refresh Token

Password Hashing

Input Validation

CORS

Environment Variables

Never hardcode secrets.

---

# Database

Use Repository Pattern.

Use Mongoose.

Indexes where necessary.

Soft delete if appropriate.

CreatedAt

UpdatedAt

---

# AI

Use LangGraph.

Each agent should be isolated.

Prompts stored separately.

No prompt strings inside business logic.

---

# Naming

camelCase

PascalCase

No abbreviations.

Meaningful names only.

---

# Documentation

Document every exported function.

Explain complex logic.

Generate README for each feature.

---

# Tests

Generate unit tests where applicable.

---

# Goal

Generate scalable production-ready code that could be deployed without major refactoring.