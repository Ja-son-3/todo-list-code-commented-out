const express = require('express') //making it possible to use express in this file
const app = express() //setting a constant and assigning it to the instance of express
const MongoClient = require('mongodb').MongoClient //makes it possible to use methods associated with MongoClient and talk to our DB
const PORT = 2121 //setting a constant to set the location where the server will be listening
require('dotenv').config() // allows us to look for variables inside the .env file


let db, //declaring a variable of db without assigning any value
    dbConnectionStr = process.env.DB_STRING, //declaring a variable of dbConnectionStr with a value of our database string in our .env file, because we don't want our connection string to be public
    dbName = 'todo' //declaring a variable of dbName and assigning it a sign value of 'todo' to indicate the name of the database were trying to access in our Mongodb

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true }) //creating a connection to MongoDB, and passing in our connection string
    .then(client => { //waiting for the connection to the db and if successful, passing in all the client information
        console.log(`Connected to ${dbName} Database`) //log to the console a template literal "connected to todo Database"
        db = client.db(dbName) //assigning a value to previously decleared db variable that contains a db client factory method
    }) //closing of .then
    
//middleware
app.set('view engine', 'ejs') //sets ejs as the default render method instead of the traditional html file
app.use(express.static('public')) //sets the location for static assets for the ejs file or html file
app.use(express.urlencoded({ extended: true })) //tells express to decode and encode URLs where the header matches the content. Supports arrays and objects
app.use(express.json()) //parses json content from incoming request


app.get('/',async (request, response)=>{ //starts a GET method when the root('/') route is passed in. Sets up request and response parameters.
    const todoItems = await db.collection('todos').find().toArray() //sets a variable named todoItems and awaits for items in the todos collection in the todo database and puts the items in an array
    const itemsLeft = await db.collection('todos').countDocuments({completed: false}) //sets a variable named itemsLeft and awaits for items in the todos collection in the todo database and counts the amount of items whois value of completed is false
    response.render('index.ejs', { items: todoItems, left: itemsLeft }) //rendering the EJS file and passing through the db items and the count remaining inside of an object
    // db.collection('todos').find().toArray()
    // .then(data => {
    //     db.collection('todos').countDocuments({completed: false})
    //     .then(itemsLeft => {
    //         response.render('index.ejs', { items: data, left: itemsLeft })
    //     })
    // })
    // .catch(error => console.error(error))
}) //closing GET method

app.post('/addTodo', (request, response) => { //starts a POST method when the /addTodo route is passed
    db.collection('todos').insertOne({thing: request.body.todoItem, completed: false}) //inserts a new item into todos collection that takes the name from the input box with a name of todoItem and assigns a value of false to completed
    .then(result => { //if insert is succesful, do this
        console.log('Todo Added') //console log to indicate the action has taken place
        response.redirect('/') //gets rid of the /addTodo route, and redirects back to the homepage
    })
    .catch(error => console.error(error)) //catches any errors 
}) //closing POST method

app.put('/markComplete', (request, response) => { //starts a PUT method to update a value when the /markComplete route is passed through
    db.collection('todos').updateOne({thing: request.body.itemFromJS},{ //look in the db for one item matchnig the naem of the item passed in from the main.js file that was clicked on
        $set: {
            completed: true //set the completed status to true
          }
    },{
        sort: {_id: -1}, //moves item to the bottom of the list
        upsert: false //prevents insertion if item does not already exist
    })
    .then(result => { //starting a then to update actions were successful
        console.log('Marked Complete') //console log completion of the PUT request
        response.json('Marked Complete') // sending a response back to the sendor
    }) //closing .then
    .catch(error => console.error(error)) //catching errors

}) //ending PUT request

app.put('/markUnComplete', (request, response) => { //starts a PUT method when the markUnComplete route is passed in
    db.collection('todos').updateOne({thing: request.body.itemFromJS},{ //look in the db for one item matching the name of the item passed in from the main.js file that was clicked on
        $set: {
            completed: false //sets completed status to false
          }
    },{
        sort: {_id: -1}, //moves item to the bottom of the list
        upsert: false //precents insertion if item does not already exist
    })
    .then(result => { //starts a then if update was successful
        console.log('Marked Complete') //logging successful completion
        response.json('Marked Complete') //sending a response back to the sendor
    }) //closing .then
    .catch(error => console.error(error)) //catching errors

}) //ending PUT request

app.delete('/deleteItem', (request, response) => { //starts a DELETE method when deleteItem route is passed in
    db.collection('todos').deleteOne({thing: request.body.itemFromJS}) //look in the db for one item matching the name of the item passed in from the main.js file that was clicked on
    .then(result => { //starts a then if delete was successful
        console.log('Todo Deleted') //console log successful completion
        response.json('Todo Deleted') //sends a response back to the sender
    }) //closing .then
    .catch(error => console.error(error)) //catches errors

}) //ending DELETE request

app.listen(process.env.PORT || PORT, ()=>{ //starts a LISTEN method that specifies which port to listen to either from the PORT or from the .env file.
    console.log(`Server running on port ${PORT}`) //console logs if connection successful
})