import { useState } from "react"
import AddTodoForm from "./components/AddTodoForm"
import TodoList from "./components/TodoList"
import { type Todo } from "./types/todo"

function App() {
  const [todos, setTodos] = useState<Todo[]>([])

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: Date.now(),
      text,
      completed: false,
    }
    setTodos([...todos, newTodo])
  }

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    )
  }

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((t) => t.id !== id))
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
