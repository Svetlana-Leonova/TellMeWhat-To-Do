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

router.get("/:param", async (req, res, next) => {
  try {
    const { param } = req.params;
    let item;
    if (isNaN(Number(param))) {
      const sanitized = param.toLowerCase();
      item = await ToDoItem.findOne({
        where: { title: sanitized },
      });
      if (!item) {
        res.status(404).send("Item was not found");
        return;
      }
      res.send(item);
    } else {
      item = await ToDoItem.findByPk(param);
      if (!item) {
        res.status(404).send("Item was not found");
        return;
      }
      res.send(item);
    }
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
    if (!todoId) {
      res.status(404).send("To-do not found");
      return;
    }
    const toDelete = await ToDoItem.findByPk(todoId);
    await toDelete.destroy();
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

router.put("/:todoId", async (req, res, next) => {
  try {
    const { todoId } = req.params;
    const itemtoUpdate = await ToDoItem.findByPk(todoId);
    const updatedItem = itemtoUpdate.update(req.body);
    res.send(updatedItem);
  } catch (err) {
    next(err);
  }
});

router.use(function (req, res, next) {
  const err = new Error("Not found.");
  err.status = 404;
  next(err);
});

module.exports = router;
