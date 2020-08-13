import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import App from './components/App';
import "css/main.scss";

ReactDOM.render(
  <Router>
    <Route render={props => <App {...props}/>}/>
  </Router>
, document.querySelector('.app'));
