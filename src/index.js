import React, { Component } from "react";
import ReactDOM from "react-dom";

import CalculateArea from './components/calculate_area'

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      percentFill: 30,
      islands: []
    };
  }

  componentDidMount() {
    this.generateIslands();
  }

  onButtonClick() {
    this.generateIslands();
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

  renderIslands() {
    const islands = this.state.islands.map((raw, index) => {
      return (
        <tr key={`raw${index}`}>{this.renderIslandRaw(raw, index)}</tr>
      );
    });

    return islands;
  }

  renderIslandRaw(raw, index_raw) {
    const out = raw.map((item, index) => {
      return (
        <td key={`col${index_raw}${index}`}>{this.renderPoint(item)}</td>
      );
    });

    return out;
  }

  renderPoint(point) {
    switch (point) {
      case 0:
        return <button className="btn btn-default">{point}</button>;
      case 1:
        return <button className="btn btn-primary">{point}</button>;
    }
  }

  render() {
    return (
      <div>
        <form className="form-inline">
          <div className="form-group">
            <label form="percent-fill">Enter a percent fill</label>
            <input
              type="text"
              id="percent-fill"
              placeholder="Enter a percent fill"
              className="form-control"
              onChange={(event) => this.setState({ percentFill: event.target.value })}
              value={this.state.percentFill}
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

        <div className="islands">
          <h3>Islands</h3>
          <table>
            <tbody>
            {this.renderIslands()}
            </tbody>
          </table>
        </div>

        <CalculateArea/>

      </div>
    );
  }
}


ReactDOM.render(<App/>, document.querySelector(".container"));