import { getDistanceFromLatLon } from './GeoUtils';
import { changeArrayPropertyNames,
         addArrayProperty,
         sortArrayAscending,
         sliceArrayByDistance,
         resultsFilterDuplicates
} from './ArrayUtils';

export const transposePoliceProperties = (array) => {
  for(let i = 0; i < array.length; i++){
    array[i]['Name'] = array[i]['category'];
    array[i]['Type'] = array[i]['location']['street']['name'] === 'On or near ' ? '' :  array[i]['location']['street']['name'];
    array[i]['geometry'] = {};
    array[i]['geometry']['coordinates'] = [array[i]['location']['longitude'], array[i]['location']['latitude']];
  }
  return array;
}

export const addCrimeDistance = (array, lat, lon) => {
  for(let i = 0; i<array.length; i++){
    let crimeLat = parseFloat(array[i]['location']['latitude']);
    let crimeLon = parseFloat(array[i]['location']['longitude']);
    array[i]['dist'] = {};
    let distBetweenPoints = getDistanceFromLatLon(lat, lon, crimeLat, crimeLon)*1000;
    array[i]['dist']['calculated'] = distBetweenPoints.toFixed(2);
  }
  return array;
}

export const parsePoliceData = (data, lat, long, r) => {
  let streetCrime = addCrimeDistance(data, lat, long);
  streetCrime = sortArrayAscending(streetCrime);
  streetCrime = sliceArrayByDistance(streetCrime, r/1000);
  streetCrime = transposePoliceProperties(streetCrime);
  return streetCrime;
}

export const parseAmenityData = (response) => {
  // comverting response object to flat array of obejects,
  // each with a type property telling us of what category it is  
	let busStops = changeArrayPropertyNames(response.busStops, [{ oldName: 'Stop_Name', newName: 'Name' }]);
	busStops = addArrayProperty(busStops, 'Type', 'Bus Stop');

	let gps = changeArrayPropertyNames(response.GPS, [{ oldName: 'PracticeName', newName: 'Name' }]);
	gps = addArrayProperty(gps, 'Type', 'G.P');

	let dentists = changeArrayPropertyNames(response.dentists, [{ oldName: 'DENTISTNAME', newName: 'Name' }]);
	dentists = addArrayProperty(dentists, 'Type', 'Dentist');

	let libraries = changeArrayPropertyNames(response.libraries, [{ oldName: 'StaticLibraryName', newName: 'Name' }]);
	libraries = addArrayProperty(libraries, 'Type', 'Library');

	let result = busStops.concat(gps, dentists, libraries);
	result = sortArrayAscending(result);
	return result;
}

export const parseDisamenityData = (response) => {
  let landfills = changeArrayPropertyNames(response.landfills, [{ oldName: 'properties.AuthRefHolder_31Dec2016', newName: 'Name' }]);
  landfills = addArrayProperty(landfills, 'Type', 'Landfill');
  landfills = sortArrayAscending(landfills);

  let wasteSites = changeArrayPropertyNames(response.wasteSites, [{ oldName: 'properties.LicenceHolder', newName: 'Name' }]);
  wasteSites = addArrayProperty(wasteSites, 'Type', 'Waste Site');
  wasteSites = resultsFilterDuplicates(wasteSites, 'Name');
  wasteSites = sortArrayAscending(wasteSites);

  return landfills.concat(wasteSites);
}

export const parseSchoolData = (response) => {
  let schools = changeArrayPropertyNames(response, [{ oldName: 'Institution_Name', newName: 'Name' }]);
  schools =  changeArrayPropertyNames(schools, [{ oldName: 'Institution_Type', newName: 'Type' }]);
  schools = sortArrayAscending(schools);
  return schools;
}
