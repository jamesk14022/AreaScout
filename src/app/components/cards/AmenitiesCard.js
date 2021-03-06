import React from 'react';
import ListCard from './ListCard';
import { faStethoscope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const AmenitiesCard = ({ long, lat, r, data }) => (
  <ListCard longitude={ long } latitude={ lat } r={ r } heading="Amenities" items={ data } icon={ <FontAwesomeIcon className='card icon' icon={ faStethoscope } /> } />
);

export default AmenitiesCard;