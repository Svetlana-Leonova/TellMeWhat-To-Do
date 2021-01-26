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
      console.log("ITEM FOUND>>>>>>>", item);
      res.send(item);
      return;
    }
    item = await ToDoItem.findByPk(param);
    if (!item) {
      res
        .status(404)
        .send("Project with this id was not found. Try a differen project id.");
      return;
    }
    res.send(item);
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
