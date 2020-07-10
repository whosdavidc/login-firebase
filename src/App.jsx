import React from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import Navbar from './components/Navbar';
import Login from "./components/Login"

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar/>
        <Switch>
          
          <Route path="/" exact>
            Inicio...
          </Route>

          <Route path="/login">
            <Login></Login>
          </Route>

          <Route path="/admin">
            admin...
          </Route>

        </Switch>
      </div>
    </Router>
  );
}

export default App;
