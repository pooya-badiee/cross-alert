import { AlertFunction } from './types'
import { shellEscape } from './utils'

export const windowsAlert: AlertFunction = async (message, { title = 'Alert' } = {}) => {
  const escapedMessage = shellEscape(message)
  const escapedTitle = shellEscape(title)
  const childProcess = await import('node:child_process')
  const { spawnSync } = childProcess

  const powershellCommand = `
    Add-Type -AssemblyName System.Windows.Forms;
    [System.Windows.Forms.MessageBox]::Show("${escapedMessage}", "${escapedTitle}");
  `

  try {
    const result = spawnSync('powershell', ['-Command', powershellCommand], {
      stdio: 'ignore',
      encoding: 'utf-8',
    })

    if (result.error) {
      throw result.error
    }
  } catch (error) {
    console.error('Failed to display message box:', error)
  }
}
