import React, {Component} from 'react';
import Finder from './components/finder';
import Tracker from './components/tracker';
import './App.css';

class App extends Component {
  render() {
    return (<div>
      <h1>Calorie Counter</h1>
      <div className="flex-container">
        <Finder onTrack={this.handleTrack} />
        <Tracker ref="tracker" />
      </div>
    </div>);
  }

  handleTrack = food => {
    this.refs.tracker.addFood(food);
  }

}
export default App;
