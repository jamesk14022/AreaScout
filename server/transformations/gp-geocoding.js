var mongoose = require('mongoose');
var promise = require('bluebird');

 const options = {
    autoIndex: false, // Don't build indexes
    reconnectTries: 100, // Never stop trying to reconnect
    reconnectInterval: 500, // Reconnect every 500ms
    poolSize: 10, // Maintain up to 10 socket connections
    // If not connected, return errors immediately rather than waiting for reconnect
    bufferMaxEntries: 0
  };  

mongoose.connect('mongodb://heroku_6kd5v6r3:k940aoraacrtpvkpg1ablhqvcj@ds225382.mlab.com:25382/heroku_6kd5v6r3', options);
mongoose.connection.on('open', function() { 
  console.log('connect open');
});

var NodeGeocoder = require('node-geocoder');
 
var geoOptions = {
  provider: 'google',
 
  // Optional depending on the providers
  httpAdapter: 'https', // Default
  apiKey: 'AIzaSyCg25YDGx7CqI0tCHiZermsRveElipQjWs', // for Mapquest, OpenCage, Google Premier
  formatter: null         // 'gpx', 'string', ...
};

var geocoder = NodeGeocoder(geoOptions);

const gpSchema = new mongoose.Schema({
  _id: { type: String },
  'Practice No': Number,
  PracticeNo: Number,
  'Practice Name': String,
  PracticeName: String,
  Address1: String,
  Address2: String,
  Address3: String, 
  Postcode: String,
  LCG: String,
  'Registered Patients': Number,
  RegisteredPatients: Number,
  geometry: {
  	type: {type: String},
    'coordinates': [Number]
  }
});


var gps = mongoose.model('gp_practices', gpSchema, 'gp_practices');
var gps_transformed = mongoose.model('gp_practices_transformed', gpSchema, 'gp_practices_transformed');

var addressToLatLong = promise.promisify(function(address, cb){

  var geo = function(){
      // Using callback
	  geocoder.geocode(address, function(err, res) {
		cb(err, res);
	  });
  }

  var min = 2,
  max = 25;
  var rand = Math.floor(Math.random() * (max - min + 1) + min); //Generate Random number between 5 - 10
  setTimeout(geo, rand * 1500);
});

var insert = function(GP, coords){
  	var practice = new gps_transformed();
	  practice._id = mongoose.Types.ObjectId();
    practice.PracticeNo = GP["Practice No"];
	  practice.PracticeName = GP["Practice Name"];
    practice.Address1 = GP["Address1"];
    practice.Address2 = GP["Address2"];
    practice.Address3 = GP["Address3"];
    practice.Postcode = GP["Postcode"];
    practice.LCG = GP["LCG"],
    practice.RegisteredPatients = GP["Registered Patients"];
    practice.geometry = {
      type: 'Point',
      'coordinates': coords
    };

    practice.save(function(err, fluffy){
	  if(err){
	    console.log('saving err ' + err);
	  }else{
	  	console.log('uploaded anotha');
	  }
	});
};

gps.find({}, function(err, GPS){
	GPS.map(function(GP){
      var address = GP.Address1 + ' ' + GP.Address2 + ' ' + GP.Address3 + ' ' + GP.Postcode;
	  addressToLatLong(address).then(function(result){
	  	insert(GP, [result[0].longitude, result[0].latitude]);
	  }).catch(function(err){
	  	console.log('promise err ' + err);
	  });
	});
});

