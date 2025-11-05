import { useState } from "react";
import { useTodo } from "../Contexts";

function TodoForm() {
  const [todo, setTodo] = useState("");
  const [priority, setPriority] = useState("medium")

  const { addTodo } = useTodo();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!todo.trim()) return; //prevents spaces to submit

    addTodo({ todo: todo, isComplete: false,priority });
    setTodo("");
    setPriority("medium");
  };

  return (
    <form onSubmit={handleSubmit} className="flex">
      <input
        type="text"
        placeholder="Write Todo..."
        className="w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-1.5"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />

      {/* Priority Select  */}
      <select
      className="w-fit border border-black/10 px-2 bg-white/20"
      value={priority}
      onChange={(e) => setPriority(e.target.value)}
      >
        <option value="high">High 🔴</option>
        <option value="medium">Medium 🟡</option>
        <option value="low">Low 🟢</option>
      </select>

      <button type="submit" className="rounded-r-lg px-3 py-1 bg-green-600 text-white shrink-0 ">
        Add
      </button>
    </form>
  );
}

export default TodoForm;
