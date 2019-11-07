import React from 'react';

import firebase from '../services/firebase';
import ListItem from './ListItem';
import Form from './Form';

class List extends React.Component {
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

    const formattedData = Object.entries(this.state.data || {}).map((listItem) => {
      // listItem is an array with 2 values - the first being the firebase key
      // and the second being the data itself. We want to get the data out like
      // this because we will need the key to update our data
      return {
        key: listItem[0],
        value: listItem[1]
      }
    })

    return (
      <div>
        <Form />
        <div className="list-group">
          {formattedData.map((listItem) => {
            return (
              <ListItem
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

export default List;
