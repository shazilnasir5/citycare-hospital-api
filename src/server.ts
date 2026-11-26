
import "dotenv/config";
import express from "express";
import path from "path";
import { db } from "./config/database";
import authRoutes from "./routes/authRoutes";

const app = express();

const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Serve frontend static files
app.use(express.static(path.join(__dirname, "../public")));

// Home route - Open frontend
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "index.html"));
});

// Database test route
app.get("/test-db", (req, res) => {
  try {
    const result = db.prepare(
      "SELECT name FROM sqlite_master WHERE type = 'table' AND name = 'users'"
    ).get();

    res.json({
      success: true,
      message: "SQLite database is working!",
      usersTable: result ? "Available" : "Not found"
    });

  } catch (error) {
    console.error("Database test error:", error);

    res.status(500).json({
      success: false,
      message: "Database test failed"
    });
  }
});

// Authentication API routes
app.use("/api/auth", authRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log("Frontend: http://localhost:3000");
  console.log("Registration API: POST /api/auth/register");
  console.log("Login API: POST /api/auth/login");
  console.log("Profile API: GET /api/auth/profile");
});
