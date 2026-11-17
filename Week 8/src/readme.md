# Notes API (TypeScript)

A simple REST API built with Express and TypeScript. I originally built it with JavaScript and later refactored it into TypeScript to improve my understanding of backend development and project structure.

## Features
- Get all notes
- Get a note by ID
- Create a note
- Update a note
- Delete a note

Notes are stored in a JSON file.

## Technologies
- Node.js
- Express.js
- TypeScript
- Postman

## Project Structure

- `config` – File path configuration
- `types` – Note interface
- `services` – Reading and saving notes
- `controllers` – Request handling
- `routes` – API endpoints
- `middleware` – Error handling
- `app.ts` – Express configuration
- `server.ts` – Starts the server

## Getting Started

```bash
npm install
npm run dev
```

The server runs on port `3000`.
