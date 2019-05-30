import React from 'react';
import { Route, Switch } from 'react-router-dom'

import Navbar from './components/Navbar/Navbar'
import Landing from './components/Pages/Landing/Landing'
import './App.css';

function App() {
  return (
    <div className="">
      <Navbar />
      <Switch>
        <Route to='/landing' component={Landing} />
      </Switch>
    </div>
  );
}

export default App;
