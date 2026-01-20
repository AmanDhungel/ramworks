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
import { Plus } from "lucide-react";
import { BoardList } from "./BoardList";
import { SortableTaskCard } from "./SortableTaskCard";
import { Input } from "@/components/ui/input";
import {
  useCreateTaskList,
  useDragDropTask,
  useGetDNDBoard,
} from "@/services/board.service";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";
import Loading from "@/components/Loading";
import { useQueryClient } from "@tanstack/react-query";

export default function VendorBoard() {
  const { board } = useParams();
  const boardId = Array.isArray(board) ? board[0] : board;

  const { data: dndBoard, isLoading } = useGetDNDBoard(boardId ?? "");
  const { mutate: mutateTask } = useDragDropTask(boardId ?? "");

  const [lists, setLists] = useState<any[]>([]);
  const [activeTask, setActiveTask] = useState<any>(null);
  const [activeList, setActiveList] = useState<any>(null);
  const [addList, setAddList] = useState("");
  const queryClient = useQueryClient();

  console.log(dndBoard?.data);

  useEffect(() => {
    if (dndBoard?.data?.task_lists) {
      setTimeout(() => setLists(dndBoard.data.task_lists as any), 0);
    }
  }, [dndBoard]);

  const { mutate } = useCreateTaskList(boardId ?? "");

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const findContainer = (id: string, type?: "task" | "container") => {
    if (type === "container") return id;

    const container = lists.find((l) => l.tasks.some((t: any) => t._id === id));
    return container?._id ?? null;
  };

  const handleDragStart = ({ active }: DragStartEvent) => {
    const type = active.data.current?.type;

    if (type === "task") {
      setActiveTask(
        lists.flatMap((l) => l.tasks).find((t) => t._id === active.id),
      );
    } else {
      setActiveList(lists.find((l) => l._id === active.id));
    }
  };

  const handleDragOver = ({ active, over }: DragOverEvent) => {
    if (!over) return;

    const activeId = active.id.toString();
    const overId = over.id.toString();

    const activeContainer = findContainer(activeId);
    const overContainer = findContainer(overId);

    if (!activeContainer || !overContainer || activeContainer === overContainer)
      return;

    setLists((prev) => {
      const source = prev.find((l) => l._id === activeContainer)!;
      const destination = prev.find((l) => l._id === overContainer)!;

      const movedTask = source.tasks.find((t: any) => t._id === activeId);
      if (!movedTask) return prev;

      return prev.map((list) => {
        if (list._id === activeContainer) {
          return {
            ...list,
            tasks: list.tasks.filter((t: any) => t._id !== activeId),
          };
        }

        if (list._id === overContainer) {
          return { ...list, tasks: [...list.tasks, movedTask] };
        }

        return list;
      });
    });
  };

  // const handleDragEnd = ({ active, over }: DragEndEvent) => {
  //   if (!over) return setActiveTask(null);

  //   if (active.data.current?.type === "container") {
  //     setLists((prev) =>
  //       arrayMove(
  //         prev,
  //         prev.findIndex((l) => l._id === active.id),
  //         prev.findIndex((l) => l._id === over.id)
  //       )
  //     );
  //   } else {
  //     const containerId = findContainer(active.id.toString());
  //     if (!containerId) return;

  //     setLists((prev) =>
  //       prev.map((list) => {
  //         if (list._id !== containerId) return list;

  //         return {
  //           ...list,
  //           tasks: arrayMove(
  //             list.tasks,
  //             list.tasks.findIndex((t: any) => t._id === active.id),
  //             list.tasks.findIndex((t: any) => t._id === over.id)
  //           ),
  //         };
  //       })
  //     );
  //   }

  //   setActiveTask(null);
  //   setActiveList(null);
  // };

  // const handleDragEnd = ({ active, over }: DragEndEvent) => {
  //   if (!over) return setActiveTask(null);

  //   if (active.data.current?.type === "task") {
  //     const activeId = active.id.toString();
  //     const overId = over.id.toString();

  //     const sourceListId = findContainer(active.id, active.data.current?.type);
  //     const destinationListId = findContainer(over.id, over.data.current?.type);

  //     if (!sourceListId || !destinationListId) {
  //       setActiveTask(null);
  //       return;
  //     }

  //     setLists((prev) => {
  //       const source = prev.find((l) => l._id === sourceListId);
  //       const destination = prev.find((l) => l._id === destinationListId);

  //       if (!source?.tasks || !destination?.tasks) return prev;

  //       const sourceIndex = source.tasks.findIndex((t) => t._id === activeId);
  //       let destinationIndex = destination.tasks.findIndex(
  //         (t) => t._id === overId
  //       );

  //       // If dropping at empty space or end of list
  //       if (destinationIndex === -1)
  //         destinationIndex = destination.tasks.length;

  //       const task = source.tasks[sourceIndex];
  //       if (!task) return prev;

  //       // Remove from source
  //       const newSourceTasks = [...source.tasks];
  //       newSourceTasks.splice(sourceIndex, 1);

  //       // Add to destination
  //       const newDestinationTasks = [...destination.tasks];
  //       newDestinationTasks.splice(destinationIndex, 0, task);

  //       // Prepare payload **after updating arrays**
  //       mutateTask(
  //         {
  //           source_tasklist_id: sourceListId,
  //           destination_tasklist_id: destinationListId,
  //           source_index: sourceIndex,
  //           destination_index: destinationIndex,
  //         },
  //         {
  //           onSuccess: () => {
  //             toast.success("Task moved");
  //             queryClient.invalidateQueries({ queryKey: ["dndboard"] });
  //           },
  //           onError: () => {
  //             queryClient.invalidateQueries({ queryKey: ["dndboard"] });
  //           },
  //         }
  //       );

  //       return prev.map((list) => {
  //         if (list._id === sourceListId)
  //           return { ...list, tasks: newSourceTasks };
  //         if (list._id === destinationListId)
  //           return { ...list, tasks: newDestinationTasks };
  //         return list;
  //       });
  //     });
  //   }

  //   // Dragging entire list
  //   if (active.data.current?.type === "container") {
  //     setLists((prev) =>
  //       arrayMove(
  //         prev,
  //         prev.findIndex((l) => l._id === active.id),
  //         prev.findIndex((l) => l._id === over.id)
  //       )
  //     );
  //   }

  //   setActiveTask(null);
  //   setActiveList(null);
  // };

  // const handleDragEnd = ({ active, over }: DragEndEvent) => {
  //   console.log("handleDragEnd", active, over);
  //   if (!over) {
  //     setActiveTask(null);
  //     return;
  //   }

  //   if (active.data.current?.type === "task") {
  //     const activeId = active.id.toString();
  //     const overId = over.id.toString();

  //     const sourceListId = findContainer(activeId, "task");
  //     // Use the 'type' from 'over' data if available to help findContainer
  //     const destinationListId = findContainer(
  //       overId,
  //       over.data.current?.type as any
  //     );

  //     if (!sourceListId || !destinationListId) {
  //       setActiveTask(null);
  //       return;
  //     }

  //     // --- NEW LOGIC START ---
  //     // If the task is dropped within the same list, we only update local state
  //     // and skip the mutateTask API call.
  //     if (sourceListId === destinationListId) {
  //       setLists((prev) =>
  //         prev.map((list) => {
  //           if (list._id !== sourceListId) return list;
  //           return {
  //             ...list,
  //             tasks: arrayMove(
  //               list.tasks,
  //               list.tasks.findIndex((t: any) => t._id === activeId),
  //               list.tasks.findIndex((t: any) => t._id === overId)
  //             ),
  //           };
  //         })
  //       );
  //       setActiveTask(null);
  //       return;
  //     }

  //     setLists((prev) => {
  //       const source = prev.find((l) => l._id === sourceListId);
  //       const destination = prev.find((l) => l._id === destinationListId);

  //       if (!source?.tasks || !destination?.tasks) return prev;

  //       const sourceIndex = source.tasks.findIndex(
  //         ({ t }: { t: { _id: string } }) => t._id === activeId
  //       );
  //       let destinationIndex = destination.tasks.findIndex(
  //         ({ t }: { t: { _id: string } }) => t._id === overId
  //       );

  //       if (destinationIndex === -1)
  //         destinationIndex = destination.tasks.length;

  //       const task = source.tasks[sourceIndex];
  //       if (!task) return prev;

  //       const newSourceTasks = [...source.tasks];
  //       newSourceTasks.splice(sourceIndex, 1);

  //       const newDestinationTasks = [...destination.tasks];
  //       newDestinationTasks.splice(destinationIndex, 0, task);

  //       mutateTask(
  //         {
  //           source_tasklist_id: sourceListId,
  //           destination_tasklist_id: destinationListId,
  //           source_index: sourceIndex,
  //           destination_index: destinationIndex,
  //         },
  //         {
  //           onSuccess: () => {
  //             toast.success("Task moved");
  //             queryClient.invalidateQueries({ queryKey: ["dndboard"] });
  //           },
  //           onError: () => {
  //             queryClient.invalidateQueries({ queryKey: ["dndboard"] });
  //           },
  //         }
  //       );

  //       return prev.map((list) => {
  //         if (list._id === sourceListId)
  //           return { ...list, tasks: newSourceTasks };
  //         if (list._id === destinationListId)
  //           return { ...list, tasks: newDestinationTasks };
  //         return list;
  //       });
  //     });
  //   }

  //   // Dragging entire list logic remains the same
  //   if (active.data.current?.type === "container") {
  //     setLists((prev) =>
  //       arrayMove(
  //         prev,
  //         prev.findIndex((l) => l._id === active.id),
  //         prev.findIndex((l) => l._id === over.id)
  //       )
  //     );
  //   }

  //   setActiveTask(null);
  //   setActiveList(null);
  // };

  //This is working
  // const handleDragEnd = ({ active, over }: DragEndEvent) => {
  //   setActiveTask(null);
  //   setActiveList(null);

  //   if (!over) return;

  //   const activeId = active.id.toString();
  //   const overId = over.id.toString();

  //   // 1. Handle List Reordering
  //   if (active.data.current?.type === "container") {
  //     setLists((prev) =>
  //       arrayMove(
  //         prev,
  //         prev.findIndex((l) => l._id === active.id),
  //         prev.findIndex((l) => l._id === over.id)
  //       )
  //     );
  //     return;
  //   }

  //   // 2. Handle Task Moving
  //   const sourceListId = findContainer(activeId, "task");
  //   const destinationListId = findContainer(
  //     overId,
  //     over.data.current?.type as any
  //   );

  //   if (!sourceListId || !destinationListId) return;

  //   // Find the exact indices and the task object
  //   const sourceList = lists.find((l) => l._id === sourceListId);
  //   const destinationList = lists.find((l) => l._id === destinationListId);

  //   // CRITICAL: Ensure your property access matches your data structure
  //   // Change 't._id' to just '_id' if that's how your data looks
  //   const sourceIndex = sourceList?.tasks.findIndex(
  //     (t: any) => t._id === activeId
  //   );
  //   let destinationIndex = destinationList?.tasks.findIndex(
  //     (t: any) => t._id === overId
  //   );

  //   if (sourceIndex === -1 || sourceIndex === undefined) return;

  //   // Default to end of list if dropped over a container or not found
  //   if (destinationIndex === -1 || destinationIndex === undefined) {
  //     destinationIndex = destinationList?.tasks.length ?? 0;
  //   }

  //   // A. Same List Reorder
  //   if (sourceListId === destinationListId) {
  //     setLists((prev) =>
  //       prev.map((list) => {
  //         if (list._id !== sourceListId) return list;
  //         return {
  //           ...list,
  //           tasks: arrayMove(list.tasks, sourceIndex, destinationIndex),
  //         };
  //       })
  //     );
  //     return;
  //   }

  //   // B. Cross List Move
  //   // Call Mutation FIRST (or alongside)
  //   mutateTask(
  //     {
  //       source_tasklist_id: sourceListId,
  //       destination_tasklist_id: destinationListId,
  //       source_index: sourceIndex,
  //       destination_index: destinationIndex,
  //     },
  //     {
  //       onSuccess: () => {
  //         toast.success("Task moved");
  //         queryClient.invalidateQueries({ queryKey: ["dndboard"] });
  //       },
  //       onError: () => {
  //         queryClient.invalidateQueries({ queryKey: ["dndboard"] });
  //       },
  //     }
  //   );

  //   // Update Local State for Optimistic UI
  //   setLists((prev) => {
  //     const newLists = [...prev];
  //     const sList = newLists.find((l) => l._id === sourceListId);
  //     const dList = newLists.find((l) => l._id === destinationListId);

  //     const [movedTask] = sList.tasks.splice(sourceIndex, 1);
  //     dList.tasks.splice(destinationIndex, 0, movedTask);

  //     return newLists;
  //   });
  // };

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    setActiveTask(null);
    setActiveList(null);

    if (!over) return;

    const activeId = active.id.toString();
    const overId = over.id.toString();

    // 1. Handle List Reordering
    if (active.data.current?.type === "container") {
      if (active.id !== over.id) {
        setLists((prev) =>
          arrayMove(
            prev,
            prev.findIndex((l) => l._id === active.id),
            prev.findIndex((l) => l._id === over.id),
          ),
        );
        // If your API supports list reordering, trigger that mutation here
      }
      return;
    }

    // 2. Handle Task Moving/Reordering
    const sourceListId = findContainer(activeId, "task");
    const destinationListId = findContainer(
      overId,
      over.data.current?.type as any,
    );

    if (!sourceListId || !destinationListId) return;

    const sourceList = lists.find((l) => l._id === sourceListId);
    const destinationList = lists.find((l) => l._id === destinationListId);

    const sourceIndex = sourceList?.tasks.findIndex(
      (t: any) => t._id === activeId,
    );
    let destinationIndex = destinationList?.tasks.findIndex(
      (t: any) => t._id === overId,
    );

    if (sourceIndex === -1 || sourceIndex === undefined) return;

    if (destinationIndex === -1 || destinationIndex === undefined) {
      destinationIndex = destinationList?.tasks.length ?? 0;
    }

    const isSameList = sourceListId === destinationListId;
    const isSameIndex = sourceIndex === destinationIndex;

    if (isSameList && isSameIndex) return;

    mutateTask(
      {
        source_tasklist_id: sourceListId,
        destination_tasklist_id: destinationListId,
        source_index: sourceIndex,
        destination_index: destinationIndex,
      },
      {
        onSuccess: () => {
          // toast.success("Position updated");
          queryClient.invalidateQueries({ queryKey: ["dndboard"] });
        },
        onError: () => {
          // Revert or refresh on error
          queryClient.invalidateQueries({ queryKey: ["dndboard"] });
          // toast.error("Failed to update position");
        },
      },
    );

    // --- OPTIMISTIC UI UPDATE ---
    setLists((prev) => {
      return prev.map((list) => {
        // Logic for same list reorder
        if (isSameList && list._id === sourceListId) {
          return {
            ...list,
            tasks: arrayMove(list.tasks, sourceIndex, destinationIndex),
          };
        }

        // Logic for moving between different lists
        if (list._id === sourceListId) {
          return {
            ...list,
            tasks: list.tasks.filter((t: any) => t._id !== activeId),
          };
        }

        if (list._id === destinationListId) {
          const movedTask = sourceList?.tasks[sourceIndex];
          const newTasks = [...list.tasks];
          newTasks.splice(destinationIndex, 0, movedTask);
          return {
            ...list,
            tasks: newTasks,
          };
        }

        return list;
      });
    });
  };

  const handleAddList = () => {
    if (!addList.trim()) return;

    mutate(
      { title: addList },
      {
        onSuccess: () => {
          toast.success("List created");
          queryClient.invalidateQueries({ queryKey: ["dndboard"] });
        },
        onError: () => toast.error("Failed to create list"),
      },
    );

    setAddList("");
  };

  if (isLoading) return <Loading />;

  return (
    <div className="h-screen w-full bg-slate-100 p-6">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}>
        <div className="flex gap-6 overflow-x-auto h-full">
          <SortableContext
            items={lists.map((l) => l._id)}
            strategy={horizontalListSortingStrategy}>
            {lists.map((list) => (
              <BoardList
                key={list._id}
                id={list._id}
                title={list.title}
                tasks={list.tasks}
                isComplete={list.completed}
              />
            ))}
          </SortableContext>

          <div className="min-w-[280px] bg-white rounded-xl p-4">
            <Input
              placeholder="Add another list"
              value={addList}
              onChange={(e) => setAddList(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAddList()}
            />
          </div>
        </div>

        <DragOverlay>
          {activeTask && <SortableTaskCard {...activeTask} />}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
