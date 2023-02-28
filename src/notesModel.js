class NotesModel {
  constructor() {
    this.notes = [];
  }

  getNotes() {
    return this.notes;
  }

  addNote(note) {
    this.notes.push(note);
  }

  setNotes(notes) {
    this.notes = notes;
  }

  reset() {
    this.notes = [];
  }
}

module.exports = NotesModel;
