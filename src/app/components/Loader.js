import React from 'react';
import './../../resources/css/loader.css';

var Loader = (Component) => {
	return ({ isLoading, ...props }) => {
		if(!isLoading) return (<Component { ...props } />);
		return (
			<div className="LoadingComponent">

			</div>
		);
	}
} 

export default Loader;