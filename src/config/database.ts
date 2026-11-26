
import Database from "better-sqlite3";
import path from "path";

// SQLite database file location
const dbPath = path.join(__dirname, "../../database.sqlite");

// Connect to database
const db = new Database(dbPath);

// Enable WAL mode
db.pragma("journal_mode = WAL");

// Create users table
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE COLLATE NOCASE,
    password_hash TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

console.log("SQLite database connected successfully!");
console.log("Users table is ready!");

// Export database
export { db };
