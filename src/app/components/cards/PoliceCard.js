import React, { Component } from 'react';
import { Button, Dimmer, Loader, List, Card, Segment, Image } from 'semantic-ui-react';
import { fetchStreetCrime, fetchPoliceNeighbourhood, fetchPoliceNeighbourhoodDetails } from './../../modules/ApiUtils'; 
import { getDistanceFromLatLon } from './../../modules/GeoUtils';
import { sortArrayAscending, sliceArrayByDistance } from './../../modules/ArrayUtils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSchool, faExclamationTriangle, faUsers, faGavel } from '@fortawesome/free-solid-svg-icons';
import MapModal from './../modals/MapModal';
import ListCard from './ListCard';

class PoliceCard extends Component{
  
  constructor(props){
  	super(props);
  	this.state = { policing: {}, isLoading: true };
  }

  updateCard({ long, lat, r }){
    let data = {}; 
    this.setState({ isLoading: true });

    fetchStreetCrime(long, lat).then((response) => {
      return response.json();
    }).then((content) => {
      data.streetCrime = this.addCrimeDistance(content, lat, long);
      data.streetCrime = sortArrayAscending(data.streetCrime);
      data.streetCrime = sliceArrayByDistance(data.streetCrime, r/1000);
      return fetchPoliceNeighbourhood(long, lat);
    }).then((response) => {
      return response.json();
    }).then((content) => {
      data.neighbourhood = content;
      return fetchPoliceNeighbourhoodDetails(data.neighbourhood.force, data.neighbourhood.neighbourhood);
    }).then((response) => {
      return response.json();
    }).then((content) => {
      data.neighbourhood = content;
      console.log(data);
      this.setState({ policing: data, isLoading: false });
    }).catch((err) => {
      console.log(err);
    });
  }

  componentDidUpdate(prevProps){
    if(prevProps.long !== this.props.long || prevProps.lat !== this.props.lat || prevProps.r !== this.props.r){
      this.updateCard(this.props);
    }
  }

  componentDidMount(){
    this.updateCard(this.props);
  }

  addCrimeDistance(streetCrimeArray, lat, lon){
    for(let i = 0; i<streetCrimeArray.length; i++){
      let crimeLat = parseFloat(streetCrimeArray[i]['location']['latitude']);
      let crimeLon = parseFloat(streetCrimeArray[i]['location']['longitude']);
      streetCrimeArray[i]['dist'] = {};
      let distBetweenPoints = getDistanceFromLatLon(lat, lon, crimeLat, crimeLon)*1000;
      streetCrimeArray[i]['dist']['calculated'] = distBetweenPoints.toFixed(2);
    }
    return streetCrimeArray;
  }

  transposeProperties(array){
    for(let i = 0; i < array.length; i++){
      array[i]['Name'] = array[i]['category'];
      array[i]['Type'] = array[i]['location']['street']['name'] === 'On or near ' ? '' :  array[i]['location']['street']['name'];
      array[i]['geometry'] = {};
      array[i]['geometry']['coordinates'] = [array[i]['location']['longitude'], array[i]['location']['latitude']];
    }
    return array;
  }

  render(){
    let { isLoading } = this.state;
    let { long, lat, r } = this.props;
    if(!isLoading){
      return(
        <ListCard 
          subheading={ this.state.policing.neighbourhood.description.replace(/<(?:.|\n)*?>/gm, '') }
          icon={<FontAwesomeIcon className='card icon' icon={faGavel} />}
          heading='Police Data'
          longitude={ long }
          latitude={ lat }
          r={ r }
          items={ this.transposeProperties(this.state.policing.streetCrime) }
        />
      );
    }else{
      return(
        <Segment style={{ 'minHeight': 300 }}>
        <Dimmer active>
          <Loader size="big" />
        </Dimmer>
        </Segment>
      );
    }
  }
}

export default PoliceCard;