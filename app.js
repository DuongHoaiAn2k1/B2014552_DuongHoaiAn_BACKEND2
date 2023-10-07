const express = require("express");
const cors = require("cors");
const contactRoute = require("./app/routes/contact.route");
const ApiError = require("./app/api-error");
var bodyParser = require("body-parser");
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Welcome to contact book application." });
});

app.use("/api/contacts", contactRoute);
app.use((req, res, next) => {
  return next(new ApiError(404, "Resource not found"));
});
app.use((err, req, res, next) => {
  return res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
  });
});

module.exports = app;
