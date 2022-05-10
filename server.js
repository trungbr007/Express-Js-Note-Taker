const express =require('express');
const { get } = require('express/lib/response');
const path =require('path');
const data =require ('./Develop/db/db.json');
const PORT =process.env.PORT || 3001;

//Set up Server
const app =express();



// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json())
//Set static folder, it will have acces to all the files in the public by changing the endpoints
app.use(express.static(path.join(__dirname,'./Develop/public')));

//Create routes/get

app.get("/api/notes/", (req,res) =>{
    res.json(data);
});

//Create post route
app.post("/api/notes/", (req,res)=>{
    data.push(req.body);
    res.json(true);
})

//Delete Route 
// app.delete()

//Routes to serve .html files

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './Develop/public/index.html'));
  });

  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './Develop/public/notes.html'));
  });

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './Develop/public/index.html'));
  });


  //Listening
app.listen(PORT,()=>{
    console.log(`Server started on port ${PORT}`);
})