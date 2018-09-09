import React, { Component } from 'react';
import ListCard from './ListCard';
import { Dimmer, Loader, Segment } from 'semantic-ui-react';
import Client from './../modules/ApiUtils'; 
import Utils from './../modules/Utils';

class SchoolsCard extends Component{
  
  constructor(props){
  	super(props);
  	this.state = { isLoading: true };
  }

  parseSchoolData(response){
    let schools = Utils.changeArrayPropertyNames(response.slice(0, 5), [{ oldName: 'Institution_Name', newName: 'Name' }]);
    schools =  Utils.changeArrayPropertyNames(schools, [{ oldName: 'Institution_Type', newName: 'Type' }]);
    return schools;
  }

  updateCard({ long, lat, r }){
    this.setState({ isLoading: true });
    Client.fetchSchools(long, lat, r).then((response) => {
      return response.json();
    }).then((content) => {
      let schools = this.parseSchoolData(content);
      this.setState({ schools: schools, isLoading: false });
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
    let { isLoading, schools } = this.state;

    if(!isLoading){
      return(
        <ListCard heading="Schools" items={ schools } />
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

export default SchoolsCard;