import React, { Component } from 'react';
import { PieChart, Pie, Legend, Tooltip, Cell } from 'recharts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGavel } from '@fortawesome/free-solid-svg-icons';
import { Card, Image, List, Segment } from 'semantic-ui-react';

const COLOURS = ['#0088FE', '#00C49F'];

class GenderCard extends Component{
  render(){
    let { data } = this.props;
    return(
      <div id="AgeCard">
        <Card>
          <Card.Content>
            <Image floated='left' size='mini'><FontAwesomeIcon className='card icon' icon={faGavel} /></Image>
            <Card.Header>Population Distrubution</Card.Header>
            <Card.Meta>For Small Area N009087</Card.Meta>
          </Card.Content>
          <Card.Content extra>
            <PieChart width={280} height={200}>
              <Pie 
                isAnimationActive={false}
                data={ data.distGender }
                dataKey='value'
                dataName='name'
                cx={130}
                cy={65}
                outerRadius={60}
                fill="#8884d8"
              >
                {COLOURS.map((entry, index) => (
                  <Cell fill={COLOURS[index % COLOURS.length]} key={index} />
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
                cx={130}
                cy={65}
                outerRadius={60}
                fill="#8884d8"
              >
                {COLOURS.map((entry, index) => (
                  <Cell fill={COLOURS[index % COLOURS.length]} key={index} />
                ))}   
              </Pie>
              <Legend verticalAlign='bottom' height={36}/>
              <Tooltip/>
             </PieChart>
          </Card.Content>
        </Card>
      </div>
    );
  }
}

export default GenderCard;