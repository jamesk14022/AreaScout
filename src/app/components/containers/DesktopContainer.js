import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Segment, Breadcrumb, Container, Button, Responsive, Menu, Visibility } from 'semantic-ui-react';
import MenuButtons from './../MenuButtons';

class DesktopContainer extends Component {
  state = {};
  hideFixedMenu = () => this.setState({ fixed: false });
  showFixedMenu = () => this.setState({ fixed: true });

  render() {
    const { children, title, breadcrumb } = this.props;
    const { fixed } = this.state;

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
          >
          <div className="content">
            <Menu
              fixed={null}
              inverted={!fixed}
              pointing={!fixed}
              secondary={!fixed}
              size='large'
            >
              <Container textAlign='left'>
                <Menu.Item fitted='horizontally' id='brand' as='a' href='/'>AreaScout<sub>(NI)</sub></Menu.Item>
                <MenuButtons />
              </Container>
            </Menu>
            </div>
          </Segment>
        </Visibility>
        {(breadcrumb) ?
        <Segment style={{ 'padding': '.5em 5.5em', 'borderBottom': '1px solid black' }} vertical>
          <Breadcrumb size='large'>
            <Breadcrumb.Section link>Home</Breadcrumb.Section>
            <Breadcrumb.Divider icon='right chevron' />
            <Breadcrumb.Section link>{ title }</Breadcrumb.Section>
          </Breadcrumb>
        </Segment>
        : ''}
        {children}
      </Responsive>
    )
  }
}

export default DesktopContainer;