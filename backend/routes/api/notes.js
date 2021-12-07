const router = require("express").Router();
const { check } = require("express-validator");
const asyncHandler = require("express-async-handler");
const { handleValidationErrors } = require("../../utils/validation");

const { restoreUser } = require("../../utils/auth");
const { Note } = require("../../db/models");

const noteError = (message) => {
  const err = new Error(message);
  err.status = 401;
  err.title = "Failed to fetch notebook";
  err.errors = [message];
  return err;
};

const noteValidator = [
  check("title")
    .exists({ checkFalsy: true })
    .withMessage("Note must have a title")
    .isLength({ max: 255 })
    .withMessage("Title cannot be longer than 255 characters"),
  handleValidationErrors,
];

//Get All Notes
router.get(
  "/",
  restoreUser,
  asyncHandler(async (req, res, next) => {
    const { user } = req;
    const userId = user.dataValues.id;
    if (user) {
      const notes = await Note.findAll({
        // where: { userId },
        order: [["updatedAt", "DESC"]],
      });
      return res.json(notes);
    }
    return next(noteError("User must be logged in to view notes"));
  })
);

//Get One Note
router.get(
  "/:id(\\d+)",
  restoreUser,
  asyncHandler(async (req, res, next) => {
    const { user } = req;
    const noteId = req.params.id;
    if (user) {
      const note = await Note.findByPk(noteId);
      return res.json(note);
    }
    return next(noteError("User must be logged in to view notes"));
  })
);

//Add/Create Note
router.post(
  "/",
  restoreUser,
  noteValidator,
  asyncHandler(async (req, res, next) => {
    const { user } = req;
    const { notebookId, title, content } = req.body;
    const userId = user.dataValues.id;
    if (user) {
      const newNote = await Note.create({ userId, notebookId, title, content });
      return res.json(newNote);
    }
    return next(noteError("User must be logged in to create a notebook"));
  })
);

//Edit/Update Note
router.put(
  "/:id(\\d+)",
  restoreUser,
  noteValidator,
  asyncHandler(async (req, res, next) => {
    const { user } = req;
    const { notebookId, title, content } = req.body;
    const noteId = req.params.id;
    const userId = user.dataValues.id;

    if (user) {
      const noteUpdate = await Note.findByPk(noteId);
      const note = { userId, notebookId, title, content };
      await noteUpdate.update(note);
      return res.json(noteUpdate);
    }
    return next(noteError("User must be logged in to edit a notebook"));
  })
);

//Delete Note
router.delete("/:id(\\d+)", async (req, res, next) => {
  const { user } = req;
  const noteId = req.params.id;

  if (user) {
    const noteDelete = await Note.findByPk(noteId);
    await noteDelete.destroy();
    return res.json({ message: `Note is successfully deleted` });
  }
  return next(noteError("User must be logged in to delete a note"));
});

module.exports = router;
