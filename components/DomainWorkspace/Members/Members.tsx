"use client";
import { useForm, FormProvider } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, Users, Search } from "lucide-react";
import { MemberCard } from "./MemberCard";
import InviteMemberDialog from "./InviteWorkspaceMembersDialog";

const MOCK_USERS = [
  {
    id: "1",
    name: "Michael Walker",
    handle: "michaelwalker",
    lastActive: "January 2026",
    avatar: "/api/placeholder/40/40",
  },
  {
    id: "2",
    name: "Sarah Jenkins",
    handle: "sjenks",
    lastActive: "January 2026",
    avatar: "/api/placeholder/40/40",
  },
  {
    id: "3",
    name: "David Chen",
    handle: "dchen_dev",
    lastActive: "December 2025",
    avatar: "/api/placeholder/40/40",
  },
];

export default function MembersPage() {
  const methods = useForm();

  return (
    <FormProvider {...methods}>
      <div className="mx-auto p-8 space-y-8 bg-[#FDFDFD] min-h-screen">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Members</h1>
            <p className="text-sm text-slate-500 mt-1">
              🏠 / Domain Workspace / Members
            </p>
          </div>

          <InviteMemberDialog />
        </div>

        <div className="p-6 border rounded-xl bg-white shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <h2 className="text-xl font-semibold">Workspace members</h2>
            <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-sm">
              3
            </span>
          </div>
          <p className="text-slate-500 text-sm">
            Workspace members can view and join all Workspace visible boards and
            create new boards in the Workspace. Adding new members will
            automatically update your billing.
          </p>
        </div>

        {/* Invite Link Box */}
        <div className="p-6 border rounded-xl bg-white shadow-sm flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold mb-2">
              Invite members to join you
            </h2>
            <p className="text-slate-500 text-sm">
              Anyone with an invite link can join this Workspace, subject to
              restrictions set by your Workspace admin. You`ll be billed for
              each member that joins.
            </p>
          </div>
          <Button
            variant="outline"
            className="border-[#FF6B35] text-[#FF6B35] hover:bg-[#FFF5F1]">
            <Link className="mr-2 h-4 w-4" /> Invite with link
          </Button>
        </div>

        {/* Filter Search */}
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input placeholder="Filter by name" className="pl-10" />
        </div>

        {/* Members List */}
        <div className="space-y-4">
          {MOCK_USERS.map((user) => (
            <MemberCard key={user.id} member={user} />
          ))}
        </div>
      </div>
    </FormProvider>
  );
}
