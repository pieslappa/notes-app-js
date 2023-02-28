/**
 * @jest-environment jsdom
 */

const fs = require("fs");
const NotesView = require("./notesView");
const NotesModel = require("./notesModel");
const NotesClient = require("./notesClient");

jest.mock("./notesClient.js");

describe("NotesView", () => {
  beforeEach(() => {
    NotesClient.mockClear();
    document.body.innerHTML = fs.readFileSync("./index.html");
  });

  it("constructs", () => {
    const model = new NotesModel();
    const mockClient = new NotesClient();
    const view = new NotesView(model, mockClient);
    expect(view).toBeInstanceOf(NotesView);
    expect(view.model).toEqual(model);
  });

  it("displayNotes", () => {
    const model = new NotesModel();
    const mockClient = new NotesClient();
    const view = new NotesView(model, mockClient);
    model.addNote("Hello");
    model.addNote("World");
    view.displayNotes();
    expect(document.querySelectorAll(".note").length).toBe(2);
    expect(document.querySelectorAll(".note")[1].textContent).toBe("World");
  });

  it("adds a new note and displays", () => {
    const model = new NotesModel();
    const mockClient = new NotesClient();
    const view = new NotesView(model, mockClient);
    const inputEl = document.querySelector("#note-input");
    inputEl.value = "Hello world";
    const addButton = document.querySelector("#add-button");
    addButton.click();
    expect(document.querySelector("div .note").textContent).toBe("Hello world");
  });

  it("displays the correct number of notes after multiple notes added", () => {
    const model = new NotesModel();
    const mockClient = new NotesClient();
    const view = new NotesView(model, mockClient);
    model.addNote("Hello");
    view.displayNotes();
    model.addNote("World");
    view.displayNotes();
    expect(document.querySelectorAll(".note").length).toBe(2);
  });

  it("displayNotesFromApi", () => {
    const model = new NotesModel();
    const mockClient = new NotesClient();
    mockClient.loadNotes.mockImplementation((callback) =>
      callback(["Hello,world"])
    );
    const view = new NotesView(model, mockClient);
    view.displayNotesFromApi();
    const notes = document.querySelectorAll(".note");
    expect(notes.length).toBe(1);
  });
});
