import { readUsers, addUser } from "./exportCrud.js";
const users = await readUsers();
console.log('current users:', users);
// await addUser({id: 11, name:"Chucks"});