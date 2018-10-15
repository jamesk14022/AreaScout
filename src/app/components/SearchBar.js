import React, { Component } from 'react';
import { getLongLat } from './../modules/ApiUtils';
import { Form, Icon, Input, Label } from 'semantic-ui-react';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';

class SearchBar extends Component{
  constructor(props){
  	super(props);
  	this.state = { loading: false, query: '', invalidAddress: false };
  	this.handleSubmit = this.handleSubmit.bind(this);
  	this.handleChange = this.handleChange.bind(this);
    this.getLongLat = this.getLongLat.bind(this);
  }

  //fired when user types
  handleChange(e){
  	this.setState({ query: e.target.value });
  }

  getPredictedAddressString(addressComponents){
    let predicted = '';
    for(let i =0; i<addressComponents.length; i++){
      predicted += addressComponents[i]['long_name'] + ', ';
    }
    return predicted.substring(0, predicted.length-2);
  }

  //takes takes an address components array
  findPostcode(addressComponents){
    for(let i = 0; i<addressComponents.length; i++){
      if(addressComponents[i].types[0] === 'postal_code'){
        //regex that remove whitespace from name
        return addressComponents[i]['long_name'].replace(/\s+/, "");
      }
    }
    return false;
  }

  //fired when user hits return or clicks search icon
  handleSubmit(e){
  	e.preventDefault();
  	this.setState({ loading: true });
  	this.getLongLat(this.state.query);
  }

  getLongLat(query){
  	getLongLat(query).then((response) => {
      const result = response.results[0];
      const { lng, lat } = result.geometry.location;
      const predictedAddress = this.getPredictedAddressString(result['address_components']);
      const postcode = this.findPostcode(result['address_components']);
      if(postcode && postcode.substring(0,2).toUpperCase().trim() == 'BT' ){
        this.setState({ loading: false, invalidAddress: false });
        const uri = `/search?long=${encodeURIComponent(lng)}&lat=${encodeURIComponent(lat)}&postcode=${encodeURIComponent(postcode)}&queryString=${encodeURIComponent(this.state.query)}&predicted=${encodeURIComponent(predictedAddress)}&r=2000`;
        this.props.dispatch(push(uri));
      }else{
        this.setState({ loading: false, invalidAddress: true })
      }
  	}).catch((err) => {
  	  this.setState({ loading: false, invalidAddress: true });
  	  console.log(err);
  	});
  }

  render(){
  	let { loading, invalidAddress } = this.state;
    let { mobile, defaultValue, width = '500px', size } = this.props;

    return(
      <Form onSubmit={ this.handleSubmit }>
        <Form.Field>
    	    <Input
            defaultValue={ defaultValue }
      	    onChange = { this.handleChange }
      	    loading={ loading ? true : false }
      	    icon={<Icon onClick={ this.handleSubmit } name='search' inverted circular link />} 
      	    placeholder='Search...' 
      	    size={ size || 'huge' }
      		  style={{
      		    width: mobile ? '95%' : width,
              marginTop: '30px'
      		  }}
    	    />
          {(invalidAddress) ?
            <Label size='big' color='red' pointing>Please enter a valid Northern Ireland address!</Label>
          : ''}
        </Form.Field>
      </Form>
    );
  }
}

export default connect()(SearchBar);