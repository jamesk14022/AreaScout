import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import queryWithRouter from './../modules/queryWithRouter';
import {
  Breadcrumb,
  Button,
  Container,
  Form,
  Grid,
  Icon,
  Input,
  Label,
  Menu,
  Responsive,
  Segment,
  Select,
  Sidebar,
  Visibility,
} from 'semantic-ui-react';
import DesktopContainer from './DesktopContainer';
import MobileContainer from './MobileContainer';
import Footer from './Footer';
import SearchBar from './SearchBar';
import SchoolsCard from './SchoolsCard';
import AmenitiesCard from './AmenitiesCard';
import DisamenitiesCard from './DisamenitiesCard';
import OverviewCard from './OverviewCard';
import './../../resources/css/search.css';

const ResponsiveContainer = ({ children, title }) => (
  <div>
    <DesktopContainer title={title} >{children}</DesktopContainer>
    <MobileContainer title={title} >{children}</MobileContainer>
  </div>
);

class Search extends Component{

  constructor(props){
    super(props);
    this.state = { query: '54 Ballyhenry Road, Comber, BT235JZ', loading: true };
    console.log(this.props);
  }

  componentWillMount(){
      let { long, lat, r, postcode } = this.props.location.query;
      if(!long || !lat || !r){
        this.props.dispatch(push(`/notfound`));
      }else{
        this.setState({ long: parseFloat(long).toFixed(3), lat: parseFloat(lat).toFixed(3), postcode: postcode, r: parseInt(r), loading: false });
      }
  }

  // props.location.query injected by queryWithRouter.js
  componentDidUpdate(prevProps){
    if(this.props.location.query !== prevProps.location.query){
      let { long, lat, r, postcode } = this.props.location.query;
      if(!long || !lat || !r){
        this.props.dispatch(push(`/notfound`));
      }else{
        this.setState({ long: parseFloat(long).toFixed(3), lat: parseFloat(lat).toFixed(3), postcode: postcode, r: parseInt(r), loading: false });
      }
    }
  }

  render(){
    let { query, loading } = this.state;
    let rangeOptions = [ { key: '1', value: '1', text: '1 km' },
                         { key: '2', value: '2', text: '2 km' },
                         { key: '3', value: '3', text: '3 km' },
                         { key: '4', value: '4', text: '4 km' },
                         { key: '5', value: '5', text: '5 km' } ]

  	return(
  	  <div id="Search">
  	  	<ResponsiveContainer title='Search'>
        <Segment
          style={{ 'padding': '.5em 3em', 'borderBottom': '1px solid black' }}
          vertical
        >
        <Grid columns={3}>
          <Grid.Row textAlign='center'>
            <Grid.Column>
              <h3 style={{ 'marginLeft': 0 }}>{ query }</h3>
            </Grid.Column>
            <Grid.Column>
            </Grid.Column>
            <Grid.Column>
              <Form>
                <Form.Field>
                  <Select placeholder='5 km' options={ rangeOptions } />
                  <Label pointing>Enter a Range</Label>
                </Form.Field>
              </Form>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        </Segment>
        <Segment style={{ 'padding': '1em 15em' }} vertical >
          <Grid columns={2} relaxed>
            <Grid.Row textAlign='center'>
              <Grid.Column>
                { loading ? '' : <OverviewCard postcode={ this.state.postcode } /> }
              </Grid.Column>
              <Grid.Column>
                { loading ? '' : <SchoolsCard long={ this.state.long } lat={ this.state.lat } r={ this.state.r } /> }
              </Grid.Column>
            </Grid.Row>
            <Grid.Row textAlign='center'>
              <Grid.Column>
                { loading ? '' : <DisamenitiesCard long={ this.state.long } lat={ this.state.lat } r={ this.state.r } /> }
              </Grid.Column>
              <Grid.Column>
                { loading ? '' : <AmenitiesCard long={ this.state.long } lat={ this.state.lat } r={ this.state.r } /> }
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
        <Footer />
        </ResponsiveContainer>
  	  </div>
  	);
  }

}

export default queryWithRouter(connect()(Search));