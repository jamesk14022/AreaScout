import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import queryWithRouter from './../modules/queryWithRouter';
import DesktopContainer from './containers/DesktopContainer';
import MobileContainer from './containers/MobileContainer';
import { Segment, Dimmer, Loader } from 'semantic-ui-react';
import ListView from './ListView';
import Footer from './Footer';
import './../../resources/css/search.css';
import { 
  fetchOverview,
  fetchAmenities,
  fetchDisamenities,
  fetchStreetCrime,
  fetchSchools, 
  fetchPoliceNeighbourhoodDetails,
  fetchPoliceNeighbourhood,
  fetchSmallAreaAges,
  fetchSmallAreaTransport,
  fetchSmallAreaHousing,
  fetchSmallAreaPopulation
} from './../modules/ApiUtils'; 
import {
  parseAmenityData,
  parseDisamenityData,
  parseSchoolData,
  parsePoliceData
} from './../modules/DataParseUtils';
import { filterByType } from './../modules/ArrayUtils'
import { AMENITY_CHECKBOXES, DISAMENITY_CHECKBOXES } from './../constants/CardConstants';

const ResponsiveContainer = ({ children, title, breadcrumb }) => (
  <div>
    <DesktopContainer title={title} breadcrumb={breadcrumb}>{children}</DesktopContainer>
    <MobileContainer title={title} breadcrumb={breadcrumb}>{children}</MobileContainer>
  </div>
);

class Search extends Component{

  constructor(props){
    super(props);
    this.refreshData = this.refreshData.bind(this);
    this.handleRangeChange = this.handleRangeChange.bind(this);
    this.handleToggleChange = this.handleToggleChange.bind(this);
    this.filterAmenities = this.filterAmenities.bind(this);
    this.filterDisamenities = this.filterDisamenities.bind(this);
    this.uriToState = this.uriToState.bind(this);
    this.state = { isLoading: true , checkedItems: new Map() };
  }

  componentWillMount(){
    this.uriToState();
  }

  // props.location.query injected by queryWithRouter.js
  componentDidUpdate(prevProps, prevState){
    if(this.props.location.query !== prevProps.location.query){
      this.uriToState();
    }else{
      if(this.state.r !== prevState.r ){
        this.refreshData();
      }
    }
  }

  uriToState(){
    let { long, lat, r, postcode, queryString, predicted } = this.props.location.query;
    if(!long || !lat || !r || !queryString){
      this.props.dispatch(push(`/notfound`));
    }else{
      this.setState({ 
        query: queryString,
        long: parseFloat(long).toFixed(3),
        lat: parseFloat(lat).toFixed(3),
        postcode: postcode, r: parseInt(r, 10),
        predicted: predicted,
        loading: false
      }, this.refreshData);
    }
  }

  refreshData(){
    let { long, lat, r, postcode } = this.state;
    Promise.all([fetchOverview(postcode),
                 fetchAmenities(long, lat, r),
                 fetchDisamenities(long, lat, r),
                 fetchSchools(long, lat, r),
                 fetchStreetCrime(long, lat)
    ]).then((results) => {
      let data = [];
      for(let i =0; i < results.length; i++){
        data[i] = results[i].json();
      }
      Promise.all(data).then((results) => {
        this.updateNeighbourhood(long, lat, results);
      });
    }).catch((err) => (
      console.log(err)
    ));
  }

  updateNeighbourhood(long, lat, results){
    fetchPoliceNeighbourhood(long, lat).then((response) => {
      return response.json();
    }).then((content) => {
      results[4].streetCrime = results[4];
      results[4].neighbourhood = {};
      results[4].neighbourhood = content;
      return fetchPoliceNeighbourhoodDetails(results[4].neighbourhood.force, results[4].neighbourhood.neighbourhood);
    }).then((response) => {
      return response.json();
    }).then((json) => {
      results[4].neighbourhood = json;
      this.updateCensusData(results, results[0].ons[0].oa11);
    }).catch(err => console.log(err));
  }

