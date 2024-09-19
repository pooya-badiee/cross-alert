import { spawnSync } from 'node:child_process'
import { AlertFunction } from './types'
import { shellEscape } from './utils'

const showAlertWithCommand = (command: string) => {
  try {
    const result = spawnSync(command, { shell: true, stdio: 'ignore' })
    if (result.error) {
      throw result.error
    }
  } catch (error) {
    console.error('Failed to display alert with command:', command, error)
  }
}

export const linuxAlert: AlertFunction = (message, { title = 'Alert' } = {}) => {
  const escapedMessage = shellEscape(message)
  const escapedTitle = shellEscape(title)

  try {
    // Attempt to use zenity
    showAlertWithCommand(`zenity --info --title=${escapedTitle} --text=${escapedMessage}`)
  } catch (error) {
    // If zenity fails, attempt to use kdialog
    try {
      showAlertWithCommand(`kdialog --title ${escapedTitle} --msgbox ${escapedMessage}`)
    } catch (error) {
      // If kdialog fails, attempt to use xmessage
      try {
        showAlertWithCommand(`xmessage -title ${escapedTitle} ${escapedMessage}`)
      } catch (error) {
        // Log error if all methods fail
        console.error('All alert methods failed:', error)
      }
    }
  }
}
