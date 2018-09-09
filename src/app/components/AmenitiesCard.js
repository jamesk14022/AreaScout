import React, { Component } from 'react';
import ListCard from './ListCard';
import { Dimmer, Loader, Segment } from 'semantic-ui-react';
import Client from './../modules/ApiUtils'; 
import Utils from './../modules/Utils';

class AmenitiesCard extends Component{
  
  constructor(props){
  	super(props);
  	this.state = { isLoading: true };
  }

  parseAmenityData(response){
    let busStops = Utils.changeArrayPropertyNames(response.busStops.slice(0, 4), [{ oldName: 'Stop_Name', newName: 'Name' }]);
    busStops = Utils.addArrayProperty(busStops, 'Type', 'Bus Stop');

    let gps = Utils.changeArrayPropertyNames(response.GPS.slice(0, 4), [{ oldName: 'PracticeName', newName: 'Name' }]);
    gps = Utils.addArrayProperty(gps, 'Type', 'G.P');

    let dentists = Utils.changeArrayPropertyNames(response.dentists.slice(0, 4), [{ oldName: 'DENTISTNAME', newName: 'Name' }]);
    dentists = Utils.addArrayProperty(dentists, 'Type', 'Dentist');

    let libraries = Utils.changeArrayPropertyNames(response.libraries.slice(0, 4), [{ oldName: 'StaticLibraryName', newName: 'Name' }]);
    libraries = Utils.addArrayProperty(libraries, 'Type', 'Library');

    return busStops.concat(gps, dentists, libraries);
  }

  updateCard({long, lat, r}){
    this.setState({ isLoading: true });
    Client.fetchAmenities(long, lat, r).then((response) => {
      return response.json();
    }).then((content) => {
      let parsedData = this.parseAmenityData(content);
      this.setState({ amenities: parsedData, isLoading: false });
    }).catch((err) => {
      console.log(err);
    });
  }

  componentDidUpdate(prevProps){
    if(prevProps.long !== this.props.long || prevProps.lat !== this.props.lat){
      this.updateCard(this.props);
    }
  }

  componentDidMount(){
    this.updateCard(this.props);
  }

  render(){
    let { isLoading, amenities } = this.state;

    if(!isLoading){
      return(
        <ListCard heading="Amenities" items={ amenities } />
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