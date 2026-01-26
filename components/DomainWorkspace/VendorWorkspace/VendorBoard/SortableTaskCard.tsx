"use client";
import React, { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  ChevronUp,
  ChevronDown,
  MoreVertical,
  ArrowRight,
  Calendar,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Progress } from "@/components/ui/progress";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Avatar } from "@/components/ui/avatar";

export const SortableTaskCard = ({
  _id,
  title,
  createdAt,
  index,
  tasklistId,
  allLists,
  onMoveCard,
  isOverlay,
  attachments,
  checklists,
  comments,
  companies,
  assignees,
  completed,
  contacts,
  custom_fields,
  deadline,
  description,
  invoices,
  location,
  priority,
  updatedAt,
}: any) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: _id,
    data: { type: "task", tasklist: tasklistId, index: index },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  };

  // console.log("allLists", attachments);

  return (
    <div ref={setNodeRef} style={style} className="mb-3 group relative">
      <Card className="border-slate-200    shadow-sm bg-white ">
        <div className="p-3 flex items-center justify-between">
          <div
            {...attributes}
            {...listeners}
            className="flex-1 cursor-grab active:cursor-grabbing mr-2 truncate">
            <span className="text-sm font-medium text-slate-700">{title}</span>
          </div>

          <div className="flex items-center gap-1">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 opacity-0 group-hover:opacity-100">
                  <MoreVertical className="h-3 w-3" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-52 p-2" align="end">
                <p className="text-[10px] font-bold text-slate-400 uppercase mb-2 px-1">
                  Move Card To
                </p>
                <div className="flex flex-col gap-1">
                  {allLists
                    ?.filter((l: any) => l._id !== tasklistId)
                    .map((list: any) => (
                      <Button
                        key={list._id}
                        variant="ghost"
                        size="sm"
                        className="justify-between text-xs h-8"
                        onClick={() => onMoveCard(_id, tasklistId, list._id)} // FIXED: Now triggers mutation
                      >
                        {list.title} <ArrowRight className="h-3 w-3" />
                      </Button>
                    ))}
                </div>
              </PopoverContent>
            </Popover>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              onClick={() => setIsCollapsed(!isCollapsed)}>
              {isCollapsed ? (
                <ChevronDown className="h-3 w-3" />
              ) : (
                <ChevronUp className="h-3 w-3" />
              )}
            </Button>
          </div>
        </div>

        {!isCollapsed && !isOverlay && (
          <CardContent className="p-3 pt-0  flex flex-col gap-3  bg-slate-50/30">
            <Progress
              className={`h-2 ${completed ? "bg-green-500!" : "bg-red-500!"} `}
              value={100}
            />
            <div className="flex flex-col gap-2">
              {contacts?.map((item: any) => {
                return (
                  <div key={item._id} className="flex  items-center gap-2">
                    <Avatar className="h-5 w-5 rounded-full">
                      {" "}
                      <AvatarImage src={item.avatar ?? ""} alt={item.name} />
                      <AvatarFallback className="border-slate-500 bg-blue-500 text-white flex items-center justify-center">
                        {item.name.slice(0, 4).toUpperCase() ?? "NA"}
                      </AvatarFallback>
                    </Avatar>
                    <h1 className="text-xs">{item.name ?? "Not Assigned"}</h1>
                  </div>
                );
              })}
            </div>

            <h2 className="text-xs">{description ?? "No description"}</h2>
            <h2 className="text-xs">
              {location.type.split("_").join(" ").toUpperCase() ??
                "No Location Type"}
            </h2>

            <div className="flex items-center text-[10px] text-slate-400 gap-1">
              <Calendar className="h-3 w-3" />
              <span>
                {createdAt
                  ? new Date(createdAt).toLocaleDateString()
                  : "No date"}
              </span>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
};
