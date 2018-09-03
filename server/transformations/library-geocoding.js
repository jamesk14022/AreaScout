var mongoose = require('mongoose');
var promise = require('bluebird');
var googleMapsClient = require('@google/maps').createClient({
  key: 'AIzaSyCg25YDGx7CqI0tCHiZermsRveElipQjWs'
});

 const options = {
    autoReconnect : true,
    autoIndex: false, // Don't build indexes
    reconnectTries: 100, // Never stop trying to reconnect
    reconnectInterval: 500, // Reconnect every 500ms
    poolSize: 300, // Maintain up to 10 socket connections
  };  

mongoose.connect('mongodb://heroku_6kd5v6r3:k940aoraacrtpvkpg1ablhqvcj@ds225382.mlab.com:25382/heroku_6kd5v6r3', options);
mongoose.connection.on('open', function() { 
  console.log('connect open');
});


const librarySchema = new mongoose.Schema({
  _id: { type: String },
  "Static Library Name": String,
  "StaticLibraryName": String,
  "Number": Number,
  "Street": String,
  "Town": String,
  "Postcode": String,
  "Tel No": String,
  "TelNo": String,
  "X COORDINATE": Number,
  "XCOORDINATE": Number,
  "Y COORDINATE": Number,
  "YCOORDINATE": Number,
  geometry: {
  	type: {type: String},
    'coordinates': [Number]
  }
});

var libraries = mongoose.model('libraries', librarySchema, 'libraries');
var libraries_transformed = mongoose.model('libraries_transformed', librarySchema, 'libraries_transformed');

var addressToLatLong = promise.promisify(function(address, cb){
  var geo = function(){
    // Geocode an address.
    googleMapsClient.geocode({
      address: address
    }, function(err, response) {
      cb(err, response);
    });
  }

  // this is important aso that we dont overload api - especially the 2500 multiplier on rand 
  var min = 1,
  max = 170;
  var rand = Math.floor(Math.random() * (max - min + 1) + min); //Generate Random number between min - max
  setTimeout(geo, rand*3000);
});

var insert = function(new_lib, coords){
  var library = new libraries_transformed();
	library._id = mongoose.Types.ObjectId();
  library.StaticLibraryName = new_lib['Static Library Name'];
  library.Number = new_lib['Number'];
  library.Street = new_lib['Street'];
  library.Town = new_lib['Town'];
  library.Postcode = new_lib['Postcode'];
  library.TelNo = new_lib['Tel No'];
  library.XCOORDINATE = new_lib['X COORDINATE'];
  library.YCOORDINATE = new_lib['Y COORDINATE'];
  library.geometry = {
    type: 'Point',
    'coordinates': coords
  };

  library.save(function(err, fluffy){
	  if(err){
	    console.log('saving err ' + err);
	  }else{
	  	console.log('uploaded anotha');
	  }
	});
};

libraries.find({}, function(err, DS){
	DS.map(function(D){
      var address = D.Number + ' ' + D.Street + ' ' + D.Town + ' ' + D.POSTCODE;
	  addressToLatLong(address).then(function(response){
	  	insert(D, [response.json.results[0].geometry.location.lng, response.json.results[0].geometry.location.lat]);
	  }).catch(function(err){
	  	console.log('promise err ' + err);
	  });
	});
});
