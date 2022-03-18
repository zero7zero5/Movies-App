import "./App.css";
import { Redirect, Route, Switch } from "react-router-dom";
import React, { Component } from "react";
import NavBar from "./components/common/navbar";
import Movies from "./components/movies";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import MovieForm from "./components/common/MovieForm";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <main>
          <Switch>
            <Route path="/customers" component={Customers} />
            <Route path="/rentals" component={Rentals} />

            <Route path="/movieform/:id" component={MovieForm} />
            <Route path="/" component={Movies} />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
