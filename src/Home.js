import React from 'react';
import { Route, Switch } from 'react-router-dom'

import Navbar from './components/Navbar/Navbar'
import { App, Landing, LoginForm, RegistrationForm } from './components/Pages'
import PrivateRoute from './components/Utils/PrivateRoute'
import PublicOnlyRoute from './components/Utils/PublicOnlyRoute'
import './Home.css';

const Home = () => {
  return (
    <div className="homeLayout">
      <Navbar />
      <Switch>
        <Route exact path='/' component={Landing} />
        <PublicOnlyRoute path='/login' component={LoginForm}/>
        <PublicOnlyRoute path='/register' component={RegistrationForm}/>
        {/* <PrivateRoute path='/app' component={App}/> */}
        <PublicOnlyRoute path='/app' component={App}/>
      </Switch>
    </div>
  );
}

export default Home;
