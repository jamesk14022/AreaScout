import React from 'react';
import {
  Container,
  Grid,
  Header,
  List,
  Segment
} from 'semantic-ui-react';

const Footer = () => (
  <div id="Footer">
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
  </div>
);

export default Footer;