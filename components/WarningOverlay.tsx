import { motion } from 'framer-motion'
import { AlertTriangle, Shield, Lock, Wifi } from 'lucide-react'

interface WarningOverlayProps {
  stage: number
  userInfo: any
  hackerName: string
}

export default function WarningOverlay({ stage, userInfo, hackerName }: WarningOverlayProps) {
  const messages = [
    'CRITICAL SECURITY BREACH DETECTED',
    'FIREWALL COMPROMISED - INITIATING LOCKDOWN',
    'MALWARE INJECTION IN PROGRESS',
    'GEOLOCATION TRACKED - DISPLAYING TARGET MAP',
    'DATA EXFILTRATION DETECTED',
    'REMOTE ACCESS ESTABLISHED',
    'TOTAL SYSTEM TAKEOVER IMMINENT',
  ]

  const getSystemInfo = () => {
    if (!userInfo) return 'SYSTEM INFORMATION COMPROMISED'

    const encryptedFiles = Math.floor(Math.random() * 100000) + 50000
    const dataExfiltrated = Math.floor(Math.random() * 1000) + 500

    return [
      { label: 'HOSTNAME', value: userInfo.ip.split('.').join('-'), icon: Shield },
      { label: 'NETWORK', value: userInfo.org, icon: Wifi },
      { label: 'LOCATION', value: `${userInfo.city}, ${userInfo.region}, ${userInfo.country_name}`, icon: Lock },
      { label: 'COORDINATES', value: `${userInfo.latitude}, ${userInfo.longitude}`, icon: Lock },
      { label: 'OS', value: userInfo.system.os, icon: Shield },
      { label: 'BROWSER', value: userInfo.system.browser, icon: Shield },
      { label: 'RESOLUTION', value: userInfo.system.screen, icon: Shield },
      { label: 'LANGUAGE', value: userInfo.system.language, icon: Shield },
      { label: 'TIMEZONE', value: userInfo.system.timeZone, icon: Shield },
      { label: 'STATUS', value: 'CRITICALLY COMPROMISED', icon: AlertTriangle },
      { label: 'THREAT LEVEL', value: 'EXTREME', icon: AlertTriangle },
      { label: 'HACKER', value: hackerName.toUpperCase(), icon: AlertTriangle },
      { label: 'MALWARE INJECTED', value: 'YES', icon: AlertTriangle },
      { label: 'KEYLOGGER ACTIVE', value: 'YES', icon: AlertTriangle },
      { label: 'WEBCAM ACCESS', value: Math.random() > 0.3 ? 'ENABLED' : 'DISABLED', icon: AlertTriangle },
      { label: 'MICROPHONE ACCESS', value: Math.random() > 0.3 ? 'ENABLED' : 'DISABLED', icon: AlertTriangle },
      { label: 'FILES ENCRYPTED', value: encryptedFiles.toString(), icon: Lock },
      { label: 'DATA EXFILTRATED', value: `${dataExfiltrated} MB`, icon: AlertTriangle },
    ]
  }

  return (
    <motion.div
      className="bg-black/90 p-4 rounded-lg border-2 border-red-500"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <motion.div
        className="flex items-center justify-center mb-4"
        animate={{ 
          scale: [1, 1.2, 1],
          rotate: [0, 15, -15, 0],
        }}
        transition={{ duration: 1, repeat: Infinity }}
      >
        <AlertTriangle className="text-red-500 w-12 h-12 sm:w-16 sm:h-16" />
      </motion.div>
      <motion.h1
        className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 text-center"
        animate={{ 
          textShadow: ['0 0 5px #ff0000, 0 0 10px #ff0000', '0 0 20px #ff0000, 0 0 40px #ff0000'],
          color: ['#ff0000', '#ff6666', '#ff0000']
        }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
      >
        {messages[stage]}
      </motion.h1>
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 text-left text-xs sm:text-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        {getSystemInfo().map((item, index) => (
          <div key={index} className="flex items-center justify-between border-b border-red-500/30 py-1">
            <span className="font-bold text-red-400 flex items-center">
              <item.icon className="w-4 h-4 mr-1" />
              {item.label}:
            </span>
            <span className="text-red-300">{item.value}</span>
          </div>
        ))}
      </motion.div>
      <motion.div 
        className="mt-4 text-sm sm:text-base font-bold text-red-500 text-center"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1, repeat: Infinity }}
      >
        !!! IMMEDIATE ACTION REQUIRED !!!
      </motion.div>
    </motion.div>
  )
}

