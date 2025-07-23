import { readFile, writeFile } from "fs";
import { promisify } from "util";
const readFileData = promisify(readFile);
const writeFileData = promisify(writeFile);
const filePath = "./data.json";

// READ USERS
export async function readUsers() {
  const data = await readFileData(filePath, "utf8");
  return JSON.parse(data);
}

// ADD USERS
export async function addUser(newUser){
    const user = await readUsers();
    user.push(newUser);
    await writeFileData(filePath, JSON.stringify(user, null, 2));
    console.log('User added:', newUser)
}