import React, { Component } from "react";
import ReactDOM from "react-dom";

import CalculateArea from './components/calculate_area'
import Islands from './components/islands'

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      percentFill: 40,
      oceanSize: 50,
      islands: []
    };
  }

  componentDidMount() {
    this.generateIslands(this.state.oceanSize);
  }

  onButtonClick() {
    this.generateIslands(this.state.oceanSize);
  }

  /**
   * Генерируем массив случайных островов
   * @param size
   */
  generateIslands(size = 10) {
    let islands = new Array();
    for (let i = 0; i < size; i++) {
      islands.push(this.generateRaw(size));
    }

    this.setState({ islands });
  }

  /**
   * Генерирует одномерный массив из нулей и единиц заданного размера
   * @param size
   */
  generateRaw(size) {
    let arr = new Array();

    for (let i = 0; i < size; i++) {
      let rnd;

      rnd = Math.random();
      if (rnd*100 <= this.state.percentFill) {
        rnd = 1;
      } else {
        rnd = 0;
      }

      arr.push(rnd);
    }

    return arr;
  }

  render() {
    return (
      <div>
        <form className="form-inline">
          <div className="form-group">
            <label htmlFor="percent-fill">Enter a percent fill</label>
            <input
              type="text"
              id="percent-fill"
              placeholder="Enter a percent fill"
              className="form-control"
              onChange={(event) => this.setState({ percentFill: event.target.value })}
              value={this.state.percentFill}
            />

            <label htmlFor="ocean-size">Ocean size</label>
            <input
              type="text"
              id="ocean-size"
              placeholder="Enter an ocean size"
              className="form-control input-sm"
              onChange={(event) => this.setState({ oceanSize: event.target.value })}
              value={this.state.oceanSize}
            />

            <button
              className="btn btn-primary"
              type="button"
              onClick={() => this.onButtonClick()}
            >
              Randomize Islands
            </button>
          </div>
        </form>

        <CalculateArea
          islands={this.state.islands}
        />

        <Islands
          islands={this.state.islands}
        />
      </div>
    );
  }
}


ReactDOM.render(<App/>, document.querySelector(".container"));