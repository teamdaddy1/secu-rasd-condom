import { motion } from 'framer-motion'
import { Share2 } from 'lucide-react'

interface PrankMessageProps {
  onRestart: () => void
  hackerName: string
}

export default function PrankMessage({ onRestart, hackerName }: PrankMessageProps) {
  const shareWebsite = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Awesome Cyber Attack Simulation',
        text: 'Check out this cool cyber attack simulation!',
        url: window.location.href,
      }).catch((error) => console.log('Error sharing', error));
    } else {
      alert('Web Share not supported on this browser. You can copy the URL to share.');
    }
  }

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center z-40 bg-black/95 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.div
        className="text-center max-w-md bg-gray-900 p-6 rounded-lg shadow-2xl border border-green-500"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 1 }}
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-green-500 mb-4 sm:mb-6">
          Gotcha! You're Safe!
        </h1>
        <p className="text-lg sm:text-xl text-white mb-4 sm:mb-6">
          Don't worry! This was just a fake cyber attack demo by {hackerName}.
          Your computer is totally fine!
        </p>
        <p className="text-base sm:text-lg text-yellow-400 mb-6 sm:mb-8">
          Remember: Always keep your computer updated and be careful online!
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <motion.button
            className="px-4 py-2 bg-green-500 text-black rounded-lg font-bold text-base hover:bg-green-400 transition-colors w-full sm:w-auto"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onRestart}
          >
            Try Again
          </motion.button>
          <motion.button
            className="px-4 py-2 bg-blue-500 text-white rounded-lg font-bold text-base hover:bg-blue-400 transition-colors flex items-center justify-center gap-2 w-full sm:w-auto"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={shareWebsite}
          >
            <Share2 size={18} />
            Share with Friends
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  )
}

