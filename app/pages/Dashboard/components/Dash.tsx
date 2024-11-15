import React, {useState, useEffect} from 'react'
import { Plus, X } from 'lucide-react'

interface Task {
    id: number;
    title: string;
    priority: string;
    status: string;
    dueDate: string;
  }
const Dash = () => {
    const [tasks, setTasks] = useState<Task[]>([])
  const [newTask, setNewTask] = useState<Task>({ id: 0, title: '', priority: 'Ajoutée', status: 'Commencée', dueDate: '' })
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks')
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks))
    }

    const isDarkMode = localStorage.getItem('darkMode') === 'true'
    setDarkMode(isDarkMode)
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  const addTask = (e: React.FormEvent) => {
    e.preventDefault()
    const newTaskWithId = { ...newTask, id: Date.now() }
    setTasks([...tasks, newTaskWithId])
    setNewTask({ id: 0, title: '', priority: 'Ajoutée', status: 'Commencée', dueDate: '' })
  }

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Bientôt à faire':
        return 'bg-yellow-200 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
      case 'Bientôt finie':
        return 'bg-green-200 text-green-800 dark:bg-green-900 dark:text-green-200'
      default:
        return 'bg-blue-200 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Commencée':
        return 'bg-purple-200 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
      case 'En cours':
        return 'bg-blue-200 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
      case 'Finie':
        return 'bg-green-200 text-green-800 dark:bg-green-900 dark:text-green-200'
      default:
        return 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
    }
  }
  return (
   <>
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-2xl font-bold mb-4">Ajouter une nouvelle tâche</h2>
              <form onSubmit={addTask} className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Titre</label>
                  <input
                    id="title"
                    type="text"
                    placeholder="Entrez le titre de la tâche"
                    value={newTask.title}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="priority" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Priorité</label>
                  <select
                    id="priority"
                    value={newTask.priority}
                    onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  >
                    <option>Ajoutée</option>
                    <option>Bientôt à faire</option>
                    <option>Bientôt finie</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Statut</label>
                  <select
                    id="status"
                    value={newTask.status}
                    onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  >
                    <option>Commencée</option>
                    <option>En cours</option>
                    <option>Finie</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Date d&#39;échéance</label>
                  <input
                    id="dueDate"
                    type="date"
                    value={newTask.dueDate}
                    onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
                <button type="submit" className="mt-4 md:col-span-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200">
                  <Plus className="inline-block h-4 w-4 mr-2" />
                  Ajouter la tâche
                </button>
              </form>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-4">Liste des tâches</h2>
              <div className="space-y-4">
                {tasks.map((task) => (
                  <div key={task.id} className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition-shadow duration-200">
                    <div className="flex items-center space-x-4">
                      <input type="checkbox" id={`task-${task.id}`} className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
                      <div>
                        <label htmlFor={`task-${task.id}`} className="font-medium text-gray-700 dark:text-gray-200">
                          {task.title}
                        </label>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Échéance : {task.dueDate}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(task.priority)}`}>
                        {task.priority}
                      </span>
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(task.status)}`}>
                        {task.status}
                      </span>
                      <button
                        onClick={() => deleteTask(task.id)}
                        className="p-1 rounded-full text-red-500 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors duration-200"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
   </>
  )
}

export default Dash
