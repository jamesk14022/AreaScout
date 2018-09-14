import React, { Component } from 'react';
import { Dimmer, Loader, List, Card, Segment } from 'semantic-ui-react';
import { fetchOverview } from './../../modules/ApiUtils'; 

class OverviewCard extends Component{
  
  constructor(props){
  	super(props);
  	this.state = { isLoading: true };
  }

  updateCard({ postcode }){
    this.setState({ isLoading: true });
    fetchOverview(postcode).then((response) => {
      return response.json();
    }).then((content) => {
      console.log(content);
      this.setState({ overview: content, isLoading: false });
    }).catch((err) => {
      console.log(err);
    });
  }

  componentDidUpdate(prevProps){
    if(prevProps.postcode !== this.props.postcode || prevProps.postcode !== this.props.postcode){
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
              <Card.Header>Overview</Card.Header>
              <Card.Meta>{this.props.postcode}</Card.Meta>
            </Card.Content>
            <Card.Content extra>
            <List className="card-list" divided relaxed>
              <List.Item>
                <List.Icon name='github' size='large' verticalAlign='middle' />
                <List.Content>
                  <List.Header as='a'>{this.state.overview.constituency[0].ConstituencyName}</List.Header>
                  <List.Description as='a'>{this.state.overview.constituency[0].ConstituencyId}</List.Description>
                </List.Content>
                <List.Content floated='right'>
                    {this.state.overview.constituency[0].ConstituencyName}
                </List.Content>
              </List.Item>
              <List.Item>
                <List.Icon name='github' size='large' verticalAlign='middle' />
                <List.Content>
                  <List.Header as='a'>Assembly Members</List.Header>
                  <List.Description as='a'>Type</List.Description>
                </List.Content>
                {this.state.overview.assemblyMembers.map((member, index) => (
                  <List.Content key={ index } floated='right'>
                    {member.MemberFullDisplayName}
                  </List.Content>
              ))}
              </List.Item>
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

export default OverviewCard;