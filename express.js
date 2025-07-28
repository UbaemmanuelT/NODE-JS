import express from "express";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

// create express app
const app = express();
// middleware to parse JSON (best for POST request)
app.use(express.json());

// listen for request
app.listen(3000);

const fileName = fileURLToPath(import.meta.url);
const dirName = dirname(fileName);

// Routing
// GET request
app.get("/", (req, res) => {
  // sending raw html as a response
  // res.send('<p>Welcome to Express JS Home page</p>')
  // sending html file as a response
  res.sendFile(join(dirName, "public", "index.html"));
});
app.get("/about", (req, res) => {
  // sending raw html as a response
  // res.send('<p> Welcome to About page</p>')
  // sending html file as a response
  res.sendFile(join(dirName, "public", "about.html"));
});
app.get("/contact", (req, res) => {});
// POST request
app.post("/contact", (req, res) => {
  const { name, message, name1, message2 } = req.body;
  res.send(
    `Received an inbox from ${name} with a message: ${message}........you have a text-message from ${name1} with the details: ${message2}`
  );
});
