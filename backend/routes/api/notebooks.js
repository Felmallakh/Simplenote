const router = require("express").Router();
const { check } = require("express-validator");
const asyncHandler = require("express-async-handler");
const { handleValidationErrors } = require("../../utils/validation")

const { restoreUser } = require("../../utils/auth");
const { Notebook } = require("../../db/models");

const notebookError = (message) => {
  const err = new Error(message);
  err.status = 401;
  err.title = "Failed to fetch notebook";
  err.errors = [message];
  return err;
};

const notebookValidator = [
  check("title")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a title for your Notebook")
    .isLength({ max: 255 })
    .withMessage("Title cannot be longer than 255 characters")
    .custom((value) => {
      return Notebook.findOne({ where: { title: value } })
      .then((notebook) => { if (notebook) return Promise.reject("This title already exists");
      });
    }),
    handleValidationErrors
];


//Get All Notebooks
router.get("/", restoreUser, asyncHandler(async (req, res, next) =>{
    const { user } = req;
    console.log("xxxxx", user)
    const userId = user.dataValues.id;
    if (user) {
        const notebooks = await Notebook.findAll({
            where: { userId },
            order: [["updatedAt", "DESC"]] })
            console.log("noteeee" , notebooks)
        return res.json(notebooks);
    }
    return next(notebookError("User must be logged in to view notebooks"))
}));

//Get One Notebook
router.get("/:id(\\d+)", restoreUser, asyncHandler(async (req, res, next) => {
    const { user } = req;
    const notebookId = req.params.id;
    if (user){
        const notebook = await Notebook.findByPk(notebookId);
        return res.json(notebook);
    }
    return next(notebookError("User must be logged in to view notebooks"));
}));


//Add/Create Notebook
router.post('/', restoreUser, notebookValidator, asyncHandler(async (req, res, next) => {
    const { user } = req;
    const { title } = req.body;
    const userId = user.dataValues.id;
    if (user) {
        const newNotebook = await Notebook.create({ userId, title })
        return res.json(newNotebook);
    }
    return next(notebookError("User must be logged in to create a notebook"));
}));

//Edit/Update Notebook
router.put("/:id(\\d+)", restoreUser, notebookValidator, asyncHandler(async (req, res, next) => {
    const { user } = req;
    const { title } = req.body;
    const notebookId = req.params.id;
    const userId = user.dataValues.id;

    if (user){
        const notebookUpdate = await Notebook.findByPk(notebookId);
        const notebook = { title, userId }
        await notebookUpdate.update(notebook);
        return res.json(notebookUpdate)
    }
    return next(notebookError("User must be logged in to edit a notebook"))
}))


//Delete Notebook
router.delete("/:id(\\d+)", restoreUser, async (req, res, next) => {
    const { user } = req;
    const userId = user.id;
    const notebookId = req.params.id;

    if (user){
        const notebookDelete = await Notebook.findByPk(notebookId);
        if (+notebookDelete.userId === userId) {
            await notebookDelete.destroy();
            return res.json({ message: `Notebook ${notebookId} is successfully deleted` });
        } return next(notebookError("You are not authorized to delete this notebook"));
    }
    return next(notebookError("User must be logged in to delete a notebook"));
});

module.exports = router;
