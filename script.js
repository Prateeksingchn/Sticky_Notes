document.addEventListener('DOMContentLoaded', () => {
  const notesList = document.getElementById('notes-list');
  const searchInput = document.getElementById('search');

  searchInput.addEventListener('input', searchNotes);

  displayNotes();

  function searchNotes() {
    const searchTerm = searchInput.value.toLowerCase();
    const notes = document.querySelectorAll('#notes-list li');
    notes.forEach(note => {
      const noteText = note.querySelector('.note-text').innerText.toLowerCase();
      if (noteText.includes(searchTerm)) {
        note.style.display = 'flex';
      } else {
        note.style.display = 'none';
      }
    });
  }

  window.popup = function() {
    const popupContainer = document.createElement('div');
    popupContainer.className = 'fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50';
    popupContainer.innerHTML = `
        <div id="popupContainer" class="bg-white rounded-lg p-6 w-[400px] shadow-xl relative">
            <button id="closeBtn" onclick="closePopup()" class="absolute top-0 right-0 m-4 text-gray-500 hover:text-gray-700">
                <i class="fas fa-times"></i>
            </button>
            <div class="flex items-center justify-center mb-4">
                <h1 class="text-xl font-bold flex items-center">
                    <i class="fas fa-sticky-note text-gray-500 mr-2"></i>
                    New Note
                </h1>
            </div>
            <label for="note-text" class="block mb-2 w-full text-start ml-2 text-gray-600">Note Content:</label>
            <textarea id="note-text" placeholder="Enter your note..." class="w-full h-40 p-2 border border-gray-300 rounded-lg mb-4"></textarea>
            <label for="note-color" class="block w-full text-start ml-2 mb-2 text-gray-600">Note Color:</label>
            <div class="w-full flex items-center justify-center">
                <select id="note-color" class="w-full p-3 border border-gray-300 rounded mb-4">
                    <option value="bg-yellow-200">Yellow</option>
                    <option value="bg-green-500">Green</option>
                    <option value="bg-blue-300">Blue</option>
                    <option value="bg-red-300">Red</option>
                    <option value="bg-purple-300">Purple</option>
                    <option value="bg-orange-300">Orange</option>
                    <option value="bg-pink-300">Pink</option>
                    <option value="bg-teal-300">Teal</option>
                    <option value="bg-gray-300">Gray</option>
                    <option value="bg-indigo-300">Indigo</option>
                    <option value="bg-violet-300">Violet</option>
                    <option value="bg-cyan-300">Cyan</option>
                    <option value="bg-lime-300">Lime</option>
                </select>
                <div id="btn-container" class="w-1/2 flex justify-end">
                    <button id="submitBtn" onclick="createNote()" class="bg-blue-500 text-white px-4 py-2 rounded mr-2 hover:bg-blue-600">Create Note</button>
                    <button id="closeBtn" onclick="closePopup()" class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">Cancel</button>
                </div>
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
      const now = new Date();
      const formattedDate = now.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
      const formattedTime = now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });

      const note = {
        id: new Date().getTime(),
        text: noteText,
        color: noteColor,
        date: formattedDate,
        time: formattedTime
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
          <textarea id="note-text" class="w-full h-32 p-2 border rounded-xl mb-4">${noteToEdit.text}</textarea>
          <select id="note-color" class="w-full p-2 border rounded mb-4">
            <option value="bg-yellow-200" ${noteToEdit.color === 'bg-yellow-200' ? 'selected' : ''}>Yellow</option>
            <option value="bg-green-500" ${noteToEdit.color === 'bg-green-500' ? 'selected' : ''}>Green</option>
            <option value="bg-blue-300" ${noteToEdit.color === 'bg-blue-300' ? 'selected' : ''}>Blue</option>
            <option value="bg-red-300" ${noteToEdit.color === 'bg-red-500' ? 'selected' : ''}>Red</option>
            <option value="bg-purple-300" ${noteToEdit.color === 'bg-purple-300' ? 'selected' : ''}>Purple</option>
            <option value="bg-orange-300" ${noteToEdit.color === 'bg-orange-300' ? 'selected' : ''}>Orange</option>
            <option value="bg-pink-300" ${noteToEdit.color === 'bg-pink-300' ? 'selected' : ''}>Pink</option>
            <option value="bg-teal-300" ${noteToEdit.color === 'bg-teal-300' ? 'selected' : ''}>Teal</option>
            <option value="bg-gray-300" ${noteToEdit.color === 'bg-gray-300' ? 'selected' : ''}>Gray</option>
            <option value="bg-indigo-300" ${noteToEdit.color === 'bg-indigo-300' ? 'selected' : ''}>Indigo</option>
            <option value="bg-violet-300" ${noteToEdit.color === 'bg-violet-300' ? 'selected' : ''}>Violet</option>
            <option value="bg-cyan-300" ${noteToEdit.color === 'bg-cyan-300' ? 'selected' : ''}>Cyan</option>
            <option value="bg-lime-300" ${noteToEdit.color === 'bg-lime-300' ? 'selected' : ''}>Lime</option>

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
      const now = new Date();
      const formattedDate = now.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
      const formattedTime = now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
      notes[noteIndex].text = noteText;
      notes[noteIndex].color = noteColor;
      notes[noteIndex].date = `${formattedDate} ${formattedTime}`;
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
      listItem.className = `p-4 rounded-3xl shadow-lg m-2 flex flex-col`;
      listItem.classList.add(note.color);
  
      // Format date and time
      const dateTime = new Date(note.date);
      const formattedDate = dateTime.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
      const formattedTime = dateTime.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
  
      listItem.innerHTML = `
        <span class="note-text w-full text-start">${note.text}</span>
        <div id="noteBtns-container" class="flex justify-between gap-8 items-center mt-2">
          <div class="note-date-time flex flex-col items-start text-gray-800 text-sm">
            <span>${formattedDate}</span>
            <p>${formattedTime}</p>
          </div>
          <div class="btn-group">
            <button id="editBtn" onclick="editNote(${note.id})" class="bg-blue-500 text-white p-1 rounded mr-1"><i class="fa-solid fa-pen"></i></button>
            <button id="deleteBtn" onclick="deleteNote(${note.id})" class="bg-red-500 text-white p-1 rounded"><i class="fa-solid fa-trash"></i></button>
          </div>
        </div>
      `;
      notesList.appendChild(listItem);
    });
  }
  
});
