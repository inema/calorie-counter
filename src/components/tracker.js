import React, {Component} from 'react';
import '../style/tracker.css';

class Tracker extends Component {
  state = {
    foods: []
  };

  render() {
    return (<div className="tracker">
      <h2>
        <span className="label label-info">Total Calories: {this.getTotal()}</span>
      </h2>
      {
        this.props.foods.map((food, index) => <div className="tracked-food" key={index}>
          {food.name}: {food.kcal}
          <button onClick={() => this.props.onDelete(index)} className="btn btn-danger btn-sm">delete</button>
        </div>)
      }
    </div>);
  }

  getTotal() {
    let sum = 0;
    this.props.foods.map(food => sum += Number(food.kcal));
    return sum;
  }
}

export default Tracker;
