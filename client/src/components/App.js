import React from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import Navigation from "./navigation/Navigation";

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <div className="main-view">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/dashboard" component={Dashboard} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
