import { useState } from 'react'

export default function TaskForm({ onAdd }) {
  const [title, setTitle] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title.trim()) return
    onAdd(title)
    setTitle('')
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
      <input
        type="text"
        placeholder="Nueva tarea"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 rounded w-full"
      />
      <button className="bg-blue-500 text-white px-4 py-2 rounded">Agregar</button>
    </form>
  )
}
