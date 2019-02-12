import React, { Component } from 'react';
import { Container, Menu, Responsive, Segment, Visibility } from 'semantic-ui-react';
import HomepageHeading from './../HomepageHeading';
import MenuButtons from './../MenuButtons';


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
                <MenuButtons />
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