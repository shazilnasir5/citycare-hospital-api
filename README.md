
# CityCare Hospital - Authentication System

A simple authentication system built for CityCare Hospital using Node.js, TypeScript, Express, and SQLite.

## Project Overview

This project provides user registration and login functionality with secure password hashing and JWT-based authentication.

It also includes a simple HTML, CSS, and JavaScript frontend connected to the backend API.

## Technologies Used

- Node.js
- TypeScript
- Express.js
- SQLite
- better-sqlite3
- bcryptjs
- jsonwebtoken
- HTML
- CSS
- JavaScript

## Features

- User registration
- User login
- Password hashing using bcrypt
- JWT token generation
- JWT authentication middleware
- Protected user profile endpoint
- SQLite database for persistent storage
- Input validation
- Duplicate email detection
- Login error handling
- Simple responsive frontend

## Project Structure

```text
auth-system/
│
├── public/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── src/
│   ├── config/
│   │   └── database.ts
│   │
│   ├── middleware/
│   │   └── authMiddleware.ts
│   │
│   ├── routes/
│   │   └── authRoutes.ts
│   │
│   └── server.ts
│
├── .env
├── .gitignore
├── package.json
├── package-lock.json
└── tsconfig.json
```

## Installation

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

### 2. Open the project folder

```bash
cd auth-system
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Create a `.env` file in the project root:

```env
PORT=3000
JWT_SECRET=your_secure_secret_key
JWT_EXPIRES_IN=1h
```

Use your own secure JWT secret.

### 5. Start the server

```bash
npx tsx src/server.ts
```

The server will run at:

http://localhost:3000

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | /api/auth/register | Register a new user |
| POST | /api/auth/login | Login user |
| GET | /api/auth/profile | Get authenticated user profile |

## API Testing

The API endpoints were tested using Postman.

- Registration returns HTTP 201.
- Successful login returns HTTP 200 and a JWT token.
- Duplicate email registration is rejected.
- Invalid login credentials are rejected.
- Protected profile endpoint requires a valid JWT token.

## Security

- Passwords are hashed using bcrypt.
- JWT tokens are used for authentication.
- Protected routes verify JWT tokens.
- Environment variables are stored in `.env`.
- Sensitive files are excluded using `.gitignore`.

## Project Status

Task 1 - Project Bootstrap and User Authentication.

Developed as part of the Full Stack Development internship task at Ezitech.
