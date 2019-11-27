import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import HelloWorld from './components/HelloWorld.js'
import './App.css';
import Landing from './components/Landing';


function App() {
 
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/react-recipe" component={Landing}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
