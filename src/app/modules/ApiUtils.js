import Geocode from 'react-geocode';
// set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
Geocode.setApiKey(process.env.REACT_APP_MAPS_API_KEY);

const apiHost = (process.env.API_HOST) ? process.env.API_HOST : 'http://localhost:3000';

export const fetchSchools = (long, lat, radius) => {
  let url = apiHost + `/api/schools?long=${encodeURIComponent(long)}&lat=${encodeURIComponent(lat)}&r=${encodeURIComponent(radius)}`;
  return fetch(url, {
  	method: 'GET'
  });
}

export const fetchAmenities = (long, lat, radius) => {
  let url = apiHost +  `/api/amenities?long=${encodeURIComponent(long)}&lat=${encodeURIComponent(lat)}&r=${encodeURIComponent(radius)}`;
  return fetch(url, {
  	method: 'GET'
  });
}

export const fetchDisamenities = (long, lat, radius) => {
  let url = apiHost +  `/api/disamenities?long=${encodeURIComponent(long)}&lat=${encodeURIComponent(lat)}&r=${encodeURIComponent(radius)}`;
  return fetch(url, {
    method: 'GET'
  });
}

export const fetchOverview = (postcode) => {
  let url = apiHost +  `/api/postcodes/${encodeURIComponent(postcode)}`;
  return fetch(url, {
    method: 'GET'
  });
}

// fetches street level crime within a 1 mile radius of specific point
export const fetchStreetCrime = (long, lat) => {
  let url = `https://data.police.uk/api/crimes-street/all-crime?lat=${encodeURIComponent(lat)}&lng=${encodeURIComponent(long)}`;
  return fetch(url, {
    method: 'GET'
  });
}

export const fetchPoliceNeighbourhood = (long, lat) => {
  let url = `https://data.police.uk/api/locate-neighbourhood?q=${ lat },${ long }`;
  return fetch(url, {
    method: 'GET'
  });
}

export const fetchPoliceNeighbourhoodDetails = (force, neighbourhood) => {
  let url = `https://data.police.uk/api/${encodeURIComponent(force)}/${encodeURIComponent(neighbourhood)}`;
  return fetch(url, {
    method: 'GET'
  });
}

export const fetchSmallAreaAges = (geocode) => {
  let url = apiHost +  `/api/agedistribution/${encodeURIComponent(geocode)}`;
  return fetch(url, {
    method: 'GET'
  });
}

export const fetchSmallAreaTransport = (geocode) => {
  let url = apiHost +  `/api/transportdistribution/${encodeURIComponent(geocode)}`;
  return fetch(url, {
    method: 'GET'
  });
}

export const fetchSmallAreaHousing = (geocode) => {
  let url = apiHost +  `/api/housingdistribution/${encodeURIComponent(geocode)}`;
  return fetch(url, {
    method: 'GET'
  });
}

export const fetchSmallAreaPopulation = (geocode) => {
  let url = apiHost +  `/api/populationdistribution/${encodeURIComponent(geocode)}`;
  return fetch(url, {
    method: 'GET'
  });
} 

export const getLongLat = (query) => {
  // Get latidude & longitude from address.
  return Geocode.fromAddress(query);
}