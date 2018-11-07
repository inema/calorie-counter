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
          {food}: {foods[food].kcal} kcal
          <input step="1" min="1" value={foods[food].num} type="number" className="form-control quantity" onChange={(event) => this.handleChange(food, event)}/>
          <button onClick={() => this.handleDelete(food)} className="btn btn-danger btn-sm">delete</button>
        </div>)}
    </div>);
  }

  handleChange(food, event){
    const {foods} = this.state;
    console.log(foods)
    foods[food].num = Number(event.target.value);
    console.log(foods)
    this.setState({foods});
  }

  addFood(food) {
    const {foods} = this.state;
    if (foods[food.name] === undefined){
      foods[food.name] = {kcal: Number(food.kcal), num: Number(food.num)};
    } else {
      foods[food.name].num += Number(food.num);
    }
    this.setState({foods});
  }

  handleDelete(food) {
    const {foods} = this.state;
    delete foods[food];
    this.setState({foods});
  }

  getTotal() {
    const {foods} = this.state;
    let sum = 0;
    Object.keys(foods).map((food, index) => sum += foods[food].kcal*foods[food].num);
    return sum;
  }
}

export default Tracker;
