import { useState } from "react";
import {useTodo} from "./../Contexts/"

function TodoItem({ todo }){

    const [isTodoEditable, setIsTodoEditable] = useState(false);
    const [todoMsg, setTodoMsg] = useState(todo.todo)

    const {deleteTodo, updateTodo, toggleComplete ,priority} = useTodo();
    
    const toggleCompleted = () => {
        toggleComplete(todo.id)
    }

    const editTodo = () => {
        if(!todoMsg.trim()) return;  //prevents the empty updates
        updateTodo(todo.id,{todo: todoMsg.trim()})
        setIsTodoEditable(false)
    }

    const badge =
  todo.priority === "high"
    ? "bg-red-500/20 text-red-300 border-red-400/30"
    : todo.priority === "medium"
    ? "bg-yellow-500/20 text-yellow-300 border-yellow-400/30"
    : "bg-green-500/20 text-green-300 border-green-400/30";

    return(
        <div className={`flex border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300 text-black ${
            todo.isComplete ? "bg-[#c6e9a7]" : "bg-[#ccbed7]"
        }`}>

            <input type="checkbox" 
            className="cursor-pointer"
            checked={todo.isComplete}
            onChange={toggleCompleted}
             />

            <span className={`text-xs py-1.5 `}>
                {todo.priority === "high" ? "🔴" : todo.priority === "low" ? "🟢" : "🟡"}
            </span>

            <input type="text"
            className={`border outline-none w-full bg-transparent rounded-lg
                ${
                    isTodoEditable ? "border-2 border-black/10 px-2" : "border-transparent"
                }
                ${
                    todo.isComplete ? "line-through" : ""
                }`
            } 
            value={todoMsg}
            onChange={(e)=> setTodoMsg(e.target.value)}
            readOnly={!isTodoEditable}
            />


            {/* buttons :- edit/save */}
            <button
            className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center hover:bg-gray-100 shrink-0 disabled:opacity-50 cursor-pointer"
            onClick={()=>{
                if(todo.isComplete) return;

                if(isTodoEditable){
                    editTodo();
                }
                else{
                    setIsTodoEditable((prev) => !prev);
                }
            }}
            disabled={todo.isComplete}>
                {isTodoEditable ? "📁" : "✏️"}
            </button>

            {/* Delete button */}
            <button
            className="inline-flex w-8 h-8 text-sm border border-black/10 justify-center items-center hover:bg-gray-100 shrink-0 cursor-pointer rounded-lg"
            onClick={() => deleteTodo(todo.id)}>
                ❌
            </button>

            {/* inline editing */}
            <select
            value={todo.priority || "medium"}
            onChange={(e) => updateTodo(todo.id,{priority:e.target.value})}
            className="border border-black/10 rounded-md bg-transparent text-xs px-1 py-0.5">
                <option value="high">🔴</option>
                <option value="medium">🟡</option>
                <option value="low">🟢</option>
            </select>
        </div>
    )
}


export default TodoItem;