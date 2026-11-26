
import "dotenv/config";
import express from "express";
import path from "path";
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
