require('dotenv').config();

exports.handler = async function (event, context) {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    return {
      statusCode: 500,
      body: 'Google Maps API key is missing.',
    };
  }

  const googleMapsScriptUrl = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap&libraries=places&loading=lazy`;

  return {
    statusCode: 302,
    headers: {
      Location: googleMapsScriptUrl,
    },
  };
};
