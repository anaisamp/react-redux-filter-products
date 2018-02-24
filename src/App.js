import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import Home from './Home';
import About from './About';
import './App.css';

class App extends Component {
  render() {
    return (
      <div class="app">
        <header>
          <Link to="/">Home</Link>
          <Link to="/about-us">About</Link>
        </header>

        <main>
          <Route exact path="/" component={Home} />
          <Route exact path="/about-us" component={About} />
        </main>
      </div>
    );
  }
}

export default App;
