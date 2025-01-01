import { motion } from 'framer-motion'
import { Cpu, HardDrive, Monitor, Wifi } from 'lucide-react'

interface SystemInfoProps {
  userInfo: any
}

export default function SystemInfo({ userInfo }: SystemInfoProps) {
  return (
    <motion.div
      className="bg-black/80 border border-red-500 rounded-lg p-4 h-full"
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
    >
      <h2 className="text-lg font-bold mb-4">System Information</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex items-center">
          <Monitor className="w-4 h-4 mr-2" />
          <span className="text-sm">{userInfo.system.os}</span>
        </div>
        <div className="flex items-center">
          <Cpu className="w-4 h-4 mr-2" />
          <span className="text-sm">{userInfo.system.browser}</span>
        </div>
        <div className="flex items-center">
          <HardDrive className="w-4 h-4 mr-2" />
          <span className="text-sm">{userInfo.system.screen}</span>
        </div>
        <div className="flex items-center">
          <Wifi className="w-4 h-4 mr-2" />
          <span className="text-sm">{userInfo.org}</span>
        </div>
      </div>
    </motion.div>
  )
}

