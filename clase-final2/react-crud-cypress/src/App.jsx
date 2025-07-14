import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'

export default function App() {
  const [tasks, setTasks] = useState([])

  const fetchTasks = async () => {
    const { data } = await supabase.from('tasks').select('*')
    setTasks(data || [])
  }

  const addTask = async (title) => {
    const { data } = await supabase.from('tasks').insert([{ title, completed: false }]).select()
    if (data) setTasks([...tasks, data[0]])
  }

  const deleteTask = async (id) => {
    await supabase.from('tasks').delete().eq('id', id)
    setTasks(tasks.filter((t) => t.id !== id))
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  return (
    <div className="max-w-xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Tareas</h1>
      <TaskForm onAdd={addTask} />
      <TaskList tasks={tasks} onDelete={deleteTask} />
    </div>
  )
}
