export const loadGoogleMapsScript = async (lat, lng) => {
  if (document.querySelector('#google-maps-script')) {
    window.initMap && window.initMap(lat, lng);
    return;
  }

  const scriptUrl =
    window.location.hostname === 'localhost'
      ? '/getGoogleMapsScript'
      : '/.netlify/functions/getGoogleMapsScript';

  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.id = 'google-maps-script';
    script.src = scriptUrl;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      resolve();
      window.initMap && window.initMap(lat, lng);
    };
    script.onerror = error => {
      console.error('Error loading Google Maps script:', error);
      reject(error);
    };
    document.head.appendChild(script);
  });
};

export const initMap = (lat = 0, lng = 0) => {
  if (typeof google === 'undefined' || !google.maps) {
    console.error('Google Maps library is not loaded');
    return;
  }

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

  new google.maps.Marker({
    position: { lat, lng },
    map,
  });
};
