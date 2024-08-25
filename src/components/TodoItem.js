import React, { useState } from 'react';
import './TodoItem.css';

function TodoItem({ todo, onToggle, onDelete }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = () => {
    setIsDeleting(true);
    setTimeout(() => {
      onDelete(todo._id);
    }, 300); // Matches the duration of the fade-out animation
  };

  return (
    <li
      className={`todo-item ${todo.completed ? 'completed' : ''} ${isDeleting ? 'deleting' : ''}`}
    >
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={onToggle}
      />
      {todo.text}
      <button onClick={handleDelete}>Delete</button>
    </li>
  );
}

export default TodoItem;
