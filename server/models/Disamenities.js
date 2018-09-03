var mongoose = require('mongoose');

const wasteSiteSchema = new mongoose.Schema({
  _id: { type: String },
  type: String,
  properties: {
    RefID: String,
    exempt_lic_permit_No: String,
    CombinedAuthRef: String,
    Status: String,
    EWCCode: String,
    EWCCodeDescription: String,
    LicenceHolder: String,
    SiteName: String,
    SiteAddress1: String,
    SiteAddress2: String,
    SiteAddress3: String,
    SiteTown: String,
    SiteCounty: String,
    SitePostcode: String,
    XCOR: Number,
    YCOR: Number
  },
  geometry: {
    type: String,
    coordinates: [Number],
    index: '2dsphere'
  }
});

const landfillSchema = new mongoose.Schema({
  _id: { type: String },
  type: String,
  properties: {
    "AuthRef1_31Dec2016": String,
    "AuthRef2_31Dec2016": String,
    "AuthRef3_31Dec2016": String,
    "AuthRefCombine_31Dec2016": String,
    "dateAuthsign": String,
    "AuthRefHolder_31Dec2016": String,
    "landfilltype": String,
    "easting": Number,
    "northing": Number,
    "tonnesforlandfill_2016": Number
  },
  "geometry": {
    "type": String,
    "coordinates": [Number]
  }
});

var wasteSites = mongoose.model('waste_sites', wasteSiteSchema, 'waste_sites');
var landfillSites = mongoose.model('landfills', landfillSchema, 'landfills');

exports.findWasteSites = function(long, lat, radius, cb){
  wasteSites.aggregate([
    { "$geoNear": {
        "near": { 
          "type": "Point", 
          "coordinates": [long, lat]
        },
        "distanceField": "dist.calculated",
        "maxDistance": radius,
        "includeLocs": "dist.location",
        spherical: true
    }}
  ]).exec(function(err, result){
    cb(err, result);
  });
}

exports.findLandfills = function(long, lat, radius, cb){
  landfillSites.aggregate([
    { "$geoNear": {
        "near": { 
          "type": "Point", 
          "coordinates": [long, lat]
        },
        "distanceField": "dist.calculated",
        "maxDistance": radius,
        "includeLocs": "dist.location",
        spherical: true
    }}
  ]).exec(function(err, result){
    cb(err, result);
  });
}
