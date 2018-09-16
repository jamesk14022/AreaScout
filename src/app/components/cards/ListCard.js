 import React from 'react';
import { Card, List, Image, Button } from 'semantic-ui-react';
import MapModal from './../modals/MapModal';
import './../../../resources/css/listcard.css';

const ListCard = ({ heading, subheading, items, icon, longitude, latitude, r }) => (
<div id="ListCard">
  <Card>
    <Card.Content>
      <Image floated='left' size='mini'>{ icon }</Image>
      <MapModal items={ items } longitude={ longitude } latitude={ latitude } r={ r } title={ heading } trigger={ <Button primary floated='right' size='mini'>View on Map</Button> } />
      <Card.Header>{ heading }</Card.Header>
      <Card.Meta>{ subheading ? subheading : items.length + ' ' + heading + ' found nearby' }</Card.Meta>
    </Card.Content>
    <Card.Content extra>
    <List className="card-list shadow" divided relaxed>
      {items.slice(0, 5).map((item, index) => (
        <List.Item key={ index }>
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
    {(items.length > 5 ?
    <Card.Content className ='show more' textAlign='center' extra>
      <MapModal items={ items } longitude={ longitude } latitude={ latitude } r={ r } title={ heading } trigger={ <a>Show More</a> } />
    </Card.Content> : '')}
  </Card>
</div>
);

export default ListCard