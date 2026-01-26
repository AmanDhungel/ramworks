"use client";
import {
  MoreHorizontal,
  Eye,
  Lock,
  Unlock,
  EyeOff,
  Edit3,
  GripVertical,
} from "lucide-react";
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { Button } from "@/components/ui/button";
import { SortableTaskCard } from "./SortableTaskCard";
import { useState } from "react";
import TaskManagerForm from "./AddCardDialog/AddCardForm";
import { CSS } from "@dnd-kit/utilities";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";

export const BoardList = ({
  id,
  title,
  tasks = [],
  allLists,
  onMoveCard,
  activeAddCardListId,
  setActiveAddCardListId,
  completed,
  onMoveTaskList,
  sourceIndex,
}: any) => {
  const [isHidden, setIsHidden] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id,
    data: { type: "container" },
    disabled: isLocked,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };
  const safeTasks = Array.isArray(tasks) ? tasks.filter((t) => t && t._id) : [];

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex flex-col bg-slate-200/50 rounded-xl p-3 min-w-[320px] max-w-[320px] h-fit ${isHidden ? "opacity-40" : ""}`}>
      <div className="flex items-center justify-between mb-4 px-1">
        <div
          {...attributes}
          {...listeners}
          className={`flex items-center gap-2 overflow-hidden ${isLocked ? "cursor-default" : "cursor-grab"}`}>
          <GripVertical className="h-4 w-4 text-slate-400" />
          {isEditing ? (
            <input
              autoFocus
              className="bg-white border rounded px-1 text-sm font-bold"
              defaultValue={title}
              onBlur={() => setIsEditing(false)}
            />
          ) : (
            <div>
              <h3 className="font-bold text-slate-800 truncate">{title}</h3>
            </div>
          )}
        </div>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-48 p-2" align="end">
            <h1>Move to Index</h1>
            {allLists.length > 1 && (
              <div className="flex flex-col gap-1">
                {sourceIndex !== 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start gap-2 "
                    onClick={() => onMoveTaskList(sourceIndex, 0)}>
                    Move to position 1
                  </Button>
                )}

                {allLists.map((list: any, index: number) => {
                  if (
                    list._id !== id &&
                    index !== sourceIndex - 1 &&
                    index !== allLists.length - 1
                  ) {
                    return (
                      <Button
                        key={list._id}
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start gap-2"
                        onClick={() => onMoveTaskList(sourceIndex, index + 1)}>
                        Move after {list.title}
                      </Button>
                    );
                  }
                  return null;
                })}

                {sourceIndex !== allLists.length - 1 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start gap-2 "
                    onClick={() =>
                      onMoveTaskList(sourceIndex, allLists.length - 1)
                    }>
                    Move to the end
                  </Button>
                )}
              </div>
            )}

            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start gap-2"
              onClick={() => setIsEditing(true)}>
              <Edit3 className="h-3 w-3" /> Edit
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start gap-2"
              onClick={() => setIsHidden(!isHidden)}>
              {isHidden ? (
                <Eye className="h-3 w-3" />
              ) : (
                <EyeOff className="h-3 w-3" />
              )}{" "}
              {isHidden ? "Show" : "Hide"}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start gap-2"
              onClick={() => setIsLocked(!isLocked)}>
              {isLocked ? (
                <Unlock className="h-3 w-3" />
              ) : (
                <Lock className="h-3 w-3" />
              )}{" "}
              {isLocked ? "Unlock" : "Lock"}
            </Button>
          </PopoverContent>
        </Popover>
      </div>

      {!isHidden && (
        <>
          <div className="flex-1 min-h-[100px]">
            <div className="flex justify-between p-2 py-1">
              <h2>Completed</h2>
              <Switch checked={completed} />
            </div>
            <SortableContext
              items={safeTasks.map((t) => t._id)}
              strategy={verticalListSortingStrategy}>
              {safeTasks.map((task, index) => {
                console.log("Task:", task);
                return (
                  <SortableTaskCard
                    key={task._id}
                    {...task}
                    index={index}
                    tasklistId={id}
                    allLists={allLists}
                    onMoveCard={onMoveCard}
                  />
                );
              })}
            </SortableContext>
          </div>

          <div className="mt-4">
            {activeAddCardListId === id ? (
              <div className="bg-white p-2 rounded-lg shadow-sm">
                <TaskManagerForm id={id} />
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full mt-1 text-slate-400"
                  onClick={() => setActiveAddCardListId(null)}>
                  Cancel
                </Button>
              </div>
            ) : (
              <Button
                variant="ghost"
                className="w-full justify-start text-slate-500 hover:bg-slate-300/50"
                onClick={() => setActiveAddCardListId(id)}>
                + Add card
              </Button>
            )}
          </div>
        </>
      )}
    </div>
  );
};
