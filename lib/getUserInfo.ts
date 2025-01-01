export async function getUserInfo() {
  try {
    // First get the IP address
    const ipResponse = await fetch('https://api.ipify.org?format=json')
    const { ip } = await ipResponse.json()

    // Then get detailed information using the IP
    const infoResponse = await fetch(`https://ipapi.co/${ip}/json/`)
    const data = await infoResponse.json()

    // Add system information
    const systemInfo = {
      browser: getBrowserInfo(),
      os: getOperatingSystem(),
      screen: getScreenResolution(),
      language: navigator.language,
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    }

    return {
      ...data,
      system: systemInfo,
      timestamp: new Date().toISOString(),
    }
  } catch (error) {
    console.error('Error fetching user info:', error)
    throw new Error('Failed to fetch user information')
  }
}

function getBrowserInfo() {
  const ua = navigator.userAgent
  const browsers = [
    { name: 'Chrome', pattern: /Chrome\/(\d+)/ },
    { name: 'Firefox', pattern: /Firefox\/(\d+)/ },
    { name: 'Safari', pattern: /Version\/(\d+).*Safari/ },
    { name: 'Edge', pattern: /Edg\/(\d+)/ },
  ]

  for (const browser of browsers) {
    const match = ua.match(browser.pattern)
    if (match) {
      return `${browser.name} ${match[1]}`
    }
  }

  return 'Unknown Browser'
}

function getOperatingSystem() {
  const ua = navigator.userAgent
  if (ua.includes('Win')) return 'Windows'
  if (ua.includes('Mac')) return 'macOS'
  if (ua.includes('Linux')) return 'Linux'
  if (ua.includes('Android')) return 'Android'
  if (ua.includes('iOS')) return 'iOS'
  return 'Unknown OS'
}

function getScreenResolution() {
  return `${window.screen.width}x${window.screen.height}`
}

