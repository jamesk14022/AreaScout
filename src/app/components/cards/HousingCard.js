import React, { Component } from 'react';
import { PieChart, Pie, Legend, Tooltip, Cell } from 'recharts';
import { SEGMENT_COLOURS } from './../../constants/CardConstants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { Card, Image, List } from 'semantic-ui-react';
import { getHighestDataPoint, getLowestDataPoint } from './../../modules/ChartUtils';
import InfoToolTip from './../InfoToolTip';

class HousingCard extends Component{
  render(){
    let { data } = this.props;
    console.log(data)
    return(
      <div id="HousingCard">
        <Card>
          <Card.Content>
            <Image floated='left' size='mini'><FontAwesomeIcon className='card icon' icon={faHome} /></Image>
            <Card.Header>Housing Distrubution</Card.Header>
            <Card.Meta>For Small Area N009087 <InfoToolTip/></Card.Meta>
          </Card.Content>
          <Card.Content extra>
            <div className='chart container'>
            <PieChart width={280} height={260}>
              <Pie 
                isAnimationActive={false}
                data={data}
                dataKey='value'
                dataName='name'
                cx='50%'
                cy='50%'
                outerRadius={80}
                fill="#8884d8"
              >
                {SEGMENT_COLOURS.map((entry, index) => (
                  <Cell fill={SEGMENT_COLOURS[index % SEGMENT_COLOURS.length]} key={index} />
                ))}   
              </Pie>
              <Legend verticalAlign='bottom' height={36}/>
              <Tooltip/>
             </PieChart>
             </div>
          </Card.Content>
          <Card.Content extra>
          <div className='chart container'>
            <List className="card-list shadow" divided relaxed>
              <List.Item>
                <List.Content>
                  <List.Header as='a'>Most Common Type</List.Header>
                  <List.Description as='a'>Statistic</List.Description>
                </List.Content>
                <List.Content className='chart statistic' floated='right'>
                  { getHighestDataPoint(data) }
                </List.Content>
              </List.Item>
              <List.Item>
                <List.Content>
                  <List.Header as='a'>Least Common Type</List.Header>
                  <List.Description as='a'>Statistic</List.Description>
                </List.Content>
                <List.Content className='chart statistic' floated='right'>
                  { getLowestDataPoint(data) }
                </List.Content>
              </List.Item>
            </List>
            </div>
          </Card.Content>
        </Card>
      </div>
    );
  }
}

export default HousingCard;