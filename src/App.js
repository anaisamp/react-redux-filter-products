import React, { Component } from 'react';
import  ProductsList from './ProductsList';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="app">
          <ProductsList />
      </div>
    );
  }
}

export default App;
