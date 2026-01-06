import {
  ChevronsRightLeft,
  MoreHorizontal,
  Plus,
  LayoutPanelTop,
  Edit2,
  Users,
  Eye,
  SquarePen,
  Lock,
  Trash2,
  Settings,
} from "lucide-react";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import { Button } from "@/components/ui/button";
import { SortableTaskCard } from "./SortableTaskCard";
import { useState } from "react";
import { Switch } from "@/components/ui/switch";

export const BoardList = ({ id, title, tasks, isComplete }: any) => {
  const [isHidden, setIsHidden] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const { setNodeRef } = useDroppable({ id });

  return (
    <div
      className={`flex flex-col bg-slate-200/50 rounded-xl p-3 min-w-[320px] max-w-[320px] h-fit transition-all ${
        isHidden ? " min-w-[60px]" : ""
      }`}>
      <div className="flex items-center justify-between mb-4 px-1">
        <div className="flex items-center gap-2 overflow-hidden">
          <h3 className="font-bold text-slate-800 truncate">{title}</h3>
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={() => setIsHidden(!isHidden)}>
            <ChevronsRightLeft
              className={`h-4 w-4 ${isHidden ? "rotate-180" : ""}`}
            />
          </Button>
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={() => setShowMenu(!showMenu)}>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
            {showMenu && (
              <div className="absolute -top-3 left-11 z-50  bg-white shadow-xl rounded-md border border-slate-200 flex flex-col p-4 gap-4">
                <SquarePen className="h-4 w-4 text-slate-500 cursor-pointer" />
                <Users className="h-4 w-4 text-slate-500 cursor-pointer" />
                <Eye className="h-4 w-4 text-slate-500 cursor-pointer" />
                <Lock className="h-4 w-4 text-slate-500 cursor-pointer" />
                <Trash2 className="h-4 w-4 text-slate-500 cursor-pointer" />
                <Settings className="h-4 w-4 text-slate-500 cursor-pointer" />
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

          <div ref={setNodeRef} className="flex-1 min-h-[50px]">
            <SortableContext
              items={tasks.map((t: any) => t.id)}
              strategy={verticalListSortingStrategy}>
              {tasks.map((task: any) => (
                <SortableTaskCard key={task.id} {...task} />
              ))}
            </SortableContext>
          </div>

          <Button
            variant="ghost"
            className="w-full justify-start text-slate-600 hover:bg-white/50 mt-2 h-10 px-2 border border-transparent hover:border-slate-300">
            <Plus className="h-4 w-4 mr-2" />
            <span className="text-sm font-medium">Add a card</span>
            <LayoutPanelTop className="h-4 w-4 ml-auto text-slate-400" />
          </Button>
        </>
      )}
    </div>
  );
};
