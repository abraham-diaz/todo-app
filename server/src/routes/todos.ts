import { Router } from "express"
import db from "../db.js"

const router = Router()

interface TodoRow {
  id: number
  text: string
  completed: number
  created_at: string
}

router.get("/", (_req, res) => {
  const todos = db.prepare("SELECT * FROM todos ORDER BY created_at DESC").all() as TodoRow[]
  res.json(todos.map(t => ({ ...t, completed: Boolean(t.completed) })))
})

router.post("/", (req, res) => {
  const { text } = req.body
  if (!text?.trim()) {
    return res.status(400).json({ error: "Text is required" })
  }
  const result = db.prepare("INSERT INTO todos (text) VALUES (?)").run(text.trim())
  const todo = db.prepare("SELECT * FROM todos WHERE id = ?").get(result.lastInsertRowid) as TodoRow
  res.status(201).json({ ...todo, completed: Boolean(todo.completed) })
})

router.patch("/:id", (req, res) => {
  const { id } = req.params
  const todo = db.prepare("SELECT * FROM todos WHERE id = ?").get(id) as TodoRow | undefined
  if (!todo) {
    return res.status(404).json({ error: "Todo not found" })
  }
  db.prepare("UPDATE todos SET completed = ? WHERE id = ?").run(todo.completed ? 0 : 1, id)
  const updated = db.prepare("SELECT * FROM todos WHERE id = ?").get(id) as TodoRow
  res.json({ ...updated, completed: Boolean(updated.completed) })
})

router.delete("/:id", (req, res) => {
  const { id } = req.params
  const result = db.prepare("DELETE FROM todos WHERE id = ?").run(id)
  if (result.changes === 0) {
    return res.status(404).json({ error: "Todo not found" })
  }
  res.status(204).send()
})

export default router
