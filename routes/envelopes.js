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

envelopes.push(newEnvelope)

// retrieves all envelopes
envelopesRouter.get("/envelopes", (req, res) => {
  res.send(envelopes);
}); 

envelopesRouter.get("/envelopes/:id", (req, res) => {
  const envelope = envelopes.find(e => e.id === parseInt(req.params.id));
  if (!envelope) res.status(404).send('The envelope with that ID was not found.');
  res.send(envelope);
});

/* app.post('/envelopes', (req, res) => {
  res.send(envelopes)
});

 app.get('/envelopes', (req, res) => {
  res.json(envelopes);
}); */