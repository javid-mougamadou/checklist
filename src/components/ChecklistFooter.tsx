export type ViewMode = 'list' | 'top2'

interface ChecklistFooterProps {
  onResetAll: () => void
  showCompleted: boolean
  onToggleShowCompleted: () => void
  viewMode: ViewMode
  onViewModeChange: (mode: ViewMode) => void
  hasTasks: boolean
}

export function ChecklistFooter({
  onResetAll,
  showCompleted,
  onToggleShowCompleted,
  viewMode,
  onViewModeChange,
  hasTasks,
}: ChecklistFooterProps) {
  if (!hasTasks) return null

  return (
    <footer className="flex flex-wrap items-center justify-center gap-2 border-t border-base-300 bg-base-100 p-3">
      <button
        type="button"
        className="btn btn-outline btn-sm"
        onClick={onResetAll}
      >
        Reset all
      </button>
      <button
        type="button"
        className="btn btn-outline btn-sm"
        onClick={onToggleShowCompleted}
        aria-pressed={showCompleted}
      >
        {showCompleted ? 'Masquer complétées' : 'Afficher complétées'}
      </button>
      <button
        type="button"
        className={`btn btn-sm ${viewMode === 'list' ? 'btn-active' : 'btn-outline'}`}
        onClick={() => onViewModeChange(viewMode === 'list' ? 'top2' : 'list')}
        aria-pressed={viewMode === 'top2'}
      >
        {viewMode === 'list' ? 'Liste' : 'Top 2'}
      </button>
    </footer>
  )
}
