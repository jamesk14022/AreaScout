exports.parseSmallAreaAges = (ages) => {
  let response = {dist: [
      { name: '0-15', value: ages['0-4yrspc'] + ages['5-7yrspc'] + ages['8-9yrspc'] + ages['10-14yrspc'] + ages['15yrspc'] },
      { name: '16-24', value:ages['16-17yrspc'] + ages['18-19yrspc'] + ages['20-24yrspc'] },
      { name: '25-44', value: ages['25-29yrspc'] + ages['30-44yrspc'] },
      { name: '45-64', value:ages['45-59yrspc'] + ages['60-64yrspc'] },
      { name: '65+', value: ages['65-74yrspc'] + ages['75-84yrspc'] + ages['85-89yrspc'] + ages['90+yrspc'] }
    ], metrics: [ { name: 'Mean Age', value: ages.Meanage },
      { name: 'Median Age', value: ages.Medianage } ]};
  for(let property in response['dist']){
    response['dist'][property]['value'] = parseFloat(response['dist'][property]['value'].toFixed(2));
  }
  return response;
}

exports.parseSmallAreaTransport = (transport) => {
  let response = [
    { name: 'Public Transport', value: transport['percentageWaccessCarPublicTransport'] + transport['percentageWoaccessCarPublicTransport'] },
    { name: 'Bus', value: transport['percentageBus'] },
    { name: 'Motorcycle', value: transport['percentageMotorcycle'] },
    { name: 'Driving', value: transport['percentageDriving'] },
    { name: 'Passenger', value: transport['percentagePassenger'] },
    { name: 'Shared Driving', value: transport['percentageSharedDriving'] },
    { name: 'Taxi', value: transport['percentageTaxi'] },
    { name: 'Bicycle', value: transport['percentageBicycle'] },
    { name: 'OnFoot', value: transport['percentageOnFoot'] },
    { name: 'Other', value: transport['percentageOther'] }
  ];
  return response;
}

exports.parseSmallAreaHousing = (housing) => {
    let response = [
    { name: 'Detatched House', value: housing['PcHOUSEHOLDSWholeHouseDetached'] },
    { name: 'Semi-Detatched House', value: housing['PcHOUSEHOLDSWholeHouseSemi-detached'] },
    { name: 'Terraced house', value: housing['PcHOUSEHOLDSWholeHouseTerraced'] },
    { name: 'Flat - Purpose Built', value: housing['PcHOUSEHOLDSFlatPurposeBuilt'] },
    { name: 'Flat - Converted House', value: housing['PcHOUSEHOLDSFlatConvertedHouse'] },
    { name: 'Flat - Commercial Building', value: housing['PcHOUSEHOLDSFlatCommercialBuilding'] },
    { name: 'Flat - Caravan/Mobile Structure', value: housing['PcHOUSEHOLDSFlatMobileStructure'] }
  ];
  return response;
}

exports.parseSmallAreaPopulation = (population) => {
  let response = {
    distGender: [
      { name: 'Male', value: population['PcMales'] },
      { name: 'Female', value: population['PcFemales'] }
    ],
    distLivingStatus: [
      { name: 'Household', value: population['PcLivesHousehold'] },
      { name: 'Communal Establishment', value: population['PcLivesCommunalEstablishment'] }
    ],  
    metrics: [
      { name: 'Total Population', value: population['CtAll'] }
    ]
  }
  return response;
}

exports.getDistanceFromLatLonInKm = (lat1,lon1,lat2,lon2) => {
  const R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
  ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}
