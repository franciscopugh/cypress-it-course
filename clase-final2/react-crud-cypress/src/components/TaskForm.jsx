import { useEffect, useState } from 'react'

export default function TaskForm({ onSubmit, taskToEdit }) {
  const [title, setTitle] = useState('')

  //Si existe una tarea para editar, actualizo el estado del titulo
  useEffect(() => {
    
    setTitle(taskToEdit?.title || ' ')
    
  },[taskToEdit])

  const handleSubmit = (e) => {
    e.preventDefault()
    //Retorno el titulo si no esta vacio
    if (!title.trim()) return
    onSubmit(title)
    setTitle('')
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
      <input
        type="text"
        placeholder="Nueva tarea"
        
        value={taskToEdit ? taskToEdit.title : ' '}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 rounded w-full"
      />
      <button  type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">{taskToEdit ? 'Actualizar' :  'Agregar'}</button>
    </form>
  )
}
