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

router.get("/:todoId", async (req, res, next) => {
  try {
    const todo = await ToDoItem.findByPk(req.params.todoId);
    res.json(todo);
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

router.delete("/:todoId", async (req, res, next) => {
  try {
    const { todoId } = req.params;
    const toDelete = await ToDoItem.findByPk(todoId);
    await toDelete.destroy();
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

router.put("/:todoId", async (req, res, next) => {
  console.log("REQ.BODY>>>>>>>>>>>>>>>", req.body);
  // console.log("REQ.PARAMS>>>>>>>>>>", req.params);
  // const { todoId } = req.params;
  // const toUpdate = await ToDoItem.findByPk(todoId);
  // const updated = req.body;
});

router.use(function (req, res, next) {
  const err = new Error("Not found.");
  err.status = 404;
  next(err);
});

module.exports = router;
