import React, { Component } from 'react';
import ListCard from './ListCard';
import { Dimmer, Loader, Segment } from 'semantic-ui-react';
import { fetchSchools } from './../../modules/ApiUtils'; 
import { changeArrayPropertyNames, sortArrayAscending } from './../../modules/ArrayUtils';
import { faSchool } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class SchoolsCard extends Component{
  
  constructor(props){
  	super(props);
  	this.state = { isLoading: true };
  }

  parseSchoolData(response){
    let schools = changeArrayPropertyNames(response, [{ oldName: 'Institution_Name', newName: 'Name' }]);
    schools =  changeArrayPropertyNames(schools, [{ oldName: 'Institution_Type', newName: 'Type' }]);
    schools = sortArrayAscending(schools);
    return schools;
  }

  updateCard({ long, lat, r }){
    this.setState({ isLoading: true });
    fetchSchools(long, lat, r).then((response) => {
      return response.json();
    }).then((content) => {
      let schools = this.parseSchoolData(content);
      this.setState({ schools: schools, isLoading: false });
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
    let { isLoading, schools } = this.state;
    let { long, lat, r } = this.props;

    if(!isLoading){
      return(
        <ListCard longitude={ long } latitude={ lat } r={ r } heading="Schools" items={ schools } icon={ <FontAwesomeIcon className='card icon' icon={ faSchool } /> } />
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