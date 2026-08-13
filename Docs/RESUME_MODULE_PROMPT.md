# RESUME_MODULE_PROMPT.md

## Role

You are a Senior AI Engineer, Full-Stack Software Engineer, ATS Optimization Expert, and Software Architect.

Your responsibility is to build **ONLY the Resume Module** for our AI Resume Analyzer & Multi-Agent Interview Platform.

This module is responsible for helping users create ATS-friendly resumes, analyze existing resumes, improve profile strength, and maximize interview opportunities through AI-powered recommendations.

You must strictly follow every rule defined in `PROJECT_RULES.md`.

Do **not** modify or generate code for any other feature unless it is required for integration.

---

# Primary Objective

Build a production-ready Resume Intelligence Module capable of:

* Creating ATS-friendly resumes.
* Uploading and parsing resumes.
* Performing ATS analysis.
* Measuring profile strength.
* Identifying missing skills and keywords.
* Providing AI-powered resume improvements.
* Suggesting projects, certifications, achievements, and skills.
* Managing resume versions and history.

The module should provide a complete resume optimization experience instead of only calculating an ATS score.

---

# Module Ownership

You own only:

```text
features/

resume/
```

You also own the AI implementation for:

```text
ai/

agents/
    ResumeAgent/

graphs/
    resumeGraph/

prompts/
    resume/

tools/
```

Do not modify Authentication, Interview, Feedback, Roadmap, or Company Interview modules.

---

# Tech Stack

Backend

* Node.js
* Express.js
* TypeScript
* MongoDB
* Mongoose
* Redis
* LangGraph
* LangChain
* JWT
* Cloudinary
* Multer
* Zod

Frontend

* React
* TypeScript
* TailwindCSS
* shadcn/ui
* Zustand
* TanStack Query
* React Hook Form
* React PDF Viewer (optional)

---

# Folder Structure

Backend

```text
features/

resume/

controller/

service/

repository/

routes/

model/

dto/

validation/

middleware/

types/

parser/

builder/

index.ts
```

AI

```text
ai/

agents/

ResumeAgent/

graphs/

resumeGraph/

prompts/

resume/

tools/
```

Frontend

```text
features/

resume/

pages/

components/

hooks/

api/

store/

schemas/

types/
```

---

# Responsibilities

Build the complete Resume Intelligence Module.

No placeholders.

No TODO comments.

Everything must be production-ready.

---

# Core Features

Implement

* Resume Upload
* Resume Parsing
* Resume Builder
* ATS Analysis
* Resume Improvement
* Resume Version History
* Resume Download
* Resume Preview
* Profile Strength Analysis
* Resume Dashboard

---

# Resume Upload

Allow users to upload:

* PDF
* DOCX

Maximum Size

* 10 MB

Store original files in Cloudinary.

Store metadata inside MongoDB.

---

# Resume Parsing

Extract:

* Name
* Email
* Phone
* Education
* Experience
* Skills
* Projects
* Certifications
* Achievements
* Languages
* Social Links
* Portfolio
* GitHub
* LinkedIn

Return structured JSON.

Support multiple resume layouts.

Handle missing fields gracefully.

---

# Resume Builder

Implement a modern ATS-friendly resume builder.

Sections

* Personal Information
* Summary
* Education
* Experience
* Skills
* Projects
* Certifications
* Achievements
* Languages
* Interests

Features

* Live Preview
* Auto Save
* Drag-and-Drop Section Ordering
* Add/Remove Sections
* Export as PDF

---

# ATS Analysis

Generate an ATS report.

Analyze:

* Formatting
* Keywords
* Readability
* Experience
* Skills
* Grammar
* Section Completeness
* Contact Information
* Project Quality
* Action Verbs

Return

* Overall ATS Score
* Section-wise Scores
* Missing Keywords
* Improvement Suggestions
* Priority Fixes

---

# AI Resume Improvement

The Resume Agent should provide:

* Improved Professional Summary
* Better Project Descriptions
* Better Bullet Points
* Strong Action Verbs
* Grammar Improvements
* Skill Recommendations
* Missing Certifications
* Missing Technologies
* Resume Rewriting Suggestions

Do not overwrite the original resume automatically.

Always provide recommendations separately.

---

# Profile Strength

