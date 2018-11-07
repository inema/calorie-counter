import React, { Component } from 'react';
import Search from './search';
import Result from './result';
import '../style/search.css';

class Finder extends Component {
  state = {
    input: "",
    error: null,
    results: []
  };

  render() {
    return (
      <div className="search">
      <Search onSubmit={this.handleSubmit} onChange={this.handleChange}/>
      {this.getError()}
      {this.state.results.map((food, index) =>
        <Result food={food} index={index} key={index} onTrack={this.props.onTrack} onChange={this.handleQuantityChange}/>)}
      </div>
    );
  }

  getError() {
    const {error} = this.state;
    if (error) {
      return <div className="result">{error}</div>;
    }
  }
  handleQuantityChange = index => event => {
    const {results} = this.state;
    results[index].quantity = event.target.value;
    this.setState({results});
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
      this.fetchCalories(nameResult);
    }, (error) => {
      this.setState({error});
    })
  }

  fetchCalories(nameResult){
    if (nameResult.errors) {
      this.setState({error: nameResult.errors.error[0].message, results: []});
      return;
    }
    const results = [];
    for (let i = 0; i < nameResult.list.end; i++){
      fetch(this.getIdURL(nameResult.list.item[i].ndbno)).then(res => res.json()).then((idResult) => {
        if (idResult.report.foods[0].nutrients[0] !== undefined){
          results.push({
            name: idResult.report.foods[0].name,
            kcal: idResult.report.foods[0].nutrients[0].value,
            quantity: 1});
          //need to set the state each time since is asynchronous
          this.setState({results});
        }
      }, (error) => {
        this.setState({error});
        return;
      })
    }
  }

  getNameURL() {
    const url = "https://api.nal.usda.gov/ndb/search/?format=json&max=5&ds=Standard%20Reference&api_key=YmMiU6cJQWcHLuH9VzW3uE2q4fHmfAkdnxh4UBt1&q="
    return url.concat(this.state.input);
  }
  getIdURL(id) {
    const url = "https://api.nal.usda.gov/ndb/nutrients/?format=json&api_key=YmMiU6cJQWcHLuH9VzW3uE2q4fHmfAkdnxh4UBt1&nutrients=208&ndbno="
    return url.concat(id);
  }
}

export default Finder;
