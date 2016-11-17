const ele = document.querySelector('.login-screen-title');
function showLocation(position) {
  ele.innerHTML = `经度:${position.coords.longitude}</br>纬度:${position.coords.latitude}`;
}

function showError(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      break;
    case error.POSITION_UNAVAILABLE:
      ele.innerHTML = 'Location information is unavailable';
      break;
    case error.TIMEOUT:
      ele.innerHTML = 'The request to get user location timed out';
      break;
    case error.UNKNOWN_ERROR:
      ele.innerHTML = 'An unknown error occurred mess';
      break;
    // no default
  }
}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showLocation, showError);
  } else {
    ele.innerHTML = 'geolocation is unavailable';
  }
}

getLocation();
