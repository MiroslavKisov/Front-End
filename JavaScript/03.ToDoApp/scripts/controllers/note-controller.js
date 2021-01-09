import noteService from "../services/note-service";

let noteList = document.getElementById("to-do-notes");
let saveButton = document.querySelector("#edit-form .save-button");
let addButton = document.getElementById("add-button");
let addField = document.getElementById("create-note");
let editField = document.getElementById("edit-note");
let createForm = document.getElementById("create-form");
let editForm = document.getElementById("edit-form");

class noteController {
  constructor() {
    addButton.addEventListener("click", this.add.bind(this));
    saveButton.addEventListener("click", this.save.bind(this));
  }

  loadNotes() {
    noteList.innerHTML = "";

    noteService
      .getAllNotes()
      .then(notes => {
        for (let note of notes.data) {
          this.createList(note);
        }
      })
      .catch(function(error) {
        alert(error);
      });
  }

  add() {
    let note = addField.value;

    if (note === "") {
      alert("note value cannot be empty");
      return;
    }

    let noteData = {
      content: note
    };

    noteService
      .addNote(noteData)
      .then(() => {
        addField.value = "";
        this.loadNotes();
      })
      .catch(function(error) {
        alert(error);
      });
  }

  edit(noteId) {
    noteService
      .getNoteById(noteId)
      .then(function(note) {
        editField.value = note.data.content;
        createForm.classList.add("hidden");
        editForm.classList.remove("hidden");
        saveButton.setAttribute("id", noteId);
      })
      .catch(function(error) {
        alert(error);
      });
  }

  save() {
    let noteId = event.target.id;

    let noteData = {
      content: editField.value
    };

    noteService
      .editNote(noteData, noteId)
      .then(() => {
        editForm.classList.add("hidden");
        createForm.classList.remove("hidden");
        saveButton.removeAttribute("id");
        editField.value = "";
        this.loadNotes();
      })
      .catch(function(error) {
        alert(error);
      });
  }

  remove(noteId) {
    noteService
      .deleteNote(noteId)
      .then(() => {
        this.loadNotes();
      })
      .catch(function(error) {
        alert(error);
      });
  }

  createList(note) {
    let listItem = document.createElement("li");
    let editButton = document.createElement("button");
    let deleteButton = document.createElement("button");

    listItem.textContent = note.content;
    editButton.textContent = "Edit";
    deleteButton.textContent = "Delete";

    editButton.addEventListener("click", this.edit.bind(this, note.id));
    deleteButton.addEventListener("click", this.remove.bind(this, note.id));

    listItem.append(editButton);
    listItem.append(deleteButton);

    noteList.appendChild(listItem);
  }
}

module.exports = new noteController();
