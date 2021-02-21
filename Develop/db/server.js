const express = require("express");
const fs = require("fs");
// npm package for unique name generator
// $ npm i -S unique-names-generator
const app = express();
const PORT = 3000;
// HTML routes
//GET /notes to retunr the notes.html
//GET * to return the index.html
const handleRequest = (req, res) => {
  const path = requ.url;
  switch (path) {
    case "GET/notes":
      return displayNotes(res);
    case "GET *":
      return displayIndex(res);
    default:
      return display404(path, res);
  }
};

//API routes
//GET /api/notes to read the db.json file and return all saved notes
//POST /api/notes to receive a new note, save, and add it to db.json
