import './App.css';
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import TodoFilters from "./components/TodoFilters";
import ClearCompletedBtn from "./components/ClearCompletedBtn";
import CheckAllRemaining from "./components/CheckAllRemaining";
import { useCallback, useEffect, useState } from "react";

function App() {
  // State for storing all todos
  let [todos, setTodos] = useState([]);
  // State for storing filtered todos based on the selected filter
  let [filteredTodos, setFilteredTodos] = useState(todos);

  // Fetch todos from the server when the component mounts
  useEffect(() => {
    fetch("http://192.168.43.107:8000/api/v1/todo")
      .then((res) => res.json())
      .then((todos) => {
        setTodos(todos.data);
        setFilteredTodos(todos.data);
      });
  }, []);

  // Function to filter todos based on the filter type (All, Active, Completed)
  let filterBy = useCallback((filter) => {
    if(filter == "All") {
      setFilteredTodos(todos);
    }
    if(filter == 'Active') {
      setFilteredTodos(todos.filter(item => !item.status_check));
    }
    if(filter == 'Completed') {
      setFilteredTodos(todos.filter(item => item.status_check));
    }
  }, [todos])

  // Function to add a new todo
  let addTodo = (todo) => {
    // Save the new todo to the server
    fetch("http://192.168.43.107:8000/api/v1/todo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    });
    // Update the todos state locally
    setTodos((prevState) => [...prevState, todo]);
  };

  // Function to delete a todo
  let deleteTodo = (todoId) => {
    // Delete the todo from the server
    fetch(`http://192.168.43.107:8000/api/v1/todo/${todoId}`, {
      method: "DELETE",
    });
    // Remove the todo locally
    setTodos((prevState) => {
      return prevState.filter((todo) => {
        return todo.id != todoId;
      });
    });
  };

  // Function to update a todo
  let updateTodo = (todo) => {
    // Update the todo on the server
    fetch(`http://192.168.43.107:8000/api/v1/todo/${todo.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    });
    // Update the todo locally
    setTodos((prevState) => {
      return prevState.map((item) => {
        if (item.id == todo.id) {
          return todo;
        }
        return item;
      });
    });
  };

  // Function to mark all todos as completed
  let checkAll = () => {
    todos.forEach(item => {
      // Set the status to completed
      item.status_check = 1;
      // Update the status on the server
      updateTodo(item);
    });
    // Update the local todos state
    setTodos((prevState) => {
      return prevState.map((item) => {
        return { ...item, status_check: 1 };
      });
    });
  };

  // Calculate the count of remaining (active) todos
  let remainingCount = todos.filter((item) => item.status_check != 1).length;

  // Function to clear all completed todos
  let clearCompleted = () => {
    todos.forEach(item => {
      if(item.status_check == 1) {
        deleteTodo(item.id);
      }
    })
    // Remove completed todos locally
    setTodos((prevState) => {
      return prevState.filter((item) => item.status_check != 1);
    })
  }

  // Render the Todo app with various components
  return (
    <div className="todo-app-container">
      <div className="todo-app">
        <h2>Todo App</h2>
        <TodoForm addTodo={addTodo} />
        <TodoList
          todos={filteredTodos}
          deleteTodo={deleteTodo}
          updateTodo={updateTodo}
        />

        <CheckAllRemaining
          remainingCount={remainingCount}
          checkAll={checkAll}
        />

        <div className="other-buttons-container">
          <TodoFilters filterBy={filterBy} />
          <ClearCompletedBtn clearCompleted={clearCompleted} />
        </div>
      </div>
    </div>
  );
}

export default App;