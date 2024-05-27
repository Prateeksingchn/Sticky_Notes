document.addEventListener('DOMContentLoaded', () => {
    const notesList = document.getElementById('notes-list');
    const searchInput = document.getElementById('search');
  
    searchInput.addEventListener('input', searchNotes);
  
    displayNotes();
  
    function searchNotes() {
      const searchTerm = searchInput.value.toLowerCase();
      const notes = document.querySelectorAll('#notes-list li');
      notes.forEach(note => {
        const noteText = note.querySelector('span').innerText.toLowerCase();
        if (noteText.includes(searchTerm)) {
          note.style.display = 'flex';
        } else {
          note.style.display = 'none';
        }
      });
    }
  
    window.popup = function() {
      const popupContainer = document.createElement('div');
      popupContainer.className = 'fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75';
      popupContainer.innerHTML = `
        <div id="popupContainer" class="bg-white rounded-lg p-6 w-96">
          <h1 class="text-xl font-bold mb-4">New Note</h1>
          <textarea id="note-text" placeholder="Enter your note..." class="w-full h-32 p-2 border rounded mb-4"></textarea>
          <select id="note-color" class="w-full p-2 border rounded mb-4">
            <option value="bg-yellow-100">Yellow</option>
            <option value="bg-green-100">Green</option>
            <option value="bg-blue-100">Blue</option>
            <option value="bg-red-100">Red</option>
          </select>
          <div id="btn-container" class="flex justify-end">
            <button id="submitBtn" onclick="createNote()" class="bg-green-500 text-white px-4 py-2 rounded mr-2">Create Note</button>
            <button id="closeBtn" onclick="closePopup()" class="bg-gray-500 text-white px-4 py-2 rounded">Close</button>
          </div>
        </div>
      `;
      document.body.appendChild(popupContainer);
    }
  
    window.closePopup = function() {
      const popupContainer = document.querySelector('.fixed');
      if (popupContainer) {
        popupContainer.remove();
      }
    }
  
    window.createNote = function() {
      const noteText = document.getElementById('note-text').value;
      const noteColor = document.getElementById('note-color').value;
      if (noteText.trim() !== '') {
        const note = {
          id: new Date().getTime(),
          text: noteText,
          color: noteColor
        };
  
        const existingNotes = JSON.parse(localStorage.getItem('notes')) || [];
        existingNotes.push(note);
  
        localStorage.setItem('notes', JSON.stringify(existingNotes));
  
        closePopup();
        displayNotes();
      }
    }
  
    window.editNote = function(noteId) {
      const notes = JSON.parse(localStorage.getItem('notes')) || [];
      const noteToEdit = notes.find(note => note.id == noteId);
      if (noteToEdit) {
        const popupContainer = document.createElement('div');
        popupContainer.className = 'fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75';
        popupContainer.innerHTML = `
          <div id="editing-container" class="bg-white rounded-2xl p-6 w-96">
            <h1 class="text-xl font-bold mb-4">Edit Note</h1>
            <textarea id="note-text" class="w-full h-32 p-2 border rounded mb-4">${noteToEdit.text}</textarea>
            <select id="note-color" class="w-full p-2 border rounded mb-4">
              <option value="bg-yellow-100" ${noteToEdit.color === 'bg-yellow-100' ? 'selected' : ''}>Yellow</option>
              <option value="bg-green-100" ${noteToEdit.color === 'bg-green-100' ? 'selected' : ''}>Green</option>
              <option value="bg-blue-100" ${noteToEdit.color === 'bg-blue-100' ? 'selected' : ''}>Blue</option>
              <option value="bg-red-100" ${noteToEdit.color === 'bg-red-100' ? 'selected' : ''}>Red</option>
            </select>
            <div id="btn-container" class="flex justify-end">
              <button id="submitBtn" onclick="updateNote(${noteId})" class="bg-green-500 text-white p-2 rounded mr-2">Save</button>
              <button id="closeBtn" onclick="closePopup()" class="bg-gray-500 text-white p-2 rounded">Cancel</button>
            </div>
          </div>
        `;
        document.body.appendChild(popupContainer);
      }
    }
  
    window.updateNote = function(noteId) {
      const noteText = document.getElementById('note-text').value;
      const noteColor = document.getElementById('note-color').value;
      const notes = JSON.parse(localStorage.getItem('notes')) || [];
      const noteIndex = notes.findIndex(note => note.id == noteId);
      if (noteIndex >= 0) {
        notes[noteIndex].text = noteText;
        notes[noteIndex].color = noteColor;
        localStorage.setItem('notes', JSON.stringify(notes));
        closePopup();
        displayNotes();
      }
    }
  
    window.deleteNote = function(noteId) {
      let notes = JSON.parse(localStorage.getItem('notes')) || [];
      notes = notes.filter(note => note.id !== noteId);
      localStorage.setItem('notes', JSON.stringify(notes));
      displayNotes();
    }
  
    function displayNotes() {
      const notes = JSON.parse(localStorage.getItem('notes')) || [];
      notesList.innerHTML = '';
      notes.forEach(note => {
        const listItem = document.createElement('li');
        listItem.className = `p-4 rounded shadow-lg m-2 flex flex-col`;
        listItem.classList.add(note.color); // Add the color class separately
        listItem.innerHTML = `
          <span class="flex-grow">${note.text}</span>
          <div id="noteBtns-container" class="flex justify-end mt-2">
            <button id="editBtn" onclick="editNote(${note.id})" class="bg-blue-500 text-white p-1 rounded mr-1"><i class="fa-solid fa-pen"></i></button>
            <button id="deleteBtn" onclick="deleteNote(${note.id})" class="bg-red-500 text-white p-1 rounded"><i class="fa-solid fa-trash"></i></button>
          </div>
        `;
        notesList.appendChild(listItem);
      });
    }
  });
