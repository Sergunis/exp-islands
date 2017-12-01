import React, { Component } from 'react'

class Islands extends Component {

  constructor(props) {
    super(props);

  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.islands == this.props.islands) {
      return false;
    }

    return true;
  }

  renderIslands() {
    const islands = this.props.islands.map((raw, index) => {
      return (
        <tr key={`raw${index}`}>{this.renderIslandRaw(raw, index)}</tr>
      );
    });

    return islands;
  }

  renderIslandRaw(raw, index_raw) {
    const out = raw.map((item, index) => {
      return (
        <td key={`col${index_raw}${index}`}>{this.renderPointBadge(item)}</td>
      );
    });

    return out;
  }

  renderPoint(point) {
    switch (point) {
      case 0:
        return <button className="btn btn-default btn-sm">{point}</button>;
      case 1:
        return <button className="btn btn-primary btn-sm">{point}</button>;
    }
  }

  renderPointBadge(point) {

    switch (point) {
      case 0:
        return <span className="badge badge-light">{point}</span>;
      case 1:
        return <span className="badge badge-dark">{point}</span>;
    }
  }


  render() {
    return (
      <div className="islands">
        <h3>Islands - {Math.pow(this.props.islands.length, 2)} sectors</h3>
        <table>
          <tbody>
          {this.renderIslands()}
          </tbody>
        </table>
      </div>
    )
  }
}

export default Islands