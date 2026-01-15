import React, { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ChevronUp, ChevronDown, Copy, Edit2, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface SortableTaskCardProps {
  _id: string;
  title: string;
  createdAt?: string;
  contacts?: { _id: string; name: string }[];
  index: number;
  tasklistId: string;
}

export const SortableTaskCard = ({
  _id,
  title,
  createdAt,
  contacts,
  index,
  tasklistId,
}: SortableTaskCardProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: _id,
    data: { type: "task", tasklist: tasklistId, index }, // ✅ important!
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  };

  const primaryContact = contacts?.[0];

  return (
    <div ref={setNodeRef} style={style} className="mb-3 group">
      <Card className="border-slate-200 shadow-sm overflow-hidden bg-white group-hover:border-blue-400 transition-colors">
        {/* Drag Handle */}
        <div
          {...attributes}
          {...listeners}
          className="p-3 flex items-center justify-between border-b bg-slate-50/50 cursor-grab active:cursor-grabbing">
          <span className="text-sm font-medium text-slate-600">{title}</span>

          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={(e) => {
              e.stopPropagation();
              setIsCollapsed((prev) => !prev);
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
                  Priority data & custom fields available
                </p>
              </div>
              <div className="flex gap-1">
                <Copy
                  className="h-3 w-3 text-slate-400 hover:text-blue-500 cursor-pointer"
                  onClick={(e) => e.stopPropagation()}
                />
                <Edit2
                  className="h-3 w-3 text-slate-400 hover:text-blue-500 cursor-pointer"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            </div>

            {primaryContact && (
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarFallback>{primaryContact.name[0]}</AvatarFallback>
                </Avatar>
                <span className="text-xs font-medium text-slate-700">
                  {primaryContact.name}
                </span>
              </div>
            )}

            <div className="flex items-center text-xs text-slate-400 gap-1 pt-2">
              <Calendar className="h-3 w-3" />
              <span>
                {createdAt ? new Date(createdAt).toDateString() : "No date"}
              </span>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
};
