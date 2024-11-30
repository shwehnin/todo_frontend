import React, { useState } from "react";

export default function TodoForm({addTodo}) {
  let [title, setTitle] = useState('');

  let handleSubmit = (e) => {
    e.preventDefault();
    let todo = {
      title: title,
      due_date: '30-11-2024',
    }
    addTodo(todo);
    setTitle('');
  }
  return (
    <form action="#" onSubmit={handleSubmit}>
      <input
        type="text"
        className="todo-input"
        placeholder="What do you need to do?"
        onChange={e => setTitle(e.target.value)}
        value={title}
      />
    </form>
  );
}