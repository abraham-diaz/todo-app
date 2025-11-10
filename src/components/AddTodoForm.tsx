import { useState } from "react"

interface AddTodoFormProps {
  onAdd: (text: string) => void
}

const AddTodoForm = ({ onAdd }: AddTodoFormProps) => {
  const [text, setText] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!text.trim()) return
    onAdd(text)
    setText("")
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Añadir tarea..."
        className="flex-1 px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Añadir
      </button>
    </form>
  )
}

export default AddTodoForm
