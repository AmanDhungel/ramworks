import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bold, Italic, Link2 } from "lucide-react";

export default function CommentsSection() {
  const [comment, setComment] = useState("");
  const queryClient = useQueryClient();

  const commentMutation = useMutation({
    mutationFn: async (text: string) => {
      // Simulate API call
      return new Promise((resolve) =>
        setTimeout(() => resolve({ id: Date.now(), text }), 500)
      );
    },
    onSuccess: () => {
      setComment("");
      queryClient.invalidateQueries({ queryKey: ["comments"] });
    },
  });

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Comments and activity</h2>

      <div className="border rounded-lg p-3 space-y-3 bg-white focus-within:ring-2 ring-blue-500">
        <Textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write a comment..."
          className="border-none focus-visible:ring-0 p-0 resize-none min-h-[80px]"
        />
        <div className="flex justify-between items-center border-t pt-2">
          <div className="flex gap-3 text-slate-400">
            <Bold className="w-4 h-4 cursor-pointer hover:text-black" />
            <Italic className="w-4 h-4 cursor-pointer hover:text-black" />
            <Link2 className="w-4 h-4 cursor-pointer hover:text-black" />
          </div>
          <Button
            disabled={!comment || commentMutation.isPending}
            onClick={() => commentMutation.mutate(comment)}
            className="bg-blue-500 hover:bg-blue-600 px-6">
            {commentMutation.isPending ? "Posting..." : "Comment"}
          </Button>
        </div>
      </div>

      <div className="space-y-6 pt-4">
        <CommentItem
          name="John Doe"
          time="5 min ago"
          text="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        />
        <CommentItem
          name="Jane Doe"
          time="5 min ago"
          text="Quisque vulputate ligula est, quis egestas felis molestie at."
        />
      </div>
    </div>
  );
}

function CommentItem({
  name,
  time,
  text,
}: {
  name: string;
  time: string;
  text: string;
}) {
  return (
    <div className="flex gap-3">
      <Avatar className="h-10 w-10">
        <AvatarImage src="https://github.com/shadcn.png" />
      </Avatar>
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span className="font-bold text-sm">{name}</span>
        </div>
        <p className="text-sm text-slate-600">{text}</p>
        <div className="flex gap-3 text-[10px] text-slate-400 uppercase font-bold pt-1">
          <span>{time}</span>
          <button className="hover:underline">Edit</button>
          <button className="hover:underline text-red-400">Delete</button>
        </div>
      </div>
    </div>
  );
}
