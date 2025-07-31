const notesRouter = require("express").Router();
const Note = require("../models/note");

notesRouter.get("/", async (request, response) => {
  const notes = await Note.find({});
  response.json(notes);
});

notesRouter.get("/:id", async (request, response, next) => {
  // try {
  const note = await Note.findById(request.params.id);
  if (note) {
    response.json(note);
  } else {
    response.status(404).end();
  }
  // } catch {
  //   (error) => next(error);
  // }
});

notesRouter.post("/", async (request, response, next) => {
  const body = request.body;
  const note = new Note({
    content: body.content,
    important: body.important || false,
  });

  // try {
  const savedNote = await note.save();
  response.status(201).json(savedNote);
  // } catch (error) {
  //   next(error);
  // }
});

notesRouter.delete("/:id", async (req, res, next) => {
  try {
    const result = await Note.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({ error: "Note not found" });
    }

    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

notesRouter.put("/:id", async (request, response, next) => {
  try {
    const body = request.body;

    const note = {
      content: body.content,
      important: body.important,
    };

    const updatedNote = await Note.findByIdAndUpdate(request.params.id, note, {
      new: true,
    });

    if (!updatedNote) {
      return response.status(404).json({ error: "Note not found" });
    }

    response.json(updatedNote);
  } catch (error) {
    next(error);
  }
});

module.exports = notesRouter;
