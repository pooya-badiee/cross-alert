# cross-alert

**`cross-alert`** is a cross-platform alert function library supporting Windows, Web, Linux, and macOS, with additional support for Bun. This library allows you to display alert messages in a consistent manner across different environments.

## Installation

You can install `cross-alert` via npm:

```bash
npm install cross-alert
```

## Usage

```typescript
import { alert } from 'cross-alert'

// Show an alert message
await alert('This is an alert message!')
// Or optionally specify a title
await alert('This is an alert message!', { title: 'Alert' })
```

## Platform Support

- **Windows**: Uses `MessageBox`
- **Web**: Uses `window.alert`
- **Linux**: Uses `zenity`, `kdialog`, or `xmessage`. You may need to install these tools if they are not already present on your system.
- **macOS**: Uses `osascript`

## Development

To build the project, use:

```bash
npm run build
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request to the development branch.
