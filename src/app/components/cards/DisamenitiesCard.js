import React, { Component } from 'react';
import ListCard from './ListCard';
import { Dimmer, Loader, Segment } from 'semantic-ui-react';
import { fetchDisamenities } from './../../modules/ApiUtils'; 
import { changeArrayPropertyNames,
         addArrayProperty,
         sortArrayAscending,
         resultsFilterDuplicates } from './../../modules/ArrayUtils';

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
    if(prevProps.long !== this.props.long || prevProps.lat !== this.props.lat){
      this.updateCard(this.props);
    }
  }

  componentDidMount(){
    this.updateCard(this.props);
  }

  render(){
    let { isLoading, disamenities } = this.state;

    if(!isLoading){
      return(
        <ListCard heading="Disamenities" items={ disamenities } />
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