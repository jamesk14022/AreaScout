import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';
import NotFound from './NotFound';

const Homepage = Loadable({
  loader: () => import(/* webpackChunkName: "homepage" */ './Homepage'),
  loading: () => null,
  modules: ['homepage']
});

const About = Loadable({
  loader: () => import(/* webpackChunkName: "about" */ './About'),
  loading: () => null,
  modules: ['about']
});


export default () => (
  <Switch>
    <Route exact path='/' component={ Homepage } />
    <Route exact path='/about' component={ About } />
    <Route component={ NotFound } />
  </Switch>
); 