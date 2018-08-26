const express = require('express');
const router = express.Router();
const schoolModel = require('./../models/Schools.js');
const amenityModel = require('./../models/Amenities.js');
const disamenityModel = require('./../models/Disamenities.js');
const coreModel = require('./../models/Core.js');

router.get('/schools', function(req, res){
  var long = req.query.long;
  var lat = req.query.lat;
  var radius = req.query.r;

  if(!long || !lat || !radius){
    res.status(400).json('Missing latitude, longitude or radius(r) value in your schools query');
    return;
  }
  schoolModel.findSchools(parseFloat(long), parseFloat(lat), parseInt(radius), function(result){
  	res.status(200).json(result);
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
  amenityModel.findBusStops(parseFloat(long), parseFloat(lat), parseInt(radius), function(result){
  	res.status(200).json(result);
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
  disamenityModel.findWasteSites(parseFloat(long), parseFloat(lat), parseInt(radius), function(result){
  	res.status(200).json(result);
  });  
});

// matching never occurs if postocde path param isn't present so we dont need to check. 
router.get('/postcodes/:postcode', function(req, res){
  var postcode = req.params.postcode.toUpperCase();
  var data = {};

  coreModel.findPostcode(postcode, function(result){
    data.ons = result;
  coreModel.findConstituency(data.ons[0].pcon, function(result){
    data.constituency = result;
  coreModel.findAssemblyMembers(data.constituency[0].ConstituencyId, function(result){
    data.assemblyMembers = result;
    res.status(200).json(data)
  });
  });
  });

  
});

module.exports = router;