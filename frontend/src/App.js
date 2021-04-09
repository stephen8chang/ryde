import './App.css';
import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import DashboardScreen from './screens/DashboardScreen';
import DatasetScreen from './screens/DatasetScreen';
import ProjectsScreen from './screens/ProjectsScreen';
import NavBar from './components/NavBar';
import { connect } from 'react-redux';
import * as actions from './actions';
class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }
  render() {
    return (
      <div className='container'>
        <NavBar />
        <BrowserRouter>
          <div className='container'>
            <Route exact path='/' component={DashboardScreen} />
            <Route path='/register' component={RegisterScreen} />
            <Route path='/login' component={LoginScreen} />
            <Route path='/dataset' component={DatasetScreen} />
            <Route path='/projects' component={ProjectsScreen} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, actions)(App);
