import React, { useState, useEffect } from 'react'
import { CalendarIcon, CheckCircle, Clock, Filter, LayoutDashboard, LogOut, Plus, Settings as Set, Zap, LinkIcon, Moon, Sun, X } from 'lucide-react'
import { signOut } from "next-auth/react";
import Calendar from './components/Calendar';
import Settings from './components/Settings';
import Dash from './components/Dash';
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
         <Dash/>
        )
      case 'calendar':
        return( 
          <Calendar/>
        )
      case 'settings':
        return (
         <Settings/>
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
            <Set className="h-5 w-5" />
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