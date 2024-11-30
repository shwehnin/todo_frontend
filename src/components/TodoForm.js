import React, { useState } from "react";

export default function TodoForm({ addTodo }) {
  // State to manage the input value for the todo title
  let [title, setTitle] = useState("");

  // Handler for form submission
  let handleSubmit = (e) => {
    e.preventDefault();
    let todo = {
      title: title
    };
    // Call the parent `addTodo` function to add the new todo
    addTodo(todo);
    // Clear the input field after submission
    setTitle("");
  };
  return (
    <form action="#" onSubmit={handleSubmit}>
      <input
        type="text"
        className="todo-input"
        placeholder="What do you need to do?"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />
    </form>
  );
}
