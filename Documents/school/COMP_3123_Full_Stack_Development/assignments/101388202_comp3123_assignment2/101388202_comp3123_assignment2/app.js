import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { AuthProvider } from './contexts/authContext';
import Login from './components/login';
import Signup from './components/signup';
import Home from './components/Home'

function App() {
  return (
    <Router>
      <AuthProvider>
        <Switch>
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/home" component={Home} />
        </Switch>
      </AuthProvider>
    </Router>
  );
}

export default App;