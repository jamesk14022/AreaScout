// The basics
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
// Action creators and helpers
import { isServer } from '../store';

import Routes from './routes';

import 'semantic-ui-css/semantic.min.css';
import './../resources/css/global.css'
import './App.css';

class App extends Component {
  render() {
    return (
      <div id="app">
        <div id="content">
          <Routes />
        </div>
      </div>
    );
  }
}

export default withRouter(App);
