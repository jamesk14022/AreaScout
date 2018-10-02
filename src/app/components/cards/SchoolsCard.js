import React from 'react';
import ListCard from './ListCard';
import { faSchool } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SchoolsCard = ({ long, lat, r, data }) => (
  <ListCard longitude={ long } latitude={ lat } r={ r } heading="Schools" items={ data } icon={ <FontAwesomeIcon className='card icon' icon={ faSchool } /> } />
);

export default SchoolsCard;