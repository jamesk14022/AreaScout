const express = require('express');
const router = express.Router();
const promise = require('bluebird');
const schoolModel = require('./../models/Schools.js');
const disamenityModel = promise.promisifyAll(require('./../models/Disamenities.js'));
const amenityModel = promise.promisifyAll(require('./../models/Amenities.js'));
const coreModel = promise.promisifyAll(require('./../models/Core.js'));
const common = require('./../lib/Common.js');

router.get('/schools', function(req, res){
  var long = req.query.long;
  var lat = req.query.lat;
  var radius = req.query.r;

  if(!long || !lat || !radius){
    res.status(400).json('Missing latitude, longitude or radius(r) value in your schools query');
    return;
  }
  schoolModel.findSchools(parseFloat(long), parseFloat(lat), parseInt(radius), function(err, result){
    if(err){
      res.status(500).json('Error');
      console.log(err)
    }else{
      res.status(200).json(result);
    }
  });  
});

router.get('/amenities', function(req, res){
  var long = req.query.long;
  var lat = req.query.lat;
  var radius = req.query.r;

  if(!long || !lat || !radius){
    res.status(400).json('Missing latitude, longitude or radius(r) value in your amenities query');
    return;
  }

  var data = {};
  amenityModel.findBusStopsAsync(parseFloat(long), parseFloat(lat), parseInt(radius)).then(function(result){
    data.busStops = result;
    return amenityModel.findDentistsAsync(parseFloat(long), parseFloat(lat), parseInt(radius));
  }).then(function(result){
    data.dentists = result;
    return amenityModel.findGPSAsync(parseFloat(long), parseFloat(lat), parseInt(radius));
  }).then(function(result){
    data.GPS = result;
    return amenityModel.findLibrariesAsync(parseFloat(long), parseFloat(lat), parseInt(radius));
  }).then(function(result){
    data.libraries = result;
    res.status(200).json(data);
  }).catch(function(err){
    res.status(500).json('Error');
    console.log(err);
  }); 
});

router.get('/disamenities', function(req, res){
  var long = req.query.long;
  var lat = req.query.lat;
  var radius = req.query.r;

  if(!long || !lat || !radius){
    res.status(400).json('Missing latitude, longitude or radius(r) value in your disamenities query');
    return;
  }

  var data = {};
  disamenityModel.findLandfillsAsync(parseFloat(long), parseFloat(lat), parseInt(radius)).then(function(result){
    data.landfills = result;
    return disamenityModel.findWasteSitesAsync(parseFloat(long), parseFloat(lat), parseInt(radius));
  }).then(function(result){
    data.wasteSites = result;
    res.status(200).json(data);
  }).catch(function(err){
    res.status(500).json('Error');
  });
});

//the small area geocode is represented by the key OA11 in the ONS postcode directory
router.get('/agedistribution/:geocode', function(req, res){
  let geocode = req.params.geocode.toUpperCase().trim();
  coreModel.findSmallAreaAgeAsync(geocode).then(function(result){
    let ageData = common.parseSmallAreaAges(result[0]);
    res.status(200).json(ageData);
  }).catch(function(err){
    console.log(err);
    res.status(500).json('Error');
  })
});

router.get('/transportdistribution/:geocode', function(req, res){
  let geocode = req.params.geocode.toUpperCase().trim();
  coreModel.findSmallAreaTransportAsync(geocode).then(function(result){
    let ageData = common.parseSmallAreaTransport(result[0]);
    res.status(200).json(ageData);
  }).catch(function(err){
    console.log(err);
    res.status(500).json('Error');
  })
});

router.get('/housingdistribution/:geocode', function(req, res){
  let geocode = req.params.geocode.toUpperCase().trim();
  coreModel.findSmallAreaHousingAsync(geocode).then(function(result){
    let housingData = common.parseSmallAreaHousing(result[0]);
    res.status(200).json(housingData);
  }).catch(function(err){
    console.log(err);
    res.status(500).json('Error');
  })
});

router.get('/populationdistribution/:geocode', function(req, res){
  let geocode = req.params.geocode.toUpperCase().trim();
  coreModel.findSmallAreaPopulationAsync(geocode).then(function(result){
    let populationData = common.parseSmallAreaPopulation(result[0]);
    res.status(200).json(populationData);
  }).catch(function(err){
    console.log(err);
    res.status(500).json('Error');
  })
});


// matching never occurs if postocde path param isn't present so we dont need to check. 
router.get('/postcodes/:postcode', function(req, res){
  //postcode uppercase and remove whitespace from both ends
  var postcode = req.params.postcode.toUpperCase().trim();
  var postcodeLength = postcode.length;
  // sperate into two parts: the 2,3 or 4 character outward code(first part) and the 3 character inward code(second part)
  var postcodeParts = [postcode.substring(0, postcodeLength - 3), postcode.slice(-3)];
  var data = {};

  if(postcode.substring(0, 2) !== 'BT'){
    res.status(400).json('Northern Ireland postcodes only.');
    return;
  }

  //ons PCDS takes format: outward code + 1 space + inward code and is of variable length
  coreModel.findPostcodeAsync(postcodeParts[0] + ' ' + postcodeParts[1]).then(function(result){
    data.ons = result;
    return coreModel.findConstituencyAsync(data.ons[0].pcon);
  }).then(function(result){
    data.constituency = result;
    return coreModel.findAssemblyMembersAsync(data.constituency[0].ConstituencyId);
  }).then(function(result){
    data.assemblyMembers = result;
    res.status(200).json(data);
  }).catch(function(err){
    if(err instanceof TypeError){
      res.status(400).json('Please enter a valid Northern Ireland postcode');
      console.log(err);
    }else{
      res.status(500).json('Error');
      console.log(err);
    }
  });
});

module.exports = router;