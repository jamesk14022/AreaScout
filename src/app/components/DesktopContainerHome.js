import React, { Component } from 'react';
import {
  Button,
  Container,
  Grid,
  Header,
  Icon,
  Image,
  Input,
  Menu,
  Responsive,
  Segment,
  Sidebar,
  Visibility,
} from 'semantic-ui-react';
import HomepageHeading from './HomepageHeading';


/* Heads up!
 * Neither Semantic UI nor Semantic UI React offer a responsive navbar, however, it can be implemented easily.
 * It can be more complicated, but you can create really flexible markup.
 */
class DesktopContainerHome extends Component {
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
          <div className="spread">
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


export default DesktopContainerHome;