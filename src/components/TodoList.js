import React from 'react';
import TodoItem from './TodoItem';

function TodoList({ todos, onToggle, onDelete }) {
  return (
    <ul>
      {todos.map(todo => (
        <TodoItem
          key={todo._id}
          todo={todo}
          onToggle={() => onToggle(todo._id)}
          onDelete={() => onDelete(todo._id)}
        />
      ))}
    </ul>
  );
}

export default TodoList;
