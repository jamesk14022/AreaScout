var mongoose = require('mongoose');


const librarySchema = new mongoose.Schema({
  _id: { type: String },
  "StaticLibraryName": String,
  "Number": Number,
  "Street": String,
  "Town": String,
  "Postcode": String,
  "TelNo": String,
  "XCOORDINATE": Number,
  "YCOORDINATE": Number,
  geometry: {
    type: {type: String},
    'coordinates': [Number]
  }
});

const gpSchema = new mongoose.Schema({
  _id: { type: String },
  PracticeNo: Number,
  PracticeName: String,
  Address1: String,
  Address2: String,
  Address3: String, 
  Postcode: String,
  LCG: String,
  RegisteredPatients: Number,
  geometry: {
    type: {type: String},
    'coordinates': [Number]
  }
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
    type: String,
    coordinates: [Number]
  }
});

const dentistSchema = new mongoose.Schema({
  _id: { type: String },
  GDC_NO: Number,
  DENTISTNAME: String,
  ADDRESS1: String,
  ADDRESS2: String,
  ADDRESS3: String,
  ADDRESS4: String,
  POSTCODE: String,
  TELEPHONE_NO: Number,
  DENTISTTYPE: String,
  LANGUAGES: String,
  GDCLOOKUP: String,
  LCG: String,
  LGD: String,
  geometry: {
    type: {type: String},
    coordinates: [Number]
  }
});

var dentists =  mongoose.model('dentists_transformed', dentistSchema, 'dentists_transformed');
var buses =     mongoose.model('translink_bus_stops_transformed', busStopSchema, 'translink_bus_stops_transformed');
var gps =       mongoose.model('gp_practices_transformed', gpSchema, 'gp_practices_transformed');
var libraries = mongoose.model('libraries_transformed', librarySchema, 'libraries_transformed');

exports.findGPS = function(long, lat, radius, cb){
  findAmenitiesNear(gps, long, lat, radius, cb);
}

exports.findDentists = function(long, lat, radius, cb){
  findAmenitiesNear(dentists, long, lat, radius, cb);
}

exports.findBusStops = function(long, lat, radius, cb){
  findAmenitiesNear(buses, long, lat, radius, cb);
}

exports.findLibraries = function(long, lat, radius, cb){
  findAmenitiesNear(libraries, long, lat, radius, cb);
}

var findAmenitiesNear = function(model, long, lat, radius, cb){
  model.aggregate([
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