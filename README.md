# 🚀 AI Resume Analyzer & Multi-Agent Interview Platform

> **HackInMotion | RICR-HIM-1124**
> 
> *An intelligent, multi-agent AI platform designed to revolutionize the hiring process by automating resume analysis, conducting personalized technical interviews, and generating actionable skill improvement roadmaps.*

---

## 🌟 Overview

The **AI Resume Analyzer & Multi-Agent Interview Platform** bridges the gap between candidates and companies by leveraging advanced AI techniques. Built using a **Feature-First Architecture** workflows, our platform provides a seamless, automated, and intelligent candidate evaluation experience.

Candidates can upload their resumes to receive detailed insights, take real-time multi-agent AI interviews tailored to their skills, and get personalized roadmaps for career growth. Companies can utilize the platform to objectively evaluate candidates against predefined criteria.

## ✨ Key Features

- **📄 Smart Resume Analysis:** Upload a resume (PDF) and our LangChain agents extract key skills, experience, and educational background.
- **🤖 Multi-Agent AI Interview:** A dynamic, conversational interview process powered by LangGraph, where specialized AI agents collaborate to assess the candidate in real-time.
- **📊 Real-time Feedback & Scoring:** Get instant, objective feedback and scores based on interview performance.
- **🗺️ Personalized Skill Roadmap:** Generates a customized learning path and roadmap to bridge any skill gaps identified during the interview.
- **🏢 Company Portal:** Allows companies to set criteria and review candidate performance.
- **🔐 Secure Authentication:** Robust user authentication using Firebase and JWT.

## 🛠️ Tech Stack

### Frontend
- **Framework:** React 19, Vite
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4, shadcn/ui
- **State Management:** Zustand, TanStack Query
- **Forms & Validation:** React Hook Form, Zod

### Backend
- **Runtime & Framework:** Node.js, Express.js
- **Language:** TypeScript
- **Database:** MongoDB (Mongoose)
- **Security:** Rate Limiting, JWT, Firebase Admin
- **Storage:** Cloudinary, PDFKit

### AI 
- **Orchestration:** LangGraph
- **LLM Integration:** OpenAI
- **Architecture:** Isolated multi-agent workflows with separate prompt management

## 🏗️ Architecture

We strictly follow a **Feature-First Architecture** ensuring scalable and maintainable code.

```text
src/
 ├── features/
 │   ├── auth/          # User authentication and authorization
 │   ├── resume/        # Resume parsing and analysis
 │   ├── interview/     # Multi-agent interview orchestration
 │   ├── feedback/      # Interview evaluation and scoring
 │   ├── roadmap/       # Skill gap analysis and roadmap generation
 │   ├── company/       # Company specific workflows
 │   └── user/          # User profile management
 ├── common/            # Shared utilities and middlewares
 ├── config/            # Environment and integration configurations
 ├── database/          # Database connection logic
 └── ai/                # LangGraph agents and LLM configurations
```

## ⚙️ Local Setup & Installation

### Prerequisites
- Node.js (v18+)
- MongoDB
- express rate limiter
- OpenAI API Key through Openrouter
- Firebase Project Credentials
- Cloudinary Account Credentials

### 1. Backend Setup
```bash
cd backend
npm install

# Create a .env file and add your configuration variables:
# PORT, MONGO_URI, OPENAI_API_KEY, JWT_SECRET, FIREBASE credentials, CLOUDINARY URLs, etc.

npm run dev
```

### 2. Frontend Setup
```bash
cd frontend
npm install

# Create a .env file for frontend environment variables:
# VITE_API_URL

npm run dev
```

## 🛡️ Code Quality & Security
- Strict **TypeScript** usage with no `any` types.
- Input validation on all endpoints using **Zod**.
- **SOLID principles** and Clean Architecture applied throughout.
- Centralized error handling and secure API response structures.

---
*Built with ❤️ for the HackInMotion Hackathon.*
