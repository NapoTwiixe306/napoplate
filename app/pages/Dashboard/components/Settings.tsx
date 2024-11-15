import React, {useState, useEffect} from 'react'

const Settings = () => {
 
  const [darkMode, setDarkMode] = useState(false)
      useEffect(() => {
      
        const isDarkMode = localStorage.getItem('darkMode') === 'true'
        setDarkMode(isDarkMode)
        if (isDarkMode) {
          document.documentElement.classList.add('dark')
        }
      }, [])

    const toggleDarkMode = () => {
        const newDarkMode = !darkMode
        setDarkMode(newDarkMode)
        localStorage.setItem('darkMode', newDarkMode.toString())
        document.documentElement.classList.toggle('dark')
      }
    
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
}

export default Settings
