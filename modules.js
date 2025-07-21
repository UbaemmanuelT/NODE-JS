// HTTP
// import http from 'http';
// const server = http.createServer((req, res) => {
//     console.log('Request has been made from the browser')
//     console.log(req.url, req.method);
//     // console.log(req.headers)
//     // set header content type
//     res.setHeader('Content-Type', 'text/plain');
//     res.write('Hello! this is a response from the server!');
//     res.end();
// })
// server.listen(3000, 'localhost', () => {
//     console.log('server is running on localhost:3000');
// })

// URL MODULE
import { URL } from "url";
const jumia = new URL(
  "https://www.jumia.com.ng/apple-iphone-16-8gb-256gb-5g-ultramarine-379768667.html"
);
// console.log(jumia.hostname);
// console.log(jumia.protocol);
// console.log(jumia.pathname);
// console.log(jumia.searchParams);
// console.log(jumia.href);

// Events
import { EventEmitter } from "events";
// create an instance for EventEmitter
const myEventEmitter = new EventEmitter();
// listen for an event
myEventEmitter.on("message", (data) => {
  // console.log("Received Message:", data);
});
// Error Handling in EventEmitter
myEventEmitter.on("error", (error) => {
  // console.error("Error Occurred:", error);
});

// trigger the event
// myEventEmitter.emit("message", "Hello from my Event");
// myEventEmitter.emit("error", new Error("Something went wrong"));

// Example 2
// define custom class that extend EventEmitter
class Notifier extends EventEmitter {
  constructor() {
    super();
  }

  sendMessage(msg) {
    this.emit("message", msg);
  }
}
const notification = new Notifier();
notification.on("message", (data) => {
  // console.log("Messaged Received:", data);
});

// notification.sendMessage('Hello you have a message from Node js');

// STREAMS
// Readable stream
import fs from "fs";
const readStream = fs.createReadStream("./docs/file.txt", { encoding: "utf8" });
readStream.on("data", (dataChunk) => {
  // console.log("Received dataChunk:", dataChunk);
});
readStream.on("end", () => {
  console.log("Finished Reading");
});

// Writable Stream
const writeStream = fs.createWriteStream("./docs/output.txt");
// pipe
// best used for streaming
// readStream.pipe(writeStream);

// chalk practice
import chalk from "chalk";
console.log(chalk.blue.bold.bgWhite("Success"));
console.log(chalk.red.bold.italic("Error"));
