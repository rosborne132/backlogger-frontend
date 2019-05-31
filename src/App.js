import React from 'react';
import { Route, Switch } from 'react-router-dom'

import Navbar from './components/Navbar/Navbar'
import { Landing } from './components/Pages'
import './App.css';

const App = () => {
  return (
    <div className="">
      <Navbar />
      <Switch>
        <Route exact to='/' component={Landing} />
      </Switch>
      <footer>Footer</footer>
    </div>
  );
}

export default App;
