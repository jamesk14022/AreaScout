import React from 'react';
import ListCard from './ListCard';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const DisamenitiesCard = ({ long, lat, r, data }) => (
  <ListCard longitude={ long } latitude={ lat } r={ r } heading="Disamenities" items={ data } icon={ <FontAwesomeIcon className='card icon' icon={ faExclamationTriangle } /> } />
);

export default DisamenitiesCard;