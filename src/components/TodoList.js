import React from 'react';

import firebase from '../services/firebase';
import ListItem from './ListItem';
import InputField from './InputField';
import SearchField from './SearchField';

class TodoList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      data: {},
      filterString: ''
    };

    this.messagesRef = null;

    /**
     * Because we are using a class, we might run into issues with the word
     * "this". To get around this, we must bind a function to the appropriate
     * "this". This way, when we use "this" inside "updateFilterString", it will
     * refer to the TodoList class's "this", and not its own version of "this".
     *
     * Simple, right? 😅
     *
     * We can get around this by making "updateFilterString" an arrow function.
     * Arrow functions share "this" with its parent, and doesn't create its own
     * "this"
     */
    this.updateFilterString = this.updateFilterString.bind(this);
  }

  componentDidMount() {
    this.messagesRef = firebase.listenTo('messages', (firebaseData) => {
      // We call .val() to get an actual data object, rather than a Firebase object
      this.setState({
        isLoading: false,
        data: firebaseData.val()
      });
    });
  }

  // We must unmount this otherwise we'll end up with an open connection
  componentWillUnmount() {
    this.messagesRef.off();
  }

  /**
   * We want to update our local filterString here - it's an easy way to work
   * with it (as we need it in this component to filter out the todo list items
   * we have). We'll also pass this function down to our SearchField component -
   * this way, when the search field updates, we can pass that data back up to
   * this component for it to use.
   *
   * There are many different ways of tackling this problem, this is just one
   * way of tackling it.
   */
  updateFilterString(value) {
    this.setState({
      filterString: value
    });
  }

  render() {
    if(this.state.isLoading) {
      return (
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )
    }

    // Sometimes we might want to re-structure the data we get so that it is
    // easier to work with. Here, we take each list item and create a new array
    // of objects, each with a "key" and a "value". We need the "key" because
    // this is the Firebase key for this particular item, and if we want to
    // update the item then we must use this key
    let formattedData = Object.entries(this.state.data || {}).map((listItem) => {
      // listItem is an array with 2 values - the first being the firebase key
      // and the second being the data itself
      return {
        key: listItem[0],
        value: listItem[1]
      }
    })

    /**
     * The only way we can "search" some data with Firebase Realtime Database is
     * to filter our data. Because we converted our data into an array just
     * above here, we can now use the array's built-in function "filter" to
     * filter out the stuff we want
     */
    formattedData = formattedData.filter(element => {
      /**
       * Testing a string contains another string is normally case-sensitive.
       * To get around this, we can convert our the strings we're working with
       * to lowercase, then compare them.
       * This way we can avoid "Chips" not matching "chips"
       */
      const lowercaseMessage = element.value.message.toLowerCase();
      const lowercaseFilterString = this.state.filterString.toLowerCase();
      return lowercaseMessage.includes(lowercaseFilterString);
    })

    return (
      <div>
        {/* This has been moved here from our App.js */}
        <InputField />
        <SearchField onSomeChange={this.updateFilterString} />

        <div className="list-group">
          {formattedData.map((listItem) => {
            return (
              <ListItem
                // When looping over elements in React, remember to add a unique
                // "key" value. This is so React can optimise its updates and
                // only update stuff that changes
                key={listItem.key}
                firebaseKey={listItem.key}
                data={listItem.value}
              />
            )
          })}
        </div>
      </div>
    );
  }
}

export default TodoList;
