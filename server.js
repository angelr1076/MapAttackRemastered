const express = require('express');
const app = express();

// set port
const port = process.env.PORT || 3000;

app.use(express.static(__dirname));

// routes
app.get('/', function (req, res) {
  res.render('index');
});

// Run with "node server.js" command to run locally
app.listen(port, function () {
  console.log(`app running on port ${port}`);
});
