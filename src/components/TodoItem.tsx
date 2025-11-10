import { type Todo } from "../types/todo"

interface TodoItemProps {
  todo: Todo
  onToggle: (id: number) => void
  onDelete: (id: number) => void
}

const TodoItem = ({ todo, onToggle, onDelete }: TodoItemProps) => {
  return (
    <li className="flex justify-between items-center bg-gray-100 p-3 rounded-lg mb-2">
      <span
        onClick={() => onToggle(todo.id)}
        className={`flex-1 cursor-pointer ${
          todo.completed ? "line-through text-gray-400" : ""
        }`}
      >
        {todo.text}
      </span>
      <button
        onClick={() => onDelete(todo.id)}
        className="text-red-500 hover:text-red-700 transition"
      >
        ✕
      </button>
    </li>
  )
}

export default TodoItem
