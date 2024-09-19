import { spawnSync } from 'child_process'
import { AlertFunction } from './types'
import { shellEscape } from './utils'

export const windowsAlert: AlertFunction = (message, { title = 'Alert' } = {}) => {
  const escapedMessage = shellEscape(message)
  const escapedTitle = shellEscape(title)

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

    if (result.stderr) {
      console.error('PowerShell stderr:', result.stderr)
    } else {
      console.log('PowerShell stdout:', result.stdout)
    }
  } catch (error) {
    console.error('Failed to display message box:', error)
  }
}
