const database = require('./Develop/db/db.json');
const express = require('express');
const path = require ("path");
const fs = require ("fs");
const util = require ("util");


//Setting up Server
const PORT = process.env.PORT || 3001;
const app = express();

//Add Middleware So the Application Can Accept POST Data
// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));

// parse incoming JSON data
app.use(express.json());

//Static Middleware
app.use(express.static("./Develop/public"));

//Add the route Get method

app.get('/api/notes', (req, res) => {
  res.json(database);
});

app.post('/api/notes', (req, res) => {
  
  req.body = database.length.toString();

  // add notes to json file and notes array in this function
  const notes = createNewNotes(req.body, database);

  res.json(database);
});

// create function to add notes and write to file
function createNewNotes(body, notesArray) {
  const notes = body;
  notesArray.push(notes);
  fs.writeFileSync(
    path.join(__dirname, './Develop/db/db.json'),
    JSON.stringify({ notes: notesArray }, null, 2)
  );
  return notes;
}

 

  app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
  });

