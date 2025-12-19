import { useState, useEffect } from "react"
import AddTodoForm from "./components/AddTodoForm"
import TodoList from "./components/TodoList"
import { type Todo } from "./types/todo"

const API_URL = "http://localhost:3000/api/todos"

function App() {
  const [todos, setTodos] = useState<Todo[]>([])

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(setTodos)
  }, [])

  const addTodo = async (text: string) => {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    })
    const newTodo = await res.json()
    setTodos([newTodo, ...todos])
  }

  const toggleTodo = async (id: number) => {
    const res = await fetch(`${API_URL}/${id}`, { method: "PATCH" })
    const updated = await res.json()
    setTodos(todos.map(t => (t.id === id ? updated : t)))
  }

  const deleteTodo = async (id: number) => {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" })
    setTodos(todos.filter(t => t.id !== id))
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-6">
      <div className="bg-gray-800 p-6 rounded-2xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-4">
          Todo List
        </h1>
        <AddTodoForm onAdd={addTodo} />
        <TodoList todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} />
      </div>
    </div>
  )
}

export default App
