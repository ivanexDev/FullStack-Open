const jwt = require("jsonwebtoken");
const notesRouter = require("express").Router();
const Note = require("../models/note");
const User = require("../models/user");

const getTokenFrom = (request) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    return authorization.replace("Bearer ", "");
  }
  return null;
};

notesRouter.get("/", async (request, response, next) => {
  try {
    const notes = await Note.find({}).populate("user", {
      username: 1,
      name: 1,
    });
    response.json(notes);
  } catch (error) {
    next(error);
  }
});

notesRouter.get("/:id", async (request, response, next) => {
  try {
    const note = await Note.findById(request.params.id);

    if (!note) {
      return response.status(404).end();
    }

    response.json(note);
  } catch (error) {
    next(error); // Si es CastError, tu handler responderá con 400
  }
});

notesRouter.post("/", async (request, response, next) => {
  const body = request.body;

  if (!body.content) {
    return response.status(400).json({
      error: "content missing",
    });
  }

  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: "token invalid" });
  }

  const user = await User.findById(decodedToken.id);

  try {
    const note = new Note({
      content: body.content,
      important: body.important || false,
      user: user.id,
    });
    const savedNote = await note.save();
    user.notes = user.notes.concat(savedNote._id);
    await user.save();

    response.status(201).json(savedNote);
  } catch (error) {
    next(error);
  }
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
