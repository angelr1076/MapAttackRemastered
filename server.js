require('dotenv').config();
const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(__dirname));

app.get('/getGoogleMapsScript', (req, res) => {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  if (!apiKey) {
    console.error('Google Maps API key is missing.');
    res.status(500).send('Google Maps API key is missing.');
    return;
  }

  res.redirect(
    `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap&libraries=places&loading=lazy`
  );
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.listen(port, () => {
  console.log(`App running on http://localhost:${port}`);
});
