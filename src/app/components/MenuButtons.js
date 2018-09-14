import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Button } from 'semantic-ui-react';

const MenuButtons = (props) => (
  <Menu.Item position='right'>
	<Link to='/about'><Button inverted style={{ marginLeft: '1em' }}>About</Button></Link>
	<Link to='/contact'><Button inverted style={{ marginLeft: '1em' }}>Contact</Button></Link>
  </Menu.Item>
);

export default MenuButtons;