const {database} = require('./Develop/db/db.json');
const express = require('express');
const app = express();

app.get('/api/database', (req, res) => {
    res.json(database);
  }); 

app.listen(3001, () => {
    console.log(`API server now on port 3001!`);
  });

 