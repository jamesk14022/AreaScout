import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import queryWithRouter from './../modules/queryWithRouter';
import {
  Form,
  Grid,
  Label,
  Icon,
  Segment,
  Select,
  Accordion,
  Menu
} from 'semantic-ui-react';
import { Slider } from 'react-semantic-ui-range'
import DesktopContainer from './containers/DesktopContainer';
import MobileContainer from './containers/MobileContainer';
import Footer from './Footer';
import SchoolsCard from './cards/SchoolsCard';
import AmenitiesCard from './cards/AmenitiesCard';
import DisamenitiesCard from './cards/DisamenitiesCard';
import OverviewCard from './cards/OverviewCard';
import PoliceCard from './cards/PoliceCard';
import './../../resources/css/search.css';

const ResponsiveContainer = ({ children, title, breadcrumb }) => (
  <div>
    <DesktopContainer title={title} breadcrumb={breadcrumb}>{children}</DesktopContainer>
    <MobileContainer title={title} >{children}</MobileContainer>
  </div>
);

class Search extends Component{

  constructor(props){
    super(props);
    this.state = { query: '', loading: true, activeAccord: 0, r: 2000 };
    console.log(this.props);

    this.handleClick = this.handleClick.bind(this);
  }

  componentWillMount(){
    let { long, lat, r, postcode, queryString } = this.props.location.query;
    if(!long || !lat || !r || !queryString){
      this.props.dispatch(push(`/notfound`));
    }else{
      this.setState({ query: queryString, long: parseFloat(long).toFixed(3), lat: parseFloat(lat).toFixed(3), postcode: postcode, r: parseInt(r), loading: false });
    }
  }

  // props.location.query injected by queryWithRouter.js
  componentDidUpdate(prevProps){
    if(this.props.location.query !== prevProps.location.query){
      let { long, lat, r, postcode, queryString } = this.props.location.query;
      if(!long || !lat || !r || !queryString){
        this.props.dispatch(push(`/notfound`));
      }else{
        this.setState({ query: queryString, long: parseFloat(long).toFixed(3), lat: parseFloat(lat).toFixed(3), postcode: postcode, r: parseInt(r), loading: false });
      }
    }
  }

  handleClick(e, titleProps){
    const { index } = titleProps;
    const { activeAccord } = this.state;
    const newIndex = activeAccord === index ? -1 : index;
    this.setState({ activeAccord: newIndex });
  }

  handleRangeChange(e, { value }){
    this.setState({ r: value })
  }
  render(){
    let { query, loading, activeAccord } = this.state;
    let rangeOptions = {
      start: this.state.r,
      min:1000,
      max:10000,
      step:1000,
      onChange: (value) => { this.setState({ r: value }) }
    }

  	return(
  	  <div id="Search">
  	  	<ResponsiveContainer title='Search' breadcrumb={false}>
        <Segment
          vertical
          className='top bar'
        >
        <Grid columns={3}>
          <Grid.Row>
            <Grid.Column>
              <h3 style={{ 'marginLeft': 0 }}>
                <Icon onClick={ this.handleSubmit } name='search' className='query' inverted circular link />
                { query }
              </h3>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <hr className='upper divide'/>
        </Segment>
        <Segment vertical className='main results' >
          <Grid stackable>
          <Grid.Row>
              <Grid.Column width={4}>
                <Segment vertical className='filter'>
                <h3>Filter</h3>
                <hr />
                <Accordion as={Menu} vertical>
                  <Menu.Item>
                    <Accordion.Title
                      active={activeAccord === 0}
                      content={'Range ' + this.state.r/1000 + ' km'}
                      index={0}
                      onClick={this.handleClick}
                    />
                    <Accordion.Content active={activeAccord === 0} content={<Slider value={this.state.r} discrete inverted={false} settings={rangeOptions} />} />
                  </Menu.Item>
                  <Menu.Item>
                    <Accordion.Title
                      active={activeAccord === 1}
                      content='Amenities'
                      index={1}
                      onClick={this.handleClick}
                    />
                    <Accordion.Content active={activeAccord === 1} content={<p>test</p>} />
                  </Menu.Item>
                  <Menu.Item>
                    <Accordion.Title
                      active={activeAccord === 1}
                      content='Disamenities'
                      index={2}
                      onClick={this.handleClick}
                    />
                    <Accordion.Content active={activeAccord === 2} content={<p>test</p>} />
                  </Menu.Item>
                </Accordion>
                </Segment>
              </Grid.Column>
              <Grid.Column width={12}>
              <Grid centered stackable>
                <Grid.Row>
                <Grid.Column width={8}>
                  { loading ? '' : <OverviewCard postcode={ this.state.postcode } /> }
                </Grid.Column>
                <Grid.Column width={8}>
                  { loading ? '' : <SchoolsCard long={ this.state.long } lat={ this.state.lat } r={ this.state.r } /> }
                </Grid.Column>
              </Grid.Row>
              <Grid.Row textAlign='center'>
                <Grid.Column width={8}>
                  { loading ? '' : <DisamenitiesCard center long={ this.state.long } lat={ this.state.lat } r={ this.state.r } /> }
                </Grid.Column>
                <Grid.Column width={8}>
                  { loading ? '' : <AmenitiesCard center long={ this.state.long } lat={ this.state.lat } r={ this.state.r } /> }
                </Grid.Column>
              </Grid.Row>
              <Grid.Row textAlign='center'>
                <Grid.Column width={8}>
                  { loading ? '' : <PoliceCard center long={ this.state.long } lat={ this.state.lat } r={ this.state.r } /> }
                </Grid.Column>
                <Grid.Column width={8}>

                </Grid.Column>
              </Grid.Row>
              </Grid>
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