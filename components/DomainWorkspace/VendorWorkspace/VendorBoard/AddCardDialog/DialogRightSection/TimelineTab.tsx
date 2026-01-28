import { Badge } from "@/components/ui/badge";
import { AddTimelineDialog } from "./AddTimeline";
import { useGetTimeLine } from "@/services/timeline.service";
import { useUpdateParams } from "@/helper/removeparam";
import { useParams } from "next/navigation";
import { Clock, CirclePlay, CircleCheckBig, CircleX } from "lucide-react";
import Image from "next/image";
import { format } from "date-fns";
import { useGetContact } from "@/services/contact.service";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const statusConfig = {
  scheduled: {
    icon: Clock,
    className: "bg-blue-500/10 text-blue-500",
    label: "Scheduled",
  },
  confirmed: {
    icon: Clock,
    className: "bg-blue-500/10 text-blue-500",
    label: "Confirmed",
  },
  in_progress: {
    icon: CirclePlay,
    className: "bg-purple-500/10 text-purple-500",
    label: "In Progress",
  },
  completed: {
    icon: CircleCheckBig,
    className: "bg-green-500/10 text-green-500",
    label: "Completed",
  },
  canceled: {
    icon: CircleX,
    className: "bg-red-500/10 text-red-500",
    label: "Canceled",
  },
};

export function TimelineTab() {
  const { getParam } = useUpdateParams();
  const { data: contacts } = useGetContact();
  const params = useParams();
  const boardParam = params.board;
  const board =
    typeof boardParam === "string"
      ? boardParam
      : (boardParam?.[0] ?? undefined);

  console.log("Board:", board);
  const taskListId = getParam("tasklistId") ?? "";
  const taskId = getParam("task") ?? "";
  const { data } = useGetTimeLine({
    board_id: board ?? "",
    task_list_id: taskListId,
    task_id: taskId,
  });

  console.log("Timeline Data:", data);
  return (
    <div className="border rounded-xl p-6 bg-white">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl font-bold text-slate-800">
          Maintenance Details
        </h2>
        <AddTimelineDialog
          board={board ?? ""}
          taskListId={taskListId}
          taskId={taskId}
        />
      </div>

      <div className="space-y-0">
        {data?.data.length === 0 ? (
          <div>No timeline Added Till Now</div>
        ) : (
          data?.data.map((item) => {
            const config =
              statusConfig[item.status as keyof typeof statusConfig];
            const StatusIcon = config.icon;

            return (
              <div key={item._id} className="relative flex gap-4">
                <div className="absolute left-6 top-10 bottom-[-24px] w-px bg-slate-200 last:hidden" />

                <div
                  className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center z-10 ${config.className}`}>
                  <StatusIcon className="w-6 h-6" />
                </div>

                <div className="flex-1 pb-8">
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <h4 className="font-bold text-slate-900 capitalize">
                        {item.status.replace("_", " ")}
                      </h4>
                      <p className="text-xs text-slate-500">
                        {format(new Date(item.date), "MMM dd, yyyy")}
                      </p>
                    </div>

                    <div className="flex -space-x-2">
                      {item.members.map((memberId: string) => {
                        // 1. Find the member details from your contact data
                        const member = contacts?.data?.find(
                          (m) => m._id === memberId,
                        );

                        // 2. Extract initials (e.g., "John Doe" -> "JD")
                        const initials = member?.name
                          ? member.name
                              .split(" ")
                              .map((n: string) => n[0])
                              .join("")
                              .toUpperCase()
                              .slice(0, 2)
                          : "U";

                        return (
                          <Avatar
                            key={memberId}
                            className="w-7 h-7 border-2 border-white shadow-sm ring-offset-background transition-transform hover:scale-110 hover:z-10">
                            <AvatarImage
                              src={member?.name}
                              alt={member?.name}
                            />
                            <AvatarFallback className="bg-orange-100 text-orange-600 text-[10px] font-bold">
                              {initials}
                            </AvatarFallback>
                          </Avatar>
                        );
                      })}
                    </div>
                  </div>

                  {item.description && (
                    <p className="text-sm text-slate-600 mt-2 bg-slate-50 p-3 rounded-lg border border-slate-100">
                      {item.description}
                    </p>
                  )}

                  {item.attachments && item.attachments.length > 0 && (
                    <div className="flex gap-2 mt-3 overflow-x-auto pb-2">
                      {item.attachments.map((path: string, idx: number) => (
                        <div
                          key={idx}
                          className="relative w-5 h-5 rounded-md border border-slate-200 overflow-hidden flex-shrink-0 bg-white">
                          <Image
                            src={process.env.NEXT_PUBLIC_API_URL + path}
                            alt="attachment"
                            className="w-full h-full object-cover"
                            width={100}
                            height={100}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
