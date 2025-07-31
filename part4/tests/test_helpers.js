const Note = require("../models/note");

const initialNotes = [
  {
    content: "HTML is easy",
    important: false,
  },
  {
    content: "Browser can execute only JavaScript",
    important: true,
  },
];

const nonExistingId = async () => {
  const note = new Note({ content: "willremovethissoon" });
  await note.save();
  await note.deleteOne();

  return note._id.toString();
};

const notesInDb = async () => {
  const notes = await Note.find({});
  return notes.map((note) => note.toJSON());
};

const initialBlogs = [
  {
  title: 'blog1',
  author: 'Ivan',
  url: 'http://blog1',
  likes: 5,
  },
  {
  title: 'blog2',
  author: 'Sofia',
  url: 'http://blog2',
  likes: 10,
  }
]




module.exports = {
  initialNotes,
  nonExistingId,
  notesInDb,
  initialBlogs,
};
