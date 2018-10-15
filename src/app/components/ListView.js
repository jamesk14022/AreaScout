import React, { Component } from 'react';
import {
  Form,
  Grid,
  Label,
  Button,
  Field,
  Icon,
  Segment,
  Checkbox,
  Select,
  Accordion,
  Menu
} from 'semantic-ui-react';
import { Slider } from 'react-semantic-ui-range';
import SearchBar from './SearchBar';
import SchoolsCard from './cards/SchoolsCard';
import AmenitiesCard from './cards/AmenitiesCard';
import DisamenitiesCard from './cards/DisamenitiesCard';
import OverviewCard from './cards/OverviewCard';
import PoliceCard from './cards/PoliceCard';
import AgeCard from './cards/AgeCard';
import TransportCard from './cards/TransportCard';
import HousingCard from './cards/HousingCard';
import MapCard from './cards/MapCard';
import GenderCard from './cards/GenderCard';
import ToggleBox from './ToggleBox';

class ListView extends Component{

  render(){
    let { long,
          lat,
          r,
          predicted,
          postcode,
          overview,
          amenities,
          disamenities,
          schools,
          police,
          age,
          transport,
          housing,
          population,
          query, 
          amenityToggles,
          disamenityToggles,
          onToggleChange,
          onRangeChange,
          checkedItems 
    } = this.props;

    let rangeOptions = {
      start: 2000,
      min:1000,
      max:10000,
      step:1000,
      onChange: (value) => { onRangeChange(value) }
    }

    return(
      <div id='ListView'>
      <Segment
        vertical
        className='top bar'
      >
        <Grid>
          <Grid.Row>
            <Grid.Column width={8}>
              <SearchBar size='big' defaultValue={ query } />
            </Grid.Column>
            <Grid.Column width={8}>
              <h3 className='predicted text'>{ predicted }</h3>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <hr className='upper divide'/>
      </Segment>
      <Segment vertical className='main results' >
        <Grid stackable>
        <Grid.Row>
            <Grid.Column width={4}>
              <Segment vertical className='tall'>
              <Segment vertical className='filter'>
              <h3>Filter</h3>
              <hr />
              <Accordion as={Menu} vertical>
                <Menu.Item>
                  <Accordion.Title
                    active={true}
                    content={'Range'}
                  />
                  <Accordion.Content active={true} 
                  content={
                    <div>
                    <Label pointing='below'>{ r/1000 + ' km' }</Label> 
                    <Slider value={ r } discrete inverted={false} settings={rangeOptions} />
                    </div>
                  }/>
                </Menu.Item>
                <Menu.Item>
                  <Accordion.Title
                    active={true}
                    content='Amenities'
                  />
                  <Accordion.Content 
                    active={true} 
                    content={
                      <Form>
                        {amenityToggles.map((amenity, index) => (
                          <ToggleBox key={index} name={amenity.name} label={amenity.label} checked={checkedItems.get(amenity.name)} onChange={ (e, data) => onToggleChange(e, data) }  />
                        ))}
                      </Form>
                    } 
                  />
                </Menu.Item>
                <Menu.Item>
                  <Accordion.Title
                    active={true}
                    content='Disamenities'
                  />
                  <Accordion.Content
                    active={true}  
                    content={
                      <Form>
                        {disamenityToggles.map((disamenity, index) => (
                          <ToggleBox key={index}  name={disamenity.name} label={disamenity.label} checked={checkedItems.get(disamenity.name)} onChange={ (e, data) => onToggleChange(e, data) } />
                        ))}
                      </Form>
                    } 
                  />
                </Menu.Item>
              </Accordion>
              </Segment>
              </Segment>
            </Grid.Column>
            <Grid.Column width={12}>
            <Grid centered stackable>
              <Grid.Row>
              <Grid.Column width={8}>
                <OverviewCard population={ population } postcode={ postcode } data={ overview } /> 
              </Grid.Column>
              <Grid.Column width={8}>
                <SchoolsCard long={ long } lat={ lat } r={ r } data={ schools } /> 
              </Grid.Column>
            </Grid.Row>
            <Grid.Row textAlign='center'>
              <Grid.Column width={8}>
                <DisamenitiesCard center long={ long } lat={ lat } r={ r } data={ disamenities } /> 
              </Grid.Column>
              <Grid.Column width={8}>
                <AmenitiesCard center long={ long } lat={ lat } r={ r } data={ amenities } />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row textAlign='center'>
              <Grid.Column width={8}>
                <PoliceCard center long={ long } lat={ lat } r={ r } data={ police }/> 
              </Grid.Column>
              <Grid.Column width={8}>
                <AgeCard data={ age } />
              </Grid.Column>
            </Grid.Row>
             <Grid.Row textAlign='center'>
              <Grid.Column width={8}>
                <TransportCard data={ transport }/>
              </Grid.Column>
              <Grid.Column width={8}>
                <MapCard 
                  amenities={ amenities }
                  disamenities={ disamenities }
                  schools={ schools }
                  streetCrime={ police.streetCrime }
                  long={ long }
                  lat={ lat }
                  r={ r }
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row textAlign='center'>
              <Grid.Column width={8}>
                <HousingCard data={ housing }/>
              </Grid.Column>
              <Grid.Column width={8}>
                <GenderCard data={ population }/>
              </Grid.Column>
            </Grid.Row>
            </Grid>
          </Grid.Column>
        </Grid.Row>
        </Grid>
      </Segment>
      </div>
    );
  }
}

export default ListView;