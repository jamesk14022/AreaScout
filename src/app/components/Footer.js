import React from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Grid,
  Header,
  List,
  Segment
} from 'semantic-ui-react';

const Footer = () => (
  <div id="Footer">
    <Segment inverted vertical style={{ padding: '2em 0em' }}>
      <Container>
        <Grid divided inverted stackable>
          <Grid.Row>
            <Grid.Column width={16}>
              <List bulleted horizontal>
                <List.Item><Link to='/'>Home</Link></List.Item>
                <List.Item><Link to='/about'>About</Link></List.Item>
                <List.Item><Link to='/contact'>Contact</Link></List.Item>
                <List.Item><p>Built By James Kingsbury, 2018</p></List.Item>
              </List>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </Segment>
  </div>
);

export default Footer;