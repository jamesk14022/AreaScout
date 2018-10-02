import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, Circle } from "react-google-maps";
import { Segment, Icon, List, Grid } from 'semantic-ui-react';
import { Button } from 'semantic-ui-react';
import MapControl from './MapControl';
import SearchBar from './SearchBar';
import OverviewCard from './cards/OverviewCard';

import './../../resources/css/mapview.css';

const mapOptions = {
  mapTypeControl: false, 
  fullscreenControl: false
}

const Map = withScriptjs(withGoogleMap(({ long, lat, r, query, toggleView, items, google = window.google }) => (
  <GoogleMap
    defaultZoom={13}
    google={google}
    options={mapOptions}
    defaultCenter={{ lat: parseFloat(lat), lng: parseFloat(long) }}
  >
    <Marker position={{ lat: parseFloat(lat), lng: parseFloat(long) }} />
    <Circle center={{ lat: parseFloat(lat), lng: parseFloat(long) }} radius={ parseInt(r) } strokeColor='#2f5593' />
    <MapControl position={google.maps.ControlPosition.TOP_LEFT}>  
      <div className='sidePanel'>
        <SearchBar defaultValue={ query } width='300px' />
        <hr />
        <List className='card-list shadow popover' divided relaxed ordered></List>
      </div>
    </MapControl>
    <MapControl position={google.maps.ControlPosition.TOP_RIGHT}>
    <div className="viewToggles"> 
      <Button floated='right' icon primary size='big'><Icon name='map marker alternate' />Filter</Button>
      <Button onClick={ toggleView } floated='right' icon primary size='big'><Icon name='list' />List View</Button>
      <Button floated='right' icon primary size='big'><Icon name='map marker alternate' />Map View</Button>
    </div>
    </MapControl>
  </GoogleMap>
)));

class MapView extends Component{
  constructor(props){
  	super(props);
  }

  render(){
  	const { long, lat, r, query, postcode, toggleView, items } = this.props;
  	return(
  	  <div id='MapView'>
        <Map
          toggleView={ toggleView }
          item={ items }
          r={ r }
          long={ long }
          lat={ lat }
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCg25YDGx7CqI0tCHiZermsRveElipQjWs&v=3.exp&libraries=geometry,drawing,places"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `600px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        >
        </Map>
        <Grid>
          <Grid.Row>
            <Grid.Column width={4}>
              <OverviewCard postcode={ postcode } /> 
            </Grid.Column>  
            <Grid.Column width={12}>
              <OverviewCard postcode={ postcode } /> 
            </Grid.Column>
          </Grid.Row>
        </Grid>
  	  </div>
  	);
  }
}
export default MapView;