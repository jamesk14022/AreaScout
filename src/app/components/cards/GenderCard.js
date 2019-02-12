import React, { Component } from 'react';
import { PieChart, Pie, Legend, Tooltip, Cell } from 'recharts';
import { SEGMENT_COLOURS } from './../../constants/CardConstants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Card, Image } from 'semantic-ui-react';
import InfoToolTip from './../InfoToolTip';

class GenderCard extends Component{
  render(){
    let { data } = this.props;
    return(
      <div id="GenderCard">
        <Card>
          <Card.Content>
            <Image floated='left' size='mini'><FontAwesomeIcon className='card icon' icon={faUser} /></Image>
            <Card.Header>Population Distrubution</Card.Header>
            <Card.Meta>For Small Area N009087 <InfoToolTip/></Card.Meta>
          </Card.Content>
          <Card.Content extra>
          <div className='chart container'>
            <PieChart width={280} height={200}>
              <Pie 
                isAnimationActive={false}
                data={ data.distGender }
                dataKey='value'
                dataName='name'
                cx='50%'
                cy='40%'
                outerRadius={60}
                fill="#8884d8"
              >
                { SEGMENT_COLOURS.map((entry, index) => (
                  <Cell fill={ SEGMENT_COLOURS[index %  SEGMENT_COLOURS.length]} key={index} />
                ))}   
              </Pie>
              <Legend verticalAlign='bottom' height={36}/>
              <Tooltip/>
             </PieChart>
            <PieChart width={280} height={200}>
              <Pie 
                isAnimationActive={false}
                data={ data.distLivingStatus }
                dataKey='value'
                dataName='name'
                cx='50%'
                cy='35%'
                outerRadius={60}
                fill="#8884d8"
              >
                { SEGMENT_COLOURS.map((entry, index) => (
                  <Cell fill={ SEGMENT_COLOURS[index %  SEGMENT_COLOURS.length]} key={index} />
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

export default GenderCard;