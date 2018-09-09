 import React from 'react';
import { Card, List } from 'semantic-ui-react';
import './../../resources/css/listcard.css';

const ListCard = ({ heading, items}) => (
<div id="ListCard">
  <Card>
    <Card.Content>
      <Card.Header>{ heading }</Card.Header>
      <Card.Meta>{ items.length } { heading } found Nearby</Card.Meta>
    </Card.Content>
    <Card.Content extra>
    <List className="card-list" divided relaxed>
      {items.map((item, index) => (
        <List.Item key={ index }>
          <List.Icon name='github' size='large' verticalAlign='middle' />
          <List.Content>
            <List.Header as='a'>{ item.Name }</List.Header>
            <List.Description as='a'>{ item.Type }</List.Description>
          </List.Content>
          <List.Content floated='right'>
            { (item.dist.calculated/1000).toFixed(2) } km
          </List.Content>
        </List.Item>
      ))}
    </List>
    </Card.Content>
  </Card>
</div>
);

export default ListCard