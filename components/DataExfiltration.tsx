import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function DataExfiltration() {
  const [progress, setProgress] = useState(0)
  const [files, setFiles] = useState<string[]>([])

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 1
      })
    }, 100)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const fileTypes = ['jpg', 'pdf', 'docx', 'xlsx', 'txt', 'png']
    const generateFileName = () => {
      const names = ['report', 'image', 'document', 'spreadsheet', 'notes', 'presentation']
      const name = names[Math.floor(Math.random() * names.length)]
      const type = fileTypes[Math.floor(Math.random() * fileTypes.length)]
      return `${name}_${Math.floor(Math.random() * 1000)}.${type}`
    }

    const interval = setInterval(() => {
      if (files.length < 20) {
        setFiles(prev => [...prev, generateFileName()])
      } else {
        clearInterval(interval)
      }
    }, 500)

    return () => clearInterval(interval)
  }, [files])

  return (
    <motion.div
      className="bg-black/80 border border-red-500 rounded-lg p-4 h-full"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
    >
      <h2 className="text-lg font-bold mb-4">Data Exfiltration</h2>
      <div className="mb-4">
        <div className="h-2 bg-gray-700 rounded-full">
          <motion.div
            className="h-full bg-red-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-sm mt-1">{progress}% Complete</p>
      </div>
      <div className="h-48 overflow-y-auto text-xs">
        {files.map((file, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            Exfiltrating: {file}
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

