import express from "express";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

// create express app
const app = express();
// middleware to parse JSON (best for POST request)
app.use(express.json());
// middleware required to handle form data
app.use(express.urlencoded({ extended: true }));

// listen for request
app.listen(3000);

const fileName = fileURLToPath(import.meta.url);
const dirName = dirname(fileName);

// dummy api data
const users = [
  { id: 1, name: "Alice", email: "alice@example.com" },
  { id: 2, name: "Bob", email: "bob@example.com" },
  { id: 3, name: "Charlie", email: "charlie@example.com" },
];

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
  if (!name){
    return res.status(400).json({error: "Name query parameter is required"})
  }
  const nameResult = users.filter(user => {
    return user.name.toLowerCase().includes(name.toLowerCase());
  })
  res.json(nameResult)
});

// POST request (create new user)
app.post("/contact", (req, res) => {
  const { name, email, message } = req.body;
  // res.send(`Received an inbox from ${name} with a message: ${message}`);
  const newUser = {
    id: users.length + 1,
    name,
    email,
    message
  }
  users.push(newUser);
  res.status(201).json(newUser);
});

// PUT (update a user by ID)
app.put("/api/users/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const {id, name, email, message} = req.body;
  const index = users.findIndex((u) => u.id === id);
  if (index !== -1) {
    users[index] = {id, name, email, message};
    res.json(users[index]);
  } else {
    res.status(404).send("user not found");
  }
})
