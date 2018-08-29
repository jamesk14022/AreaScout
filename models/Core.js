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

var ons =            mongoose.model('ons_postcode_dir', onsSchema, 'ons_postcode_dir');
var members =        mongoose.model('assembly_members', assemblyMemberSchema, 'assembly_members');
var constituencies = mongoose.model('assembly_constituencies', constituencySchema, 'assembly_constituencies');

exports.findPostcode = function(postcode, cb){
  ons.find({ pcds: postcode }).lean().exec(function(err, result){
    console.log(result);
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




