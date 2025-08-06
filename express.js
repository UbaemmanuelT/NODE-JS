import express from "express";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

// create express app
const app = express();
// middleware to parse JSON (best for POST request)
app.use(express.json());
// middleware required to handle form data
app.use(express.urlencoded({ extended: true }));

const fileName = fileURLToPath(import.meta.url);
const dirName = dirname(fileName);

// dummy api data
const users = [
  {
    id: 1,
    name: "Alice",
    email: "alice@example.com",
    message: "Hey i am Alice",
  },
  { id: 2, name: "Bob", email: "bob@example.com", message: "Hey i am Bob" },
  {
    id: 3,
    name: "Charlie",
    email: "charlie@example.com",
    message: "Hey i am Charlie",
  },
];

// Custom logging middleware
app.use((req, res, next) => {
  const nigeriaTime = new Date().toLocaleString("en-Ng", {
    timeZone: "Africa/Lagos",
    hours12: false,
  });

  console.log(`[${nigeriaTime}] ${req.method} ${req.url}`);
  next();
});

// Validation Middleware
function validateUserInput(req, res, next) {
  const {name, email, message} = req.body;
  // validate name
  if (!name || typeof name !== "string" || name.length < 2) {
    return res.status(400).json({
      error: "Name is required and must be at least 2 characters long",
    });
  }
  // validate email
  if (!email || !email.includes("@")) {
    return res.status(400).json({
      error: " A valid email is required",
    });
  }
  // validate message
  if (message && typeof message !== "string") {
    return res.status(400).json({
      error: "Message must be a string",
    });
  }
  next();
}

// Routing
// GET request
app.get("/", (req, res) => {
  // sending raw html as a response
  // res.send('<p>Welcome to Express JS Home page</p>')
  // sending html file as a response
  res.sendFile(join(dirName, "public", "index.html"));
});
// About route
app.get("/about", (req, res) => {
  // sending raw html as a response
  // res.send('<p> Welcome to About page</p>')
  // sending html file as a response
  res.sendFile(join(dirName, "public", "about.html"));
});
// Contact route
app.get("/contact", (req, res) => {
  res.sendFile(join(dirName, "public", "contact.html"));
});
// API route
app.get("/api/users", (req, res) => {
  // res.json() automatically sets content-type to application/json
  res.json(users);
});

// Get route for a specific user using route parameters
app.get("/api/users/:id", (req, res) => {
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
app.get("/search", (req, res) => {
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
app.post("/contact", validateUserInput, (req, res) => {
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
app.put("/api/users/:id", validateUserInput, (req, res) => {
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
app.delete("/api/users/:id", (req, res) => {
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

// listen for request
app.listen(3000, () => {
  console.log("Server is up");
});
