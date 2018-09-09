import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import Loadable from 'react-loadable';
import NotFound from './../components/NotFound';

const Homepage = Loadable({
  loader: () => import(/* webpackChunkName: "homepage" */ './../components/Home'),
  loading: () => null,
  modules: ['homepage']
});

const Search = Loadable({
  loader: () => import(/* webpackChunkName: "homepage" */ './../components/Search'),
  loading: () => null,
  modules: ['search']
});

const About = Loadable({
  loader: () => import(/* webpackChunkName: "about" */ './../components/About'),
  loading: () => null,
  modules: ['about']
});

const Routes = () => (
  <Switch>
    <Route exact path='/' component={ Homepage } />
    <Route exact path='/about' component={ About } />
    <Route exact path='/search' component={ Search } />
    <Route component={ NotFound } />
  </Switch>
);


export default withRouter(Routes);