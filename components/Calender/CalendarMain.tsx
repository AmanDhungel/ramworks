"use client";
import React, { useState, useMemo } from "react";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  isSameMonth,
  isSameDay,
  addDays,
  eachDayOfInterval,
  parseISO,
  subDays,
  differenceInMinutes,
  setHours,
  setMinutes,
} from "date-fns";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  FileOutput,
  Calendar as CalendarIcon,
  Clock,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { EventDialog } from "./EventDialog";
import { EventFormValues } from "./schema";

const CATEGORY_MAP = {
  activity: {
    label: "Activity Schedule",
    bg: "bg-[#DCFCE7]",
    border: "border-[#BBF7D0]",
    text: "text-[#166534]",
    dot: "bg-[#22C55E]",
  },
  meeting: {
    label: "Meeting Schedules",
    bg: "bg-[#FEF3C7]",
    border: "border-[#FDE68A]",
    text: "text-[#92400E]",
    dot: "bg-[#F59E0B]",
  },
  holiday: {
    label: "Holidays",
    bg: "bg-[#FEE2E2]",
    border: "border-[#FECACA]",
    text: "text-[#991B1B]",
    dot: "bg-[#EF4444]",
  },
  lorem: {
    label: "Lorem",
    bg: "bg-[#DBEAFE]",
    border: "border-[#BFDBFE]",
    text: "text-[#1E40AF]",
    dot: "bg-[#3B82F6]",
  },
};

const GRID_START_HOUR = 1;
const HOUR_HEIGHT = 80; // pixels

