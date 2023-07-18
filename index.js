const path = require("path");
const express = require("express");
const nodemailer = require("nodemailer");
const app = express();

app.use(express.static(path.join(__dirname, "pages")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res, next) => {
  return res.sendFile(path.join(__dirname, "pages", "index.html"));
});

app.listen(process.env.PORT || 4000, () => {
  console.log("listening on port 4000");
});

