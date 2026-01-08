import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronDown, ChevronUp, X, Layout } from "lucide-react";
import { PermissionsTable } from "./MembersPermission";
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";

interface MemberProps {
  id: string;
  name: string;
  handle: string;
  lastActive: string;
  avatar: string;
}

export function MemberCard({ member }: { member: MemberProps }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-4">
      <div className="flex items-center justify-between p-4 bg-white border rounded-t-lg shadow-sm">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={member.avatar} />
            <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-bold text-slate-800">{member.name}</p>
            <p className="text-sm text-slate-500">
              @{member.handle} • Last active {member.lastActive}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Select defaultValue="admin">
            <SelectTrigger className="w-[180px] bg-slate-50 border-slate-200">
              <SelectValue placeholder="Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="member">Member</SelectItem>
              <SelectItem value="viewer">Viewer</SelectItem>
            </SelectContent>
          </Select>

          <Button className="bg-[#FF6B35] hover:bg-[#e85a2a] text-white">
            View boards (2)
          </Button>

          <Button
            onClick={() => setIsOpen(!isOpen)}
            className="bg-[#FF6B35] hover:bg-[#e85a2a] text-white flex gap-2">
            Permissions{" "}
            {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </Button>

          <Button variant="destructive" className="flex gap-1">
            <X size={16} /> Leave...
          </Button>
        </div>
      </div>

      <Collapsible open={isOpen}>
        <CollapsibleContent className="border-x border-b p-4 bg-slate-50 rounded-b-lg">
          <PermissionsTable userId={member.id} />
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
