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

// UPDATE USERS
export async function updateUser(id, updatedData){
  const user = await readUsers();
  const index = user.findIndex(user => user.id === id);
  if(index !== -1){
    user[index] = {...user[index], ...updatedData}
    await writeFileData(filePath, JSON.stringify(user, null, 2));
    console.log('user updated:', user[index])
  } else{
    console.log('user not found');
  }
}
// DELETE USERS
export async function deleteUser(id){
  const user = await readUsers();
  const filter = user.filter(user => user.id !== id);
  await writeFileData(filePath, JSON.stringify(filter, null, 2));
  console.log(`The user with the ID ${id} has been deleted`);
} 