  updateCensusData(payLoad, geocode){
    Promise.all([
      fetchSmallAreaTransport(geocode),
      fetchSmallAreaAges(geocode),
      fetchSmallAreaHousing(geocode),
      fetchSmallAreaPopulation(geocode)
    ]).then((results) => {
      let smallAreaData = [];
      for(let i = 0; i<results.length; i++){
        smallAreaData[i] = results[i].json();
      }
      Promise.all(smallAreaData).then((json) => {
        payLoad.push({
          transportDist: json[0],
          ageDist: json[1],
          housingDist: json[2],
          populationDist: json[3]
        });
        this.updateViews(payLoad);
      });
    }).catch((err) => console.log(err));
  }

  //strips amenity and disamenity data based on checkboxes ticked
  filterAmenities(amenityData){
    for(let prop in AMENITY_CHECKBOXES){
      if (AMENITY_CHECKBOXES.hasOwnProperty(prop)) {
        if(this.state.checkedItems.get(AMENITY_CHECKBOXES[prop].name) === false){
          amenityData = filterByType(amenityData, AMENITY_CHECKBOXES[prop].category);
        }
      }
    }
    return amenityData;
  }

  filterDisamenities(disamenityData){
    for(let prop in DISAMENITY_CHECKBOXES){
      if (DISAMENITY_CHECKBOXES.hasOwnProperty(prop)) {
        if(this.state.checkedItems.get(DISAMENITY_CHECKBOXES[prop].name) === false){
          disamenityData = filterByType(disamenityData, DISAMENITY_CHECKBOXES[prop].category);
        }
      }
    }
    return disamenityData;
  }

  updateViews(data){
    let { lat, long, r } = this.state;
    data[1] = parseAmenityData(data[1]);
    data[2] = parseDisamenityData(data[2]);
    data[3] = parseSchoolData(data[3]);
    data[4].streetCrime = parsePoliceData(data[4].streetCrime, lat, long, r);
    this.setState({ 
      isLoading: false,
      overviewData: data[0],
      amenityData: data[1],
      disamenityData: data[2],
      schoolsData: data[3],
      policingData: data[4],
      ageData: data[5].ageDist,
      transportData: data[5].transportDist,
      housingData: data[5].housingDist,
      populationData: data[5].populationDist
    });
  }

  handleRangeChange(value){
    this.setState({ r: value })
  }
  
  handleToggleChange(e, data){
    const item = data.name;
    const isChecked = data.checked;
    this.setState(prevState => ({ checkedItems: prevState.checkedItems.set(item, isChecked) }));
  }

  render(){
    let { long,
          lat,
          r,
          query,
          postcode,
          predicted,
          isLoading,
          overviewData,
          amenityData,
          disamenityData,
          schoolsData,
          policingData,
          ageData,
          transportData,
          housingData,
          populationData
    } = this.state;

    if(isLoading){
      return(
        <div id="Search">
        <ResponsiveContainer title='Search' breadcrumb={false}>
          <Segment style={{ 'minHeight': 300 }}>
            <Dimmer active>
              <Loader size="big" />
            </Dimmer>
          </Segment>
          <Footer />
        </ResponsiveContainer>
        </div>
      );
    }else{
      return(
        <div id="Search">
        <ResponsiveContainer title='Search' breadcrumb={false}>
          <ListView
            long={long}
            lat={lat}
            r={r}
            query={query}
            predicted={predicted}
            postcode={postcode}
            overview={overviewData}
            amenities={this.filterAmenities(amenityData)}
            disamenities={this.filterDisamenities(disamenityData)}
            schools={schoolsData}
            police={policingData}
            age={ageData}
            transport={transportData}
            housing={housingData}
            population={populationData}
            amenityToggles={AMENITY_CHECKBOXES} 
            disamenityToggles={DISAMENITY_CHECKBOXES}
            onToggleChange={this.handleToggleChange}
            onRangeChange={this.handleRangeChange} 
            checkedItems={this.state.checkedItems}/>
          <Footer />
        </ResponsiveContainer>
        </div>
      );
    }
  }

}

export default queryWithRouter(connect()(Search));