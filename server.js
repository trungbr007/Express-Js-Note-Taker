const database = require('./Develop/db/db.json');
const express = require('express');
//Setting up Server
const PORT = process.env.PORT || 3001;
const app = express();


//API Routes 
app.get('/api/database', (req, res) => {
    res.json(database);
  }); 


  app.get('/api/database', (req, res) => {
    let results = database;
    console.log(req.query)
    res.json(results);
  });
 

  app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
  });
