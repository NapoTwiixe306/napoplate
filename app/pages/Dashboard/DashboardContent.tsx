import React, { useState, useEffect } from 'react'
import { CalendarIcon, CheckCircle, Clock, Filter, LayoutDashboard, LogOut, Plus, Settings, Zap, LinkIcon, Moon, Sun, X } from 'lucide-react'
import { signOut } from "next-auth/react";

export interface LogoutButtonProps {
  onLogout: () => void;
}

interface Task {
  id: number;
  title: string;
  priority: string;
  status: string;
  dueDate: string;
}

const Component: React.FC<LogoutButtonProps> = ({onLogout}) => {
  const [tasks, setTasks] = useState<Task[]>([])
  const [newTask, setNewTask] = useState<Task>({ id: 0, title: '', priority: 'Ajoutée', status: 'Commencée', dueDate: '' })
  const [currentPage, setCurrentPage] = useState('dashboard')
  const [darkMode, setDarkMode] = useState(false)
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

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

  const handleLogout = async () => {
    try {
      await signOut({
        callbackUrl: "/",
        redirect: true,
      });
      alert("Vous êtes bien déconnecté");
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
      alert("Une erreur s'est produite lors de la déconnexion.");
    }

    onLogout();
  };

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode
    setDarkMode(newDarkMode)
    localStorage.setItem('darkMode', newDarkMode.toString())
    document.documentElement.classList.toggle('dark')
  }

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

  const renderContent = () => {
    switch (currentPage) {
      case 'dashboard':
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
      case 'calendar':
        const daysOfWeek = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim']
        const currentDate = new Date()
        const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
        const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0)
        const daysInMonth = lastDayOfMonth.getDate()
        const startingDay = firstDayOfMonth.getDay() || 7 // Adjust for Sunday (0) to be 7

        const calendarDays = Array.from({ length: 42 }, (_, i) => {
          const day = i - startingDay + 2
          return day > 0 && day <= daysInMonth ? day : null
        })

        return (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4">Calendrier</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">Visualisez vos tâches dans un calendrier</p>
            <div className="grid grid-cols-7 gap-2 mb-2">
              {daysOfWeek.map(day => (
                <div key={day} className="text-center font-semibold">{day}</div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-2">
              {calendarDays.map((day, index) => {
                const date = day ? new Date(currentDate.getFullYear(), currentDate.getMonth(), day) : null
                const dateString = date ? date.toISOString().split('T')[0] : ''
                const dayTasks = tasks.filter(task => task.dueDate === dateString)
                
                return (
                  <div
                    key={index}
                    className={`aspect-square border rounded-lg flex flex-col items-start justify-start p-1 relative ${day ? 'cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700' : ''}`}
                    onClick={() => {
                      if (day) {
                        setSelectedDate(dateString)
                        setIsModalOpen(true)
                      }
                    }}
                  >
                    {day && (
                      <>
                        <span className="text-sm font-semibold">{day}</span>
                        {dayTasks.map((task, taskIndex) => (
                          <div
                            key={taskIndex}
                            className={`absolute left-0 right-0 h-1 ${getPriorityColor(task.priority)}`}
                            style={{ bottom: `${(taskIndex + 1) * 10}%` }}
                            title={task.title}
                          />
                        ))}
                      </>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )
      case 'settings':
        return (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4">Paramètres</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">Gérez vos préférences d&#39;application</p>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label htmlFor="notifications" className="text-sm font-medium text-gray-700 dark:text-gray-200">Notifications</label>
                <input type="checkbox" id="notifications" className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
              </div>
              <div className="flex items-center justify-between">
                <label htmlFor="darkMode" className="text-sm font-medium text-gray-700 dark:text-gray-200">Mode sombre</label>
                <input type="checkbox" id="darkMode" checked={darkMode} onChange={toggleDarkMode} className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
              </div>
              <div className="flex items-center justify-between">
                <label htmlFor="language" className="text-sm font-medium text-gray-700 dark:text-gray-200">Langue</label>
                <select id="language" defaultValue="fr" className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                  <option value="fr">Français</option>
                  <option value="en">English</option>
                </select>
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Email</label>
                <input type="email" id="email" placeholder="votre@email.com" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
              </div>
              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Changer le mot de passe</label>
                <input type="password" id="password" placeholder="Nouveau mot de passe" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
              </div>
              <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200">
                Sauvegarder les modifications
              </button>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className={`flex h-screen bg-gray-100 dark:bg-gray-900 ${darkMode ? 'dark' : ''}`}>
      <aside className="w-64 bg-white dark:bg-gray-800 p-4 shadow-md">
        <div className="flex items-center mb-8">
          <LinkIcon className="h-6 w-6 text-blue-600 dark:text-blue-400 rotate-45" />
          <span className="ml-2 text-2xl font-bold text-gray-900 dark:text-white">TaskChain</span>
        </div>
        <nav className="space-y-2">
          <a
            className={`flex items-center space-x-2 ${currentPage === 'dashboard' ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'} p-2 rounded`}
            href="#"
            onClick={() => setCurrentPage('dashboard')}
          >
            <LayoutDashboard className="h-5 w-5" />
            <span>Tableau de bord</span>
          </a>
          <a
            className={`flex items-center space-x-2 ${currentPage === 'calendar' ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'} p-2 rounded`}
            href="#"
            onClick={() => setCurrentPage('calendar')}
          >
            <CalendarIcon className="h-5 w-5" />
            <span>Calendrier</span>
          </a>
          <a
            className={`flex items-center space-x-2 ${currentPage === 'settings' ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'} p-2 rounded`}
            href="#"
            onClick={() => setCurrentPage('settings')}
          >
            <Settings className="h-5 w-5" />
            <span>Paramètres</span>
          </a>
        </nav>
        <div className="mt-auto pt-4">
        <button
          className="text-red-600 cursor-pointer hover:underline"
          onClick={handleLogout}
        >
          Se déconnecter
        </button>
        </div>
      </aside>
      <main className="flex-1 p-8 overflow-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {currentPage === 'dashboard' && 'Mes tâches'}
            {currentPage === 'calendar' && 'Calendrier'}
            {currentPage === 'settings' && 'Paramètres'}
          </h1>
          <div className="flex items-center space-x-4">
            <button 
              className="p-2 rounded-md bg-gray-200 text-gray-800 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors duration-200 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
              onClick={toggleDarkMode}
            >
              {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            {currentPage === 'dashboard' && (
              <>
                <button className="px-4 py-2 rounded-md bg-gray-200 text-gray-800 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors duration-200 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600">
                  <Filter className="inline-block h-4 w-4 mr-2" />
                  Filtrer
                </button>
                <button className="px-4 py-2 rounded-md bg-gray-200 text-gray-800 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors duration-200 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600">
                  <Clock className="inline-block h-4 w-4 mr-2" />
                  Mode Focus
                </button>
              </>
            )}
          </div>
        </div>
        {renderContent()}
      </main>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">Tâches pour le {selectedDate}</h3>
            {tasks.filter(task => task.dueDate === selectedDate).map(task => (
              <div key={task.id} className="mb-2 p-2 bg-gray-100 dark:bg-gray-700 rounded">
                <p>{task.title}</p>
                <div className="flex justify-between mt-2">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(task.priority)}`}>
                    {task.priority}
                  </span>
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(task.status)}`}>
                    {task.status}
                  </span>
                </div>
              </div>
            ))}
            <button
              onClick={() => setIsModalOpen(false)}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Component;