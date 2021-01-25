const express = require("express");
const path = require("path");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const db = require("./db");

app.use(morgan("dev"));

app.use(express.static("./dist"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", require("./apiRoutes"));

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "../dist/index.html"));
});

app.use(function (err, req, res, next) {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || "Internal server error.");
});

const port = process.env.PORT || 3000;
app.listen(port, function (error) {
  if (error) throw error;
  console.log("Express server listening on port", port);
});

db.sync();
