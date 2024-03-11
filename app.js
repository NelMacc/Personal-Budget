const express = require("express");
const app = express();
const port = 3000;
let envelopes = require('../personal-budget/database/db')

// gets all envelopes
 app.get("/envelopes", function (req, res) {
  res.send(envelopes);
}); 

/* app.get("/", function (req, res) {
  res.send(envelopes[0].category);
}); */

app.listen(port, function () {
  console.log(`App listening on port: ${port}!`);
});