export default function CalendarMain() {
  const [currentDate, setCurrentDate] = useState(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  });
  const [view, setView] = useState<"month" | "week" | "day">("month");
  const [tasks, setTasks] = useState<EventFormValues[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<EventFormValues | null>(null);

  const miniCalDays = useMemo(() => {
    const start = startOfWeek(startOfMonth(currentDate));
    const end = endOfWeek(endOfMonth(currentDate));
    return eachDayOfInterval({ start, end });
  }, [currentDate]);

  const handleTaskSubmit = (data: EventFormValues) => {
    if (editingTask) {
      setTasks(
        tasks.map((t) => (t.id === editingTask.id ? { ...data, id: t.id } : t))
      );
    } else {
      setTasks([
        ...tasks,
        { ...data, id: Math.random().toString(36).substr(2, 9) },
      ]);
    }
    setIsDialogOpen(false);
    setEditingTask(null);
  };

  return (
    <div className="flex h-screen w-full bg-[#F8FAFC] text-[#1E293B] overflow-hidden">
      {/* SIDEBAR */}
      <aside className="w-[280px] bg-white border-r p-5 flex flex-col gap-6">
        <div className="flex items-center gap-2 text-slate-400 text-[10px] uppercase font-bold tracking-wider">
          <CalendarIcon size={14} /> Application /{" "}
          <span className="text-slate-900">Calendar</span>
        </div>

        {/* Mini Calendar */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-sm">
              {format(currentDate, "MMMM yyyy")}
            </h3>
            <div className="flex gap-1 text-slate-400">
              <ChevronLeft
                size={16}
                className="cursor-pointer"
                onClick={() => setCurrentDate(subMonths(currentDate, 1))}
              />
              <ChevronRight
                size={16}
                className="cursor-pointer"
                onClick={() => setCurrentDate(addMonths(currentDate, 1))}
              />
            </div>
          </div>
          <div className="grid grid-cols-7 text-center gap-y-1">
            {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
              <div
                key={d}
                className="text-[10px] font-bold text-slate-400 mb-2 uppercase">
                {d}
              </div>
            ))}
            {miniCalDays.map((day, i) => (
              <div
                key={i}
                onClick={() => {
                  setCurrentDate(day);
                  setView("day");
                }}
                className={cn(
                  "text-xs py-1.5 cursor-pointer rounded-md transition-all relative",
                  isSameDay(day, currentDate)
                    ? "bg-[#f97316] text-white font-bold"
                    : "hover:bg-slate-100",
                  !isSameMonth(day, currentDate) && "text-slate-300"
                )}>
                {format(day, "d")}
                {/* Visual marker for today's actual date vs selected date */}
                {isSameDay(day, new Date()) && !isSameDay(day, currentDate) && (
                  <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-orange-500 rounded-full" />
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Categories Section */}
        <section className="space-y-3">
          <div className="flex justify-between items-center text-sm font-bold">
            Event{" "}
            <Plus
              size={16}
              className="text-[#f97316] cursor-pointer"
              onClick={() => {
                setEditingTask(null);
                setIsDialogOpen(true);
              }}
            />
          </div>
          {Object.entries(CATEGORY_MAP).map(([key, val]) => (
            <div
              key={key}
              className={cn(
                "flex items-center gap-3 p-2 rounded-lg border text-[11px] font-semibold",
                val.bg,
                val.border,
                val.text
              )}>
              <div className={cn("w-2.5 h-2.5 rounded-sm", val.dot)} />{" "}
              {val.label}
            </div>
          ))}
        </section>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col">
        <header className="h-[72px] bg-white border-b px-8 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Calendar</h1>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="text-slate-600">
              <FileOutput size={16} className="mr-2" /> Export
            </Button>
            <Button
              className="bg-[#f97316] hover:bg-[#ea580c]"
              onClick={() => {
                setEditingTask(null);
                setIsDialogOpen(true);
              }}>
              <Plus size={16} className="mr-2" /> Create
            </Button>
          </div>
        </header>

        {/* Toolbar */}
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="secondary"
              size="sm"
              className="bg-white border"
              onClick={() => setCurrentDate(new Date())}>
              Today
            </Button>
            <div className="flex border rounded-md bg-white">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 border-r"
                onClick={() =>
                  setCurrentDate(
                    view === "month"
                      ? subMonths(currentDate, 1)
                      : subDays(currentDate, 7)
                  )
                }>
                <ChevronLeft size={16} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() =>
                  setCurrentDate(
                    view === "month"
                      ? addMonths(currentDate, 1)
                      : addDays(currentDate, 7)
                  )
                }>
                <ChevronRight size={16} />
              </Button>
            </div>
            <h2 className="text-lg font-bold ml-2">
              {format(currentDate, "MMMM yyyy")}
            </h2>
          </div>

          <div className="flex bg-slate-100 p-1 rounded-lg">
            {(["month", "week", "day"] as const).map((v) => (
              <Button
                key={v}
                size="sm"
                variant={view === v ? "default" : "ghost"}
                className={cn(
                  "capitalize h-8 px-5 rounded-md",
                  view === v ? "bg-[#f97316] text-white" : "text-slate-500"
                )}
                onClick={() => setView(v)}>
                {v}
              </Button>
            ))}
          </div>
        </div>

        <div className="flex-1 px-6 pb-6 overflow-hidden">
          <div className="h-full bg-white border rounded-xl shadow-sm overflow-hidden">
            {view === "month" && (
              <MonthGrid
                currentDate={currentDate}
                tasks={tasks}
                onEdit={setEditingTask}
                onOpenDialog={setIsDialogOpen}
              />
            )}
            {view === "week" && (
              <TimeGrid
                currentDate={currentDate}
                tasks={tasks}
                onEdit={setEditingTask}
                onOpenDialog={setIsDialogOpen}
                days={7}
              />
            )}
            {view === "day" && (
              <TimeGrid
                currentDate={currentDate}
                tasks={tasks}
                onEdit={setEditingTask}
                onOpenDialog={setIsDialogOpen}
                days={1}
              />
            )}
          </div>
        </div>
      </main>

      <EventDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSubmit={handleTaskSubmit}
        initialData={editingTask}
      />
    </div>
  );
}

// --- Precise Time Grid View ---
function TimeGrid({ currentDate, tasks, onEdit, onOpenDialog, days }: any) {
  const weekDays =
    days === 7
      ? eachDayOfInterval({
          start: startOfWeek(currentDate),
          end: endOfWeek(currentDate),
        })
      : [currentDate];

  const hours = Array.from({ length: 24 }, (_, i) => i + GRID_START_HOUR);

  const calculatePosition = (timeStr: string) => {
    const [hrs, mins] = timeStr.split(":").map(Number);
    const totalMinutesSinceGridStart = (hrs - GRID_START_HOUR) * 60 + mins;
    return (totalMinutesSinceGridStart / 60) * HOUR_HEIGHT;
  };

  const calculateHeight = (start: string, end: string) => {
    const [sHrs, sMins] = start.split(":").map(Number);
    const [eHrs, eMins] = end.split(":").map(Number);
    const durationMinutes = eHrs * 60 + eMins - (sHrs * 60 + sMins);
    return (durationMinutes / 60) * HOUR_HEIGHT;
  };

  return (
    <div className="flex flex-col h-full">
      <div
        className={cn(
          "grid border-b bg-slate-50/30",
          days === 7 ? "grid-cols-[80px_1fr]" : "grid-cols-1"
        )}>
        {days === 7 && (
          <div className="p-4 border-r text-[10px] font-bold text-slate-400">
            W{format(currentDate, "w")}
          </div>
        )}
        <div className={cn("grid", days === 7 ? "grid-cols-7" : "grid-cols-1")}>
          {weekDays.map((d) => (
            <div
              key={d.toString()}
              className={cn(
                "p-3 text-center border-r last:border-r-0",
                isSameDay(d, currentDate) && "bg-orange-50/50"
              )}>
              <div className="text-[10px] font-bold text-slate-400 uppercase">
                {format(d, "eee dd")}
              </div>
              {days === 1 && (
                <div className="text-orange-600 font-bold mt-1">
                  {format(d, "EEEE d")}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto relative">
        <div className="grid grid-cols-[80px_1fr] min-h-full">
          {/* Hour Labels */}
          <div className="border-r bg-white sticky left-0 z-20">
            {hours.map((h) => (
              <div
                key={h}
                className="h-20 border-b p-3 text-right text-[10px] font-bold text-slate-400">
                {h > 12 ? h - 12 : h}
                {h >= 12 ? "pm" : "am"}
              </div>
            ))}
          </div>

          {/* Time Columns */}
          <div
            className={cn(
              "grid relative divide-x",
              days === 7 ? "grid-cols-7" : "grid-cols-1"
            )}>
            {weekDays.map((d) => (
              <div key={d.toString()} className="relative h-full">
                {/* 30-min Grid Lines */}
                {hours.map((h) => (
                  <div
                    key={h}
                    className="absolute w-full border-b border-slate-100/50"
                    style={{
                      top: `${(h - GRID_START_HOUR) * HOUR_HEIGHT + 40}px`,
                      height: "40px",
                    }}
                  />
                ))}

                {tasks
                  .filter((t: any) => isSameDay(parseISO(t.date), d))
                  .map((task: any) => (
                    <div
                      key={task.id}
                      onClick={() => {
                        onEdit(task);
                        onOpenDialog(true);
                      }}
                      className={cn(
                        "absolute left-1 right-1 p-3 rounded-xl border text-[11px] font-bold shadow-sm z-10 cursor-pointer transition-transform hover:scale-[1.02]",
                        CATEGORY_MAP[task.category as keyof typeof CATEGORY_MAP]
                          .bg,
                        CATEGORY_MAP[task.category as keyof typeof CATEGORY_MAP]
                          .border,
                        CATEGORY_MAP[task.category as keyof typeof CATEGORY_MAP]
                          .text
                      )}
                      style={{
                        top: `${calculatePosition(task.startTime)}px`,
                        height: `${calculateHeight(
                          task.startTime,
                          task.endTime
                        )}px`,
                      }}>
                      <div className="flex items-center gap-1.5 mb-1 opacity-80">
                        <Clock size={12} /> {task.startTime}
                      </div>
                      {task.title}
                    </div>
                  ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// MonthGrid remains largely the same but with the UI update for selected date
function MonthGrid({ currentDate, tasks, onEdit, onOpenDialog }: any) {
  const days = eachDayOfInterval({
    start: startOfWeek(startOfMonth(currentDate)),
    end: endOfWeek(endOfMonth(currentDate)),
  });

  return (
    <div className="grid grid-cols-7 h-full overflow-y-auto">
      {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
        <div
          key={d}
          className="p-4 text-center text-[10px] font-bold text-slate-400 border-b border-r uppercase tracking-widest bg-slate-50/30">
          {d}
        </div>
      ))}
      {days.map((day, i) => (
        <div
          key={i}
          className={cn(
            "min-h-[130px] p-2 border-b border-r relative group transition-colors",
            !isSameMonth(day, currentDate)
              ? "bg-slate-50/50 text-slate-300"
              : "hover:bg-slate-50/30"
          )}>
          <div className="flex justify-between items-start mb-2">
            <span
              className={cn(
                "text-xs font-bold w-7 h-7 flex items-center justify-center rounded-full transition-colors",
                isSameDay(day, currentDate)
                  ? "bg-[#f97316] text-white"
                  : "text-slate-600"
              )}>
              {format(day, "d")}
            </span>
          </div>
          <div className="space-y-1">
            {tasks
              .filter((t: any) => isSameDay(parseISO(t.date), day))
              .map((task: any) => (
                <div
                  key={task.id}
                  onClick={() => {
                    onEdit(task);
                    onOpenDialog(true);
                  }}
                  className={cn(
                    "text-[10px] px-2 py-1.5 rounded-lg border font-bold truncate cursor-pointer shadow-sm",
                    CATEGORY_MAP[task.category as keyof typeof CATEGORY_MAP].bg,
                    CATEGORY_MAP[task.category as keyof typeof CATEGORY_MAP]
                      .text
                  )}>
                  {task.title}
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}
