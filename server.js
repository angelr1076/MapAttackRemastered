require('dotenv').config();
const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(__dirname));

app.get('/getGoogleMapsScript', (req, res) => {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  res.redirect(
    `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=Function.prototype&loading=lazy`
  );
});

app.get('/', (req, res) => {
  v;
  res.render('index');
});

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
