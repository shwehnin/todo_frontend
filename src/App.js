import './App.css';
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import TodoFilters from "./components/TodoFilters";
import ClearCompletedBtn from "./components/ClearCompletedBtn";
import CheckAllRemaining from "./components/CheckAllRemaining";
import { useCallback, useEffect, useState } from "react";

function App() {
  let [todos, setTodos] = useState([]);
  let [filteredTodos, setFilteredTodos] = useState(todos);

  useEffect(() => {
    fetch("http://192.168.43.107:8000/api/v1/todo")
      .then((res) => res.json())
      .then((todos) => {
        setTodos(todos.data);
        setFilteredTodos(todos.data);
      });
  }, []);

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

  let addTodo = (todo) => {
    // update data at server side
    fetch("http://192.168.43.107:8000/api/v1/todo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    });
    // update data at client side
    setTodos((prevState) => [...prevState, todo]);
  };

  let deleteTodo = (todoId) => {
    // server
    fetch(`http://192.168.43.107:8000/api/v1/todo/${todoId}`, {
      method: "DELETE",
    });
    // client
    setTodos((prevState) => {
      return prevState.filter((todo) => {
        return todo.id != todoId;
      });
    });
  };

  let updateTodo = (todo) => {
    fetch(`http://192.168.43.107:8000/api/v1/todo/${todo.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    });
    setTodos((prevState) => {
      return prevState.map((item) => {
        if (item.id == todo.id) {
          return todo;
        }
        return item;
      });
    });
  };

  let checkAll = () => {
    todos.forEach(item => {
      console.log(item.status_check);
      item.status_check = 1;
      console.log(`Status ${item.satus_check}`);
      updateTodo(item);
    });
    setTodos((prevState) => {
      return prevState.map((item) => {
        return { ...item, status_check: 1 };
      });
    });
  };

  let remainingCount = todos.filter((item) => item.status_check != 1).length;

  let clearCompleted = () => {
    todos.forEach(item => {
      if(item.status_check == 1) {
        deleteTodo(item.id);
      }
    })
    setTodos((prevState) => {
      return prevState.filter((item) => item.status_check != 1);
    })
  }

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