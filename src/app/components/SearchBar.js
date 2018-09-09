import React, { Component, Link } from 'react';
import Utils from './../modules/ApiUtils';
import { Form, Icon, Input } from 'semantic-ui-react';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';

class SearchBar extends Component{
  constructor(props){
  	super(props);
  	this.state = { loading: false, query: '' };
  	this.handleSubmit = this.handleSubmit.bind(this);
  	this.handleChange = this.handleChange.bind(this);
  }

  //fired when user types
  handleChange(e){
  	this.setState({ query: e.target.value });
  }


  //takes takes an address components array
  findPostcode(addressComponents){
    for(let i = 0; i<addressComponents.length; i++){
      if(addressComponents[i].types[0] === 'postal_code'){
        //regex that remove whitespace from name
        return addressComponents[i]['long_name'].replace(/\s+/, "");
      }
    }
    throw 'postcode not found';
  }

  //fired when user hits return or clicks search icon
  handleSubmit(e){
  	e.preventDefault();
  	this.setState({ loading: true });
  	this.getLongLat(this.state.query);
  }

  getLongLat(query){
  	Utils.getLongLat(query).then((response) => {
  	  console.log(response);
      const { lng, lat } = response.results[0].geometry.location;
      const postcode = this.findPostcode(response.results[0]['address_components']);
      this.props.dispatch(push(`/search?long=${encodeURIComponent(lng)}&lat=${encodeURIComponent(lat)}&postcode=${encodeURIComponent(postcode)}&r=2000`));
      this.setState({ loading: false });
  	}).catch((err) => {
  	  this.setState({ loading: false });
  	  this.warn();
  	  console.log(err);
  	});
  }

  warn(){

  }

  render(){
  	let { loading } = this.state;
    return(
      <Form onSubmit={ this.handleSubmit }>
	    <Input
	    onChange = { this.handleChange }
	    value={ this.state.query } 
	    loading={ loading ? true : false }
	    icon={<Icon onClick={ this.handleSubmit } name='search' inverted circular link />} 
	    placeholder='Search...' 
	    size='big'
		  style={{
		    width: '500px',
		    marginTop: '2em'
		  }}
	    />
      </Form>
    );
  }
}

export default connect()(SearchBar);