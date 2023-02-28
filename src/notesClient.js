class NotesClient {
  constructor() {}

  async loadNotes(callback) {
    const response = await fetch("http://localhost:3000/notes");
    const data = await response.json();
    return callback(data);
  }

  async createNote(note, callback) {
    try {
      const payload = { content: note };
      const response = await fetch("http://localhost:3000/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const responseData = await response.json();
      console.log("Success: " + responseData);
      return callback(responseData);
    } catch (error) {
      console.log("Error: " + error);
    }
  }
}

module.exports = NotesClient;
