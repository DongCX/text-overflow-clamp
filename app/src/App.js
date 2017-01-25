import React, { Component } from 'react';
import './App.css';

import clamp from '../../clamp';


class App extends Component {

  paragraphs1 = [];
  paragraphs2 = [];

  componentDidMount() {
    this.paragraphs1.forEach(function (p) {
      clamp(p, { lineClamp: 1 });
    });

    this.paragraphs2.forEach(function (p) {
      clamp(p, { lineClamp: 2 });
    });
  }

  render() {
    return (
      <div className="App">
        <h1>All these texts should be one line:</h1>

        <p className="App-intro" ref={node => this.paragraphs1.push(node)}>
          Small Chicken Small Chicken Small Chicken Small Chicken Small Chicken Small Chicken Small Chicken Small
          Chicken Small Chicken Small Chicken Small Chicken Small Chicken Small Chicken Small Chicken Small Chicken
          Small Chicken Small Chicken Small Chicken Small Chicken Small Chicken Small Chicken Small Chicken Small
        </p>

        <p className="App-intro" ref={node => this.paragraphs1.push(node)}>
          One Two Three Four Five Six Seven EightNine TenElevenTwelve
        </p>

        <p className="App-intro" ref={node => this.paragraphs1.push(node)}>
          One Two Three Four Five Six Seven EightNine
        </p>

        <p className="App-intro" ref={node => this.paragraphs1.push(node)}>
          One Two Three Four Five Six Seven EightNine TenElevenTwelve
          One Two Three Four Five Six Seven
        </p>

        <h1>All these texts should be two lines:</h1>

        <p className="App-intro" ref={node => this.paragraphs2.push(node)}>
          Small Chicken Small Chicken Small Chicken Small Chicken Small Chicken Small Chicken Small Chicken Small
          Chicken Small Chicken Small Chicken Small Chicken Small Chicken Small Chicken Small Chicken Small Chicken
          Small Chicken Small Chicken Small Chicken Small Chicken Small Chicken Small Chicken Small Chicken Small
        </p>

        <p className="App-intro" ref={node => this.paragraphs2.push(node)}>
          One Two Three Four Five Six Seven EightNine TenElevenTwelve
        </p>

        <p className="App-intro" ref={node => this.paragraphs2.push(node)}>
          One Two Three Four Five Six Seven EightNine TenElevenTwelve
          One Two Three Four Five Six Seven
        </p>
      </div>
    );
  }
}

export default App;
