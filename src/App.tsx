import React from "react";
import "./App.css";
import { Todolist } from "./Todolist";

function App() {
  return (
    <div className="App">
      <Todolist title="What to learn" />
      <Todolist title="Movies" />
      <Todolist title="Songs" />

      <input type="checkbox" />
      <input type="date" />
      <input placeholder="It-incubator" />
    </div>
  );
}

export default App;
