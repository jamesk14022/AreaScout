import React from 'react';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Popup } from 'semantic-ui-react';

const InfoToolTip = (props) => (
	<Popup trigger={<FontAwesomeIcon icon={ faInfoCircle}/>} content={'This is the \'small area\' code assigned to your postcode in the 2011 Census.'}  />
)

export default InfoToolTip;