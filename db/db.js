let envelopes = [
  {
    id: 1,
    category: "Groceries",
    budget: 200,
  },
  {
    id: 2,
    category: "Bills",
    budget: 1000,
  },
  {
    id: 3,
    category: "Entertainment",
    budget: 200,
  },
];

envelopes[0].budget = envelopes[0].budget - 100

console.log(envelopes[0].budget)

module.exports = envelopes;