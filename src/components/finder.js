import React, { Component } from 'react';
import Search from './search';
import Result from './result';
import '../style/search.css';

class Finder extends Component {
  state = {
    input: "",
    error: null,
    isLoaded: false,
    name: "",
    kcal: 0,
    quantity: 1
  };

  render() {
    return (
      <div className="search">
        <Search onSubmit={this.handleSubmit} onChange={this.handleChange}/>
        <Result state={this.state} onTrack={this.props.onTrack} onChange={this.handleQuantityChange}/>
      </div>
    );
  }

  handleQuantityChange = event => {
    this.setState({quantity: event.target.value});
  }

  handleChange = event => {
    this.setState({input: event.target.value});
  }

  handleSubmit = event => {
    this.setState({quantity: 1});
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
        this.setState({
          isLoaded: true,
          name: idResult.report.foods[0].name,
          kcal: idResult.report.foods[0].nutrients[0].value});
      }, (error) => {
        this.setState({isLoaded: true, error});
      })
    }, (error) => {
      this.setState({isLoaded: true, error});
    })
  }

  getNameURL() {
    const url = "https://api.nal.usda.gov/ndb/search/?format=json&max=1&ds=Standard%20Reference&api_key=YmMiU6cJQWcHLuH9VzW3uE2q4fHmfAkdnxh4UBt1&q="
    return url.concat(this.state.input);
  }
  getIdURL(id) {
    const url = "https://api.nal.usda.gov/ndb/nutrients/?format=json&api_key=YmMiU6cJQWcHLuH9VzW3uE2q4fHmfAkdnxh4UBt1&nutrients=208&ndbno="
    return url.concat(id);
  }
}

export default Finder;
