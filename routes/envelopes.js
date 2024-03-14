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
  if (!envelope) return res.status(404).send({ error: 'The envelope with that ID was not found.' });
  res.send(envelope);
});

// checks if only letters a through z and spaces are used
const isAlpha = str => /^[A-Za-z\s]+$/i.test(str);
// checks if only numbers are used
const isNumber = n => /^-?[\d.]+(?:e-?\d+)?$/.test(n);

// creates a new envelope
envelopesRouter.post('/envelopes', (req, res) => {
  if (!req.body.category || !isAlpha(req.body.category)) {
    res.status(400).send({ error: 'Category should only use letters and spaces' });
    return;
  };

  if (!req.body.budget || !isNumber(req.body.budget)) {
    res.status(400).send({ error: 'Budget should be a number' });
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
  if (!envelope) return res.status(404).send({ error: 'The envelope with that ID was not found.' });

  const { newId, category, amountToSubtract } = req.body;

  if (!newId && !category && !amountToSubtract) {
    res.status(404).send({ error: 'You must include an updated id, category or budget' });
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

envelopesRouter.delete('/envelopes/:id', (req, res) => {
  const envelope = envelopes.find(e => e.id === parseInt(req.params.id));
  if (!envelope) return res.status(404).send({ error: 'The envelope with that ID was not found.' });

  const index = envelopes.indexOf(envelope);
  envelopes.splice(index, 1);

  res.send(envelope)
});

envelopesRouter.post('/envelopes/switch_values', (req, res) => {
  const { firstEnvelopeId, secondEnvelopeId, parameterToSwitch } = req.body;

  // Find the first envelope by ID
  const firstEnvelope = envelopes.find(env => env.id === firstEnvelopeId);

  if (!firstEnvelope) {
    return res.status(404).send({ error: 'The first envelope was not found.' });
  };

  // Find the second envelope by ID
  const secondEnvelope = envelopes.find(env => env.id === secondEnvelopeId);

  if (!secondEnvelope) {
    return res.status(404).send({ error: 'The second envelope was not found.' });
  };

  // Ensure both envelopes have the parameter to switch
  if (!firstEnvelope.hasOwnProperty(parameterToSwitch) || !secondEnvelope.hasOwnProperty(parameterToSwitch)) {
    return res.status(404).send({ error: 'The parameter to switch was not found in the envelopes.' });
  };

  // Switch the values of the parameter between the two envelopes
  const tempValue = firstEnvelope[parameterToSwitch];
  firstEnvelope[parameterToSwitch] = secondEnvelope[parameterToSwitch];
  secondEnvelope[parameterToSwitch] = tempValue;

  res.send(envelopes)
});
