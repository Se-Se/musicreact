import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import Home from './components/Home/Home.js';
import Audio from './components/Audio/Audio.js';
import Detail from './components/Detail/Detail.js';
import {
   BrowserRouter as Router,
   Route ,
   Switch,
   Redirect
} from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Router>
        <div id="main">
       <Switch>
        <Route path="/home" component={ Home }></Route>
        <Route path="/detail/:mid" component={ Detail }></Route>
        <Redirect from="/*" to="/home"></Redirect>
       </Switch>
        <Audio/>
      </div>
      </Router>
      
    );
  }
}

export default App;
