import React, { Component } from 'react';
import '../style/search.css';

class Search extends Component {
  render() {
    return (
      <form onSubmit={this.props.onSubmit}>
        <input type="text" className="form-control search-bar" onChange={this.props.onChange}/>
        <input type="submit" className="btn" value="Submit" />
      </form>
    );
  }
}

export default Search;
