const express = require('express');
const router = express.Router();
const promise = require('bluebird');
const schoolModel = require('./../models/Schools.js');
const amenityModel = require('./../models/Amenities.js');
const disamenityModel = require('./../models/Disamenities.js');
const coreModel = promise.promisifyAll(require('./../models/Core.js'));

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
  amenityModel.findBusStops(parseFloat(long), parseFloat(lat), parseInt(radius), function(err, result){
    if(err){
      res.status(500).json('Error');
      console.log(err)
    }else{
      res.status(200).json(result);
    }
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
  disamenityModel.findWasteSites(parseFloat(long), parseFloat(lat), parseInt(radius), function(err, result){
  	if(err){
      res.status(500).json('Error');
      console.log(err)
    }else{
      res.status(200).json(result);
    }
  });  
});

// matching never occurs if postocde path param isn't present so we dont need to check. 
router.get('/postcodes/:postcode', function(req, res){
  var postcode = req.params.postcode.toUpperCase();
  var data = {};

  coreModel.findPostcodeAsync(postcode).then(function(result){
    data.ons = result;
    return coreModel.findConstituencyAsync(data.ons[0].pcon);
  }).then(function(result){
    data.constituency = result;
    return coreModel.findAssemblyMembersAsync(data.constituency[0].ConstituencyId);
  }).then(function(result){
    data.assemblyMembers = result;
    res.status(200).json(data);
  }).catch(function(err){
    res.status(500).json('Error');
    console.log(err);
  });
});

module.exports = router;