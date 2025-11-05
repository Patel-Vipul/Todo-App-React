import { useEffect, useMemo, useState } from "react";
import { TodoContextProvider } from "./Contexts";
import TodoForm from "./Components/TodoForm";
import TodoItem from "./Components/TodoItem";

function App() {

  //states
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("")

  //variable-progress bar
  const totalTodos = todos.length;
  const completedTodos = todos.filter((todo) => todo.isComplete).length;
  const progress = totalTodos === 0 ? 0 : Math.round((completedTodos/totalTodos) * 100);

  //function to add new Todos in a array
  const addTodo = (todo) => {
    setTodos((prevTodos) => [{ id: Date.now(), ...todo }, ...prevTodos]);
  };

  //function to delete todos
  const deleteTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((prevTodo) => prevTodo.id !== id));
  };

  //function to update existing todos
  const updateTodo = (id, todo) => {
    setTodos((prevTodos) =>
      prevTodos.map((prevTodo) =>
        prevTodo.id === id ? { ...prevTodo, ...todo } : prevTodo
      )
    );
  };

  //function to check whether the todo is completed or not
  const toggleComplete = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((prevTodo) =>
        prevTodo.id === id
          ? { ...prevTodo, isComplete: !prevTodo.isComplete }
          : prevTodo
      )
    );
  };


useEffect(() => {
  try {
    const raw = localStorage.getItem("todos");
    if (!raw) return; 

    const parsed = JSON.parse(raw);

    if (Array.isArray(parsed)) {
      const safeTodos = parsed.map(todo => ({
        id: todo.id,
        todo: todo.todo,
        isComplete: Boolean(todo.isComplete),
        priority: todo.priority || "medium", 
      }));
      setTodos(safeTodos);
    }
  } catch (error) {
    console.error("Failed to load todos:", error);
  }
}, []);

useEffect(() => {
  // Avoid writing an empty array on the very first render
  if (todos.length === 0) return;
  localStorage.setItem("todos", JSON.stringify(todos));
}, [todos]);

  
  const value = useMemo(
    () => ({ todos, addTodo, deleteTodo, updateTodo, toggleComplete }),
    [todos]
  );
  
  //function to filter the todos
  const filteredTodos = todos
  .filter((todo) => {
      if (filter === "active") return !todo.isComplete;
      if (filter === "completed") return todo.isComplete;
      return true;
    }).
    filter((todo)=> todo.todo.toLowerCase().includes(search.toLowerCase()));
    
    const clearAll = () => {
      setTodos([]);
      localStorage.removeItem("todos");
    };
  return (
    <TodoContextProvider value={value}>
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <div className="flex">
            <h1 className="text-2xl font-bold text-center mb-8 mt-2 w-full  ">
              Manage Your Todos
            </h1>
          </div>

          {/* Seacrh box */}
          <div className="text-center">
            <input type="text"
            placeholder="Search Tasks..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-fit px-3 py-2 mb-4 rounded-lg bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"/>
          </div>

          {/* filter section */}
          <div className="flex justify-center mb-5">
            <div className="inline-flex bg-white/10 backdrop-blur-sm rounded-full p-1 gap-1">
              <button
                onClick={() => setFilter("all")}
                className={`px-4 py-1 rounded-full text-sm font-medium transition
      ${
        filter === "all"
          ? "bg-blue-500 text-white"
          : "text-gray-300 hover:bg-white/20"
      }`}>
                All
              </button>

              <button
                onClick={() => setFilter("active")}
                className={`px-4 py-1 rounded-full text-sm font-medium transition
      ${
        filter === "active"
          ? "bg-blue-500 text-white"
          : "text-gray-300 hover:bg-white/20"
      }`}>
                Active
              </button>

              <button
                onClick={() => setFilter("completed")}
                className={`px-4 py-1 rounded-full text-sm font-medium transition
      ${
        filter === "completed"
          ? "bg-blue-500 text-white"
          : "text-gray-300 hover:bg-white/20"
      }`}>
                Completed
              </button>
            </div>
          </div>

          {/* Progress-bar */}
          <div className="w-full mb-4">
            <p className="text-center text-sm text-gray-200 mb-1">
              Completed {completedTodos} of {totalTodos} Tasks ({progress}%)
            </p>
            <div className="w-full bg-white/20 h-3 rounded-full overflow-hidden">
              <div
            style={{width: `${progress}%`}}
            className="h-full bg-green-400 transition-all duration-300">
            </div>
            </div>
          </div>

          <div className="mb-4">
            {/* Todo form goes here */}
            <TodoForm />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {/*Loop and Add TodoItem here */}
            {filteredTodos.map((todo) => (
              <div key={todo.id} className="w-full">
                <TodoItem todo={todo} />
              </div>
            ))}
          </div>

          <div className="text-center">
            <button
              className="w-fit h-fit mb-8 mt-5 bg-red-400 p-1 rounded-sm font-semibold cursor-pointer"
              onClick={clearAll}>
              Clear All
            </button>
          </div>
        </div>
      </div>
    </TodoContextProvider>
  );
}

export default App;
