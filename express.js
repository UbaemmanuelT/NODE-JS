import express from "express";

// create express app
const app = express();

// listen for request
app.listen(3000)

// Routing 
app.get('/', (req, res) =>{
    res.send('<p>Welcome to Express JS Home page</p>')
})
app.get('/about', (req, res) =>{
    res.send('<p> About page</p>')
})

