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
    'coordinates': [Number]
  }
});

var dentists = mongoose.model('dentists', dentistSchema, 'dentists');
var dentists_transformed = mongoose.model('dentists_transformed', dentistSchema, 'dentists_transformed');

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
  max = 150;
  var rand = Math.floor(Math.random() * (max - min + 1) + min); //Generate Random number between min - max
  setTimeout(geo, rand*2500);
});

var insert = function(new_den, coords){
  var dentist = new dentists_transformed();
	dentist._id = mongoose.Types.ObjectId();
  dentist.GDC_NO = new_den["GDC_NO"];
  dentist.DENTISTNAME = new_den["DENTISTNAME"];
  dentist.ADDRESS1 = new_den["ADDRESS1"];
  dentist.ADDRESS2 = new_den["ADDRESS2"];
  dentist.ADDRESS3 = new_den["ADDRESS3"];
  dentist.ADDRESS4 = new_den["ADDRESS4"];
  dentist.POSTCODE = new_den["POSTCODE"];
  dentist.TELEPHONE_NO = new_den["TELEPHONE_NO"];
  dentist.DENTISTTYPE = new_den["DENTISTTYPE"];
  dentist.LANGUAGES = new_den["LANGUAGES"];
  dentist.GDCLOOKUP = new_den["GDCLOOKUP"];
  dentist.LCG = new_den["LCG"];
  dentist.LGD = new_den["LGD"];
  dentist.geometry = {
    type: 'Point',
    'coordinates': coords
  };

  dentist.save(function(err, fluffy){
	  if(err){
	    console.log('saving err ' + err);
	  }else{
	  	console.log('uploaded anotha');
	  }
	});
};

dentists.find({}, function(err, DS){
	DS.map(function(D){
      var address = D.ADDRESS1 + ' ' + D.ADDRESS2 + ' ' + D.ADDRESS3 + ' ' + D.ADDRESS4 + ' ' + D.POSTCODE;
	  addressToLatLong(address).then(function(response){
	  	insert(D, [response.json.results[0].geometry.location.lng, response.json.results[0].geometry.location.lat]);
	  }).catch(function(err){
	  	console.log('promise err ' + err);
	  });
	});
});
