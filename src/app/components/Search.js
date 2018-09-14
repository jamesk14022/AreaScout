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
    this.state = { query: '54 Ballyhenry Road, Comber, BT235JZ', loading: true, activeAccord: 0 };
    console.log(this.props);

    this.handleClick = this.handleClick.bind(this);
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

  handleClick(e, titleProps){
    const { index } = titleProps;
    const { activeAccord } = this.state;
    const newIndex = activeAccord === index ? -1 : index;
    this.setState({ activeAccord: newIndex });
  }

  render(){
    let { query, loading, activeAccord } = this.state;
    let rangeOptions = [ { key: '1', value: '1', text: '1 km' },
                         { key: '2', value: '2', text: '2 km' },
                         { key: '3', value: '3', text: '3 km' },
                         { key: '4', value: '4', text: '4 km' },
                         { key: '5', value: '5', text: '5 km' } ]

  	return(
  	  <div id="Search">
  	  	<ResponsiveContainer title='Search' breadcrumb={false}>
        <Segment
          style={{ 'padding': '2%' }}
          vertical
        >
        <Grid columns={3}>
          <Grid.Row textAlign='center'>
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
          <Grid.Row textAlign='center'>
              <Grid.Column width={4}>
                <Accordion as={Menu} vertical>
                  <Menu.Item>
                    <Accordion.Title
                      active={activeAccord === 0}
                      content='Size'
                      index={0}
                      onClick={this.handleClick}
                    />
                    <Accordion.Content active={activeAccord === 0} content={<p>test</p>} />
                  </Menu.Item>
                  <Menu.Item>
                    <Accordion.Title
                      active={activeAccord === 1}
                      content='Colors'
                      index={1}
                      onClick={this.handleClick}
                    />
                    <Accordion.Content active={activeAccord === 1} content={<p>test</p>} />
                  </Menu.Item>
                </Accordion>
              </Grid.Column>
              <Grid.Column width={12}>
              <Grid stackable>
                <Grid.Row>
                <Grid.Column width={8}>
                  { loading ? '' : <OverviewCard center postcode={ this.state.postcode } /> }
                </Grid.Column>
                <Grid.Column width={8}>
                  { loading ? '' : <SchoolsCard center long={ this.state.long } lat={ this.state.lat } r={ this.state.r } /> }
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
                  { loading ? '' : <PoliceCard center long={ this.state.long } lat={ this.state.lat } /> }
                </Grid.Column>
                <Grid.Column width={8}>
                  { loading ? '' : <PoliceCard center long={ this.state.long } lat={ this.state.lat } /> }
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