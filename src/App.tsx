import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [inputValue, setinputValue] = useState("");
  const [todos, settodos] = useState<Todo[]>([]);

  type Todo = {
    inputValue: string;
    id: number;
    checked: boolean;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setinputValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newTodo: Todo = {
      inputValue: inputValue,
      id: todos.length,
      checked: false,
    };
    settodos([newTodo, ...todos]);
    setinputValue("");
  };

  const handleEdit = (id: number, inputValue: string) => {
    const newTodos = todos.map((todo) => {
      if (todo.id == id) {
        todo.inputValue = inputValue;
      }
      return todo;
    });
    settodos(newTodos);
  };

  const handleChecked = (id: number, checked: boolean) => {
    const newTodos = todos.map((todo) => {
      if (todo.id == id) {
        todo.checked = !checked;
      }
      return todo;
    });
    settodos(newTodos);
  };

  const handleDelete = (id: number) => {
    settodos(todos.filter((todo) => todo.id != id));
  };

  return (
    <div className="App">
      <div>
        <h2>Todoリスト</h2>
        <form onSubmit={(e) => handleSubmit(e)}>
          <input
            value={inputValue}
            type="text"
            onChange={(e) => handleChange(e)}
            className="inputText"
          />
          <input type="submit" value="作成" className="submitButton" />
        </form>
        <ul className="todoList">
          {todos.map((todo) => (
            <li key={todo.id}>
              <input
                value={todo.inputValue}
                type="text"
                onChange={(e) => handleEdit(todo.id, e.target.value)}
                className="inputText"
                disabled={todo.checked}
              />
              <input
                type="checkbox"
                onChange={() => handleChecked(todo.id, todo.checked)}
              />
              <button onClick={() => handleDelete(todo.id)}>消す</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
