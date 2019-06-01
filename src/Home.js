import React from 'react';
import { Route, Switch } from 'react-router-dom'

import Navbar from './components/Navbar/Navbar'
import { App, Landing, LoginForm, RegistrationForm } from './components/Pages'
import './Home.css';

const Home = () => {
  return (
    <div className="homeLayout">
      <Navbar />
      <Switch>
        <Route exact path='/' component={Landing} />
        <Route path='/login' component={LoginForm}/>
        <Route path='/register' component={RegistrationForm}/>
        <Route path='/app' component={App}/>
      </Switch>
    </div>
  );
}

export default Home;
