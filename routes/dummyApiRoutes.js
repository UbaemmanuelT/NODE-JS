import express from "express";
import users from "../userData/users.js";
import validateUserInput from "../middleware/validateUsers.js";
const router = express.Router();

// API route
router.get("/users", (req, res) => {
  // res.json() automatically sets content-type to application/json
  res.json(users);
});

// Get route for a specific user using route parameters
router.get("/users/:id", (req, res) => {
  // req.params gives access to route parameters
  const userId = parseInt(req.params.id);
  const eachUser = users.find((user) => user.id === userId);

  if (eachUser) {
    res.json(eachUser);
    console.log(`GET request to /api/users/${userId} received`);
  } else {
    res.status(404).send("User not found");
    console.log(`GET request to /api/users/${userId} not found`);
  }
});

// Query String
router.get("/search", (req, res) => {
  const { name } = req.query;
  if (!name) {
    return res.status(400).json({ error: "Name query parameter is required" });
  }
  const nameResult = users.filter((user) => {
    return user.name.toLowerCase().includes(name.toLowerCase());
  });
  res.json(nameResult);
});

// POST request (create new user)
router.post("/contact", validateUserInput, (req, res) => {
  const { name, email, message } = req.body;
  // res.send(`Received an inbox from ${name} with a message: ${message}`);
  const newUser = {
    id: users.length + 1,
    name,
    email,
    message,
  };
  users.push(newUser);
  res.status(201).json(newUser);
});

// PUT (update a user by ID)
router.put("/users/:id", validateUserInput, (req, res) => {
  const userId = parseInt(req.params.id);
  const { id, name, email, message } = req.body;
  const index = users.findIndex((u) => u.id === id);
  if (index !== -1) {
    users[index] = { id, name, email, message };
    res.json(users[index]);
  } else {
    res.status(404).send("user not found");
  }
});

// DELETE a user by ID
router.delete("/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = users.findIndex((u) => u.id === id);
  // condition
  if (index !== -1) {
    users.slice(index, 1);
    res.send("users deleted successfully");
  } else {
    res.status(400).send("User not found");
  }
});

export default router;
