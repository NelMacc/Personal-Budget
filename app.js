const express = require("express");
const app = express();
const port = 3000;

const envelopesRouter = require("./routes/envelopes")
app.use("/", envelopesRouter)

app.listen(port, function () {
  console.log(`App listening on port: ${port}!`);
});

