import express from "express";
import pkg from "pg";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import cors from "cors";
import e from "express";
import jwt from "jsonwebtoken";

dotenv.config({ path: "../.env" });

const { Pool } = pkg;
const pool = new Pool({
  host: process.env.PGHOST || "localhost",
  port: process.env.PGPORT || 5432,
  user: process.env.PGUSER || "admin",
  password: process.env.PGPASSWORD || "invpassword",
  database: process.env.PGDATABASE || "inventorydb",
});

const app = express();
app.use(express.json());
app.use(cors());

// GET all users
app.get("/api/users", async (req, res) => {
  try {
    const { rows } = await pool.query(
      "SELECT id, email, first_name, last_name, created_at FROM users;"
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

// POST a new user
app.post("/api/users", async (req, res) => {
  const { email, password, first_name, last_name } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const { rows } = await pool.query(
      `INSERT INTO users(email, password, first_name, last_name)
       VALUES ($1, $2, $3, $4)
       RETURNING id, email, first_name, last_name, created_at;`,
      [email, hashedPassword, first_name, last_name]
    );
    res.status(201).json(rows[0]); // Return the newly created user
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create user" });
  }
});

// POST login endpoint
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const { rows } = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    const user = rows[0];

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ error: "Invalid password" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email }, // payload
      process.env.JWT_SECRET, // secret key
      { expiresIn: "1d" } // optional expiration
    );
    // Only send non-sensitive user info
    const safeUser = {
      id: user.id,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      created_at: user.created_at,
    };
    res.json({ token, user: safeUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to login user" });
  }
});

//get user by id
app.get("/api/users/:id", async (req, res) => {
  const userId = parseInt(req.params.id);
  try {
    const { rows } = await pool.query(
      "SELECT id, email, first_name, last_name, created_at FROM users WHERE id = $1",
      [userId]
    );
    if (rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch user" });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`API server listening on http://localhost:${PORT}`);
});
