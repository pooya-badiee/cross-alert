export type AlertFunction = (message: string | number, options?: { title?: string }) => Promise<void>
