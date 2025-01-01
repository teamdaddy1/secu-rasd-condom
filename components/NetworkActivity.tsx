import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Activity } from 'lucide-react'

export default function NetworkActivity() {
  const [activities, setActivities] = useState<string[]>([])

  useEffect(() => {
    const generateActivity = () => {
      const actions = ['Intercepting', 'Decrypting', 'Analyzing', 'Exfiltrating']
      const dataTypes = ['HTTP request', 'HTTPS response', 'DNS query', 'SSH session', 'FTP transfer']
      const action = actions[Math.floor(Math.random() * actions.length)]
      const dataType = dataTypes[Math.floor(Math.random() * dataTypes.length)]
      return `${action} ${dataType}`
    }

    const addActivity = () => {
      setActivities(prev => [generateActivity(), ...prev.slice(0, 4)])
    }

    const interval = setInterval(addActivity, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      className="bg-black/80 border border-red-500 rounded-lg p-4 h-full"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 100 }}
    >
      <h2 className="text-lg font-bold mb-4 flex items-center">
        <Activity className="w-4 h-4 mr-2" />
        Network Activity
      </h2>
      <div className="space-y-2 h-48 overflow-y-auto">
        {activities.map((activity, index) => (
          <motion.div
            key={index}
            className="text-xs"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            {activity}
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

