import React, {Component} from 'react';
import '../style/tracker.css';

class Tracker extends Component {
  state = {
    foods: {}
  };

  render() {
    const {foods} = this.state;
    return (<div className="tracker">
      <h2>
        <span className="label label-info">Total Calories: {this.getTotal()}</span>
      </h2>
      {Object.keys(foods).map((food) =>
        <div className="tracked-food" key={food}>
          {console.log(food)}
          {food}: {foods[food].kcal}
          <span className="label label-warning">{foods[food].num}</span>
          <button onClick={() => this.handleDelete(food)} className="btn btn-danger btn-sm">delete</button>
        </div>)}
    </div>);
  }

  addFood(food) {
    const {foods} = this.state;
    if (foods[food.name] === undefined){
      foods[food.name] = {kcal: food.kcal, num: 1};
    } else {
      foods[food.name].num += 1;
    }
    this.setState({foods});
  }

  handleDelete = food => {
    const {foods} = this.state;
    delete foods[food];
    this.setState({foods});
  }

  getTotal() {
    const {foods} = this.state;
    let sum = 0;
    Object.keys(foods).map((food, index) => sum += Number(foods[food].kcal)*foods[food].num);
    return sum;
  }
}

export default Tracker;
