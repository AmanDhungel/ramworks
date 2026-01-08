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
  id: string;
  title: string;
  date?: string;
  assignee?: { name: string; image: string };
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
    id: id,
    data: {
      type: "container",
    },
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const safeTasks = Array.isArray(tasks)
    ? tasks.filter((task) => task && task.id)
    : [];

  const taskIds = safeTasks.map((task) => task.id);

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex flex-col bg-slate-200/50 rounded-xl p-3 min-w-[320px] max-w-[320px] h-fit transition-all ${
        isHidden ? "min-w-[80px]" : ""
      } ${isDragging ? "ring-2 ring-primary" : ""}`}>
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
          <div className="relative">
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
            {showMenu && (
              <div className="absolute top-8 right-0 z-50 bg-white shadow-xl rounded-md border border-slate-200 flex flex-col p-2 gap-2 w-10 items-center">
                <SquarePen className="h-4 w-4 text-slate-500 cursor-pointer hover:text-blue-500" />
                <Users className="h-4 w-4 text-slate-500 cursor-pointer hover:text-blue-500" />
                <Eye className="h-4 w-4 text-slate-500 cursor-pointer hover:text-blue-500" />
                <Lock className="h-4 w-4 text-slate-500 cursor-pointer hover:text-blue-500" />
                <Trash2 className="h-4 w-4 text-slate-500 cursor-pointer hover:text-red-500" />
                <Settings className="h-4 w-4 text-slate-500 cursor-pointer hover:text-blue-500" />
              </div>
            )}
          </div>
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
              items={taskIds}
              strategy={verticalListSortingStrategy}>
              {safeTasks.map((task) => (
                <SortableTaskCard key={task.id} {...task} />
              ))}
            </SortableContext>
            {safeTasks.length === 0 && (
              <div className="text-center py-4 text-slate-400 text-sm border-2 border-dashed border-slate-300 rounded-lg">
                Drop tasks here
              </div>
            )}
          </div>

          <div className="mt-4">
            <TaskManagerForm />
          </div>
        </>
      )}
    </div>
  );
};
