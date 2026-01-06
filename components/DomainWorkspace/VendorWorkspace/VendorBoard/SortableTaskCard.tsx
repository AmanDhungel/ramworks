import React, { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  ChevronUp,
  ChevronDown,
  MoreHorizontal,
  Copy,
  Edit2,
  Calendar,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface TaskCardProps {
  id: string;
  title: string;
  date?: string;
  assignee?: { name: string; image: string };
}

export const SortableTaskCard = ({
  id,
  title,
  date,
  assignee,
}: TaskCardProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="mb-3">
      <Card className="border-slate-200 shadow-sm overflow-hidden bg-white">
        <div className="p-3 flex items-center justify-between border-b bg-slate-50/50">
          <span className="text-sm font-medium text-slate-600">{title}</span>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={(e) => {
              e.stopPropagation();
              setIsCollapsed(!isCollapsed);
            }}>
            {isCollapsed ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronUp className="h-4 w-4" />
            )}
          </Button>
        </div>

        {!isCollapsed && (
          <CardContent className="p-4 space-y-4">
            <div className="flex justify-between items-start bg-slate-50 p-3 rounded-md border border-slate-100">
              <div className="space-y-1">
                <p className="text-xs font-bold text-slate-800">
                  Initial Task fields
                </p>
                <p className="text-[10px] text-slate-500">
                  Bill Name: Test Plumber Bill Type: Plumbing
                </p>
              </div>
              <div className="flex gap-1">
                <Copy className="h-3 w-3 text-slate-400 cursor-pointer" />
                <Edit2 className="h-3 w-3 text-slate-400 cursor-pointer" />
              </div>
            </div>

            {assignee && (
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={assignee.image} />
                  <AvatarFallback>{assignee.name[0]}</AvatarFallback>
                </Avatar>
                <span className="text-xs font-medium text-slate-700">
                  {assignee.name}
                </span>
              </div>
            )}

            <div className="flex items-center text-xs text-slate-400 gap-1 pt-2">
              <Calendar className="h-3 w-3" />
              <span>{date || "10 Jan 2024"}</span>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
};
