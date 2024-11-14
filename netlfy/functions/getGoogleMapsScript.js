require('dotenv').config();

exports.handler = async function (event, context) {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    return {
      statusCode: 500,
      body: 'Google Maps API key is missing.',
    };
  }

  const googleMapsScriptUrl = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&callback=initMap&loading=lazy`;

  try {
    const response = await fetch(googleMapsScriptUrl);
    const script = await response.text();

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/javascript',
        'Cache-Control': 'no-store',
      },
      body: script,
    };
  } catch (error) {
    console.error('Error fetching Google Maps script:', error);
    return {
      statusCode: 500,
      body: 'Error fetching Google Maps script',
    };
  }
};
