export const loadGoogleMapsScript = async () => {
  if (document.querySelector('#google-maps-script')) return;
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.id = 'google-maps-script';
    script.src = `/getGoogleMapsScript`;
    script.async = true;
    script.defer = true;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
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
