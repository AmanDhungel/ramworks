import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useUpdateParams } from "@/helper/removeparam";
import { useCreateComment } from "@/services/comment.service";
import { Bold, Italic, Link, Pencil, Trash2 } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";

export function CommentsTab() {
  const { getParam } = useUpdateParams();
  const params = useParams();
  const [comment, setComment] = useState("");
  const boardParam = params.board;
  const board =
    typeof boardParam === "string"
      ? boardParam
      : (boardParam?.[0] ?? undefined);

  console.log("Board:", board);
  const taskListId = getParam("tasklistId") ?? "";
  const taskId = getParam("task") ?? "";
  const { mutate } = useCreateComment();

  const handleComment = () => {
    const data = new FormData();
    data.append("board", board ?? "");
    data.append("task_list", taskListId ?? "");
    data.append("task", taskId ?? "");
    data.append("comment", comment);
    mutate(data, {
      onSuccess: () => {
        setComment("");
      },
    });
  };
  const comments = [
    {
      id: 1,
      name: "John Doe",
      time: "5 min ago",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
      img: "/api/placeholder/40/40",
    },
    {
      id: 2,
      name: "Jane Doe",
      time: "5 min ago",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
      img: "/api/placeholder/40/40",
    },
  ];

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">Comments and activity</h2>

      {/* Input Area */}
      <div className="border-2 border-blue-400 rounded-xl p-4 bg-white">
        <Textarea
          className="border-none focus-visible:ring-0 min-h-[100px] resize-none"
          placeholder="Write a comment..."
          onChange={(e) => setComment(e.target.value)}
        />
        <div className="flex justify-between items-center mt-4 pt-4 border-t">
          <div className="flex gap-4 text-gray-500">
            <Bold className="w-5 h-5 cursor-pointer" />
            <Italic className="w-5 h-5 cursor-pointer" />
            <Link className="w-5 h-5 cursor-pointer" />
          </div>
          <Button
            className="bg-blue-600 hover:bg-blue-700 px-8"
            onClick={handleComment}>
            Comment
          </Button>
        </div>
      </div>

      {/* List */}
      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment.id} className="flex gap-4">
            <Avatar>
              <AvatarImage src={comment.img} />
              <AvatarFallback>{comment.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h4 className="font-bold">{comment.name}</h4>
              <p className="text-gray-600 mt-1">{comment.text}</p>
              <div className="flex items-center gap-3 mt-2 text-sm text-gray-400">
                <span>{comment.time}</span>
                <Pencil className="w-4 h-4 cursor-pointer" />
                <Trash2 className="w-4 h-4 cursor-pointer text-red-400" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
