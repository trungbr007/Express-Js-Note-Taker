const database = require('./Develop/db/db.json');

//Setting up Server
const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();

app.get('/api/database', (req, res) => {
    res.json(database);
  }); 

  app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
  });

  app.get('/api/animals', (req, res) => {
    let results = database;
    console.log(req.query)
    res.json(results);
  });
 