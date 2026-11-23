# Notes API

A REST API built with Node.js, Express and TypeScript. It allows users to create, retrieve, update and delete notes, while also providing user registration, login and JWT-based authentication.

## Technologies Used

- Node.js
- Express.js
- TypeScript
- Zod
- bcryptjs
- JSON Web Token (JWT)
- Postman

## Features

- User registration
- User login
- Password hashing with bcrypt
- JWT generation and authentication
- Protected user profile route
- Notes CRUD operations (Create, Read, Update and Delete)
- Request validation using Zod
- Custom validation middleware
- Structured validation error responses
- JSON file storage for notes and user data

## How It Works

Users can register with a username, email and password. Before their details are saved, the password is hashed using bcrypt.

When a user logs in with the correct credentials, the API generates a JWT token. This token is used to access protected routes through the Authorization header.

The Notes API handles note-related requests, while the Users API handles registration, login and authentication.

Zod is used to validate incoming request data before it reaches the controllers. Separate validation schemas define the required fields and validation rules for notes, user registration and login.

Validation middleware uses Zod's `safeParse()` method to check incoming data. If validation fails, the API returns a 400 Bad Request response containing details about the invalid fields.

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

### Users API

| Method | Endpoint | Description |
|---|---|---|
| POST | `/users/register` | Register a new user |
| POST | `/users/login` | Log in and receive a JWT |
| GET | `/users/profile` | Access the protected user profile |

### Notes API

| Method | Endpoint | Description |
|---|---|---|
| GET | `/notes` | Retrieve all notes |
| GET | `/notes/:id` | Retrieve a single note |
| POST | `/notes` | Create a new note |
| PUT | `/notes/:id` | Update an existing note |
| DELETE | `/notes/:id` | Delete a note |

### Authentication

Protected routes require a valid JWT in the request's Authorization header:

```text
Authorization: Bearer your_token
```

### Validation with Zod

Zod validation is applied to:

- `POST /notes`
- `PUT /notes/:id`
- `POST /users/register`
- `POST /users/login`

The validation schemas check required fields, data types, email format, password length and empty values.

Invalid requests return a `400 Bad Request` response with a description of the validation errors.

Example:

```json
{
  "message": "Validation failed",
  "errors": [
    {
      "field": "title",
      "message": "Title is required"
    }
  ]
}
```

## Testing

The API endpoints were tested using Postman.

Tests covered:

- User registration and login
- Password hashing and verification
- JWT generation and authentication
- Access to protected routes
- Creating, retrieving, updating and deleting notes
- Valid and invalid request bodies
- Missing required fields
- Invalid email addresses
- Password length validation

## What I Learned

Building this project helped me understand how REST APIs handle requests and responses, how passwords are securely hashed, how JWT authentication works, and how to organise an Express application using TypeScript.

I also learned how to use Zod for schema-based validation, create reusable validation middleware, handle invalid request data and ensure that data is validated before reaching the controllers.