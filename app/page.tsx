'use client'
import { useState, useEffect } from 'react'
import { CheckCircle, Clock, LayoutDashboard, Link as LinkIcon, Moon, Sun, Check } from 'lucide-react'
import Navbar from '@/src/Components/Navbar';

interface Feature3DCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
}

export default function Component() {
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

  const Feature3DCard: React.FC<Feature3DCardProps> = ({ icon: Icon, title, description }) => {
    const [rotation, setRotation] = useState({ x: 0, y: 0 })
    const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 })

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      const card = e.currentTarget
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const centerX = rect.width / 2
      const centerY = rect.height / 2
      const rotateX = (y - centerY) / 10
      const rotateY = (centerX - x) / 10
      setRotation({ x: rotateX, y: rotateY })
      setMousePosition({ x: x / rect.width, y: y / rect.height })
    }

    return (
      <div 
        className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
        style={{
          transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          transition: 'transform 0.1s'
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setRotation({ x: 0, y: 0 })}
      >
        <div
          className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-50 transition-opacity duration-300"
          style={{
            clipPath: `circle(34px at ${mousePosition.x * 100}% ${mousePosition.y * 100}%)`,
            filter: 'blur(20px)',
            transform: 'translateZ(10px)',
          }}
        />
        <div className="p-6">
          <div className="flex items-center mb-4">
            <Icon className="h-6 w-6 text-blue-600 mr-2" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{title}</h3>
          </div>
          <p className="text-gray-600 dark:text-gray-300">{description}</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`flex flex-col min-h-screen ${darkMode ? 'dark' : ''}`}>
      <Navbar/>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 dark:from-blue-900 dark:via-purple-900 dark:to-pink-900">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-gray-900 dark:text-white">
                  Organisez vos études avec
                  <span className="text-blue-600 dark:text-blue-400"> TaskChain</span>
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Gérez vos tâches, suivez votre progression et restez motivé avec notre application conçue pour les étudiants.
                </p>
              </div>
              <div className="flex gap-4">
                <button 
                  className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-all duration-300 transform hover:-translate-y-1 animate-pulse"
                  style={{
                    boxShadow: '0 0 10px rgba(59, 130, 246, 0.5)',
                    animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
                  }}
                >
                  Commencer gratuitement
                </button>
                <button className="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                  En savoir plus
                </button>
              </div>
              <style jsx>{`
                @keyframes pulse {
                  0%, 100% {
                    box-shadow: 0 0 10px rgba(59, 130, 246, 0.5);
                  }
                  50% {
                    box-shadow: 0 0 20px rgba(59, 130, 246, 0.8);
                  }
                }
              `}</style>
              <div className="flex justify-center space-x-4 mt-8">
                <span className="px-2 py-1 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm">Organisez</span>
                <span className="px-2 py-1 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm">Priorisez</span>
                <span className="px-2 py-1 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm">Réussissez</span>
              </div>
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 text-gray-900 dark:text-white">Fonctionnalités</h2>
            <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
              <Feature3DCard
                icon={CheckCircle}
                title="Gestion des tâches"
                description="Créez, organisez et suivez vos tâches avec des priorités personnalisables et des statuts de progression."
              />
              <Feature3DCard
                icon={Clock}
                title="Rappels intelligents"
                description="Recevez des notifications pour les tâches urgentes et importantes, adaptées à votre emploi du temps."
              />
              <Feature3DCard
                icon={LayoutDashboard}
                title="Vue d'ensemble"
                description="Visualisez votre progression, filtrez vos tâches et utilisez le mode Focus pour une productivité maximale."
              />
            </div>
          </div>
        </section>
        <section id="pricing" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 text-gray-900 dark:text-white">Plans tarifaires</h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-2">
              <div className="flex flex-col justify-between bg-white dark:bg-gray-700 rounded-lg shadow-lg border-2 border-gray-200 dark:border-gray-600">
                <div className="p-6">
                  <h3 className="text-2xl font-semibold mb-2">Plan Mensuel : Basique</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    <span className="text-4xl font-bold">2,50€</span> / mois
                  </p>
                  <ul className="space-y-2 mb-4">
                    <li className="flex items-center">
                      <Check className="text-green-500 mr-2 h-5 w-5" />
                      Création de tâches avec priorités
                    </li>
                    <li className="flex items-center">
                      <Check className="text-green-500 mr-2 h-5 w-5" />
                      Notifications de rappel
                    </li>
                    <li className="flex items-center">
                      <Check className="text-green-500 mr-2 h-5 w-5" />
                      Vue d&#39;aperçu avec filtres de base
                    </li>
                  </ul>
                </div>
                <div className="p-6 bg-gray-50 dark:bg-gray-800">
                  <button className="w-full px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors">
                    Choisir ce plan
                  </button>
                </div>
              </div>
              <div className="flex flex-col justify-between bg-blue-600 text-white rounded-lg shadow-lg border-2 border-blue-700">
                <div className="p-6">
                  <h3 className="text-2xl font-semibold mb-2">Plan Annuel : Premium</h3>
                  <p className="text-blue-100 mb-4">
                    <span className="text-4xl font-bold">20€</span> / an
                    <span className="block text-sm">(soit 1,67€/mois)</span>
                  </p>
                  <ul className="space-y-2 mb-4">
                    <li className="flex items-center">
                      <Check className="text-white mr-2 h-5 w-5" />
                      Toutes les fonctionnalités du plan Basique
                    </li>
                    <li className="flex items-center">
                      <Check className="text-white mr-2 h-5 w-5" />
                      Mode Focus et drag & drop
                    </li>
                    <li className="flex items-center">
                      <Check className="text-white mr-2 h-5 w-5" />
                      Tâches récurrentes
                    </li>
                    <li className="flex items-center">
                      <Check className="text-white mr-2 h-5 w-5" />
                      Support prioritaire
                    </li>
                  </ul>
                </div>
                <div className="p-6 bg-blue-700">
                  <button className="w-full px-4 py-2 rounded-md bg-white text-blue-600 hover:bg-blue-50 transition-colors">
                    Choisir ce plan
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="cta" className="w-full py-12 md:py-24 lg:py-32 bg-blue-600 dark:bg-blue-800">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">Prêt à booster votre productivité ?</h2>
              <p className="mx-auto max-w-[700px] text-xl text-blue-100">
                Rejoignez des milliers d&#39;étudiants qui ont déjà transformé leur façon d&#39;étudier avec TaskChain.
              </p>
              <button className="px-6 py-3 rounded-md bg-white text-blue-600 hover:bg-blue-50 transition-colors text-lg font-semibold">
                Commencer maintenant
              </button>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t bg-white dark:bg-gray-800">
        <p className="text-xs text-gray-500 dark:text-gray-400">© 2024 TaskChain. Tous droits réservés.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <a className="text-xs hover:underline underline-offset-4 text-gray-500 dark:text-gray-400" href="#">
            Conditions d&#39;utilisation
          </a>
          <a className="text-xs hover:underline underline-offset-4 text-gray-500 dark:text-gray-400" href="#">
            Politique de confidentialité
          </a>
        </nav>
      </footer>
    </div>
  )
}