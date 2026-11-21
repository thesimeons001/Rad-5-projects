# Notes API

A simple REST API built with Node.js, Express and TypeScript. It allows users to create and manage notes, while also providing user registration and login.

## Technologies Used
- Node.js
- Express.js
- TypeScript
- bcryptjs
- JSON Web Token (JWT)
- Postman

## Features

- User registration
- User login
- Password hashing with bcrypt
- JWT generation and authentication
- Protected user profile route
- Notes API for managing notes
- Basic request validation
- JSON file storage for user data

## How It Works

Users can register with a username, email and password. Before their details are saved, the password is hashed using bcrypt.

When a user logs in with the correct credentials, the API generates a JWT token. The token is then used to access protected routes, such as the user profile endpoint.

The Notes API handles note-related requests, while the Users API handles registration, login and authentication.

## Getting Started

1. Clone the repository.
2. Navigate to the project folder:

   ```bash
   cd "Week 8/NotesApi"
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Create a `.env` file and add your environment variables:

   ```env
   PORT=3000
   JWT_SECRET=your_secret_key
   ```

5. Start the development server:

   ```bash
   npm run dev
   ```

## API Routes

| Method | Endpoint | Description |
|---|---|---|
| POST | `/users/register` | Register a new user |
| POST | `/users/login` | Log in and receive a JWT |
| GET | `/users/profile` | Access the protected profile route |

Protected routes require a valid JWT in the request's Authorization header:

```text
Bearer your_token
```

## Testing

The endpoints were tested using Postman by sending requests and checking the responses.

## What I Learned

Building this project helped me understand how APIs handle requests and responses, how passwords are hashed, how JWT authentication works, and how to organise an Express application using TypeScript.