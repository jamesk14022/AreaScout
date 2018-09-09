import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  Button,
  Container,
  Grid,
  Header,
  Icon,
  Image,
  Menu,
  Responsive,
  Segment,
  Sidebar
} from 'semantic-ui-react';
import Footer from './Footer';
import SearchBar from './SearchBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSchool, faExclamationTriangle, faUsers, faGavel } from '@fortawesome/free-solid-svg-icons';
import DesktopContainerHome from './DesktopContainerHome';

import './../../resources/css/home.css'

/* eslint-disable react/no-multi-comp */
/* Heads up! HomepageHeading uses inline styling, however it's not the best practice. Use CSS or styled components for
 * such things.
 */
const HomepageHeading = ({ mobile }) => (
  <Container text>
    <Header
      as='h1'
      content='Search Any Address or Postcode in Northern Ireland'
      inverted
      style={{
        fontSize: mobile ? '2em' : '2.3em',
        fontWeight: 'normal',
        marginTop: mobile ? '2.5em' : '4.3em',
      }}
    />
    <SearchBar />
  </Container>
)

HomepageHeading.propTypes = {
  mobile: PropTypes.bool,
}



class MobileContainer extends Component {
  state = {}

  handlePusherClick = () => {
    const { sidebarOpened } = this.state

    if (sidebarOpened) this.setState({ sidebarOpened: false })
  }

  handleToggle = () => this.setState({ sidebarOpened: !this.state.sidebarOpened })

  render() {
    const { children } = this.props
    const { sidebarOpened } = this.state

    return (
      <Responsive maxWidth={Responsive.onlyMobile.maxWidth}>
        <Sidebar.Pushable>
          <Sidebar as={Menu} animation='uncover' inverted vertical visible={sidebarOpened}>
            <Menu.Item id='brand'>
              AreaScout <sub>(NI)</sub>
            </Menu.Item>
            <Menu.Item as='a' active>Home</Menu.Item>
            <Menu.Item as='a'>Search</Menu.Item>
            <Menu.Item as='a'>About</Menu.Item>
            <Menu.Item as='a'>Contact</Menu.Item>
          </Sidebar>

          <Sidebar.Pusher
            dimmed={sidebarOpened}
            onClick={this.handlePusherClick}
            style={{ minHeight: '100vh' }}
          >
            <Segment
              inverted
              textAlign='center'
              style={{ minHeight: 350, padding: '1em 0em' }}
              vertical
            >
              <Container>
                <Menu inverted pointing secondary size='large'>
                  <Menu.Item onClick={this.handleToggle}>
                    <Icon name='sidebar' />
                  </Menu.Item>
                  <Menu.Item position='right'>
                    <Button as='a' inverted>
                      Log in
                    </Button>
                    <Button as='a' inverted style={{ marginLeft: '0.5em' }}>
                      Sign Up
                    </Button>
                  </Menu.Item>
                </Menu>
              </Container>
              <HomepageHeading mobile />
            </Segment>
            {children}
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </Responsive>
    )
  }
}

MobileContainer.propTypes = {
  children: PropTypes.node,
}

const ResponsiveContainer = ({ children }) => (
  <div>
    <DesktopContainerHome>{children}</DesktopContainerHome>
    <MobileContainer>{children}</MobileContainer>
  </div>
)

ResponsiveContainer.propTypes = {
  children: PropTypes.node,
}

const HomepageLayout = () => (
  <ResponsiveContainer>
    <Segment style={{ padding: '6em 0em' }} vertical>
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
          <Grid.Column floated='right' width={8}>
            <Image rounded size='large' src='/house-vector.png' />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
    <Segment style={{ padding: '0em 3em' }} vertical>
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
    <Segment style={{ padding: '6em 0em' }} vertical>
      <Grid container stackable verticalAlign='middle'>
        <Grid.Row>
          <Grid.Column width={7} >
            <Image rounded size='large' src='/house-vector2.png' />
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