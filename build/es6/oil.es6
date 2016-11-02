function showLocation(position) {
  console.log('经度', position.coords.latitude);
  console.log('维度', position.coords.longitude);
}

function showError(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      console.log('PERMISSION_DENIED');
      break;
    case error.POSITION_UNAVAILABLE:
      console.log('POSITION_UNAVAILABLE');
      break;
    case error.TIMEOUT:
      console.log('TIMEOUT');
      break;
    case error.UNKNOWN_ERROR:
      console.log('UNKNOWN_ERROR');
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
