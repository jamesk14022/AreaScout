import React from 'react';
import { List, Card, Image, Label } from 'semantic-ui-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { PARTY_COLOURS } from './../../constants/CardConstants';

const OverviewCard = ({ postcode, data, population }) => (
  <div id="ListCard">
    <Card>
      <Card.Content>
        <Image floated='left' size='mini'><FontAwesomeIcon className='card icon' icon={faInfoCircle} /></Image>
        <Card.Header>Overview</Card.Header>
        <Card.Meta>{ postcode }</Card.Meta>
      </Card.Content>
      <Card.Content extra>
      <List className="card-list" divided relaxed>
      {population.metrics.map((metric, index) => (
        <List.Item key={ index }>
          <List.Content floated='right'>
            { metric.value }
          </List.Content>
          <List.Content className='metric-title'>{ metric.name }</List.Content>
        </List.Item>
      ))}
        <List.Item>
          <List.Content floated='right'>
            { data.constituency[0].ConstituencyName }
          </List.Content>
          <List.Content className='metric-title'>Constituency</List.Content>
        </List.Item>
        <List.Item>
          <List.Content>
            <List.Header as='a'>Assembly Members</List.Header>
          </List.Content>
          { data.assemblyMembers.map((member, index) => (
            <List.Content key={ index } floated='right' className='politician label'>
                  <Label as='a' style={{ 'backgroundColor': PARTY_COLOURS.get(member.PartyName) }}>
                    { member.MemberFullDisplayName }
                    <Label.Detail>{ member.PartyName }</Label.Detail>
                  </Label>
            </List.Content>
          ))}
        </List.Item>
      </List>
      </Card.Content>
    </Card>
  </div>
);

export default OverviewCard;