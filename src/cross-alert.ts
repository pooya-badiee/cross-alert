import { linuxAlert } from './linux-alert'
import { macAlert } from './mac-alert'
import { AlertFunction } from './types'
import { windowsAlert } from './windows-alert'

const isWeb = typeof window !== 'undefined'
let isWindows = false
let isMac = false
let isLinux = false
if (!isWeb) {
  // Check the platform and set the appropriate flag
  const platform = process.platform
  isWindows = platform === 'win32'
  isMac = platform === 'darwin'
  isLinux = platform === 'linux'
}

export const nodeAlert = isWeb
  ? (window.alert as AlertFunction)
  : isWindows
  ? windowsAlert
  : isMac
  ? macAlert
  : isLinux
  ? linuxAlert
  : () => {
      console.warn('Unsupported platform, cross-alert will not do anything.')
    }
