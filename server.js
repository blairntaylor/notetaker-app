//require dependencies
const express = require("express");
const fs = require("fs");
const path = require("path");
// npm package for unique name generator
// $ npm i -S unique-names-generator
//initialize express
const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//front end to have access to the public folder for the notes.html
app.use(express.static("public"));
// HTML routes
//GET /notes to retunr the notes.html
//GET * to return the index.html
app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "./public/notes.html"))
);
//catch all so index.html goes to the bottom to make sure other pages load
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "./public/index.html"))
);

//API routes//
//GET /api/notes to read the db.json file and return all saved notes
//POST /api/notes to receive a new note, save, and add it to db.json

//start and listen to server
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
