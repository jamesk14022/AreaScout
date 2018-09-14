import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react';
import './../../resources/css/about.css';
import DesktopContainer from './containers/DesktopContainer';
import MobileContainer from './containers/MobileContainer';
import Footer from './Footer';


const ResponsiveContainer = ({ children, title }) => (
  <div>
    <DesktopContainer title={title} >{children}</DesktopContainer>
    <MobileContainer title={title} >{children}</MobileContainer>
  </div>
);

class About extends Component{


  render(){
  	return(
  	  <div id="About">
  	  	<ResponsiveContainer title='About'>
        <Segment className='text' style={{ 'padding': '2em 5.5em' }}>
        <h2>Overview</h2>
        <p>AreaScout leverages open data to help people make better decisions about where to live in Northern Ireland.
        The service is great for researching a new community and making sure you have complete infromation before making
        a purchase or rental decision. We provide some key community indicators and socio-economic signals to help you decide weather an area is right for you.</p>

        <h2>Data Licence</h2>
        <p>This application wouldn't be possible without the work of Opendata NI - or the wider Digital NI initiative. Much of the data we use is licenced under the Open
        Government licence but check below for other specific notices.</p>
        <ul>
    		<li> Contains public sector information licensed under the Open Government Licence v3.0</li>
    		<li>Contains OS data © Crown copyright and database right 2018</li>
    		<li>Contains Royal Mail data © Royal Mail copyright and Database right 2018</li>
			<li>Contains National Statistics data © Crown copyright and database right 2018</li>
    	</ul>

        <h2>Terms</h2>
        <p>Notwithstanding the above, information contained on the site is for general information purposes only. It is not intended to amount to advice upon which you should rely. 
        You must obtain professional or specialist advice before taking, or refraining from, any action on the basis of the content of our site. Any reliance you place on such information is therefore strictly at your own risk.
		AreaScout provides no guarantee of the accuracy or precision of our data. We attempt to keep data up to date but 
        this is not always possible.</p>
        </Segment>
        <Footer />
        </ResponsiveContainer>
  	  </div>
  	);
  }

}

export default About;
