import { useEffect, useRef } from "react"

/**
 * Stores the previous value of a variable between renders.
 */
export function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T>()

  useEffect(() => {
    ref.current = value
  }, [value])

  return ref.current
}
