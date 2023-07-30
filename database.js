const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('notes.db');

// Create the 'notes' table if it doesn't exist
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS notes (
            id INTEGER PRIMARY KEY,
            note TEXT
        )
    `);
});

// Function to get all notes
function getNotes() {
    return new Promise((resolve, reject) => {
        db.all('SELECT * FROM notes', (err, rows) => {
            if (err) reject(err);
            resolve(rows.map(row => row.note));
        });
    });
}

// Function to add a new note
function addNote(note) {
    return new Promise((resolve, reject) => {
        db.run('INSERT INTO notes (note) VALUES (?)', [note], (err) => {
            if (err) reject(err);
            resolve();
        });
    });
}

module.exports = {
    getNotes,
    addNote,
};
