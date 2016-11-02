function showLocation(position) {
  console.log('经度', position.coords.latitude);
  console.log('维度', position.coords.longitude);
}

function showError(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      console.log('User denied the request for Geolocation');
      break;
    case error.POSITION_UNAVAILABLE:
      console.log('Location information is unavailable');
      break;
    case error.TIMEOUT:
      console.log('The request to get user location timed out');
      break;
    case error.UNKNOWN_ERROR:
      console.log('An unknown error occurred');
      break;
    // no default
  }
}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showLocation, showError);
  }
}

getLocation();
