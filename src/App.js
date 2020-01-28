import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Zomato from "./Components/Zomato";
import SearchByCity from "./Components/SearchByCity";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={SearchByCity} />
        <Route path="/collections" exact component={Zomato} />
      </Switch>
    </Router>
  );
}

export default App;
