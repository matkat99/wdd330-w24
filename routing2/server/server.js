// server.js
require("dotenv").config();
const express = require("express");
const { auth } = require("express-oauth2-jwt-bearer");
const cors = require("cors");

const app = express();

app.use(cors());

// Auth0 configuration
const authConfig = {
  domain: process.env.AUTH0_DOMAIN,
  clientId: process.env.AUTH0_CLIENT_ID,
  audience: process.env.AUTH0_AUDIENCE
};

// Middleware to validate the JWT using Auth0
const checkJwt = auth({
  audience: authConfig.audience,
  issuerBaseURL: `https://${authConfig.domain}`
});

const tasks = [];
// Public route
app.get("/api/public", (req, res) => {
  res.json({ message: "Public API route" });
});

// Protected route
app.get("/api/private", checkJwt, (req, res) => {
  res.json({ message: "Private API route" });
});

app.get("/api/tasks", checkJwt, (req, res) => {
  res.json({ tasks });
});

app.post("/api/tasks", checkJwt, (req, res) => {
  const task = req.body;
  tasks.push({ id: Date.now(), task: task.text, done: false });

  res.json({ message: "Task saved" });
});

// Error handling
app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({ error: "Unauthorized", token: req.headers });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
