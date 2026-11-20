# Notes API

A simple REST API for managing notes. Users can register, log in to receive a JWT token, and use that token to create, read, update, and delete their own notes.

## Features

- Create, read, update, and delete notes
- Register a new user
- Log in and receive a JWT token
- Protect Notes API endpoints using JWT authentication
- Each user can only access their own notes

## Technologies Used

- Node.js
- TypeScript
- Express.js
- JSON Web Token (JWT)
- bcryptjs for password hashing
- JSON files for data storage

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Create a `.env` file

Create a `.env` file in the root folder and add:

```env
PORT=3000
JWT_SECRET=your_secret_key_here
JWT_EXPIRES_IN=1h
```

Do not share your `JWT_SECRET` or upload it to GitHub.

### 3. Run the API

```bash
npm run dev
```

The API will run on:

```text
http://localhost:3000
```

## API Endpoints

### Users API

| Method | Endpoint | Description | Authentication |
|---|---|---|---|
| POST | `/api/users/register` | Register a new user | No |
| POST | `/api/users/login` | Log in and receive a JWT token | No |

### Notes API

| Method | Endpoint | Description | Authentication |
|---|---|---|---|
| GET | `/api/notes` | Get all notes belonging to the logged-in user | Yes |
| POST | `/api/notes` | Create a new note | Yes |
| PUT | `/api/notes/:id` | Update a note belonging to the logged-in user | Yes |
| DELETE | `/api/notes/:id` | Delete a note belonging to the logged-in user | Yes |

## User Registration

### Endpoint

```http
POST /api/users/register
```

### Request Body

```json
{
  "username": "ada",
  "email": "ada@example.com",
  "password": "StrongPassword123"
}
```

### Success Response

```json
{
  "message": "User registered successfully",
  "user": {
    "id": "b7f9c2e1-4a6d-4f8b-9c2e-1a2b3c4d5e6f",
    "username": "ada",
    "email": "ada@example.com"
  }
}
```

### Error Responses

If the username or email already exists:

```json
{
  "message": "Username or email already exists"
}
```

If required fields are missing:

```json
{
  "message": "username, email and password are required"
}
```

## User Login

### Endpoint

```http
POST /api/users/login
```

### Request Body

```json
{
  "email": "ada@example.com",
  "password": "StrongPassword123"
}
```

### Success Response

```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "b7f9c2e1-4a6d-4f8b-9c2e-1a2b3c4d5e6f",
    "username": "ada",
    "email": "ada@example.com"
  }
}
```

### Error Response

If the email or password is incorrect:

```json
{
  "message": "Invalid credentials"
}
```

## Using the JWT Token

After logging in, copy the `token` from the login response.

Add it to the request header:

```http
Authorization: Bearer YOUR_TOKEN_HERE
```

Example:

```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Create a Note

### Endpoint

```http
POST /api/notes
```

### Headers

```http
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: application/json
```

### Request Body

```json
{
  "title": "My first note",
  "content": "This is my first note."
}
```

### Success Response

```json
{
  "id": "9a1b2c3d-4e5f-6a7b-8c9d-0e1f2a3b4c5d",
  "title": "My first note",
  "content": "This is my first note.",
  "user": "b7f9c2e1-4a6d-4f8b-9c2e-1a2b3c4d5e6f",
  "createdAt": "2026-11-20T10:00:00.000Z",
  "updatedAt": "2026-11-20T10:00:00.000Z"
}
```

## Get Notes

### Endpoint

```http
GET /api/notes
```

### Headers

```http
Authorization: Bearer YOUR_TOKEN_HERE
```

### Success Response

```json
[
  {
    "id": "9a1b2c3d-4e5f-6a7b-8c9d-0e1f2a3b4c5d",
    "title": "My first note",
    "content": "This is my first note.",
    "user": "b7f9c2e1-4a6d-4f8b-9c2e-1a2b3c4d5e6f",
    "createdAt": "2026-11-20T10:00:00.000Z",
    "updatedAt": "2026-11-20T10:00:00.000Z"
  }
]
```

## Update a Note

### Endpoint

```http
PUT /api/notes/:id
```

### Headers

```http
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: application/json
```

### Request Body

```json
{
  "title": "Updated note title",
  "content": "Updated note content."
}
```

### Success Response

```json
{
  "id": "9a1b2c3d-4e5f-6a7b-8c9d-0e1f2a3b4c5d",
  "title": "Updated note title",
  "content": "Updated note content.",
  "user": "b7f9c2e1-4a6d-4f8b-9c2e-1a2b3c4d5e6f",
  "createdAt": "2026-11-20T10:00:00.000Z",
  "updatedAt": "2026-11-20T10:05:00.000Z"
}
```

## Delete a Note

### Endpoint

```http
DELETE /api/notes/:id
```

### Headers

```http
Authorization: Bearer YOUR_TOKEN_HERE
```

### Success Response

```json
{
  "message": "Note deleted successfully"
}
```

## Authentication

Passwords are hashed using `bcryptjs` before they are saved.

JWT tokens are created when a user logs in. The token must be included in the `Authorization` header for all Notes API requests.

```http
Authorization: Bearer YOUR_TOKEN_HERE
```

## Project Structure

```text
src/
├── controllers/
│   ├── noteController.ts
│   └── userController.ts
├── middleware/
│   ├── auth.ts
│   └── errorHandler.ts
├── routes/
│   ├── noteRoutes.ts
│   └── userRoutes.ts
├── services/
│   ├── noteService.ts
│   └── userService.ts
├── types/
│   ├── notes.ts
│   └── users.ts
├── app.ts
└── server.ts
```

## Testing With Postman

1. Start the API using `npm run dev`.
2. Register a user using `POST /api/users/register`.
3. Log in using `POST /api/users/login`.
4. Copy the JWT token from the login response.
5. Add the token to the `Authorization` header.
6. Use the Notes API endpoints to create, read, update, and delete notes.

## Author

Simeon
