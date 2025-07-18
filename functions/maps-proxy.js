export async function onRequestGet(context) {
  const key = context.env.GOOGLE_MAPS_API_KEY;

  if (!key) {
    return new Response('API key missing', { status: 500 });
  }

  return Response.redirect(
    `https://maps.googleapis.com/maps/api/js?key=${key}&libraries=places&callback=initMap&loading=async`,
    302
  );
}
