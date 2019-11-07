import React from 'react';

import List from './components/List';

class App extends React.Component {
  render() {
    return (
      <div className="container">
        <h1>Firebase Todo List</h1>
        <List />
      </div>
    );
  }
}

export default App;
