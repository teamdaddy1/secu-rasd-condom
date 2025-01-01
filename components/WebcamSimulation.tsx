import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Camera, X } from 'lucide-react'

export default function WebcamSimulation() {
  const [showOverlay, setShowOverlay] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setShowOverlay(false), 5000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <motion.div
      className="w-full max-w-md mx-auto h-64 bg-black border-2 border-red-500 rounded-lg overflow-hidden relative"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5 }}
    >
      {showOverlay && (
        <div className="absolute inset-0 bg-red-500/50 flex items-center justify-center">
          <Camera className="w-12 h-12 text-white animate-pulse" />
        </div>
      )}
      <div className="absolute inset-0 flex items-center justify-center">
        <img src="/placeholder.svg?height=240&width=320" alt="Webcam Feed" className="w-full h-full object-cover" />
      </div>
      <div className="absolute top-2 left-2 bg-red-500 px-2 py-1 rounded text-xs text-white flex items-center">
        <div className="w-2 h-2 bg-white rounded-full mr-1 animate-pulse" />
        LIVE
      </div>
      <motion.div
        className="absolute top-2 right-2 bg-red-500/80 rounded-full p-1 cursor-pointer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <X className="w-4 h-4 text-white" />
      </motion.div>
    </motion.div>
  )
}

