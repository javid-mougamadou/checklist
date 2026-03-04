import { useEffect, useRef, useState } from 'react'

export type PersistentStateOptions<T> = {
  key: string
  defaultValue: T
  serialize?: (value: T) => string
  deserialize?: (value: string) => T
}

type Updater<T> = T | ((prevState: T) => T)

export function usePersistentState<T>(
  options: PersistentStateOptions<T>
): [T, (value: Updater<T>) => void] {
  const {
    key,
    defaultValue,
    serialize = JSON.stringify,
    deserialize = JSON.parse,
  } = options

  const [state, setState] = useState<T>(() => {
    if (typeof window === 'undefined') return defaultValue
    try {
      const raw = window.localStorage.getItem(key)
      if (raw === null) return defaultValue
      return deserialize(raw) as T
    } catch {
      return defaultValue
    }
  })

  const isResettingRef = useRef(false)

  useEffect(() => {
    if (typeof window === 'undefined' || isResettingRef.current) return
    try {
      window.localStorage.setItem(key, serialize(state))
    } catch {
      // ignore
    }
  }, [key, serialize, state])

  const update = (value: Updater<T>) => {
    setState((prev) =>
      typeof value === 'function' ? (value as (p: T) => T)(prev) : value
    )
  }

  return [state, update]
}
