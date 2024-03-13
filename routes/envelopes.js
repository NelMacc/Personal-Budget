const express = require("express");
const app = express();

const envelopesRouter = express.Router();
envelopesRouter.use(express.json());
module.exports = envelopesRouter

let envelopes = require('../database/db')

// retrieves all envelopes
envelopesRouter.get("/envelopes", (req, res) => {
  res.send(envelopes);
}); 

// retrieves one envelope by id
envelopesRouter.get("/envelopes/:id", (req, res) => {
  const envelope = envelopes.find(e => e.id === parseInt(req.params.id));
  if (!envelope) res.status(404).send('The envelope with that ID was not found.');
  res.send(envelope);
});

// checks if only letters a through z and spaces are used
const isAlpha = str => /^[A-Za-z\s]+$/i.test(str);
// checks if only numbers are used
const isNumber = n => /^-?[\d.]+(?:e-?\d+)?$/.test(n);

// creates a new envelope
envelopesRouter.post('/envelopes', (req, res) => {
  if (!req.body.category || !isAlpha(req.body.category)) {
    res.status(400).send('Category should only use letters');
    return;
  };

  if (!req.body.budget || !isNumber(req.body.budget)) {
    res.status(400).send('Budget should be a number');
    return;
  };
  
  const envelope = {
    id: envelopes.length + 1,
    category: req.body.category,
    budget: req.body.budget
  };
  envelopes.push(envelope);
  res.send(envelope);
});

envelopesRouter.put('/envelopes/:id', (req, res) => {
  const envelope = envelopes.find(e => e.id === parseInt(req.params.id));
  if (!envelope) res.status(404).send('The envelope with that ID was not found.');

  const { newId, category, amountToSubtract } = req.body;

  if (!newId && !category && !amountToSubtract) {
    res.status(404).send('Updated id, category and budget were not found');
    return;
  };

  if (newId) {
    envelope.id = parseInt(newId);
  };

  if (category) {
    envelope.category = category;
  };
  
  if (amountToSubtract) {
    envelope.budget -= amountToSubtract;
  };
  
  res.send(envelope);
});

