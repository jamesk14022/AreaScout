import React, { Component } from 'react';
import ListCard from './ListCard';
import { Dimmer, Loader, Segment } from 'semantic-ui-react';
import { fetchAmenities } from './../../modules/ApiUtils'; 
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { changeArrayPropertyNames, addArrayProperty, sortArrayAscending } from './../../modules/ArrayUtils';

class AmenitiesCard extends Component{
  
  constructor(props){
  	super(props);
  	this.state = { isLoading: true };
  }

  parseAmenityData(response){
    let busStops = changeArrayPropertyNames(response.busStops, [{ oldName: 'Stop_Name', newName: 'Name' }]);
    busStops = addArrayProperty(busStops, 'Type', 'Bus Stop');

    let gps = changeArrayPropertyNames(response.GPS, [{ oldName: 'PracticeName', newName: 'Name' }]);
    gps = addArrayProperty(gps, 'Type', 'G.P');

    let dentists = changeArrayPropertyNames(response.dentists, [{ oldName: 'DENTISTNAME', newName: 'Name' }]);
    dentists = addArrayProperty(dentists, 'Type', 'Dentist');

    let libraries = changeArrayPropertyNames(response.libraries, [{ oldName: 'StaticLibraryName', newName: 'Name' }]);
    libraries = addArrayProperty(libraries, 'Type', 'Library');

    let result = busStops.concat(gps, dentists, libraries);
    result = sortArrayAscending(result);
    return result;
  }

  updateCard({long, lat, r}){
    this.setState({ isLoading: true });
    fetchAmenities(long, lat, r).then((response) => {
      return response.json();
    }).then((content) => {
      let parsedData = this.parseAmenityData(content);
      console.log(parsedData);
      this.setState({ amenities: parsedData, isLoading: false });
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

  render(){
    let { isLoading, amenities } = this.state;
    let { long, lat, r } = this.props;

    if(!isLoading){
      return(
        <ListCard longitude={ long } latitude={ lat } r={ r } heading="Amenities" items={ amenities } icon={ <FontAwesomeIcon className='card icon' icon={ faUsers } /> } />
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

export default AmenitiesCard;