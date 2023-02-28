class NotesView {
  constructor(model, client) {
    this.model = model;
    this.client = client;
    // HTTP Elements
    this.mainContainerEl = document.querySelector("#main-container");
    this.buttonEl = document.querySelector("#add-button");
    this.inputEl = document.querySelector("#note-input");
    this.buttonEl.addEventListener("click", () => {
      this.addNote();
    });
  }

  displayNotes() {
    const notes = this.model.getNotes();
    const pageNotes = document.querySelectorAll("div .note");
    pageNotes.forEach((note) => {
      note.remove();
    });
    notes.forEach((note) => {
      const div = document.createElement("div");
      div.className = "note";
      div.textContent = note;
      this.mainContainerEl.append(div);
    });
  }

  addNote() {
    this.model.addNote(this.inputEl.value);
    this.displayNotes();
    this.inputEl.value = null;
  }

  async displayNotesFromApi() {
    this.client.loadNotes((notes) => {
      this.model.setNotes(notes);
      this.displayNotes();
    });
  }
}

module.exports = NotesView;
