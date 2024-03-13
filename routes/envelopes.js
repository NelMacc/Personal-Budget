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

// checks if only letters a through z are used
const isAlpha = str => /^[A-Z]+$/i.test(str);
// checks if only numbers are used
const isNumber = n => /^-?[\d.]+(?:e-?\d+)?$/.test(n)

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
