import { type Todo } from "../types/todo"
import TodoItem from "./TodoItem"

interface TodoListProps {
  todos: Todo[]
  onToggle: (id: number) => void
  onDelete: (id: number) => void
}

const TodoList = ({ todos, onToggle, onDelete }: TodoListProps) => {
  if (todos.length === 0)
    return <p className="text-gray-400 text-center">No hay tareas aún.</p>

  return (
    <ul className="space-y-2 mt-4">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  )
}

export default TodoList
