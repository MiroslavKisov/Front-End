import dataService from "./data-service";

class noteService {
  constructor() {}

  addNote(note) {
    return dataService.postData(note, "notes");
  }

  editNote(note, noteId) {
    return dataService.updateData(note, `notes/${noteId}`);
  }

  getNoteById(noteId) {
    return dataService.getData(`notes/${noteId}`);
  }

  getAllNotes() {
    return dataService.getData("notes");
  }

  deleteNote(noteId) {
    return dataService.removeData(`notes/${noteId}`);
  }
}

module.exports = new noteService();
