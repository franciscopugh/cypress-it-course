export default function TaskList({ tasks, onDelete }) {
  return (
    <ul className="space-y-2">
      {tasks.map((task) => (
        <li key={task.id} className="flex justify-between items-center bg-gray-100 p-2 rounded">
          <span>{task.title}</span>
          <button
            onClick={() => onDelete(task.id)}
            className="text-sm bg-red-500 text-white px-2 py-1 rounded delete"
          >
            Eliminar
          </button>
        </li>
      ))}
    </ul>
  )
}
