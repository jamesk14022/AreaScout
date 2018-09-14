import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Segment, Breadcrumb, Responsive, Icon, Button, Menu, Sidebar, Container } from 'semantic-ui-react';
import MenuButtons from './../MenuButtons';

class MobileContainer extends Component {
  state = {};

  handlePusherClick = () => {
    const { sidebarOpened } = this.state;
    if (sidebarOpened) this.setState({ sidebarOpened: false });
  }

  handleToggle = () => this.setState({ sidebarOpened: !this.state.sidebarOpened });

  render() {
    const { children, title } = this.props;
    const { sidebarOpened } = this.state;

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
              style={{ padding: '1em 0em' }}
              vertical
            >
              <Container>
                <Menu inverted pointing secondary size='large'>
                  <Menu.Item onClick={this.handleToggle}>
                    <Icon name='sidebar' />
                  </Menu.Item>
                  <MenuButtons />
                </Menu>
              </Container>
            </Segment>
            <Segment
            style={{ 'padding': '2% 5%', 'borderBottom': '1px solid black' }}
            vertical
            >
          <Breadcrumb size='large'>
            <Breadcrumb.Section link>Home</Breadcrumb.Section>
            <Breadcrumb.Divider icon='right chevron' />
            <Breadcrumb.Section link>{ title }</Breadcrumb.Section>
          </Breadcrumb>
        </Segment>
            {children}
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </Responsive>
    )
  }
}

export default MobileContainer;