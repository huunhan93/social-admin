import React from 'react';
import logo from './logo.svg';
import './App.css';
import './styles/sb-admin-2.min.css'
import {BrowserRouter as Router, Switch } from 'react-router-dom';
import { Login } from './pages/Account';
import { PrivateRoute } from './components';

function App() {
  return (
    <div className="App" id="wrapper">
      <Router>
        <Switch>
          <PrivateRoute>
            <Login/>
          </PrivateRoute>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
