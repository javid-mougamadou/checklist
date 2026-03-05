import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import type { Task } from '../types/task'
import { TaskCell } from './TaskCell'

interface TaskListProps {
  tasks: Task[]
  visibleTasks: Task[]
  onToggle: (id: string) => void
  onRemove: (id: string) => void
  onReorder: (orderedIds: string[]) => void
}

export function TaskList({
  tasks,
  visibleTasks,
  onToggle,
  onRemove,
  onReorder,
}: TaskListProps) {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 150, tolerance: 8 },
    }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  )

  const remaining = tasks.filter((t) => !t.completed).length
  const total = tasks.length

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (!over || active.id === over.id) return
    const oldIndex = visibleTasks.findIndex((t) => t.id === active.id)
    const newIndex = visibleTasks.findIndex((t) => t.id === over.id)
    if (oldIndex === -1 || newIndex === -1) return
    const reordered = arrayMove(visibleTasks, oldIndex, newIndex)
    onReorder(reordered.map((t) => t.id))
  }

  return (
    <div className="flex flex-1 flex-col min-h-0 overflow-hidden">
      <h2 className="shrink-0 text-center text-base font-medium text-base-content/90 px-2 py-1">
        Tâches ({remaining} / {total})
      </h2>
      <div className="min-h-0 max-h-[60vh] flex-1 overflow-y-auto overscroll-contain">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={visibleTasks.map((t) => t.id)}
            strategy={verticalListSortingStrategy}
          >
            <ul className="flex w-full flex-col gap-1 p-2 list-none">
              {visibleTasks.map((task) => (
                <TaskCell
                  key={task.id}
                  task={task}
                  onToggle={onToggle}
                  onRemove={onRemove}
                />
              ))}
            </ul>
          </SortableContext>
        </DndContext>
      </div>
    </div>
  )
}
