import { useState } from 'react'
import type { FormEvent } from 'react'

interface TaskCreateProps {
  onAdd: (label: string) => void
  isEmpty: boolean
}

export function TaskCreate({ onAdd, isEmpty }: TaskCreateProps) {
  const [input, setInput] = useState('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    onAdd(input)
    setInput('')
  }

  return (
    <div
      className={
        isEmpty
          ? 'flex flex-1 items-center justify-center p-4'
          : 'flex justify-center bg-base-100 p-4'
      }
    >
      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-md items-center gap-2"
      >
        <input
          type="text"
          placeholder="Nouvelle tâche..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="input input-bordered input-sm flex-1"
          aria-label="Nom de la tâche"
        />
        <button
          type="submit"
          className="btn btn-primary btn-sm btn-circle"
          aria-label="Valider"
          title="Valider"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-5"
          >
            <path
              fillRule="evenodd"
              d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </form>
    </div>
  )
}
