import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSchool, faExclamationTriangle, faUsers, faGavel } from '@fortawesome/free-solid-svg-icons';
import ListCard from './ListCard';

const PoliceCard = ({ long, lat, r, data }) => (
  <ListCard 
    subheading={ data.neighbourhood.description.replace(/<(?:.|\n)*?>/gm, '') }
    icon={<FontAwesomeIcon className='card icon' icon={faGavel} />}
    heading='Police Data'
    longitude={ long }
    latitude={ lat }
    r={ r }
    items={ data.streetCrime }
  />
);

export default PoliceCard;