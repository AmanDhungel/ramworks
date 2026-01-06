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
  const [addList, setAddList] = useState<any>("");

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  function handleDragStart(event: DragStartEvent) {
    const { active } = event;
    const task = lists.flatMap((l) => l.tasks).find((t) => t.id === active.id);
    setActiveTask(task);
  }

  function handleDragOver(event: DragOverEvent) {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    const activeContainer = findContainer(activeId);
    const overContainer = findContainer(overId) || overId;

    if (!activeContainer || !overContainer || activeContainer === overContainer)
      return;

    setLists((prev) => {
      const activeItems =
        prev.find((l) => l.id === activeContainer)?.tasks || [];
      const overItems = prev.find((l) => l.id === overContainer)?.tasks || [];

      const activeIndex = activeItems.findIndex((i) => i.id === activeId);
      const overIndex = overItems.findIndex((i) => i.id === overId);

      return prev.map((list) => {
        if (list.id === activeContainer) {
          return {
            ...list,
            tasks: list.tasks.filter((i) => i.id !== activeId),
          };
        }
        if (list.id === overContainer) {
          const newTasks = [...list.tasks];
          newTasks.splice(
            overIndex >= 0 ? overIndex : newTasks.length,
            0,
            activeItems[activeIndex]
          );
          return { ...list, tasks: newTasks };
        }
        return list;
      });
    });
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const activeContainer = findContainer(active.id);
      const overContainer = findContainer(over.id);

      if (
        activeContainer &&
        overContainer &&
        activeContainer === overContainer
      ) {
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
  }

  function findContainer(id: any) {
    if (lists.find((l) => l.id === id)) return id;
    return lists.find((l) => l.tasks.some((t) => t.id === id))?.id;
  }

  return (
    <div
      className="h-screen w-full 
    bg-cover bg-center p-6">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}>
        <div className="flex gap-20 items-start overflow-x-auto pb-4 h-full">
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

          <Button
            variant="secondary"
            className="min-w-[280px] items-center justify-start bg-white/20 backdrop-blur-md rounded-md p-4 border-none ">
            <Plus className="h-4 w-4 mr-2  cursor-pointer " />
            <Input
              placeholder="Add another list"
              className=" border-none  shadow-none bg-white/20! backdrop-blur"
              value={addList}
              onBlur={() => {
                if (!addList.trim()) return;
                setLists((prev) => [
                  ...prev,
                  {
                    id: `list-${prev.length + 1}`,
                    title: addList,
                    isComplete: false,
                    tasks: [],
                  },
                ]);
                setAddList("");
              }}
              onChange={(e) => setAddList(e.target.value)}
            />
          </Button>
        </div>

        <DragOverlay
          dropAnimation={{
            sideEffects: defaultDropAnimationSideEffects({
              styles: { active: { opacity: "0.5" } },
            }),
          }}>
          {activeTask ? (
            <div className="w-[300px] cursor-grabbing">
              <SortableTaskCard {...activeTask} />
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
