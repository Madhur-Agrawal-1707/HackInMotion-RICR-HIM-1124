# AUTH_MODULE_PROMPT.md

# Role

You are a Senior Backend + Frontend Software Engineer and Security Engineer.

Your task is to build ONLY the **Authentication & User Management Module** for our AI Resume Analyzer & Multi-Agent Interview Platform.

This module is one part of a larger project. Follow the existing project structure and coding standards defined in `PROJECT_RULES.md`.

DO NOT generate any code outside your assigned module unless it is absolutely required for integration.

---

# Important

Before generating any code, strictly follow every rule written in **PROJECT_RULES.md**.

Do not change folder structure.

Do not introduce new architectural patterns.

Do not create unnecessary dependencies.

Everything must be production-ready.

---

# Module Ownership

You own these features completely.

```
features/

auth/

user/
```

You are also responsible for initializing and maintaining these shared folders if they don't already exist.

```
common/

config/

database/

middlewares/

utils/

types/
```

Do not modify other features.

---

# Tech Stack

Backend

- Node.js
- Express
- TypeScript
- MongoDB
- Mongoose
- Redis
- JWT
- Firebase Authentication
- Bcrypt
- Zod
- Helmet
- CORS
- Express Rate Limit
- Cookie Parser
- Winston/Pino Logger

Frontend

- React
- TypeScript
- TailwindCSS
- shadcn/ui
- React Hook Form
- Zod
- Zustand
- TanStack Query

---

# Folder Structure

Backend

```
src/

common/

config/

database/

features/

auth/

controller/

service/

repository/

routes/

model/

dto/

validation/

middleware/

types/

index.ts

user/

controller/

service/

repository/

routes/

model/

dto/

validation/

types/

index.ts
```

Frontend

```
src/

features/

auth/

pages/

components/

hooks/

api/

schemas/

store/

types/

user/

pages/

components/

hooks/

api/

types/
```

---

# Responsibilities

Build the complete authentication system.

Everything must work together.

No TODOs.

No placeholders.

No mock implementations.

---

# Authentication Features

Implement

✅ User Registration

✅ User Login

✅ Google Login using Firebase

✅ JWT Authentication

✅ Refresh Token Rotation

✅ Logout

✅ Forgot Password

✅ Reset Password

✅ Change Password

✅ Email Verification (architecture ready)

✅ Get Current User

✅ Update Profile

✅ Profile Picture Upload (Cloudinary)

✅ Role Based Authorization

✅ Protected Routes

✅ Session Management

---

# User Roles

Implement RBAC.

Roles

```
ADMIN

USER
```

Middleware

```
authenticate()

authorize(role)

```

Roles must be scalable for future additions.

---

# JWT

Implement

Access Token

Refresh Token

Access Token

15 minutes

Refresh Token

7 days

Store Refresh Token securely.

Support refresh token rotation.

Support token revocation.

---

# Cookies

Use

HTTP Only

Secure

SameSite

Proper expiration

Do not expose refresh tokens to JavaScript.

---

# Password Rules

Minimum

8 characters

Uppercase

Lowercase

Number

Special Character

Hash using bcrypt.

Never store plain passwords.

---

# Validation

Use Zod.

Validate every endpoint.

Request Body

Request Params

Query

Return readable validation errors.

---

# API Endpoints

Authentication

```
POST /api/auth/register

POST /api/auth/login

POST /api/auth/google

POST /api/auth/logout

POST /api/auth/refresh

POST /api/auth/forgot-password

POST /api/auth/reset-password

POST /api/auth/change-password

GET /api/auth/me
```

User

```
GET /api/user/profile

PATCH /api/user/profile

PATCH /api/user/avatar

DELETE /api/user/account
```

---

# User Model

Include

```
Name

Email

Password

Avatar

Provider

Role

Email Verified

Refresh Token

Created At

Updated At
```

Make schema scalable.

---

# Security

Implement

Helmet

Rate Limiter

CORS

Sanitize Input

JWT Verification

Password Hashing

Cookie Security

Environment Variables

No Secrets in Code

Centralized Error Handler

Request Logger

---

# Logging

Log

Registration

Login

Logout

Failed Login

Password Reset

Unauthorized Access

Refresh Token

Do not log passwords.

---

# Database

MongoDB

Use Repository Pattern.

Indexes

Email

Unique

CreatedAt

UpdatedAt

---

# Redis

Use Redis for

Session Cache

Refresh Token Cache

Rate Limiter

Blacklist Revoked Tokens

---

# Frontend Pages

Create

```
Login

Register

Forgot Password

Reset Password

Profile

Settings
```

---

# UI Requirements

Use

shadcn/ui

Responsive

Dark Mode Ready

Accessible

Loading States

Error States

Success Toasts

Skeleton Loaders

---

# Forms

Use

React Hook Form

Zod

Proper validation

Reusable form components

---

# State Management

Use

Zustand

Store

```
Current User

Access Token State

Authentication Status
```

Persist only what is necessary.

Never persist refresh tokens.

---

# API Layer

Create reusable API hooks.

Use TanStack Query.

Handle

Loading

Errors

Retries

Unauthorized responses

Token refresh

Automatically retry after refresh.

---

# Error Handling

Return

```
{
    success: false,
    message: "...",
    error: {}
}
```

Do not expose stack traces.

---

# Success Response

```
{
    success: true,
    message: "...",
    data: {}
}
```

---

# File Upload

Integrate Cloudinary.

Allow

JPEG

PNG

WEBP

Maximum

5 MB

---

# Testing

Generate

Unit Tests

Integration Tests

Authentication Tests

Middleware Tests

Validation Tests

---

# Documentation

Generate

README.md

for

auth

user

Include

Architecture

Folder Structure

Environment Variables

API Documentation

Setup Instructions

Security Notes

---

# Environment Variables

Generate complete `.env.example`

Include every variable required.

Do not hardcode anything.

---

# Code Quality

Follow

SOLID

Clean Code

Repository Pattern

Strict TypeScript

Reusable Components

Reusable Hooks

Meaningful Naming

No Duplicate Code

No Large Components

No Large Functions

---

# Final Goal

Produce a **production-ready authentication and user management module** that integrates cleanly into the larger monolithic, feature-first AI Interview Platform. The code should be secure, scalable, maintainable, well-documented, and ready for teammates to build on without major refactoring.