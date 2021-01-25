const router = require("express").Router();
const { ToDoItem } = require("../db/models");

router.get("/", async (req, res, next) => {
  try {
    const todos = await ToDoItem.findAll();
    res.json(todos);
  } catch (err) {
    next(err);
  }
});
router.post("/", async (req, res, next) => {
  try {
    const [item, isCreated] = await ToDoItem.findOrCreate({
      where: {
        title: req.body.title,
      },
    });
    if (!isCreated) {
      res.sendStatus(409);
      return;
    }
    res.status(201).send(item);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const toDelete = await ToDoItem.findByPk(id);
    await toDelete.destroy();
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

// matches PUT requests to /api/puppies/:puppyId
// router.put("/:todoId", function (req, res, next) {
//   /* etc */
// });

router.use(function (req, res, next) {
  const err = new Error("Not found.");
  err.status = 404;
  next(err);
});

module.exports = router;
