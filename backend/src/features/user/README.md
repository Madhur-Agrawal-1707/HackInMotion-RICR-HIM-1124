# User Management Feature Module

This module implements user profile management, user profile data update, profile avatar picture uploads via Cloudinary, and account deletion functionality.

## Folder Structure

```
user/
├── controller/     # Express route handlers
│   └── user.controller.ts
├── service/        # Business logic for update, upload, and deletion
│   └── user.service.ts
├── repository/     # Mongoose CRUD database calls
│   └── user.repository.ts
├── routes/         # Express router endpoints
│   └── user.routes.ts
├── model/          # User Schema / Model definitions
│   └── user.model.ts
└── validation/     # Validation schema rules (Zod)
    └── user.validation.ts
```

## API Documentation

All routes in the `/api/user` path require a valid authentication session.

- **GET `/api/user/profile`**: Returns profile info of the authenticated user.
- **PATCH `/api/user/profile`**: Updates name for the user. Uses Zod for input validation.
- **PATCH `/api/user/avatar`**: Uploads a profile picture to Cloudinary. Accepts image uploads (JPEG/PNG/WEBP, Max 5MB).
- **DELETE `/api/user/account`**: Permanently deletes the authenticated user's account and clears local cookies.

## Image Upload Integration

Avatars are uploaded through a Multi-part form parser (`Multer`) directly to the Cloudinary Media Storage CDN. Supported image types are JPEG, PNG, and WEBP with a maximum size boundary of 5MB.
