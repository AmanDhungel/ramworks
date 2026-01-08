import React, { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ChevronUp, ChevronDown, Copy, Edit2, Calendar } from "lucide-react";
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
  } = useSortable({
    id: id,
    data: {
      type: "task",
    },
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.3 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="mb-3 cursor-grab active:cursor-grabbing group">
      <Card className="border-slate-200 shadow-sm overflow-hidden bg-white group-hover:border-blue-400 transition-colors">
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
                <Copy
                  className="h-3 w-3 text-slate-400 cursor-pointer hover:text-blue-500"
                  onClick={(e) => e.stopPropagation()}
                />
                <Edit2
                  className="h-3 w-3 text-slate-400 cursor-pointer hover:text-blue-500"
                  onClick={(e) => e.stopPropagation()}
                />
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
