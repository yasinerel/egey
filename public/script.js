const notesList = document.getElementById('notesList');
const noteInput = document.getElementById('noteInput');

// Function to display notes on the page
function showNotes(notes) {
    notesList.innerHTML = '';
    notes.forEach(note => {
        const noteDiv = document.createElement('div');
        noteDiv.textContent = note;
        notesList.appendChild(noteDiv);
    });
}

// Function to fetch notes from the server
async function fetchNotes() {
    const response = await fetch('/api/notes');
    const data = await response.json();
    showNotes(data.notes);
}

// Function to add a new note
async function addNote() {
    const note = noteInput.value;
    if (note.trim() === '') return;

    noteInput.value = '';
    await fetch('/api/notes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ note })
    });

    fetchNotes();
}

fetchNotes();
