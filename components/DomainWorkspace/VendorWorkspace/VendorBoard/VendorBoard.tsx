"use client";
import React, { useEffect, useState } from "react";
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
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { BoardList } from "./BoardList";
import { SortableTaskCard } from "./SortableTaskCard";
import { Input } from "@/components/ui/input";
import {
  useCreateTaskList,
  useDragDropTask,
  useDragDropTaskList,
  useGetDNDBoard,
} from "@/services/board.service";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";
import Loading from "@/components/Loading";
import { useQueryClient } from "@tanstack/react-query";
import { CirclePlus } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function VendorBoard() {
  const { board } = useParams();
  const boardId = Array.isArray(board) ? board[0] : board;
  const queryClient = useQueryClient();

  const { data: dndBoard, isLoading } = useGetDNDBoard(boardId ?? "");
  const { mutate: mutateTask, isPending: isMovingTask } = useDragDropTask(
    boardId ?? "",
  );
  const { mutate: mutateTaskList } = useDragDropTaskList(boardId ?? "");
  const { mutate: createList, isPending: isCreatingList } = useCreateTaskList(
    boardId ?? "",
  );

  const [lists, setLists] = useState<any[]>([]);
  const [displayLists, setDisplayLists] = useState<any[]>([]);

  const [activeTask, setActiveTask] = useState<any>(null);
  const [addList, setAddList] = useState("");
  const [activeAddCardListId, setActiveAddCardListId] = useState<string | null>(
    null,
  );

  const isGlobalPending = isMovingTask || isCreatingList;

  useEffect(() => {
    if (dndBoard?.data?.task_lists) {
      setTimeout(() => {
        setLists(dndBoard.data.task_lists);
        setDisplayLists(dndBoard.data.task_lists);
      }, 0);
    }
  }, [dndBoard]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const findVisualContainer = (id: string) => {
    return displayLists.find((l) => l.tasks.some((t: any) => t._id === id))
      ?._id;
  };

  const handleDragStart = ({ active }: DragStartEvent) => {
    if (isGlobalPending) return;
    const type = active.data.current?.type;
    if (type === "task") {
      setActiveTask(
        displayLists.flatMap((l) => l.tasks).find((t) => t._id === active.id),
      );
    }
  };

  const handleDragOver = ({ active, over }: DragOverEvent) => {
    if (!over || isGlobalPending) return;

    const activeId = active.id.toString();
    const overId = over.id.toString();

    const activeContainer = findVisualContainer(activeId);
    const overContainer =
      over.data.current?.type === "container"
        ? overId
        : findVisualContainer(overId);

    if (!activeContainer || !overContainer || activeContainer === overContainer)
      return;

    setDisplayLists((prev) => {
      const source = prev.find((l) => l._id === activeContainer)!;
      // const destination = prev.find((l) => l._id === overContainer)!;
      const movedTask = source.tasks.find((t: any) => t._id === activeId);

      if (!movedTask) return prev;

      return prev.map((list) => {
        if (list._id === activeContainer)
          return {
            ...list,
            tasks: list.tasks.filter((t: any) => t._id !== activeId),
          };
        if (list._id === overContainer)
          return { ...list, tasks: [...list.tasks, movedTask] };
        return list;
      });
    });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveTask(null);

    if (!over || isGlobalPending) {
      setDisplayLists(lists);
      return;
    }

    if (active.data.current?.type === "container") {
      const oldIndex = lists.findIndex((l) => l._id === active.id);
      const newIndex = lists.findIndex((l) => l._id === over.id);

      if (oldIndex !== newIndex) {
        const newOrder = arrayMove(lists, oldIndex, newIndex);

        setLists(newOrder);
        setDisplayLists(newOrder);

        mutateTaskList(
          {
            source_index: oldIndex,
            destination_index: newIndex,
          },
          {
            onSuccess: () => {
              queryClient.invalidateQueries({ queryKey: ["dndboard"] });
            },
            onError: () => {
              setLists(lists);
              setDisplayLists(lists);
              toast.error("Failed to reorder lists");
            },
          },
        );
      }
      return;
    }

    if (active.data.current?.type === "container") {
      const oldIndex = lists.findIndex((l) => l._id === active.id);
      const newIndex = lists.findIndex((l) => l._id === over.id);
      const newOrder = arrayMove(lists, oldIndex, newIndex);
      setLists(newOrder);
      setDisplayLists(newOrder);
      return;
    }

    const sourceList = lists.find((l) =>
      l.tasks.some((t: any) => t._id === active.id),
    );
    const sourceListId = sourceList?._id;
    const sourceIndex = sourceList?.tasks.findIndex(
      (t: any) => t._id === active.id,
    );

    const isOverTask = over.data.current?.type === "task";
    const destinationListId = isOverTask
      ? over.data.current?.tasklist
      : over.id;

    const destListInPrevState = lists.find((l) => l._id === destinationListId);
    let destinationIndex: number;

    if (isOverTask) {
      destinationIndex =
        destListInPrevState?.tasks.findIndex((t: any) => t._id === over.id) ??
        0;
    } else {
      destinationIndex = destListInPrevState?.tasks.length ?? 0;
    }

    if (sourceIndex === undefined || sourceIndex === -1) return;

    const updatedData = JSON.parse(JSON.stringify(lists));
    const sList = updatedData.find((l: any) => l._id === sourceListId);
    const dList = updatedData.find((l: any) => l._id === destinationListId);
    const [task] = sList.tasks.splice(sourceIndex, 1);
    dList.tasks.splice(destinationIndex, 0, task);

    setLists(updatedData);
    setDisplayLists(updatedData);

    if (sourceListId === destinationListId && sourceIndex === destinationIndex)
      return;

    mutateTask(
      {
        source_tasklist_id: sourceListId,
        destination_tasklist_id: destinationListId,
        source_index: sourceIndex,
        destination_index:
          destinationIndex === -1 ? dList.tasks.length - 1 : destinationIndex,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["dndboard"] });
        },
        onError: () => {
          setLists(lists);
          setDisplayLists(lists);
          toast.error("Failed to move card");
        },
      },
    );
  };

  const handleMoveCard = (taskId: string, sId: string, dId: string) => {
    const sList = lists.find((l) => l._id === sId);
    const sIdx = sList?.tasks.findIndex((t: any) => t._id === taskId);
    if (sIdx === undefined || sIdx === -1) return;

    mutateTask(
      {
        source_tasklist_id: sId,
        destination_tasklist_id: dId,
        source_index: sIdx,
        destination_index: 0,
      },
      {
        onSuccess: () =>
          queryClient.invalidateQueries({ queryKey: ["dndboard"] }),
      },
    );
  };

  const handleMoveTaskList = (sId: number, dId: number) => {
    if (sId === undefined || dId === -1) return;

    mutateTaskList(
      {
        source_index: sId,
        destination_index: dId,
      },
      {
        onSuccess: () =>
          queryClient.invalidateQueries({ queryKey: ["dndboard"] }),
      },
    );
  };

  const handleAddList = () => {
    createList(
      { title: addList },
      {
        onSuccess: () =>
          queryClient.invalidateQueries({ queryKey: ["dndboard"] }),
      },
    );
  };

  if (isLoading) return <Loading />;

  return (
    <div
      className={`h-screen w-full bg-slate-100 p-6 ${isGlobalPending ? "pointer-events-none opacity-80" : ""}`}>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}>
        <div className="flex gap-6 overflow-x-auto h-full pb-8">
          <SortableContext
            items={displayLists.map((l) => l._id)}
            strategy={horizontalListSortingStrategy}>
            {displayLists.map((list, index) => (
              <BoardList
                completed={list.completed}
                key={list._id}
                id={list._id}
                title={list.title}
                tasks={list.tasks}
                isComplete={list.completed}
                allLists={displayLists}
                onMoveCard={handleMoveCard}
                activeAddCardListId={activeAddCardListId}
                setActiveAddCardListId={setActiveAddCardListId}
                sourceIndex={index}
                onMoveTaskList={handleMoveTaskList}
              />
            ))}
          </SortableContext>

          <div className="mt-4 flex gap-1">
            <Input
              type="text"
              placeholder="Add ListItem"
              className="bg-slate-50 w-fit "
              onChange={(e) => {
                setAddList(e.target.value);
              }}
            />
            <Button
              type="button"
              className="bg-orange-500"
              onClick={handleAddList}>
              <CirclePlus className="w-4 h-4 mr-1" /> Add
            </Button>
          </div>
        </div>
        <DragOverlay>
          {activeTask && (
            <SortableTaskCard
              {...activeTask}
              index={0}
              tasklistId=""
              isOverlay
            />
          )}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
