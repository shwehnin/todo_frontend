import React, { useState } from "react";

export default function Todo({ todo, deleteTodo, updateTodo }) {
  // State to manage edit mode
  let [isEdit, setIsEdit] = useState(false);
  // State to manage the updated title of the todo
  let [title, setTitle] = useState(todo.title);

  // Handler to update a todo's title and status when the form is submitted
  let updateTodoHandler = (e) => {
    // Prevent the default form submission behavior
    e.preventDefault(); 
    // Updated title from state
    let updatedTodo = {
      id: todo.id,
      title,
      status_check: todo.status_check,
    };
    // Call the parent updateTodo function
    updateTodo(updatedTodo);
    // Exit edit mode
    setIsEdit(false);
  };

  // Handler to toggle the completion status of the todo
  let handleCheckbox = () => {
    let updatedTodo = {
      id: todo.id,
      title,
      status_check: !todo.status_check,
    };
    // Call the parent updateTodo function
    updateTodo(updatedTodo);
  };
  return (
    <li className="todo-item-container">
      <div className="todo-item">
        <input
          type="checkbox"
          checked={todo.status_check == 1}
          onChange={handleCheckbox}
        />
        {!isEdit && (
          <span
            onDoubleClick={() => setIsEdit(true)}
            className={`todo-item-label ${
              todo.status_check == 1 ? "line-through" : ""
            }`}
          >
            {todo.title}
          </span>
        )}
        {isEdit && (
          <form onSubmit={updateTodoHandler}>
            <input
              type="text"
              className="todo-item-input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </form>
        )}
      </div>
      <button className="x-button" onClick={() => deleteTodo(todo.id)}>
        <svg
          className="x-button-icon"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </li>
  );
}
