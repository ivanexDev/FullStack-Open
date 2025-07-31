// const { test, after, beforeEach, describe } = require("node:test");
// const mongoose = require("mongoose");
// const Note = require("../models/note");
// const supertest = require("supertest");
// const assert = require("node:assert");
// const app = require("../app");
// const { initialNotes, nonExistingId, notesInDb } = require("./test_helpers");

// const api = supertest(app);

// beforeEach(async () => {
//   await Note.deleteMany({});
//   console.log("cleared");

//   const newNotes = initialNotes.map((note) => new Note(note));
//   const promiseArray = newNotes.map((note) => note.save());

//   await Promise.all(promiseArray);

//   //   for (let note of helper.initialNotes) {
//   //   let noteObject = new Note(note)
//   //   await noteObject.save()
//   // }
// });

// describe("notes api", () => {
//   test("notes are returned as json", async () => {
//     console.log("entered test");
//     await api
//       .get("/api/notes")
//       .expect(200)
//       .expect("Content-Type", /application\/json/);
//   });

//   test("there are two notes", async () => {
//     const response = await api.get("/api/notes");

//     assert.strictEqual(response.body.length, initialNotes.length);
//   });

//   test("the first note is about HTTP methods", async () => {
//     const response = await api.get("/api/notes");

//     const contents = response.body.map((e) => e.content);
//     assert.strictEqual(contents.includes("HTML is easy"), true);
//   });

//   test("a valide note can be added", async () => {
//     const newNote = {
//       content: "async/await simplifies making async calls",
//       important: true,
//     };

//     await api
//       .post("/api/notes")
//       .send(newNote)
//       .expect(201)
//       .expect("Content-Type", /application\/json/);

//     const notesAtEnd = await notesInDb();
//     assert.strictEqual(notesAtEnd.length, initialNotes.length + 1);

//     const contents = notesAtEnd.map((note) => note.content);

//     assert(contents.includes("async/await simplifies making async calls"));
//   });

//   test("note without content is not added", async () => {
//     const newNote = {
//       important: true,
//     };

//     await api.post("/api/notes").send(newNote).expect(400);

//     const notesAtEnd = await notesInDb();

//     assert.strictEqual(notesAtEnd.length, initialNotes.length);
//   });

//   test("a specific note can be viewed", async () => {
//     const notesAtStart = await notesInDb();

//     const noteToView = notesAtStart[0];

//     const resultNote = await api
//       .get(`/api/notes/${noteToView.id}`)
//       .expect(200)
//       .expect("Content-Type", /application\/json/);

//     assert.deepStrictEqual(resultNote.body, noteToView);
//   });

//   test("a note can be deleted", async () => {
//     const notesAtStart = await notesInDb();
//     const noteToDelete = notesAtStart[0];

//     const result = await api
//       .delete(`/api/notes/${noteToDelete.id}`)
//       .expect(204);

//     const notesAtEnd = await notesInDb();

//     const contents = notesAtEnd.map((note) => note.content);
//     assert(!contents.includes(noteToDelete.content));

//     assert.strictEqual(notesAtEnd.length, notesAtStart.length - 1);
//   });

//   test("delete a note that not exist", async () => {
//     const id = await nonExistingId();

//     await api.delete(`/api/notes/${id}`).expect(404);
//   });

//   after(async () => {
//     await mongoose.connection.close();
//   });
// });
