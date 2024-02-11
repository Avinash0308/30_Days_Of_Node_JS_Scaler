const express = require("express");
const app = express();
const authenticationMiddleware = require('./authenticationMiddleware.js');

app.use(express.json());
// Route setup
app.get('/', (req, res) => {
  res.send("You are Authorized");
});
app.get('/protected',authenticationMiddleware, (req,res) => {
    res.send("Protected Route");
});

// Server setup
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
