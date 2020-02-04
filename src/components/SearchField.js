import React from 'react';

class SearchField extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: ''
    }
  }

  onSubmit = (event) => {
    /**
     * As we have a form, normally this would submit data and cause a page
     * refresh, but we don't want that!
     *
     * The "onSubmit" function will return to us an Event object which is the
     * event that would be fired when a user normally clicks a button. Using
     * JavaScript, we can prevent the default action of this button, and we can
     * then take control of what happens next
     */
    event.preventDefault();

    // Reset our input field to not have a value
    this.setState({value: ''})
    // And let's tell our parent component to not have a value as well
    this.props.onSomeChange('');
  }

  /**
   * When the field changes, we need to synchronise this data back into our
   * state
   */
  handleChange = (event) => {
    this.setState({
      value: event.target.value
    });
    /**
     * This is how we can send our message "back up" to the parent component.
     * Because we passed the component down to us via "this.props", we can call
     * this function from this component and feed the data back up to it
     */
    this.props.onSomeChange(event.target.value);
  }

  render() {
    return (
      <form onSubmit={this.onSubmit} className="d-flex flex-row form-group">
        <input
          value={this.state.value}
          onChange={this.handleChange}
          className="form-control w-100"
          type="text"
        />
        <button className="btn btn-secondary" type="submit">
          Clear
        </button>
      </form>
    );
  }
}

export default SearchField;
