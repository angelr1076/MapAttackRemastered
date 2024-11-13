export const loadGoogleMapsScript = () => {
  const apiKey = window.GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    console.error('Google Maps API key is missing.');
    return;
  }

  const script = document.createElement('script');
  script.id = 'google-maps-script';
  script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap&libraries=marker&loading=lazy`;
  script.async = true;
  script.defer = true;

  script.onerror = error =>
    console.error('Error loading Google Maps script:', error);

  document.head.appendChild(script);
};

export const initMap = async (lat, lng) => {
  try {
    await loadGoogleMapsScript();

    const map = new google.maps.Map(document.getElementById('map'), {
      center: { lat, lng },
      zoom: 3,
      disableDefaultUI: true,
      mapTypeId: 'satellite',
      heading: 90,
      tilt: 45,
      rotateControl: true,
      gestureHandling: 'none',
      zoomControl: false,
    });

    new google.maps.Marker({ position: { lat, lng }, map });
  } catch (error) {
    console.error('Error initializing map:', error);
  }
};
