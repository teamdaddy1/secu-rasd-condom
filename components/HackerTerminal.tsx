import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

interface HackerTerminalProps {
  userInfo: any
  stage: number
  hackerName: string
  className?: string
}

export default function HackerTerminal({ userInfo, stage, hackerName, className }: HackerTerminalProps) {
  const [lines, setLines] = useState<string[]>([])
  const [currentLine, setCurrentLine] = useState(0)
  const terminalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const commands = [
      '> Initializing advanced breach protocol...',
      '> Exploiting zero-day vulnerability CVE-2023-1337...',
      '> Bypassing next-gen firewall...',
      `> Geolocating target: ${userInfo.city}, ${userInfo.country_name}`,
      `> Infiltrating network: ${userInfo.org}`,
      `> Fingerprinting system: ${userInfo.system.os}`,
      '> Deploying polymorphic malware...',
      '> Escalating privileges...',
      '> Root access acquired.',
      '> Disabling security protocols...',
      '> Injecting rootkit...',
      '> Establishing persistent backdoor...',
      '> Activating advanced keylogger...',
      '> Hijacking webcam and microphone streams...',
      '> Scanning for sensitive data...',
      '> Initiating data exfiltration...',
      '> Encrypting local files with military-grade algorithm...',
      '> Deploying ransomware payload...',
      '> Erasing system logs...',
      '> Implementing anti-forensics measures...',
      `> Mission accomplished. Full system control granted to ${hackerName}.`,
    ]

    const interval = setInterval(() => {
      setCurrentLine(prev => {
        if (prev < commands.length) {
          setLines(prevLines => [...prevLines, commands[prev]])
          return prev + 1
        }
        clearInterval(interval)
        return prev
      })
    }, 500)

    return () => clearInterval(interval)
  }, [userInfo, hackerName])

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [lines])

  const getPrompt = () => {
    switch (stage) {
      case 1: return `${hackerName.toLowerCase()}@shadow:~$ `
      case 2: return 'root@target:~# '
      case 3: return 'SYSTEM:~# '
      case 4: return `${hackerName.toUpperCase()}@PWNED:~# `
      case 5: return 'TOTAL_CONTROL:~# '
      case 6: return 'GAME_OVER:~# '
      default: return '$ '
    }
  }

  return (
    <motion.div
      className={`fixed left-0 right-0 h-32 sm:h-48 md:h-64 bg-black/90 border-t-2 border-red-500 p-2 sm:p-4 font-mono text-red-500 overflow-hidden z-30 ${className}`}
      initial={{ y: 300 }}
      animate={{ y: 0 }}
      exit={{ y: 300 }}
      transition={{ type: 'spring', damping: 20, stiffness: 100 }}
    >
      <div ref={terminalRef} className="overflow-auto h-full text-xs sm:text-sm scrollbar-thin scrollbar-thumb-red-500 scrollbar-track-black">
        {lines.map((line, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-1"
          >
            {line}
          </motion.div>
        ))}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="flex items-center"
        >
          <span className="mr-2">{getPrompt()}</span>
          <span className="w-2 h-4 sm:h-5 bg-red-500 animate-pulse" />
        </motion.div>
      </div>
    </motion.div>
  )
}

