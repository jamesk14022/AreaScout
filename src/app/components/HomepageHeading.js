import React from 'react';
import PropTypes from 'prop-types';
import SearchBar from './SearchBar';
import {
  Container,
  Header
} from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';

const HomepageHeading = ({ mobile }) => (
  <Container text>
    <Header
      as='h1'
      content='Search Any Address or Postcode in Northern Ireland'
      inverted
      style={{
        fontSize: '2.3em',
        fontWeight: 'normal',
        marginTop: '4.3em',
      }}
    />
    <SearchBar mobile={(mobile) ? true : false } />
  </Container>
);

HomepageHeading.propTypes = {
  mobile: PropTypes.bool
}

export default withRouter(HomepageHeading);