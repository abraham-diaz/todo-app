import express from "express"
import cors from "cors"
import path from "path"
import { fileURLToPath } from "url"
import todosRouter from "./routes/todos.js"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const isProduction = process.env.NODE_ENV === "production"
const PORT = 3001

async function createServer() {
  const app = express()

  app.use(cors())
  app.use(express.json())

  // API routes
  app.use("/api/todos", todosRouter)

  if (isProduction) {
    // Production: serve static files
    const distPath = path.resolve(__dirname, "../../dist")
    app.use(express.static(distPath))
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"))
    })
  } else {
    // Development: use Vite as middleware
    const { createServer: createViteServer } = await import("vite")
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
      root: path.resolve(__dirname, "../.."),
    })
    app.use(vite.middlewares)
  }

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
  })
}

createServer()
