class NotesView {
  constructor(model, client) {
    this.model = model;
    this.client = client;
    // HTTP Elements
    this.mainContainerEl = document.querySelector("#main-container");
    this.addButtonEl = document.querySelector("#add-button");
    this.resetButtonEl = document.querySelector("#reset-button");
    this.inputEl = document.querySelector("#note-input");
    this.addButtonEl.addEventListener("click", () => {
      this.addNote();
    });
    this.resetButtonEl.addEventListener("click", () => {
      this.resetNotes();
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

  async displayNotesFromApi() {
    this.client.loadNotes((notes) => {
      this.model.setNotes(notes);

      this.displayNotes();
    });
  }

  async addNote() {
    const inputVal = this.inputEl.value;
    const data = await this.client.convertEmoji(inputVal, (data) => {
      this.client.createNote(data, (data) => {
        this.model.setNotes(data);
        this.inputEl.value = null;
        this.displayNotes();
      });
    });
  }

  async resetNotes() {
    const data = await this.client.reset();
    this.displayNotesFromApi();
  }
}

module.exports = NotesView;
