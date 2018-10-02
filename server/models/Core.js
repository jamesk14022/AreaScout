var mongoose = require('mongoose');

const onsSchema = new mongoose.Schema({
  pcd: String,
  pcd2: String,
  pcds: String,
  dointr: Number,
  doterm: String,
  oscty: String,
  ced: String,
  oslaua: String,
  osward: String,
  parish: String,
  usertype: Number,
  oseast1m: Number,
  osnrth1m: Number,
  osgrdind: Number,
  oshlthau: String,
  nhser: String,
  ctry: String,
  rgn: String,
  streg: Number,
  pcon: String,
  eer: String,
  teclec: String,
  ttwa: String,
  pct: String,
  nuts: String,
  statsward: String,
  oa01: String,
  casward: String,
  park: String,
  lsoa01: String,
  msoa01: String,
  ur01ind: String,
  oac01: String,
  oa11: String,
  lsoa11: String,
  msoa11: String,
  wz11: String,
  ccg: String,
  bua11: String,
  buasd11: String,
  ru11ind: String,
  oac11: String,
  lat: Number,
  long: Number,
  lep1: String,
  lep2: String,
  pfa: String,
  imd: Number,
  calncv: String,
  stp: String
});

const assemblyMemberSchema = new mongoose.Schema({
  MemberPersonId: Number,
  MemberAffiliationId: Number,
  MemberName: String,
  MemberLastName: String,
  MemberFirstName: String,
  MemberFullDisplayName: String,
  MemberSortName: String,
  MemberTitle: String,
  PartyName: String,
  PartyAbbreviation: String,
  PartyOrganisationId: Number,
  ConstituencyName: String,
  ConstituencyId: Number,
  MemberImgUrl: String,
  MemberApiName: String,
  MemberApiConstituency: String,
  ArrayCount: Number,
  ElectedDescription: String,
  MemberStartDate: String,
  MemberEndDate: String
});

const constituencySchema = new mongoose.Schema({
  ArrayCount: String,
  ConstituencyApiName: String,
  ConstituencyId: String,
  ConstituencyName: String,
  ConstituencyOnsCode: String
});

const ageSchema = new mongoose.Schema({
  "geoCode": String,
  "All": Number,
  "0-4yrs": Number,
  "5-7yrs": Number,
  "8-9yrs": Number,
  "10-14yrs": Number,
  "15yrs": Number,
  "16-17yrs": Number,
  "18-19yrs": Number,
  "20-24yrs": Number,
  "25-29yrs": Number,
  "30-44yrs": Number,
  "45-59yrs": Number,
  "60-64yrs": Number,
  "65-74yrs": Number,
  "75-84yrs": Number,
  "85-89yrs": Number,
  "90+yrs": Number,
  "Meanage": Number,
  "Medianage": Number,
  "0-4yrspc": Number,
  "5-7yrspc": Number,
  "8-9yrspc": Number,
  "10-14yrspc": Number,
  "15yrspc": Number,
  "16-17yrspc": Number,
  "18-19yrspc": Number,
  "20-24yrspc": Number,
  "25-29yrspc": Number,
  "30-44yrspc": Number,
  "45-59yrspc": Number,
  "60-64yrspc": Number,
  "65-74yrspc": Number,
  "75-84yrspc": Number,
  "85-89yrspc": Number,
  "90+yrspc": Number
});

const transportSchema = new mongoose.Schema({
  "geoCode": String,
  "countAllEmployed": Number,
  "countAllWorkFromHome": Number,
  "countTrain": Number,
  "countBus": Number,
  "countMotorcycle": Number,
  "countDriving": Number,
  "countPassenger": Number,
  "countCar": Number,
  "countTaxi": Number,
  "countBicycle": Number,
  "countOnFoot": Number,
  "countOther": Number,
  "countAllWaccessCar": Number,
  "countAllWaccessCarPublicTransport": Number,
  "countAllWoaccessCar": Number,
  "countAllWoaccessCarPublicTransport": Number,
  "percentageAllWorkFromHome": Number,
  "percentageTrain": Number,
  "percentageBus": Number,
  "percentageMotorcycle": Number,
  "percentageDriving": Number,
  "percentagePassenger": Number,
  "percentageSharedDriving": Number,
  "percentageTaxi": Number,
  "percentageBicycle": Number,
  "percentageOnFoot": Number,
  "percentageOther": Number,
  "percentageWaccessCarPublicTransport": Number,
  "percentageWoaccessCarPublicTransport": Number
});

