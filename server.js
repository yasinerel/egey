const express = require('express');
const app = express();
const port = 3000;

const database = require('./database');

app.use(express.json());
app.use(express.static('public'));

// Get all notes
app.get('/api/notes', async (req, res) => {
    const notes = await database.getNotes();
    res.json({ notes });
});

// Add a new note
app.post('/api/notes', async (req, res) => {
    const { note } = req.body;
    await database.addNote(note);
    res.sendStatus(200);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
