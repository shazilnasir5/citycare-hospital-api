# CityCare Hospital – Authentication System

A simple authentication system developed for CityCare Hospital as part of the Ezitech Full Stack Development internship task.

The project provides user registration, login, and protected profile access using Node.js, TypeScript, Express, and SQLite.

## Project Overview

This application allows users to create an account and log in securely. It uses bcrypt for password hashing and JSON Web Tokens (JWT) to authenticate users when accessing protected routes.

A simple frontend built with HTML, CSS, and JavaScript is also included to interact with the backend API.

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

- User registration and login
- Password hashing with bcrypt
- JWT-based authentication
- Protected user profile endpoint
- SQLite database for storing user information
- Input validation
- Duplicate email detection
- Proper HTTP status codes and error handling
- Simple responsive frontend
- Login and registration forms

## Project Structure

```text
citycare-hospital-api/
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

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/shazilnasir5/citycare-hospital-api.git
```

### 2. Open the Project Folder

```bash
cd citycare-hospital-api
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env` file in the root directory and add:

```env
PORT=3000
JWT_SECRET=your_secure_secret_key
JWT_EXPIRES_IN=1h
```

Replace `your_secure_secret_key` with your own secure secret.

Keep the `.env` file private. It is excluded from Git using `.gitignore`.

### 5. Start the Server

```bash
npx tsx src/server.ts
```

Once the server starts, open:

http://localhost:3000

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Log in an existing user |
| GET | `/api/auth/profile` | Retrieve the authenticated user's profile |

### Authentication

The profile endpoint is protected by JWT middleware.

To access it, include the token in the request header:

```text
Authorization: Bearer YOUR_JWT_TOKEN
```

## API Testing

The API was tested using Postman.

The following functionality was checked:

- Registration successfully creates a user and returns HTTP 201.
- Successful login returns HTTP 200 with a JWT token.
- Duplicate email registration returns HTTP 409.
- Invalid login credentials return an error response.
- The profile endpoint requires a valid JWT token.

## Security

- Passwords are hashed before being stored in SQLite.
- JWT tokens are used to authenticate protected requests.
- Protected routes verify the provided token.
- Input validation is performed on registration and login.
- Duplicate email addresses are prevented using a database constraint.
- Environment variables and database files are excluded from Git.

## Project Status

**Task 1 – Project Bootstrap and User Authentication**

Completed as part of the Full Stack Development internship at Ezitech.

GitHub Repository:  
https://github.com/shazilnasir5/citycare-hospital-api