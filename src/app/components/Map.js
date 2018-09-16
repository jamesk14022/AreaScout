import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, Circle } from "react-google-maps";
import { MarkerClusterer } from 'react-google-maps/lib/components/addons/MarkerClusterer';

class Map extends Component{
  render(){
    let { latitude, longitude, r, items, isMarkerShown, onMarkerClick } = this.props;
    return(
      <GoogleMap
        defaultZoom={13}
        defaultCenter={{ lat: parseFloat(latitude), lng: parseFloat(longitude) }}
      >
        {isMarkerShown && <Marker color='black' position={{ lat: parseFloat(latitude), lng: parseFloat(longitude) }} />}
        <Circle center={{ lat: parseFloat(latitude), lng: parseFloat(longitude) }} radius={ parseInt(r) } strokeColor='#2f5593' />
        {items.map((item) => (
          <Marker 
            label={ (items.indexOf(item)+1).toString() }
            key={ items.indexOf(item) }
            position={{ lat: parseFloat(item.geometry.coordinates[1]), lng: parseFloat(item.geometry.coordinates[0]) }} 
            onClick={ () => { onMarkerClick(items.indexOf(item)) } }
          />
        ))}
      </GoogleMap>
    );
  }
}


export default withScriptjs(withGoogleMap(Map));