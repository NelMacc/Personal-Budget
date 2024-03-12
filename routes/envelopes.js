const express = require("express");
const app = express();

let envelopes = require('../database/db')

const envelopesRouter = express.Router();
module.exports = envelopesRouter

envelopesRouter.use(express.json());

/* const newEnvelope = {
  id: 4,
  category: "Gas",
  budget: 300,
}; 

envelopes.push(newEnvelope) */

// retrieves all envelopes
envelopesRouter.get("/envelopes", (req, res) => {
  res.send(envelopes);
}); 

envelopesRouter.get("/envelopes/:id", (req, res) => {
  const envelope = envelopes.find(e => e.id === parseInt(req.params.id));
  if (!envelope) res.status(404).send('The envelope with that ID was not found.');
  res.send(envelope);
});

envelopesRouter.post('/envelopes', (req, res) => {
  if (!req.body.category || !typeof req.body.category === 'string') {
    res.status(400).send('Category should be a string')
  }

  if (!req.body.budget || !typeof req.body.budget === 'number') {
    res.status(400).send('Budget should be a number')
  }
  
  const envelope = {
    id: envelopes.length + 1,
    category: req.body.category,
    budget: req.body.budget
  };
  envelopes.push(envelope);
  res.send(envelope);
});
