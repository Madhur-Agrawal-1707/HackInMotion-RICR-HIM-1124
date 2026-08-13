# Authentication Feature Module

This module implements the complete authentication system for the platform, including user registration, session management, JWT authentication, role-based authorization, and password recovery.

## Architecture & Design Patterns

This module follows the **Feature-First Architecture** combined with the **Repository Pattern** and **Dependency Injection** (where appropriate).

- **Controllers**: Handle HTTP request validation using Zod and delegate work to services. They contain no business or database logic.
- **Services**: Contain the core business logic (e.g., password hashing, token generation, session mapping).
- **Repositories**: Direct interaction with the MongoDB models.
- **Middlewares**: Secure route authorization (`authenticate()`) and Role-Based Access Control (`authorize([roles])`).
- **Validation**: Strict validation of `body`, `query`, and `params` utilizing Zod schemas before hitting controller logic.

## Folder Structure

```
auth/
├── controller/     # Express route handlers
│   └── auth.controller.ts
├── service/        # Business logic & services
│   └── auth.service.ts
├── repository/     # User/Auth database operations (shared via UserRepository)
├── routes/         # Router declarations mapping endpoints
│   └── auth.routes.ts
├── dto/            # Data Transfer Objects
├── validation/     # Zod validation schemas
│   └── auth.validation.ts
└── types/          # TypeScript custom type declarations
```

## API Documentation

- **POST `/api/auth/register`**: Creates a new user account using `name`, `email`, and `password`. Returns JWT cookies.
- **POST `/api/auth/login`**: Authenticates a user using `email` and `password`. Returns JWT cookies.
- **POST `/api/auth/google`**: Handles Google SSO authentication via Firebase idToken.
- **POST `/api/auth/logout`**: Clears authentication cookies and invalidates the session in Redis.
- **POST `/api/auth/refresh`**: Standard OAuth2-like refresh token endpoint. Uses HTTP-Only refresh cookies to rotating access tokens.
- **POST `/api/auth/forgot-password`**: Triggers forgot-password process and yields a temporary secure reset token.
- **POST `/api/auth/reset-password`**: Updates user password using a valid, non-expired reset token.
- **POST `/api/auth/change-password`**: Updates the logged-in user's password. (Requires authentication).

## Security Implementation

- **HTTP-Only Cookies**: JWT Access and Refresh tokens are delivered via secure HTTP-Only cookies to prevent XSS-based token extraction.
- **Token Rotation & Revocation**: Refresh tokens rotate on every refresh. Revoked sessions are blacklisted in Redis.
- **Password Strength Rules**: Password inputs must meet security conditions (at least 8 chars, uppercase, lowercase, special char, number). Hashed using `bcrypt` (10 rounds).
- **Rate Limiting**: Protects authentication endpoints from brute-force login attacks.
- **Centralized Error Handling**: Unhandled exceptions do not reveal stack traces to the public user.