Calculate profile strength using multiple dimensions.

Evaluate:

* Education
* Experience
* Technical Skills
* Soft Skills
* Projects
* Certifications
* Resume Completeness
* ATS Compatibility

Generate

* Overall Profile Score
* Strength Areas
* Weak Areas
* Recommended Next Steps

---

# Skill Gap Analysis

Compare:

* Current Skills
* Target Role Requirements

Identify:

* Missing Skills
* Recommended Technologies
* Suggested Certifications
* Suggested Projects

Return structured recommendations.

---

# Resume Versioning

Support:

* Resume History
* Version Restore
* Version Comparison

Never overwrite previous versions.

---

# Resume Model

Include:

* User ID
* Original File URL
* Parsed Resume
* ATS Score
* Profile Strength
* AI Suggestions
* Resume Versions
* Current Version
* Created At
* Updated At

---

# LangGraph Workflow

Implement a stateful Resume Agent workflow.

Suggested Flow

```text
START

↓

Upload Resume

↓

Parse Resume

↓

Extract Structured Data

↓

ATS Analysis

↓

Profile Strength Evaluation

↓

Skill Gap Analysis

↓

Generate AI Suggestions

↓

Store Results

↓

END
```

Each node should have a single responsibility.

---

# Redis

Use Redis for:

* Parsed Resume Cache
* ATS Result Cache
* Resume Preview Cache
* Frequently Used Skill Lists

---

# API Endpoints

```text
POST /api/resume/upload

POST /api/resume/build

POST /api/resume/analyze

POST /api/resume/improve

GET /api/resume

GET /api/resume/:id

PATCH /api/resume/:id

DELETE /api/resume/:id

GET /api/resume/history

POST /api/resume/version/restore
```

---

# Validation

Use Zod.

Validate:

* Uploaded Files
* Resume Builder Input
* Update Requests
* Query Parameters
* Route Parameters

Reject invalid files with meaningful error messages.

---

# Frontend Pages

Create

* Resume Dashboard
* Upload Resume
* Resume Builder
* Resume Preview
* ATS Analysis
* Resume History
* Resume Improvement

---

# UI Requirements

Use shadcn/ui.

Provide:

* Responsive Layout
* Dark Mode
* Resume Cards
* Upload Progress
* Loading Skeletons
* Error States
* Success Toasts
* Resume Preview
* ATS Score Dashboard
* Version History Timeline

---

# State Management

Use Zustand.

Manage:

* Current Resume
* ATS Score
* Resume Versions
* Resume Preview
* Upload State

---

# API Layer

Use TanStack Query.

Handle:

* Upload Progress
* Loading
* Errors
* Cache Invalidation
* Automatic Refetching

---

# Security

Implement:

* JWT Authentication
* Protected Routes
* Secure File Upload
* File Type Validation
* File Size Validation
* Helmet
* CORS
* Rate Limiting

Never trust uploaded files.

---

# Logging

Log:

* Resume Upload
* Resume Analysis
* Resume Updates
* Resume Deletion
* ATS Analysis
* AI Suggestions

Never log sensitive user information.

---

# Testing

Generate:

* Unit Tests
* API Tests
* Resume Parsing Tests
* ATS Analysis Tests
* Validation Tests

---

# Documentation

Generate a README for the Resume Module.

Include:

* Architecture
* Folder Structure
* Resume Processing Flow
* LangGraph Workflow
* API Documentation
* Environment Variables
* Setup Instructions

---

# Environment Variables

Generate a complete `.env.example`.

Include every required variable.

Do not hardcode secrets.

---

# Code Quality

Follow:

* SOLID Principles
* Clean Architecture
* Repository Pattern
* Strict TypeScript
* Reusable Components
* Reusable Hooks
* Modular LangGraph Nodes
* Meaningful Naming
* No Duplicate Code
* Small, Testable Functions

---

# Final Goal

Generate a **production-ready Resume Intelligence Module** capable of building ATS-friendly resumes, parsing uploaded resumes, performing advanced ATS analysis, evaluating profile strength, identifying skill gaps, generating AI-powered improvement suggestions, and maintaining resume version history. The implementation must be scalable, secure, maintainable, and integrate seamlessly with the Interview, Feedback, and Roadmap modules without requiring major refactoring.
