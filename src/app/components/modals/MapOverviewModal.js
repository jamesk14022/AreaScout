import React, { Component } from 'react';
import { Grid, List, Modal } from 'semantic-ui-react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, Circle } from "react-google-maps";
import './../../../resources/css/modal.css';

const Map = withScriptjs(withGoogleMap(({ lat, long, r, items, isMarkerShown, onMarkerClick }) => (
  <GoogleMap
    defaultZoom={13}
    defaultCenter={{ lat: parseFloat(lat), lng: parseFloat(long) }}
  >
    {isMarkerShown && <Marker color='black' position={{ lat: parseFloat(lat), lng: parseFloat(long) }} />}
    <Circle center={{ lat: parseFloat(lat), lng: parseFloat(long) }} radius={ parseInt(r, 10) } strokeColor='#2f5593' />
    {items.map((item) => (
      <Marker 
        position={{ lat: parseFloat(item.geometry.coordinates[1]), lng: parseFloat(item.geometry.coordinates[0]) }} 
      />
    ))}
  </GoogleMap>
)));  

class MapOverviewModal extends Component{
  constructor(props){
  	super(props);
  	this.state = { itemMap: [] };
  }

  componentWillMount(props){
    this.categories = {
      Amenities: this.props.amenities,
      Disamenities: this.props.disamenities,
      Schools: this.props.schools,
      Crime: this.props.streetCrime
    }
    this.setState({ itemMap: this.createItemMap(this.categories) })
  }

  componentWillUpdate(prevProps){
    if(prevProps !== this.props){
      this.categories = {
        Amenities: this.props.amenities,
        Disamenities: this.props.disamenities,
        Schools: this.props.schools,
        Crime: this.props.streetCrime
      }
      this.setState({ itemMap: this.createItemMap(this.categories) })
    }
  }

  createItemMap(categories){
    let itemMap = [];
    Object.keys(categories).map((key, index) => (
      categories[key].map((item, index) => (
        itemMap.push(item)
      ))
    ))
    return itemMap;
  }
  render(){
  	let { trigger, title, long, lat, r } = this.props;
  	let { itemMap } = this.state;
    const mapURI = 'https://maps.googleapis.com/maps/api/js?key=' + process.env.REACT_APP_MAPS_API_KEY + '&v=3.exp&libraries=geometry,drawing,places';

  	return(
	  <Modal trigger={ trigger } closeIcon>
	    <Modal.Content>
	      <Grid stackable>
	      	<Grid.Row>
	      	  <Grid.Column width={5}>
	      	    <h3>{ title }</h3>
	      	  	<hr />
      	    <List className='card-list shadow popover'  divided relaxed ordered>
                {itemMap.map((item, index) => (
                  <List.Item key={ index } className='modal-list'>
                    <List.Content>
                      <List.Header as='a'>{ item.Name }</List.Header>
                      <List.Description as='a'>{ item.Type }</List.Description>
                      <div style={{ 'display': 'inline' }}></div>
                    </List.Content>
                    <List.Content floated='right'>
                      { (item.dist.calculated/1000).toFixed(2) } km
                    </List.Content>
                  </List.Item>
                ))}
			      </List>
	      	  </Grid.Column>
	      	  <Grid.Column width={11}>
              <Map
                items={ itemMap }
                r={ r }
                long={ long }
                lat={ lat }
                googleMapURL={ mapURI }
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `600px` }} />}
                mapElement={<div style={{ height: `100%` }} />}
              />
	      	  </Grid.Column>
	      	</Grid.Row>
	      </Grid>
	    </Modal.Content>
	  </Modal>
  	);
  }
}

export default MapOverviewModal;