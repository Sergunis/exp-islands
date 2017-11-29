import React, { Component } from "react";

class CalculateArea extends Component {
  constructor(props) {
    super(props);

    this.state = {
      calculating: false,
      result: "N/A"
    };
  }

  onButtonClick() {

    if (window.Worker) {
      // Отмечаем, что началось вычисление
      this.setState({ calculating: true });

      let worker = new Worker("./workers/calculate_area.js");

      worker.postMessage([[1, 0], [0, 1]]);

      worker.onerror = (e) => {
        console.error("There is an error with your worker!");
      };

      worker.onmessage = (e) => {
        this.setState({ result: e.data });

        // Отмечаем, что вычисление закончилось
        this.setState({ calculating: false });
      };
    }
  }

  render() {
    return (
      <div>
        <button
          className="btn btn-info calculate"
          onClick={() => this.onButtonClick()}
        >
          Calculate maximum island area
          <img src="/images/loader-16px.gif" className={this.state.calculating ? "loader active" : "loader"}/>
        </button>

        <div className="result">
          <strong>Result</strong>: {this.state.result}
        </div>
      </div>
    );
  }

};

export default CalculateArea;