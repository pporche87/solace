type LogLevel = "log" | "warn" | "error" | "debug"

type LogOptions = {
  tag: string
  message: string
  data?: unknown
  level?: LogLevel
}

export const logger = ({ tag, message, data, level = "log" }: LogOptions) => {
  const logPrefix = `[${tag}]`

  if (process.env.NODE_ENV === "production") {
    // Swap this out for a distributed logger (e.g., Datadog, Sentry, etc.)
    // Example: sendToDistributedLogger({ tag, message, data, level });
    return
  }

  switch (level) {
    case "warn":
      console.warn(logPrefix, message, data ?? "")
      break
    case "error":
      console.error(logPrefix, message, data ?? "")
      break
    case "debug":
      console.debug(logPrefix, message, data ?? "")
      break
    default:
      console.log(logPrefix, message, data ?? "")
  }
}
