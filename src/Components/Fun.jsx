import React, { useState } from 'react';

function Fun() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddTodo = () => {
    if (inputValue.trim() !== '') {
      if (editIndex !== null) {
        const newTodos = [...todos];
        newTodos[editIndex] = inputValue;
        setTodos(newTodos);
        setEditIndex(null);
        setEditValue('');
      } else {
        setTodos([...todos, inputValue]);
      }
      setInputValue('');
    }
  };

  const handleEditTodo = (index) => {
    setEditIndex(index);
    setEditValue(todos[index]);
  };

  const handleDeleteTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  const handleClearAll = () => {
    setTodos([]);
  };

  return (
    <div>
      <h1>Todo List</h1>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Add todo..."
      />
      <button onClick={handleAddTodo}>{editIndex !== null ? 'Update' : 'Add'}</button>
      {editIndex !== null && (
        <button onClick={() => setEditIndex(null)}>Cancel Edit</button>
      )}
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            {editIndex === index ? (
              <input
                type="text"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
              />
            ) : (
              <span>{todo}</span>
            )}
            {editIndex !== index ? (
              <button onClick={() => handleEditTodo(index)}>Edit</button>
            ) : (
              <button onClick={handleAddTodo}>Save</button>
            )}
            <button onClick={() => handleDeleteTodo(index)}>Delete</button>
          </li>
        ))}
      </ul>
      {todos.length > 0 && <button onClick={handleClearAll}>Clear All</button>}
    </div>
  );
}

export default Fun;
