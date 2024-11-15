import React, {useState, useEffect} from 'react'
interface Task {
    id: number;
    title: string;
    priority: string;
    status: string;
    dueDate: string;
  }

const Calendar = () => {
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
    const [tasks, setTasks] = useState<Task[]>([])
    const [selectedDate, setSelectedDate] = useState<string | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks')
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks))
    }
   
  }, [])

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  
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
}

export default Calendar
