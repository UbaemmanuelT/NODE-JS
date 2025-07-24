import { readUsers, addUser, updateUser, deleteUser  } from "./exportCrud.js";
// await deleteUser(12);
const users = await readUsers();
// console.log('current users:', users);
// await addUser({id: 12, name:"HOD"});
// await updateUser(12, {name: 'dave'});