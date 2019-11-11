import React from 'react';

import firebase from '../services/firebase';
import ListItem from './ListItem';

class TodoList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      data: {}
    }
  }

  componentDidMount() {
    this.messagesRef = firebase.listenTo('messages', (data) => {
      // We call .val() to get an actual data object, rather than a firebase object
      this.setState({
        isLoading: false,
        data: data.val()
      })
    });
  }

  // We must unmount this otherwise we'll end up with an open connection
  componentWillUnmount() {
    this.messagesRef.off();
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
    const formattedData = Object.entries(this.state.data || {}).map((listItem) => {
      // listItem is an array with 2 values - the first being the firebase key
      // and the second being the data itself
      return {
        key: listItem[0],
        value: listItem[1]
      }
    })

    return (
      <div>
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