import React, { Component } from 'react';
import { PieChart, Pie, Legend, Tooltip, Cell } from 'recharts';
import { SEGMENT_COLOURS } from './../../constants/CardConstants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCarSide } from '@fortawesome/free-solid-svg-icons';
import { Card, Image } from 'semantic-ui-react';
import InfoToolTip from './../InfoToolTip';

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
                {SEGMENT_COLOURS.map((entry, index) => (
                  <Cell fill={SEGMENT_COLOURS[index % SEGMENT_COLOURS.length]} key={index} />
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