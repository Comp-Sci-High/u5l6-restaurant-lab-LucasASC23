// Task 1: Set up server [1 pt]
const express = require("express");

// Install + import express and mongoose :Completed
const mongoose = require("mongoose");
// Create app instance
const app = express();
// Add middleware to process JSON request body
app.use(express.json())
// Write an async startServer function that
// - connects to MongoDB with your SRV string with a database called restaurant
// - starts the server at port 3000
// - DO NOT ADD ANY ITEMS YET
async function startServer() {
    await mongoose.connect("mongodb+srv://SE12:CSH2026@cluster12.3ffmh.mongodb.net/restaurant?appName=Cluster12")
}

 app.listen(3000, () => {
        console.log("Server is starting")
    })

startServer()

// Task 2: Define the schema + model for a menu item [2 pts]
// It should have name, cost, and at least 2 more attributes of your choice
// You need at least 1 required, 1 unique, and 1 default that makes sense
const menuSchema = new mongoose.Schema({
    name:{type: String, required:true, unique: true},
    cost:{type: Number, required: true, default: 0},
    description:{type: String, required: true, unqiue:true},
    category:{type:String, required:true, default:"Entree"}
    
})


// Task 3: Define the model for the MenuItem [1 pt]
const menuItem = mongoose.model("Menu", menuSchema, "Menus")

// Task 4: Define a POST route at /menu/test that adds a test menu item to the database [2 pt]
// The values for the menu item should be written in the code, NOT in Postman
// Test this route from Postman (make public!) and make sure your test item is in the DB
app.post("/menu/test", async(req,res) => {
    const menu = await new menuItem({
        name: "Bacon Cheese Burger",
        cost:21.99,
        description:"Sandwhich with bacon, cheese, patty, lettuce, tomato, special sauce",
        category:"Lunch"
    }).save()
    res.json(menu)
})


// Task 5: Define a GET route at /menu that returns all menu items as a JSON [2 pt]
app.get("/menu", async(req, res) =>{
    const menu = await menuItem.find({})
    res.json(menu)
})
// Task 6: Define a GET route at /menu/value that returns only menu items that cost less than 5 [2 pts]
app.get("/menu/value", async(req,res) => {
    const menu = await menuItem.find({cost: {$lt:5}})
    res.json(menu)
})


// Task 7: Define a POST route at /menu/new that adds a new menu item [2 pts]
app.post("/menu/new", async(req, res) => {
    const menu = await new menuItem({
        name: req.body.name,
        cost: req.body.cost,
        description: req.body.description,
        category: req.body.category
    }).save()
    res.json(menu)
})
// The values for the menu item should come from the request body
// Test this route from Postman (make public!) and make sure the user's item is in the DB
