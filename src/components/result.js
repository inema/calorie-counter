import React, {Component} from 'react';
import '../style/result.css';

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
      const {error, isLoaded, name, kcal, quantity} = this.props.state;
      const food = {name: name, kcal: kcal, num: quantity};
      if (!error && isLoaded === true) {
        return (
        <div className="result">
          <span>{name}: {kcal} kcal</span>
          <input step="1" min="1" value={quantity} type="number" className="form-control quantity" onChange={this.props.onChange}/>
          <button onClick={() => this.props.onTrack(food)} className="btn btn-secondary btn-sm">add</button>
        </div>);
      }
    }
  }

  export default Result;
