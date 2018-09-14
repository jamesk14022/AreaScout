import React, { Component } from 'react';
import { Dimmer, Loader, List, Card, Segment } from 'semantic-ui-react';
import { fetchStreetCrime, fetchPoliceNeighbourhood, fetchPoliceNeighbourhoodDetails } from './../../modules/ApiUtils'; 

class PoliceCard extends Component{
  
  constructor(props){
  	super(props);
  	this.state = { policing: {}, isLoading: true };
  }

  updateCard({ long, lat }){
    let data = {}; 

    this.setState({ isLoading: true });
    fetchStreetCrime(long, lat).then((response) => {
      return response.json();
    }).then((content) => {
      data.streetCrime = content;
      return fetchPoliceNeighbourhood(long, lat);
    }).then((response) => {
      return response.json();
    }).then((content) => {
      data.neighbourhood = content;
      return fetchPoliceNeighbourhoodDetails(data.neighbourhood.force, data.neighbourhood.neighbourhood);
    }).then((response) => {
      return response.json();
    }).then((content) => {
      data.neighbourhood = content;
      console.log(data);
      this.setState({ policing: data, isLoading: false });
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
    let { isLoading } = this.state;


    if(!isLoading){
      return(
        <div id="ListCard">
          <Card>
            <Card.Content>
              <Card.Header>Police Data</Card.Header>
              <Card.Meta>{this.state.policing.neighbourhood.description.replace(/<(?:.|\n)*?>/gm, '')}</Card.Meta>
            </Card.Content>
            <Card.Content extra>
              <List className="card-list" divided relaxed>
                {this.state.policing.streetCrime.map((crime, index) => (
                  <List.Item key={ index }>
                    <List.Icon name='github' size='large' verticalAlign='middle' />
                    <List.Content>
                      <List.Header as='a'>{ crime.category }</List.Header>
                      <List.Description as='a'>
                        { (crime.location.street.name == 'On or near ') ? '' :  crime.location.street.name }
                      </List.Description>
                    </List.Content>
                    <List.Content floated='right'>
                      1 km
                    </List.Content>
                  </List.Item>
                ))}
              </List>
            </Card.Content>
          </Card>
        </div>
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

export default PoliceCard;