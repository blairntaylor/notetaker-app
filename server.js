//require dependencies
const express = require("express");
const fs = require("fs");
const path = require("path");
// npm package for unique name generator
// $ npm i -S unique-names-generator
//initialize express
const app = express();
const PORT = process.env.PORT || 3000;
// access to data to be parsed
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//front end to have access to the public folder for the notes.html
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/db"));

//note variables
let notes;

//API routes//
// use fs file to be persistent data
// get requests

app.get("/api/notes", function (req, res) {
  // read the db.json file and return all saved notes
  let pt = path.join(__dirname, "./db/db.json");
  fs.readFile(path.join(__dirname, "./db/db.json"), function (err, data) {
    res.json(JSON.parse(data));
    if (err) throw err;
  });
});
///post requests
app.post("/api/notes", function (req, res) {
  var newNote = req.body;
  //read json file and parse into data//
  fs.readFile("./db/db.json", function (err, data) {
    if (err) throw err;
    var notes = JSON.parse(data);
    //push into db.json as new note
    notes.push(newNote);
    //create id for each note
    notes.forEach(function (item, i) {
      item.id = 1 + i;
    });
    //change note back into string
    fs.writeFile("./db/db.json", JSON.stringify(notes), function (err) {
      if (err) throw err;
    });
  });
  //response is new note
  res.json(newNote);
});

// HTML routes //
//GET /notes to retunn the notes.html
//GET * to return the index.html
app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "./public/notes.html"))
);
//catch all so index.html goes to the bottom to make sure other pages load
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "./public/index.html"))
);

function updateDB() {
  fs.writeFile("./db/db.json", JSON.stringify(notes, "\t"), (err) => {
    if (err) throw err;
    return true;
  });
}

//start and listen to server
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
