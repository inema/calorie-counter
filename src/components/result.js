import React, {Component} from 'react';

class Result extends Component {
  render() {
    return (<div style={{marginLeft: 20}}>
      {this.getError()}
      {this.getSuccess()}
    </div>);
  }

  getError() {
    const {error} = this.props.state;
    if (error) {
      return <div className="error">{error}</div>;
    }
  }

  getSuccess() {
    const {error, isLoaded, name, kcal} = this.props.state;
    if (!error && isLoaded === true) {
      return (<div className="success">
        <div>{name}: {kcal}</div>
        <button onClick={() => this.props.onTrack()} className="btn btn-secondary btn-sm">track</button>
      </div>);
    }
  }
}

export default Result;
