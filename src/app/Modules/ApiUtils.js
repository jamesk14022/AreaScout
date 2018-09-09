import Geocode from 'react-geocode';
// set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
Geocode.setApiKey('AIzaSyCg25YDGx7CqI0tCHiZermsRveElipQjWs');

const fetchSchools = (long, lat, radius) => {
  var url = `http://localhost:3000/api/schools?long=${encodeURIComponent(long)}&lat=${encodeURIComponent(lat)}&r=${encodeURIComponent(radius)}`;
  return fetch(url, {
  	method: 'GET'
  });
}

const fetchAmenities = (long, lat, radius) => {
  var url = `http://localhost:3000/api/amenities?long=${encodeURIComponent(long)}&lat=${encodeURIComponent(lat)}&r=${encodeURIComponent(radius)}`;
  return fetch(url, {
  	method: 'GET'
  });
}

const fetchDisamenities = (long, lat, radius) => {
  var url = `http://localhost:3000/api/disamenities?long=${encodeURIComponent(long)}&lat=${encodeURIComponent(lat)}&r=${encodeURIComponent(radius)}`;
  return fetch(url, {
    method: 'GET'
  });
}

const fetchOverview = (postcode) => {
  var url = `http://localhost:3000/api/postcodes/${encodeURIComponent(postcode)}`;
  return fetch(url, {
    method: 'GET'
  });
}

const getLongLat = (query) => {
  // Get latidude & longitude from address.
  return Geocode.fromAddress(query);
}

export default { fetchSchools, fetchAmenities, fetchDisamenities, fetchOverview, getLongLat };