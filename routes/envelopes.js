const express = require("express");
const app = express();
const envelopesRouter = express.Router();
let envelopes = require('../database/db')
 
module.exports = envelopesRouter

const newEnvelope = {
  id: 4,
  category: "Gas",
  budget: 300,
};

/* app.post('/envelopes', (req, res) => {
  res.send(envelopes)
});

 app.get('/envelopes', (req, res) => {
  res.json(envelopes);
}); */

const port = 3000;
app.listen(port, function () {
  console.log(`App listening on port: ${port}!`);
});
