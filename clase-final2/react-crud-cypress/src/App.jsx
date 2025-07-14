import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'

export default function App() {
  //Estado del componente para almacenar las tareas
  const [tasks, setTasks] = useState([])
  const [taskToEdit, setTaskToEdit] = useState(null)

  useEffect(() => {
    fetchTasks()
  }, [])
  //Cargar las tareas desde Supabase ante cada carga del componente
  const fetchTasks = async () => {
    const { data } = await supabase.from('tasks').select('*')
    setTasks(data || [])
  }

  //Agregar una nueva tarea a Supabase y actualizar el estado
  const addTask = async (title) => {
    if(taskToEdit) {
          await supabase.from('tasks').update({ title }).eq('id', taskToEdit.id)
          setTaskToEdit(null)
    } else {
      await supabase.from('tasks').insert([{ title, completed: false }]).select()
      
    }
    fetchTasks()
  }

  //Eliminar una tarea de Supabase y actualizar el estado
  const deleteTask = async (id) => {
    await supabase.from('tasks').delete().eq('id', id)
    fetchTasks()
  }

  return (
    <div className="max-w-xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Tareas</h1>
      <TaskForm onSubmit={addTask} taskToEdit={taskToEdit} />
      <TaskList tasks={tasks} onDelete={deleteTask} onEdit={(task) => setTaskToEdit(task)} />
    </div>
  )
}
