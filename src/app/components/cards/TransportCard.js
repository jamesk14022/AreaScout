import React, { Component } from 'react';
import { PieChart, Pie, Legend, Tooltip, Cell } from 'recharts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCarSide } from '@fortawesome/free-solid-svg-icons';
import { Card, Image, List, Segment } from 'semantic-ui-react';
import InfoToolTip from './../InfoToolTip';

const COLOURS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#C0392B', '#7D3C98', '#212F3C', '#7D3C98', '#4E342E', '#AD1457'];

class TransportCard extends Component{
  render(){
    let { data } = this.props;
    return(
      <div id="TransportCard">
        <Card>
          <Card.Content>
            <Image floated='left' size='mini'><FontAwesomeIcon className='card icon' icon={faCarSide} /></Image>
            <Card.Header>Transport Distrubution</Card.Header>
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
                cy='50%'
                cx='50%'
                outerRadius={80}
                fill="#8884d8"
              >
                {COLOURS.map((entry, index) => (
                  <Cell fill={COLOURS[index % COLOURS.length]} key={index} />
                ))}   
              </Pie>
              <Legend verticalAlign='bottom' height={36}/>
              <Tooltip/>
             </PieChart>
             </div>
          </Card.Content>
        </Card>
      </div>
    );
  }
}

export default TransportCard;