const housingSchema = new mongoose.Schema({
  "geoCode": String,
  "CtDWELLINGSAll": Number,
  "CtDWELLINGSUnshared": Number,
  "CtDWELLINGSShared": Number,
  "CtHOUSEHOLDSAll": Number,
  "CtHOUSEHOLDSHouseholdwResidents": Number,
  "CtHOUSEHOLDSHouseholdwoResidents": Number,
  "CtHOUSEHOLDSWholeHouseDetached": Number,
  "CtHOUSEHOLDSWholeHouseSemi-detached": Number,
  "CtHOUSEHOLDSWholeHouseTerraced": Number,
  "CtHOUSEHOLDSFlatPurposeBuilt": Number,
  "CtHOUSEHOLDSFlatConvertedHouse": Number,
  "CtHOUSEHOLDSFlatCommercialBuilding": Number,
  "CtHOUSEHOLDSFlatMobileStructure": Number,
  "PcHOUSEHOLDSWholeHouseDetached": Number,
  "PcHOUSEHOLDSWholeHouseSemi-detached": Number,
  "PcHOUSEHOLDSWholeHouseTerraced": Number,
  "PcHOUSEHOLDSFlatPurposeBuilt": Number,
  "PcHOUSEHOLDSFlatConvertedHouse": Number,
  "PcHOUSEHOLDSFlatCommercialBuilding": Number,
  "PcHOUSEHOLDSFlatMobileStructure": Number
});

const populationSchema = new mongoose.Schema({
  "geoCode": String,
  "CtAll": Number,
  "CtMales": Number,
  "CtFemales": Number,
  "CtLivesHousehold": Number,
  "CtLivesCommunalEstablishment": Number,
  "PcMales": Number,
  "PcFemales": Number,
  "PcLivesHousehold": Number,
  "PcLivesCommunalEstablishment": Number
});

var ons =            mongoose.model('ons_postcode_dir', onsSchema, 'ons_postcode_dir');
var members =        mongoose.model('assembly_members', assemblyMemberSchema, 'assembly_members');
var constituencies = mongoose.model('assembly_constituencies', constituencySchema, 'assembly_constituencies');
var ages =           mongoose.model('small_area_ages', ageSchema, 'small_area_ages');
var transport =      mongoose.model('small_area_transport', transportSchema, 'small_area_transport');
var housing =        mongoose.model('small_area_housing', housingSchema, 'small_area_housing');
var population =     mongoose.model('small_area_population', populationSchema, 'small_area_population');

exports.findPostcode = function(postcode, cb){
  ons.find({ pcds: postcode }).lean().exec(function(err, result){
    cb(err, result);
  });
}

exports.findConstituency = function(onsCode, cb){
  constituencies.find({ ConstituencyOnsCode: onsCode }).lean().exec(function(err, result){
    cb(err, result);
  });
}

exports.findAssemblyMembers = function(id, cb){
  members.find({ ConstituencyId: id }).lean().exec(function(err, result){
    cb(err, result);
  });
}

exports.findSmallAreaAge = function(geoCode, cb){
  ages.find({ geoCode: geoCode }).lean().exec(function(err, result){
    cb(err, result);
  })
}

exports.findSmallAreaTransport = function(geoCode, cb){
  transport.find({ geoCode: geoCode }).lean().exec(function(err, result){
    cb(err, result);
  });
}

exports.findSmallAreaHousing = function(geoCode, cb){
  housing.find({ geoCode: geoCode }).lean().exec(function(err, result){
    cb(err, result);
  });
}

exports.findSmallAreaPopulation = function(geoCode, cb){
  population.find({ geoCode: geoCode }).lean().exec(function(err, result){
    cb(err, result);
  });
}


