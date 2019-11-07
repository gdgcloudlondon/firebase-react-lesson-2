import React from 'react';

import firebase from '../services/firebase';

class Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: ''
    }
  }

  onSubmit = (event) => {
    event.preventDefault();

    if (!this.state.value) {
      return;
    }
    const todoListItem = {
      time: (new Date()).toLocaleString('en-gb'),
      message: this.state.value,
      isChecked: false
    };

    firebase.writeTo('messages', todoListItem);

    this.setState({value: ''})
  }

  handleChange = (event) => {
    this.setState({value: event.target.value});
  }

  render() {
    return (
      <form
        onSubmit={this.onSubmit}
        className="d-flex flex-row form-group"
      >
        <input
          value={this.state.value}
          onChange={this.handleChange}
          className="form-control w-100"
          type="text"
        />
        <button className="btn btn-primary" type="submit">
          Submit
        </button>
      </form>
    );
  }
}

export default Form;
