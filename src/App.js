import React from 'react';

import TodoList from './components/TodoList';
import InputField from './components/InputField';

const App = () => {
  return (
    <div className="container">
      <h1>Firebase Todo List</h1>
      {/* Should I be loaded here? */}
      <InputField />
      <TodoList />
    </div>
  );
}

export default App;
