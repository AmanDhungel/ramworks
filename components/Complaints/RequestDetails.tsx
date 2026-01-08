import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function RequestDetails() {
  return (
    <div className="space-y-8">
      {/* Header Info */}
      <Card className="p-8">
        <div className="flex justify-between items-start mb-6">
          <div>
            <div className="flex gap-2 mb-2">
              <Badge className="bg-red-500">High</Badge>
              <Badge
                variant="outline"
                className="text-orange-500 border-orange-200">
                In Progress
              </Badge>
            </div>
            <h2 className="text-xl font-bold text-slate-800">
              Leaking Kitchen Faucet
            </h2>
            <p className="text-xs text-slate-400 font-bold">MNT-2024-001</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-slate-400 font-bold">Category</p>
            <p className="font-bold text-slate-800">Plumbing</p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-xs font-bold">
            <span className="text-slate-400">Progress</span>
            <span className="text-orange-500">70%</span>
          </div>
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div
              className="bg-orange-500 h-full"
              style={{ width: "70%" }}></div>
          </div>
        </div>
      </Card>

      {/* Timeline Section */}
      <Card className="p-8">
        <h3 className="font-bold text-slate-900 mb-8">Issue Timeline</h3>
        <div className="space-y-10 relative">
          <TimelineItem
            status="Submitted"
            date="2024-01-15 09:30 AM"
            user="John Doe (Tenant)"
            type="Tenant"
            icon="➤"
          />
          <TimelineItem
            status="Under Review"
            date="2024-01-15 10:15 AM"
            user="Sarah Johnson"
            type="Property Manager"
            icon="👁"
          />
          <TimelineItem
            status="In Progress"
            date="2024-01-15 10:15 AM"
            user="Tom Wilson"
            type="Service Provider"
            icon="↻"
          />
        </div>
      </Card>

      {/* Comments Section */}
      <Card className="p-8 space-y-6">
        <h3 className="font-bold text-slate-900">Comments & Updates</h3>
        <CommentItem
          user="Sarah Johnson"
          role="Property Manager"
          time="2024-01-15 02:50 PM"
          text="We have contacted a plumber. They will visit tomorrow morning."
        />

        <div className="pt-6 border-t flex flex-col gap-4">
          <Input
            className="bg-slate-50 h-12"
            placeholder="Ask a question or provide additional info..."
          />
          <Button className="bg-orange-500 w-full h-12 font-bold">
            Send Comment
          </Button>
        </div>
      </Card>
    </div>
  );
}

function TimelineItem({ status, date, user, type, icon }: any) {
  return (
    <div className="flex justify-between items-start gap-4">
      <div className="flex gap-4">
        <div className="h-8 w-8 bg-slate-50 rounded-full flex items-center justify-center text-blue-500 border border-slate-100">
          {icon}
        </div>
        <div>
          <p className="font-bold text-slate-800 text-sm">{status}</p>
          <div className="flex gap-2 mt-1">
            <span className="text-xs bg-slate-100 px-2 py-0.5 rounded text-slate-600 font-medium">
              {user}
            </span>
            <span className="text-[10px] text-slate-400 border px-1 rounded uppercase tracking-tighter">
              {type}
            </span>
          </div>
        </div>
      </div>
      <span className="text-[10px] font-bold text-slate-400">{date}</span>
    </div>
  );
}

function CommentItem({ user, role, time, text }: any) {
  return (
    <div className="flex justify-between">
      <div className="flex gap-3">
        <div className="h-10 w-10 bg-slate-200 rounded-full"></div>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800 text-sm">{user}</span>
            <span className="text-[10px] text-slate-400 uppercase">{role}</span>
          </div>
          <p className="text-sm text-slate-600 mt-1">{text}</p>
        </div>
      </div>
      <span className="text-[10px] font-bold text-slate-400">{time}</span>
    </div>
  );
}
