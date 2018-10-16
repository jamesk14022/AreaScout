import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Icon, Responsive, Sidebar, Menu, Segment, Container } from 'semantic-ui-react';
import MenuButtons from './../MenuButtons';
import HomepageHeading from './../HomepageHeading';

class MobileContainerHome extends Component {
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
            <Link to='/'><Menu.Item>Home</Menu.Item></Link>
            <Link to='/about'><Menu.Item>About</Menu.Item></Link>
            <Link to='/contact'><Menu.Item>Contact</Menu.Item></Link>
          </Sidebar>

          <Sidebar.Pusher
            dimmed={sidebarOpened}
            onClick={this.handlePusherClick}
            style={{ minHeight: '100vh' }}
          >
            <Segment
              inverted
              textAlign='center'
              style={{ minHeight: '350px', padding: '1em 0em' }}
              vertical
            >
            <div className='spread-mobile'>
              <Container>
                <Menu inverted pointing secondary size='large'>
                  <Menu.Item position='left' onClick={this.handleToggle}>
                    <Icon name='sidebar' />
                  </Menu.Item>
                  <MenuButtons />
                </Menu>
              </Container>
              <HomepageHeading mobile />
            </div>
            </Segment>
            {children}
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </Responsive>
    )
  }
}

MobileContainerHome.propTypes = {
  children: PropTypes.node,
}

export default MobileContainerHome;