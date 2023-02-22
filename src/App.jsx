import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./App.css";

function Task({ task, handleCompleteTask, handleDeleteTask }) {
  return (
    <div className="task">
      <span
        style={{
          textDecoration: task.done ? "line-through" : "none",
        }}
      >
        {task.text}
      </span>
      <button onClick={() => handleCompleteTask(task.id)}>complete</button>
      <button onClick={() => handleDeleteTask(task.id)}>delete</button>
    </div>
  );
}

function App() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [filter, setFilter] = useState("all");

  function handleAddTask() {
    if (!task.trim()) return;
    setTasks([{ text: task, id: uuidv4(), done: false }, ...tasks]);
    setTask("");
  }

  function handleCompleteTask(id) {
    setTasks((prev) => {
      return prev.map((task) => {
        return task.id === id ? { ...task, done: !task.done } : task;
      });
    });
  }

  function handleDeleteTask(id) {
    setTasks((prev) => {
      return prev.filter((task) => {
        return task.id !== id;
      });
    });
  }

  function handleFilterChange(event) {
    setFilter(event.target.value);
  }

  const filteredTasks = tasks.filter((task) => {
    if (filter === "done") {
      return task.done;
    } else if (filter === "undone") {
      return !task.done;
    } else {
      return true;
    }
  });

  return (
    <div className="App">
      <div className="input">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button onClick={handleAddTask}>Add Task</button>
      </div>
      <div className="filters">
        <label>
          <input
            type="radio"
            name="filter"
            value="all"
            checked={filter === "all"}
            onChange={handleFilterChange}
          />
          All
        </label>
        <label>
          <input
            type="radio"
            name="filter"
            value="done"
            checked={filter === "done"}
            onChange={handleFilterChange}
          />
          Done
        </label>
        <label>
          <input
            type="radio"
            name="filter"
            value="undone"
            checked={filter === "undone"}
            onChange={handleFilterChange}
          />
          Undone
        </label>
      </div>
      <div className="tasks">
        {filteredTasks.map((task) => {
          return (
            <Task
              key={task.id}
              task={task}
              handleCompleteTask={handleCompleteTask}
              handleDeleteTask={handleDeleteTask}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;