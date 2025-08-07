import express from "express";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
// import from middleware & route folder
import logger from "./middleware/logger.js";
import pageRouter from "./routes/pageRoutes.js";
import router from "./routes/dummyApiRoutes.js";

// create express app
const app = express();

const fileName = fileURLToPath(import.meta.url);
const dirName = dirname(fileName);

// middleware to parse JSON (best for POST request)
app.use(express.json());
// middleware required to handle form data
app.use(express.urlencoded({ extended: true }));
app.use(logger); //for custom middleware

// serve static HTML files from /public
app.use(express.static(join(dirName, "public")));

// Routes
app.use("/", pageRouter); //HTML pages
app.use("/api", router); //Api endpoints

// listen for request
app.listen(3000, () => {
  console.log("Server is up");
});
