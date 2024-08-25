import React, { useEffect, useState } from 'react';
import './App.css';
import TodoList from './components/TodoList';
import AddTodo from './components/AddTodo';

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/todos')
      .then(response => response.json())
      .then(data => setTodos(data));
  }, []);

  const addTodo = (text) => {
    fetch('http://localhost:5000/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: Date.now(), text, completed: false })
    })
      .then(response => response.json())
      .then(newTodo => setTodos([...todos, newTodo]));
  };

  const toggleTodo = (id) => {
    const todo = todos.find(todo => todo.id === id);
    fetch(`http://localhost:5000/todos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: !todo.completed })
    })
      .then(response => response.json())
      .then(updatedTodo => setTodos(
        todos.map(todo =>
          todo.id === id ? updatedTodo : todo
        )
      ));
  };

  const deleteTodo = (id) => {
    fetch(`http://localhost:5000/todos/${id}`, {
      method: 'DELETE'
    })
      .then(() => setTodos(todos.filter(todo => todo.id !== id)));
  };

  return (
    <div className="App">
      <h1>To-Do List</h1>
      <AddTodo onAdd={addTodo} />
      <TodoList todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} />
    </div>
  );
}

export default App;
