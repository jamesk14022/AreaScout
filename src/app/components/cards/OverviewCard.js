import React from 'react';
import { List, Card, Segment, Image, Label } from 'semantic-ui-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

const partyColours = new Map([
  ["Ulster Unionist Party", '#9999FF'],
  ["Sinn Féin", '#008800'],
  ["Traditional Unionist Voice", '#0095B6'],
  ["Alliance Party", '#F6CB2F'],
  ["Green Party", '#8dc63f'],
  ["Democratic Unionist Party", '#D46A4C'],
  ["Social Democratic and Labour Party", '#99FF66'],
  ["People Before Profit Alliance", '#660000'],
  ["Independent", '#e5e5e5'],
]);

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
                  <Label as='a' style={{ 'backgroundColor': partyColours.get(member.PartyName) }}>
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