import React, {Component} from 'react';
import '../style/result.css';

class Result extends Component {
  state = {
    quantity: 1
  }
  render() {
    const {food} = this.props;
    return (<div className="result">
      <span>{food.name}: {food.kcal} kcal</span>
      <input step="1" min="1" value={food.quantity} type="number" className="form-control quantity" onChange={(e) => this.props.onChange(this.props.index)(e)}/>
      <button onClick={() => this.props.onTrack(food)} className="btn btn-secondary btn-sm">add</button>
    </div>);
    }
  }

  export default Result;
