// reference: https://github.com/xxorax/node-shell-escape/blob/master/shell-escape.js
export function shellEscape(input: string | number) {
  let escapedInput: string = input.toString()

  if (/[^A-Za-z0-9_\/:=-]/.test(escapedInput)) {
    escapedInput = "'" + escapedInput.replace(/'/g, "'\\''") + "'"
    escapedInput = escapedInput.replace(/^(?:'')+/g, '').replace(/\\'''/g, "\\'")
  }

  return escapedInput
}
