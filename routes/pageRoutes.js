import express from "express";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const fileName = fileURLToPath(import.meta.url);
const dirName = dirname(fileName);
const pageRouter = express.Router();

// Routing
// GET request
pageRouter.get("/", (req, res) => {
  // sending raw html as a response
  // res.send('<p>Welcome to Express JS Home page</p>')
  // sending html file as a response
  res.sendFile(join(dirName, "../public", "index.html"));
});
// About route
pageRouter.get("/about", (req, res) => {
  // sending raw html as a response
  // res.send('<p> Welcome to About page</p>')
  // sending html file as a response
  res.sendFile(join(dirName, "../public", "about.html"));
});
// Contact route
pageRouter.get("/contact", (req, res) => {
  res.sendFile(join(dirName, "../public", "contact.html"));
});

export default pageRouter;