var mongoose = require('mongoose');

const librarySchema = new mongoose.Schema({
  _id: { type: String },
  'Static Library Name': String,
  Number: Number,
  Street: String,
  Town: String,
  Postcode: String,
  'X COORDINATE': Number,
  'Y COORDINATE': Number
});

const gpSchema = new mongoose.Schema({
  _id: { type: String },
  'Practice Name': String,
  Address1: String,
  Address2: String,
  Address3: String, 
  Postcode: String,
  LCG: String,
  'Registered Patients': Number
});

const busStopSchema = new mongoose.Schema({
  _id: { type: String },
  Latitude: Number,
  Longitude: Number,
  Easting: Number,
  Northing: Number,
  Stop_Name: String,
  DepotOpsArea: String,
  ServiceDirection: String,
  geometry: {
    "type": String,
    "coordinates": [Number],
    index: '2dsphere'
  }
});

var buses = mongoose.model('translink_bus_stops_transformed', busStopSchema, 'translink_bus_stops_transformed');

exports.findBusStops = function(long, lat, radius, cb){
  buses.aggregate([
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
    if(err){
      console.log(err)
    }else{
      cb(result);
    }
  });
}