import React, { useEffect, useState } from "react";

import "./App.scss";

interface todosType {
  id: number;
  title: string;
  isDone: boolean;
}

function App() {
  const [userInput, setUserInput] = useState<string>("");
  const [todos, setTodos] = useState<Array<todosType>>([]);
  const HandleSubmit = (e: any) => {
    e.preventDefault();
    const d = new Date();
    if (userInput !== "") {
      let temp: todosType = {
        id: d.getTime(),
        title: userInput,
        isDone: false,
      };
      setTodos([...todos, temp]);
      setUserInput("");
    }
  };
  const Delete = (id: number) => {
    const temp = [...todos];
    const index = todos.findIndex((item) => item.id === id);
    temp.splice(index, 1);
    setTodos(temp);
  };
  const ToggleIsDone = (id: number) => {
    const temp = [...todos];
    const index = todos.findIndex((item) => item.id === id);
    temp[index].isDone = !temp[index].isDone;
    setTodos(temp);
  };
  return (
    <>
      <div className='App'>
        <form onSubmit={HandleSubmit}>
          <input
            maxLength={20}
            type='text'
            onChange={(e) => {
              setUserInput(e.target.value);
            }}
          />
        </form>
        <div className='todosWrapper'>
          {todos.map((item: todosType) => {
            return (
              <div key={item.id}>
                <p
                  onClick={() => {
                    ToggleIsDone(item.id);
                  }}
                  className={item.isDone ? "done" : ""}>
                  {item.title}
                </p>
                <button
                  onClick={() => {
                    Delete(item.id);
                  }}>
                  x
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
