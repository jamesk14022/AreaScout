import React from 'react';
import MapOverviewModal from './../modals/MapOverviewModal';
import { Card, Button } from 'semantic-ui-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import './../../../resources/css/mapcard.css';

const trigger = <Button className='mapview launch' icon primary size='medium'><FontAwesomeIcon className='arrow icon' icon={faExternalLinkAlt} />Launch Map View</Button>

const MapCard = ({ amenities, disamenities, schools, streetCrime, long, lat, r }) => (
  <div id="MapCard">
    <Card>
      <Card.Content>
      <div className="spread">
        <div className='map cont'>
          <MapOverviewModal 
            amenities={ amenities }
            disamenities={ disamenities }
            schools={ schools }
            streetCrime={ streetCrime }
            long={ long }
            lat={ lat }
            r={ r }
            title='Map Overview'
            trigger={ trigger }
          />
        </div>
      </div>
      </Card.Content>
    </Card>
  </div>
);

export default MapCard;