import {
  ChevronsRightLeft,
  MoreHorizontal,
  Users,
  Eye,
  SquarePen,
  Lock,
  Trash2,
  Settings,
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
import { Switch } from "@/components/ui/switch";
import TaskManagerForm from "./AddCardDialog/AddCardForm";
import { CSS } from "@dnd-kit/utilities";

interface Task {
  _id: string; // ✅ FIXED
  title: string;
  createdAt?: string;
  contacts?: {
    _id: string;
    name: string;
  }[];
}

interface BoardListProps {
  id: string;
  title: string;
  tasks?: Task[];
  isComplete: boolean;
}

export const BoardList = ({
  id,
  title,
  tasks = [],
  isComplete,
}: BoardListProps) => {
  const [isHidden, setIsHidden] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id,
    data: {
      type: "container",
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform), // ✅ FIXED
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  // ✅ SAFE TASKS
  const safeTasks = Array.isArray(tasks)
    ? tasks.filter((task) => task && task._id)
    : [];

  // ✅ STABLE IDS
  const taskIds = safeTasks.map((task) => task._id);

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex flex-col bg-slate-200/50 rounded-xl p-3 min-w-[320px] max-w-[320px] h-fit transition-all ${
        isHidden ? "min-w-[80px]" : ""
      } ${isDragging ? "ring-2 ring-primary" : ""}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4 px-1">
        <div
          {...attributes}
          {...listeners}
          className="flex items-center gap-2 overflow-hidden cursor-grab active:cursor-grabbing">
          <GripVertical className="h-4 w-4 text-slate-400" />
          <h3 className="font-bold text-slate-800 truncate">{title}</h3>
        </div>

        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={(e) => {
              e.stopPropagation();
              setIsHidden(!isHidden);
            }}>
            <ChevronsRightLeft
              className={`h-4 w-4 transition-transform ${
                isHidden ? "rotate-180" : ""
              }`}
            />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={(e) => {
              e.stopPropagation();
              setShowMenu(!showMenu);
            }}>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div
        className={`h-1 w-12 mb-2 rounded-full ${
          isComplete ? "bg-red-500" : "bg-orange-400"
        }`}
      />

      {!isHidden && (
        <>
          {isComplete && (
            <div className="flex items-center justify-between bg-slate-300/50 p-2 rounded-md mb-4">
              <span className="text-xs font-bold text-slate-700">Complete</span>
              <Switch checked />
            </div>
          )}

          <div className="flex-1 min-h-[100px]">
            <SortableContext
              items={safeTasks.map((t, idx) => t._id)}
              strategy={verticalListSortingStrategy}>
              {safeTasks.map((task, index) => (
                <SortableTaskCard
                  key={task._id}
                  {...task}
                  index={index}
                  tasklistId={id}
                />
              ))}
            </SortableContext>

            {safeTasks.length === 0 && (
              <div className="text-center py-4 text-slate-400 text-sm border-2 border-dashed border-slate-300 rounded-lg">
                Drop tasks here
              </div>
            )}
          </div>

          <div className="mt-4">
            <TaskManagerForm id={id} />
          </div>
        </>
      )}
    </div>
  );
};
