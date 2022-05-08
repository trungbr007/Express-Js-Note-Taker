const database = require('./Develop/db/db.json');

//Setting up Server
const express = require('express');
const app = express();

app.get('/api/database', (req, res) => {
    res.json(database);
  }); 

app.listen(3001, () => {
    console.log(`API server now on port 3001!`);
  });

  app.get('/api/animals', (req, res) => {
    let results = database;
    console.log(req.query)
    res.json(results);
  });
 