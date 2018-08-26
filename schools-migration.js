var mongoose = require('mongoose');
mongoose.connect('mongodb://heroku_6kd5v6r3:k940aoraacrtpvkpg1ablhqvcj@ds225382.mlab.com:25382/heroku_6kd5v6r3');

const busStopSchema = new mongoose.Schema({
  _id: { type: String },
  Latitude: Number,
  Longitude: Number,
  Easting: Number,
  Northing: Number,
  Stop_Name: String,
  DepotOpsArea: String,
  ServiceDirection: String
});

var bus = mongoose.model('translink_bus_stops', busStopSchema, 'translink_bus_stops');

var i = 0;
console.log('Starting schema update.');

// schools.find( { type : { $exists : false } } ).exec((err, sch) => {
//   if(err) console.log(err);
//   console.log(sch.length);
//   sch.forEach((doc) => {
//   doc.coordinates = [doc.Longitude, doc.Latitude];
//   doc.type = 'Point';

//   // Remove old properties
//   delete doc.Longitude;
//   delete doc.Latitude;
//   delete doc.__v

//   // Save the updated document
//   doc.save(function(err){
//     if(err){
//        console.log(err);
//        return;
//     }
//       i++;
//       console.log(i.toString() + ' documents updated.');
//   });
//   });
// });

bus.aggregate([
  { '$project': {
  Easting: '$Easting',
  Northing: '$Northing',
  Stop_Name: '$Stop_Name',
  DepotOpsArea: '$DepotOpsArea',
  ServiceDirection: '$ServiceDirection',
  'geometry': {
    'type': { '$literal': 'Point' },
    'coordinates': [ '$Longitude', '$Latitude' ]
  }
  }},
  { '$out': 'translink_bus_stops_transformed' }
]).exec(function(err,data) {
        if (err) {
            console.error(err);
        } else {
            console.log("Done transforming.");
        }
    });