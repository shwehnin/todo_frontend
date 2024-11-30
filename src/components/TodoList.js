import React from "react";
import Todo from '../components/Todo.js';

export default function TodoList({todos, deleteTodo, updateTodo}) {
  return (
    <ul className="todo-list">
      
      {todos.length > 0 ? todos.map(todo => (
        <Todo todo={todo} key={todo.id} deleteTodo={deleteTodo} updateTodo={updateTodo}/>
      )) : <span className="no-data">No Data</span>}
      
    </ul>
  );
}