import { spawnSync } from 'child_process'
import { AlertFunction } from './types'
import { shellEscape } from './utils'

export const macAlert: AlertFunction = (message, { title = 'Alert' } = {}) => {
  const escapedMessage = shellEscape(message)
  const escapedTitle = shellEscape(title)

  const appleScript = `display dialog ${escapedMessage} with title ${escapedTitle} buttons {"OK"} default button "OK"`

  try {
    const result = spawnSync('osascript', ['-e', appleScript], {
      stdio: ['ignore', 'ignore', 'pipe'],
      encoding: 'utf-8',
    })

    if (result.error) {
      throw result.error
    }

    if (result.stderr) {
      console.error('AppleScript warning:', result.stderr)
    }
  } catch (error) {
    console.error('Failed to display dialog:', error)
  }
}
