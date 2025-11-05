import React, { createContext, useContext } from "react";

export const TodoContext = createContext({
    todos: [
        {
            id: 1,
            todo: "Add Todo",
            isComplete: false,
            priority: "medium"
        }
    ],
    addTodo: (todo)=>{},
    deleteTodo: (id)=>{},
    updateTodo: (id,todo)=>{},
    toggleComplete: (id)=>{}
});


export const TodoContextProvider = TodoContext.Provider;

//custom hook

export const useTodo = () => {
    const context = useContext(TodoContext)

    if(!context){
        throw new Error("useTodo must be used within TodoContextProvider")
    }

    return context;
}
