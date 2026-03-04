import { useMemo, useEffect } from 'react'
import { TaskCreate } from './components/TaskCreate'
import { TaskList } from './components/TaskList'
import { ChecklistFooter, type ViewMode } from './components/ChecklistFooter'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { useTasks } from './hooks/useTasks'
import { useTheme } from './hooks/useTheme'
import { usePersistentState } from './hooks/usePersistentState'

const VIEW_MODE_KEY = 'checklist.view-mode'
const SHOW_COMPLETED_KEY = 'checklist.show-completed'

function parseViewMode(raw: string): ViewMode {
  try {
    const v = JSON.parse(raw)
    if (v === 'list' || v === 'top2') return v
  } catch {
    // ignore
  }
  return 'list'
}

function App() {
  useEffect(() => {
    document.title = 'Checklist'
  }, [])
  const { theme, toggleTheme } = useTheme()
  const {
    tasks,
    addTask,
    toggleTask,
    removeTask,
    reorderTasks,
    resetAll,
  } = useTasks()

  const [showCompleted, setShowCompleted] = usePersistentState({
    key: SHOW_COMPLETED_KEY,
    defaultValue: true,
  })
  const [viewMode, setViewMode] = usePersistentState<ViewMode>({
    key: VIEW_MODE_KEY,
    defaultValue: 'list',
    deserialize: parseViewMode,
  })

  const sortedTasks = useMemo(
    () => [...tasks].sort((a, b) => a.order - b.order),
    [tasks]
  )

  const visibleTasks = useMemo(() => {
    let list = showCompleted
      ? sortedTasks
      : sortedTasks.filter((t) => !t.completed)
    if (viewMode === 'top2') {
      list = list.slice(0, 2)
    }
    return list
  }, [sortedTasks, showCompleted, viewMode])

  const isEmpty = tasks.length === 0

  return (
    <div className="flex min-h-[100dvh] flex-col items-center bg-base-200">
      <Header theme={theme} onToggleTheme={toggleTheme} />
      <div className="flex w-full max-w-lg flex-1 flex-col min-h-0 pt-16">
        {isEmpty ? (
          <div className="flex flex-1 flex-col items-center justify-center p-4">
            <TaskCreate onAdd={addTask} isEmpty={true} />
          </div>
        ) : (
          <>
            <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
              <TaskList
                tasks={sortedTasks}
                visibleTasks={visibleTasks}
                onToggle={toggleTask}
                onRemove={removeTask}
                onReorder={reorderTasks}
              />
            </div>
            <div className="shrink-0 border-t border-base-300 bg-base-100">
              <TaskCreate onAdd={addTask} isEmpty={false} />
              <ChecklistFooter
                hasTasks={tasks.length > 0}
                onResetAll={resetAll}
                showCompleted={showCompleted}
                onToggleShowCompleted={() => setShowCompleted((s) => !s)}
                viewMode={viewMode}
                onViewModeChange={setViewMode}
              />
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  )
}

export default App
