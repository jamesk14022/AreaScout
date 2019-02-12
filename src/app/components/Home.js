import PropTypes from 'prop-types';
import React from 'react';
import {
  Grid,
  Header,
  Image,
  Segment
} from 'semantic-ui-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSchool, faExclamationTriangle, faUsers, faGavel } from '@fortawesome/free-solid-svg-icons';
import DesktopContainerHome from './containers/DesktopContainerHome';
import MobileContainerHome from './containers/MobileContainerHome';
import Footer from './Footer';

import './../../resources/css/home.css'

const ResponsiveContainer = ({ children }) => (
  <div>
    <DesktopContainerHome>{children}</DesktopContainerHome>
    <MobileContainerHome>{children}</MobileContainerHome>
  </div>
)

ResponsiveContainer.propTypes = {
  children: PropTypes.node,
}

const HomepageLayout = () => (
  <ResponsiveContainer>
    <Segment style={{ padding: '4em 0em' }} vertical>
      <Grid container stackable verticalAlign='middle'>
        <Grid.Row>
          <Grid.Column width={8}>
            <Header as='h3' style={{ 'textDecoration': 'underline', 'textDecorationColor': '#2f5593', fontSize: '2em' }}>
              Know the full story
            </Header>
            <p style={{ fontSize: '1.33em', 'marginBottom': '0px' }}>
              No nasty surprises when you move home, get the full picture by searching your address or postcode. Weather you are thinking 
              of moving home or you are just interested in your current area.
            </p>
              <hr style={{'height':'2pt', 'visibility':'hidden'}} />
            <p style={{ fontSize: '1.33em', 'paddingTop':'0px' }}>
              AreaScout can give you helpful information about weather an area might be the right fit for you. AreaScout encompasses 
              a lot of information - ranging from nearby schools to census socio-economic indicators.
            </p>
          </Grid.Column>
          <Grid.Column width={8}>
            <Image centered className='house' rounded size='large' src='/house-vector.png' />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
    <Segment style={{ padding: '1em 3em' }} vertical>
      <Grid columns='equal' stackable>
        <Grid.Row textAlign='center'>
          <Grid.Column style={{ paddingBottom: '3.5em', paddingTop: '5em' }}>
            <Header as='h3' style={{ fontSize: '2em' }}>
              <FontAwesomeIcon icon={faGavel} /> Crime Data
            </Header>
            <p style={{ fontSize: '1.33em' }}>Get detailed data street level data from the PSNI about crime in your area.</p>
          </Grid.Column>
          <Grid.Column style={{ paddingBottom: '3.5em', paddingTop: '5em' }}>
            <Header as='h3' style={{ fontSize: '2em' }}>
              <FontAwesomeIcon icon={faSchool} /> Amenities
            </Header>
            <p style={{ fontSize: '1.33em' }}>
              Information about nearby schools, GPs, dentists and transport connections.
            </p>
          </Grid.Column>
          <Grid.Column style={{ paddingBottom: '3.5em', paddingTop: '5em' }}>
            <Header as='h3' style={{ fontSize: '2em' }}>
              <FontAwesomeIcon icon={faExclamationTriangle} /> Disamenities
            </Header>
            <p style={{ fontSize: '1.33em' }}>
              Information about nearby liscensed waste disposal areas and landfills.
            </p>
          </Grid.Column>
          <Grid.Column style={{ paddingBottom: '3.5em', paddingTop: '5em' }}>
            <Header as='h3' style={{ fontSize: '2em' }}>
              <FontAwesomeIcon icon={faUsers} /> Community
            </Header>
            <p style={{ fontSize: '1.33em' }}>
              Census level data on socio economic indicators.
            </p>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
    <Segment style={{ padding: '3em 0em' }} vertical>
      <Grid container stackable verticalAlign='middle'>
        <Grid.Row>
          <Grid.Column width={7} >
            <Image centered rounded size='large' src='/house-vector2.png' />
          </Grid.Column>
          <Grid.Column floated='right' width={8}>
            <Header as='h3' style={{ 'textDecoration': 'underline', 'textDecorationColor': '#2f5593', fontSize: '2em' }}>
              Open Data NI
            </Header>
            <p style={{ fontSize: '1.33em' }}>
              We leverage data provided by Open Data NI to help people make better decisions about where to live. We use open data 
              from lots of different government departments as well as other sources - including the PSNI and the Office for National 
              Statisitics - for more information about our data, view the About page.
            </p>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
    <Footer />
  </ResponsiveContainer>
)

export default HomepageLayout;