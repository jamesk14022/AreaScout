import React, { Component } from 'react';
import ListCard from './ListCard';
import { Dimmer, Loader, Segment } from 'semantic-ui-react';
import { fetchDisamenities } from './../../modules/ApiUtils'; 
import { changeArrayPropertyNames,
         addArrayProperty,
         sortArrayAscending,
         resultsFilterDuplicates } from './../../modules/ArrayUtils';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class DisamenitiesCard extends Component{
  
  constructor(props){
  	super(props);
  	this.state = { isLoading: true };
  }

  parseDisamenityData(response){
    let landfills = changeArrayPropertyNames(response.landfills, [{ oldName: 'properties.AuthRefHolder_31Dec2016', newName: 'Name' }]);
    landfills = addArrayProperty(landfills, 'Type', 'Landfill');
    landfills = sortArrayAscending(landfills);

    let wasteSites = changeArrayPropertyNames(response.wasteSites, [{ oldName: 'properties.LicenceHolder', newName: 'Name' }]);
    wasteSites = addArrayProperty(wasteSites, 'Type', 'Waste Site');
    wasteSites = resultsFilterDuplicates(wasteSites, 'Name');
    wasteSites = sortArrayAscending(wasteSites);

    return landfills.concat(wasteSites);
  }

  updateCard({ long, lat, r }){
    this.setState({ isLoading: true });
    fetchDisamenities(long, lat, r).then((response) => {
      return response.json();
    }).then((content) => {
      let parsedData = this.parseDisamenityData(content);
      this.setState({ disamenities: parsedData, isLoading: false });
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
    let { isLoading, disamenities } = this.state;
    let { long, lat, r } = this.props;

    if(!isLoading){
      return(
        <ListCard longitude={ long } latitude={ lat } r={ r } heading="Disamenities" items={ disamenities } icon={ <FontAwesomeIcon className='card icon' icon={ faExclamationTriangle } /> } />
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

export default DisamenitiesCard;