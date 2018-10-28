import React, {Component} from 'react';
import Result from './components/result';
import Search from './components/search';
import Tracker from './components/tracker';
import logo from './gini.jpe';
import './App.css';

class App extends Component {
  state = {
    input: "",
    error: null,
    isLoaded: false,
    name: "",
    kcal: 0,
    foods: []
  };

  render() {
    return (<div>
      <img style={this.logoStyle} src={logo} alt="gini logo"/>
      <div className="flex-container">
        <div className="search">
          <Search onSubmit={this.handleSubmit} onChange={this.handleChange}/>
          <Result state={this.state} onTrack={this.handleTrack}/>
        </div>
        <Tracker foods={this.state.foods} name={this.state.name} kcal={this.state.kcal} onDelete={this.handleDelete}/>
      </div>
    </div>);
  }

  handleDelete = index => {
    const foods = [...this.state.foods]
    foods.splice(index, 1);
    this.setState({foods});
  }

  handleTrack = () => {
    const food = {
      name: this.state.name,
      kcal: this.state.kcal
    }
    const foods = [...this.state.foods];
    foods.push(food);
    this.setState({foods});
  }

  handleChange = event => {
    this.setState({input: event.target.value});
  }

  handleSubmit = event => {
    if (this.state.input === "") {
      return;
    }
    this.setState({error: null});
    event.preventDefault();
    fetch(this.getNameURL()).then(res => res.json()).then((nameResult) => {
      if (nameResult.errors) {
        this.setState({isLoaded: true, error: nameResult.errors.error[0].message});
        return;
      }
      fetch(this.getIdURL(nameResult.list.item[0].ndbno)).then(res => res.json()).then((idResult) => {
        this.setState({isLoaded: true, name: this.state.input, kcal: idResult.report.foods[0].nutrients[0].value});
      }, (error) => {
        this.setState({isLoaded: true, error});
      })
    }, (error) => {
      this.setState({isLoaded: true, error});
    })
  }

  getNameURL() {
    const url = "https://api.nal.usda.gov/ndb/search/?format=json&max=1&api_key=YmMiU6cJQWcHLuH9VzW3uE2q4fHmfAkdnxh4UBt1&q="
    return url.concat(this.state.input);
  }
  getIdURL(id) {
    const url = "https://api.nal.usda.gov/ndb/nutrients/?format=json&api_key=YmMiU6cJQWcHLuH9VzW3uE2q4fHmfAkdnxh4UBt1&nutrients=208&ndbno="
    return url.concat(id);
  }
}
export default App;
