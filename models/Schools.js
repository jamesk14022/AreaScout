var mongoose = require('mongoose');

const schoolSchema = new mongoose.Schema({
  _id: { type: String },
  Institution_Name: String,
  Address_1: String,
  Address_2: String,
  Address_3: String,
  Town_Name: String,
  County_Name: String,
  Postcode: String,
  Institution_Type: String,
  geometry: {
    "type": String,
    "coordinates": [Number],
    index: '2dsphere'
  }
});

var schools = mongoose.model('schools_transformed', schoolSchema, 'schools_transformed');

//distance in meters
exports.findSchools = function(long, lat, radius, cb){
  schools.aggregate([
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


