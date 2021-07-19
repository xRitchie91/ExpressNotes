const express = require('express')
const PORT = process.env.PORT || 3001;
const app = express()
const fs = require('fs')
const path = require('path')
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(express.json())
const {notes} = require('./db/db')


const saveNote = newNote => {
    console.log(newNote)
    notes.push(newNote);
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify({notes}, null, 2)
    );
    return newNote
}

const findId = (id, notesArr) => {
    id = Number(id)
    const result = notesArr.filter(note => note.id === id)
    return result   
}

const deleteNote = (id, notes) => {
    id = Number(id)
    const deletingNote = notes.filter(note => note.id === id)[0]
    const index = notes.indexOf(deletingNote)
    notes.splice(index, 1)
    fs.writeFileSync(path.join(__dirname, './db/db.json'), JSON.stringify({notes}), null, 2)
    return notes
}

//delete a note
app.delete('/api/notes/:id', (req, res) => {
    const noteID = req.params.id;
    const findNote = findId(noteID, notes);
    if (findNote) {
      const newNote = deleteNote(noteID, notes);
      res.json(newNote);
    } 
    else {
      res.sendStatus(404);
    }
})
//post a new note
app.post('/api/notes', (req, res) => {
    req.body.id = Number((notes.length).toString())
    const newNote = req.body
    saveNote(newNote)
    res.json(newNote)
});
//landing page display
app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
});
//notes display, add new note page
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'))
});
//list all notes in json
app.get('/api/notes', (req, res) => {
    res.json(notes)
})
//sort by id
app.get('/notes/:id', (req,res) => {
    console.log(req.params.id)
    const result = findId(req.params.id, notes)
    console.log(result)
    if(result){
        res.json(result)
    } else {
        res.sendStatus(404)
    }
})
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}`);
})