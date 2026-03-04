import { useState, useEffect, useCallback } from 'react'
import type { Task } from '../types/task'

const STORAGE_KEY = 'checklist-tasks'

function loadTasks(): Task[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as Task[]
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function saveTasks(tasks: Task[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
}

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>(loadTasks)

  useEffect(() => {
    saveTasks(tasks)
  }, [tasks])

  const addTask = useCallback((label: string) => {
    const trimmed = label.trim()
    if (!trimmed) return
    setTasks((prev) => {
      const maxOrder = prev.length === 0 ? 0 : Math.max(...prev.map((t) => t.order))
      return [
        ...prev,
        { id: generateId(), label: trimmed, completed: false, order: maxOrder + 1 },
      ]
    })
  }, [])

  const toggleTask = useCallback((id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    )
  }, [])

  const removeTask = useCallback((id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const reorderTasks = useCallback((orderedIds: string[]) => {
    setTasks((prev) => {
      const byId = new Map(prev.map((t) => [t.id, t]))
      const restIds = prev.map((t) => t.id).filter((id) => !orderedIds.includes(id))
      const combined = [...orderedIds, ...restIds]
      return combined
        .map((id, index) => {
          const t = byId.get(id)
          return t ? { ...t, order: index } : null
        })
        .filter((t): t is Task => t !== null)
    })
  }, [])

  const resetAll = useCallback(() => {
    setTasks([])
  }, [])

  return {
    tasks,
    addTask,
    toggleTask,
    removeTask,
    reorderTasks,
    resetAll,
  }
}
