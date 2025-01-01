import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const ip = request.headers.get('x-forwarded-for') || '127.0.0.1'
  const apiKey = process.env.IPAPI_KEY || ''

  try {
    const response = await fetch(`https://ipapi.com/ip_api.php?ip=${ip}&key=${apiKey}`)
    const data = await response.json()

    // Enhance the data with more realistic "hacked" information
    const enhancedData = {
      ...data,
      device: {
        os: getOS(),
        browser: getBrowser(),
        screen: `${window.screen.width}x${window.screen.height}`,
      },
      network: {
        isp: data.isp || 'Unknown ISP',
        connection_type: getRandomConnectionType(),
        open_ports: generateRandomOpenPorts(),
      },
      system: {
        cpu: getRandomCPU(),
        ram: getRandomRAM(),
        storage: getRandomStorage(),
      },
    }

    return NextResponse.json(enhancedData)
  } catch (error) {
    console.error('Error fetching user info:', error)
    return NextResponse.json({ error: 'Failed to fetch user info' }, { status: 500 })
  }
}

function getOS() {
  const userAgent = navigator.userAgent
  if (userAgent.includes('Win')) return 'Windows'
  if (userAgent.includes('Mac')) return 'macOS'
  if (userAgent.includes('Linux')) return 'Linux'
  return 'Unknown OS'
}

function getBrowser() {
  const userAgent = navigator.userAgent
  if (userAgent.includes('Chrome')) return 'Chrome'
  if (userAgent.includes('Firefox')) return 'Firefox'
  if (userAgent.includes('Safari')) return 'Safari'
  if (userAgent.includes('Edge')) return 'Edge'
  return 'Unknown Browser'
}

function getRandomConnectionType() {
  const types = ['Fiber', 'Cable', 'DSL', 'Cellular', 'Satellite']
  return types[Math.floor(Math.random() * types.length)]
}

function generateRandomOpenPorts() {
  const ports = [80, 443, 22, 21, 25, 110, 143, 3306, 5432, 27017]
  return ports.filter(() => Math.random() > 0.5)
}

function getRandomCPU() {
  const cpus = ['Intel Core i7', 'AMD Ryzen 7', 'Intel Core i9', 'AMD Ryzen 9', 'Apple M1']
  return cpus[Math.floor(Math.random() * cpus.length)]
}

function getRandomRAM() {
  const rams = ['8GB', '16GB', '32GB', '64GB']
  return rams[Math.floor(Math.random() * rams.length)]
}

function getRandomStorage() {
  const storages = ['256GB SSD', '512GB SSD', '1TB HDD', '2TB HDD']
  return storages[Math.floor(Math.random() * storages.length)]
}

