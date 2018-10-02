import React from 'react';
import { List, Card, Segment, Image, Button } from 'semantic-ui-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import './../../../resources/css/mapcard.css';

const MapCard = ({ postcode }) => (
  <div id="MapCard">
    <Card>
      <Card.Content>
      <div className="spread">
        <div className='map cont'>
          <Button className='mapview launch' icon primary size='medium'><FontAwesomeIcon className='arrow icon' icon={faExternalLinkAlt} />Launch Map View</Button>
        </div>
      </div>
      </Card.Content>
    </Card>
  </div>
);

export default MapCard;