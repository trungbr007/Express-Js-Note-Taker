const express =require('express');
const fs =require ('fs');
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

//Validate notes function
function validateNote(note) {
    if (!note.title|| typeof note.title !== 'string') {
      return false;
    }
    if (!note.text || typeof note.text !== 'string') {
      return false;
    }
    return true;
  }

//Create new Notes
function createNewNotes(body, notesArray) {
    const note = body;
    notesArray.push(note);
    fs.writeFileSync(
      path.join(__dirname, './Develop/db/db.json'),
      JSON.stringify({ note: notesArray }, null, 2)
    );
    return note;
  }

//Create routes/get

app.get('/api/notes', (req, res) => {
    res.json(data);
  });

  
  app.get('/api/notes/:id', (req, res) => {
    const result = findById(req.params.id, data);
    if (result) {
      res.json(result);
    } else {
      res.send(404);
    }
  });

//Create post route
app.post('/api/notes',(req,res)=>{
    //set id based on what the next index of the array will be
    req.body.id = data.note.length.toString();

    if (!validateNote(req.body)) {
        res.status(400).send('The notes is not properly formatted.');
      } else {
        const note = createNewNotes(req.body,data.note);
        res.json(note);
      }
    });
    

  
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