// let greeting = "Hello, world! Welcome to Node.js";
// console.log(greeting);
// let classGreeting = "Hello class! Welcome to Node.js Class";
// console.log(classGreeting);

// GLOBAL OBJECTS
// console.log(__dirname);
// console.log(__filename);
// console.log(global)
// console.log(process.argv);
// console.log(process.env);
// console.log(process.cwd());
// console.log(process.pid);
// console.log(process.platform);
// process.exit()
// process.exit(0)
// process.exit(1)
// setTimeout(() => {
//     console.log('exit in 3seconds');
//     // clearInterval(interval); //clears interval after 3seconds
//     process.exit(); //manually stops app successfully
// },3000);
// const interval = setInterval(() => {
//     console.log('Hello world')
// },1000)

// NODE MODULES
const fromMyStudentsFile = require("./students");
// console.log(fromMyStudentsFile);

// destructure method
const { studentsAge, studentsBirth } = require("./students");
// console.log(studentsAge);
// console.log(studentsBirth);

// File System
// import file system (fs)
const fs = require("fs");
// READ FILES
fs.readFile("./docs/index.txt", (err, data) => {
  if (err) {
    // console.log(err);
  }
  // console.log(data); //returns a package known as Buffer
  // console.log(data.toString());
});
console.log("Hey i am outside fs");

// WRITE FILES
fs.writeFile("./docs/file.txt", "Hello Node Js!", (err) => {
  if (err) {
    // console.log(err);
  }
  // console.log('file written');
});
fs.writeFile("./docs/file2.txt", "Hello from another txt file", (err) => {
  if (err) {
    // console.log(err);
  }
  // console.log('Another file written');
});

// MAKE DIRECTORY
// if (!fs.existsSync("./pages")) {
//     fs.mkdir("./pages", (err) => {
//     if (err) {
//       console.log(err);
//     }
//     console.log("Folder created successfully!");
//   });
// } else {
//   fs.rmdir("./pages", (err) => {
//     if (err) {
//       console.log(err);
//     }
//     console.log("Folder removed successfully!");
//   });
// }

// DELETE FILES
if (fs.existsSync("./docs/file2.txt")) {
  fs.unlink("./docs/file2.txt", (err) => {
    if (err) {
    //   console.log(err);
    }
    // console.log("file deleted successfully");
  });
};

// PATH
const path = require('path');
// console.log(path.basename(__dirname));
// console.log(path.basename(__filename));
// console.log(path.extname(__dirname));
// console.log(path.extname(__filename));
// console.log(path.parse(__filename));
// console.log(path.parse(__dirname));

