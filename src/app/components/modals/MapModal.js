import React, { Component } from 'react';
import { Grid, List, Modal, Header, Image } from 'semantic-ui-react';
import Map from './../Map';
import './../../../resources/css/modal.css';

class MapModal extends Component{
  constructor(props){
  	super(props);
  	this.focusListItem = this.focusListItem.bind(this);
  	// array of refs, each a dom node added by the callback ref method
  	this.listItems = [];
  	this.state = {};
  }

  focusListItem(index){
  	this.setState({ listFocus: index });
  	this.listItems[index].scrollIntoView({block: "center"});
  }

  render(){
  	let { items, trigger, title, longitude, latitude, r } = this.props;
  	let { listFocus } = this.state;
  	return(
	  <Modal trigger={ trigger } closeIcon>
	    <Modal.Content>
	      <Grid stackable>
	      	<Grid.Row>
	      	  <Grid.Column width={5}>
	      	    <h3>{ title }</h3>
	      	  	<hr />
      	  	      <List className='card-list shadow popover'  divided relaxed ordered>
			        {items.map((item, index) => (
			          <List.Item key={ index } className={ (listFocus === index) ? 'modal-list focused' : 'modal-list' }>
			            <List.Content>
			              <List.Header as='a'>{ item.Name }</List.Header>
			              <List.Description as='a'>{ item.Type }</List.Description>
			              <div style={{ 'display': 'inline' }} ref={ (ref) => this.listItems[index] = ref }></div>
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
      	  	      	onMarkerClick={ this.focusListItem }
			        isMarkerShown={ false }
			        r={ r }
			        items={ items }
			        longitude={ longitude }
			        latitude={ latitude }
			        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCg25YDGx7CqI0tCHiZermsRveElipQjWs&v=3.exp&libraries=geometry,drawing,places"
			        loadingElement={<div style={{ height: `100%` }} />}
			        containerElement={<div style={{ height: `500px` }} />}
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

export default MapModal;