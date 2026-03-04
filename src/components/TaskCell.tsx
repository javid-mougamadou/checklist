import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import type { Task } from '../types/task'

interface TaskCellProps {
  task: Task
  onToggle: (id: string) => void
  onRemove: (id: string) => void
}

export function TaskCell({ task, onToggle, onRemove }: TaskCellProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <li
      ref={setNodeRef}
      style={style}
      className={
        'flex items-center gap-2 rounded-lg border border-base-300 bg-base-200 p-2 ' +
        (isDragging ? 'opacity-60 shadow-lg' : '')
      }
    >
      <button
        type="button"
        className="btn btn-ghost btn-sm btn-square shrink-0 touch-none"
        aria-label={task.completed ? 'Marquer non terminée' : 'Marquer terminée'}
        onClick={() => onToggle(task.id)}
      >
        <span
          className={
            task.completed
              ? 'flex size-5 items-center justify-center rounded-full bg-primary text-primary-content'
              : 'flex size-5 items-center justify-center rounded-full border-2 border-base-content/40'
          }
        >
          {task.completed && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-3"
            >
              <path
                fillRule="evenodd"
                d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </span>
      </button>
      <span
        className={
          'min-w-0 flex-1 truncate text-left text-sm ' +
          (task.completed ? 'text-base-content/60 line-through' : '')
        }
      >
        {task.label}
      </span>
      <button
        type="button"
        className="btn btn-ghost btn-sm btn-square text-error shrink-0"
        aria-label="Supprimer"
        onClick={() => onRemove(task.id)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-5"
        >
          <path
            fillRule="evenodd"
            d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <button
        type="button"
        className="btn btn-ghost btn-sm btn-square shrink-0 cursor-grab active:cursor-grabbing"
        aria-label="Réordonner"
        {...attributes}
        {...listeners}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-5 text-base-content/50"
        >
          <path d="M8.25 6.75h.75v.75h-.75v-.75Zm0 4.5h.75v.75h-.75v-.75Zm0 4.5h.75v.75h-.75v-.75Zm-4.5-9h.75v.75h-.75v-.75Zm0 4.5h.75v.75h-.75v-.75Zm0 4.5h.75v.75h-.75v-.75Zm9-9h.75v.75h-.75v-.75Zm0 4.5h.75v.75h-.75v-.75Zm0 4.5h.75v.75h-.75v-.75Z" />
        </svg>
      </button>
    </li>
  )
}
