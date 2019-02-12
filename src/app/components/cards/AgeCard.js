import React, { Component } from 'react';
import { PieChart, Pie, Legend, Tooltip, Cell } from 'recharts';
import { SEGMENT_COLOURS } from './../../constants/CardConstants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { Card, Image, List} from 'semantic-ui-react';
import InfoToolTip from './../InfoToolTip';

class AgeCard extends Component{
  render(){
    let { data } = this.props;
    return(
      <div id="AgeCard">
        <Card>
          <Card.Content>
            <Image floated='left' size='mini'><FontAwesomeIcon className='card icon' icon={faUsers} /></Image>
            <Card.Header>Age Distrubution</Card.Header>
            <Card.Meta>For Small Area N009087 <InfoToolTip/></Card.Meta>
          </Card.Content>
          <Card.Content extra>
          <div className='chart container'>
            <PieChart width={280} height={260}>
              <Pie 
                isAnimationActive={false}
                data={data.dist}
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
              <Legend verticalAlign="bottom" height={36}/>
              <Tooltip/>
            </PieChart>
          </div>
          </Card.Content>
          <Card.Content extra>
          <div className='chart container'>
            <List className="card-list shadow" divided relaxed>
              {data.metrics.map((item, index) => (
                <List.Item key={ index }>
                  <List.Content floated='right' className='statistic'>
                    { item.value }
                  </List.Content>
                  <List.Content className='metric-title'>{ item.name }</List.Content>
                </List.Item>
              ))}
            </List>
            </div>
          </Card.Content>
        </Card>
      </div>
    );
  }
}

export default AgeCard;