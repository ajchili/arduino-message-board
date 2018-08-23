const express = require("express");
const SerialHelper = require("./helpers/SerialHelper");

const app = express();
app.use(express.static(__dirname + "/views"));
app.use(require("body-parser").urlencoded({extended: true}));

app.get("/", (req, res) => res.sendFile("index.html"));
app.get("/error", (req, res) => res.sendFile("index.html"));
app.get("/send", (req, res) => res.redirect("/"));
app.post("/send", (req, res) => {
  if (req.body.message) {
    SerialHelper.writeMessage(req.body.message)
      .then(() => res.redirect("/sent"))
      .catch(err => {
        console.error(err);
        res.redirect("/error");
      });
  }
});
app.get("/sent", (req, res) => res.sendFile("index.html"));
app.use((req, res) => res.redirect("/"));

app.listen(8080, () => {
  SerialHelper.init()
    .then(() => {
      console.log("Started.");
    })
    .catch(err => {
      console.error(err);
      exit(0);
    });
});