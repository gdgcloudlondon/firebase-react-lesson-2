import React from 'react';

import TodoList from './components/TodoList';

const App = () => {
  return (
    <div className="container">
      <h1>Firebase Todo List</h1>

      {/* <InputField /> has been moved from here to components/TodoList */}

      <TodoList />
    </div>
  );
}

export default App;
