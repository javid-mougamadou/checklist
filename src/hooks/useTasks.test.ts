import { describe, it, expect, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useTasks } from './useTasks'

const STORAGE_KEY = 'checklist-tasks'

describe('useTasks', () => {
  beforeEach(() => {
    localStorage.removeItem(STORAGE_KEY)
  })

  it('starts with an empty list', () => {
    const { result } = renderHook(() => useTasks())
    expect(result.current.tasks).toEqual([])
  })

  it('adds a task', () => {
    const { result } = renderHook(() => useTasks())
    act(() => {
      result.current.addTask('Ma première tâche')
    })
    expect(result.current.tasks).toHaveLength(1)
    expect(result.current.tasks[0].label).toBe('Ma première tâche')
    expect(result.current.tasks[0].completed).toBe(false)
  })

  it('ignores empty label', () => {
    const { result } = renderHook(() => useTasks())
    act(() => {
      result.current.addTask('   ')
    })
    expect(result.current.tasks).toHaveLength(0)
  })

  it('toggles task completion', () => {
    const { result } = renderHook(() => useTasks())
    act(() => {
      result.current.addTask('Tâche')
    })
    const id = result.current.tasks[0].id
    expect(result.current.tasks[0].completed).toBe(false)
    act(() => {
      result.current.toggleTask(id)
    })
    expect(result.current.tasks[0].completed).toBe(true)
  })

  it('removes a task', () => {
    const { result } = renderHook(() => useTasks())
    act(() => {
      result.current.addTask('À supprimer')
    })
    expect(result.current.tasks).toHaveLength(1)
    act(() => {
      result.current.removeTask(result.current.tasks[0].id)
    })
    expect(result.current.tasks).toHaveLength(0)
  })

  it('resetAll clears the list', () => {
    const { result } = renderHook(() => useTasks())
    act(() => {
      result.current.addTask('Une')
      result.current.addTask('Deux')
    })
    expect(result.current.tasks).toHaveLength(2)
    act(() => {
      result.current.resetAll()
    })
    expect(result.current.tasks).toHaveLength(0)
  })
})
