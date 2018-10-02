import React, { Component } from 'react';
import { PieChart, Pie, Legend, Tooltip, Cell } from 'recharts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGavel } from '@fortawesome/free-solid-svg-icons';
import { Card, Image, List, Segment } from 'semantic-ui-react';

const COLOURS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#C0392B', '#7D3C98', '#212F3C', '#7D3C98', '#4E342E', '#AD1457'];

class AgeCard extends Component{
  render(){
    let { data } = this.props;
    return(
      <div id="AgeCard">
        <Card>
          <Card.Content>
            <Image floated='left' size='mini'><FontAwesomeIcon className='card icon' icon={faGavel} /></Image>
            <Card.Header>Age Distrubution</Card.Header>
            <Card.Meta>For Small Area N009087</Card.Meta>
          </Card.Content>
          <Card.Content extra>
            <PieChart width={300} height={260}>
              <Pie 
                isAnimationActive={false}
                data={data.dist}
                dataKey='value'
                dataName='name'
                cx={130}
                cy={100}
                outerRadius={80}
                fill="#8884d8"
              >
                {COLOURS.map((entry, index) => (
                  <Cell fill={COLOURS[index % COLOURS.length]} key={index} />
                ))}   
              </Pie>         
              <Legend verticalAlign="bottom" height={36}/>
              <Tooltip/>
             </PieChart>
          </Card.Content>
          <Card.Content extra>
            <List className="card-list shadow" divided relaxed>
              {data.metrics.map((item, index) => (
                <List.Item key={ index }>
                  <List.Content floated='right'>
                    { item.value }
                  </List.Content>
                  <List.Content className='metric-title'>{ item.name }</List.Content>
                </List.Item>
              ))}
            </List>
          </Card.Content>
        </Card>
      </div>
    );
  }
}

export default AgeCard;