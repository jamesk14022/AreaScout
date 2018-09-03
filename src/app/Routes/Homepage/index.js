import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  Input,
  List,
  Menu,
  Responsive,
  Segment,
  Sidebar,
  Visibility,
} from 'semantic-ui-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSchool, faExclamationTriangle, faUsers, faGavel } from '@fortawesome/free-solid-svg-icons';

import './../../../resources/css/home.css'

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
    <Input 
      icon={<Icon name='search' inverted circular link />} 
      placeholder='Search...' 
      size='big'
      style={{
        width: '500px',
        marginTop: mobile ? '1em' : '2em'
      }}
    />
  </Container>
)

HomepageHeading.propTypes = {
  mobile: PropTypes.bool,
}

/* Heads up!
 * Neither Semantic UI nor Semantic UI React offer a responsive navbar, however, it can be implemented easily.
 * It can be more complicated, but you can create really flexible markup.
 */
class DesktopContainer extends Component {
  state = {}

  hideFixedMenu = () => this.setState({ fixed: false })
  showFixedMenu = () => this.setState({ fixed: true })

  render() {
    const { children } = this.props
    const { fixed } = this.state

    return (
      <Responsive minWidth={Responsive.onlyTablet.minWidth} >
        <Visibility
          once={false}
          onBottomPassed={this.showFixedMenu}
          onBottomPassedReverse={this.hideFixedMenu}
        >
          <Segment
            inverted
            textAlign='center'
            vertical
            style={{
              'minHeight': 715
            }}
          >
          <div className="content">
            <Menu
              fixed={null}
              inverted={!fixed}
              pointing={!fixed}
              secondary={!fixed}
              size='large'
            >
              <Container>
                <Menu.Item id='brand' as='a'>AreaScout<sub>(NI)</sub></Menu.Item>
                <Menu.Item className='' position='right'>
                  <Button as='a' inverted={!fixed} style={{ marginLeft: '1em' }}>
                    Search
                  </Button>
                  <Button as='a' inverted={!fixed} style={{ marginLeft: '1em' }}>
                    About
                  </Button>
                  <Button as='a' inverted={!fixed} style={{ marginLeft: '1em' }}>
                    Contact
                  </Button>
                </Menu.Item>
              </Container>
            </Menu>
            <HomepageHeading />
            </div>
          </Segment>
        </Visibility>

        {children}
      </Responsive>
    )
  }
}

DesktopContainer.propTypes = {
  children: PropTypes.node,
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
    <DesktopContainer>{children}</DesktopContainer>
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
          <Grid.Column floated='right' width={6}>
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
    <Segment inverted vertical style={{ padding: '5em 0em' }}>
      <Container>
        <Grid divided inverted stackable>
          <Grid.Row>
            <Grid.Column width={3}>
              <Header inverted as='h4' content='Links' />
              <List link inverted>
                <List.Item as='a'>Search</List.Item>
                <List.Item as='a'>About</List.Item>
                <List.Item as='a'>Contact</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={10}>
              <Header as='h4' inverted>
                Footer Header
              </Header>
              <p>
                Extra space for a call to action inside the footer that could help re-engage users.
              </p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </Segment>
  </ResponsiveContainer>
)
export default HomepageLayout