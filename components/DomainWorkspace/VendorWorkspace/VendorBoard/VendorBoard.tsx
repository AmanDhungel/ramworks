"use client";
import React, { useState } from "react";
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragOverEvent,
  DragEndEvent,
  defaultDropAnimationSideEffects,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BoardList } from "./BoardList";
import { SortableTaskCard } from "./SortableTaskCard";
import { Input } from "@/components/ui/input";

const INITIAL_DATA = [
  {
    id: "list-1",
    title: "Lorem",
    isComplete: true,
    tasks: [
      {
        id: "task-1",
        title: "Electrical Layout",
        date: "10 Jan 2024",
        assignee: { name: "Darlee Robertson", image: "" },
      },
      { id: "task-2", title: "[Example task]", date: "12 Jan 2024" },
    ],
  },
  {
    id: "list-2",
    title: "Phase 2",
    isComplete: false,
    tasks: [
      { id: "task-3", title: "Modern Architecture", date: "15 Jan 2024" },
    ],
  },
];

export default function VendorBoard() {
  const [lists, setLists] = useState(INITIAL_DATA);
  const [activeTask, setActiveTask] = useState<any>(null);
  const [activeList, setActiveList] = useState<any>(null);
  const [addList, setAddList] = useState<string>("");

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  function findContainer(id: string) {
    if (!id) return null;
    const list = lists.find((l) => l.id === id);
    if (list) return list.id;
    return lists.find((l) => l.tasks.some((t) => t.id === id))?.id;
  }

  function handleDragStart(event: DragStartEvent) {
    const { active } = event;
    const type = active.data.current?.type;

    if (type === "task") {
      const task = lists
        .flatMap((l) => l.tasks)
        .find((t) => t.id === active.id);
      setActiveTask(task);
    } else {
      const list = lists.find((l) => l.id === active.id);
      setActiveList(list);
    }
  }

  function handleDragOver(event: DragOverEvent) {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id.toString();
    const overId = over.id.toString();

    const activeContainer = findContainer(activeId);
    const overContainer = findContainer(overId);

    if (!activeContainer || !overContainer || activeContainer === overContainer)
      return;
    if (active.data.current?.type !== "task") return;

    setLists((prev) => {
      const activeList = prev.find((l) => l.id === activeContainer);
      const overList = prev.find((l) => l.id === overContainer);

      if (!activeList || !overList) return prev;

      const activeIndex = activeList.tasks.findIndex((t) => t.id === activeId);
      let overIndex = overList.tasks.findIndex((t) => t.id === overId);

      if (overIndex === -1) overIndex = overList.tasks.length;

      return prev.map((list) => {
        if (list.id === activeContainer) {
          return {
            ...list,
            tasks: list.tasks.filter((t) => t.id !== activeId),
          };
        }
        if (list.id === overContainer) {
          const newTasks = [...list.tasks];
          newTasks.splice(overIndex, 0, activeList.tasks[activeIndex]);
          return { ...list, tasks: newTasks };
        }
        return list;
      });
    });
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over) {
      setActiveTask(null);
      setActiveList(null);
      return;
    }

    // List reordering logic
    if (active.data.current?.type === "container" && active.id !== over.id) {
      setLists((prev) => {
        const oldIndex = prev.findIndex((l) => l.id === active.id);
        const newIndex = prev.findIndex((l) => l.id === over.id);
        return arrayMove(prev, oldIndex, newIndex);
      });
    }
    // Task same-list reordering logic
    else if (active.id !== over.id) {
      const activeContainer = findContainer(active.id.toString());
      const overContainer = findContainer(over.id.toString());

      if (activeContainer && activeContainer === overContainer) {
        setLists((prev) =>
          prev.map((list) => {
            if (list.id === activeContainer) {
              const oldIndex = list.tasks.findIndex((t) => t.id === active.id);
              const newIndex = list.tasks.findIndex((t) => t.id === over.id);
              return {
                ...list,
                tasks: arrayMove(list.tasks, oldIndex, newIndex),
              };
            }
            return list;
          })
        );
      }
    }

    setActiveTask(null);
    setActiveList(null);
  }

  const handleAddList = () => {
    if (!addList.trim()) return;

    // Create a consistent string ID
    const newListId = `list-${Math.random().toString(36).substr(2, 9)}`;

    const newList = {
      id: newListId,
      title: addList,
      isComplete: false,
      tasks: [],
    };

    setLists((prev) => [...prev, newList]);
    setAddList("");
  };

  return (
    <div className="h-screen w-full bg-slate-100 p-6">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}>
        <div className="flex gap-6 items-start overflow-x-auto pb-4 h-full">
          <SortableContext
            items={lists.map((l) => l.id)}
            strategy={horizontalListSortingStrategy}>
            {lists.map((list) => (
              <BoardList
                key={list.id}
                id={list.id}
                title={list.title}
                tasks={list.tasks}
                isComplete={list.isComplete}
              />
            ))}
          </SortableContext>

          <div className="min-w-[280px] bg-white/50 backdrop-blur-md rounded-xl p-4 border border-slate-200 shadow-sm h-fit">
            <div className="flex items-center gap-2">
              <Plus className="h-4 w-4 text-slate-500" />
              <Input
                placeholder="Add another list"
                value={addList}
                onChange={(e) => setAddList(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddList()}
              />
            </div>
          </div>
        </div>

        <DragOverlay adjustScale={false}>
          {activeTask ? (
            <div className="w-[300px] opacity-90 rotate-2 shadow-2xl">
              <SortableTaskCard {...activeTask} />
            </div>
          ) : activeList ? (
            <div className="w-[320px] opacity-90 shadow-2xl">
              <BoardList
                id={activeList.id}
                title={activeList.title}
                tasks={activeList.tasks}
                isComplete={activeList.isComplete}
              />
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
