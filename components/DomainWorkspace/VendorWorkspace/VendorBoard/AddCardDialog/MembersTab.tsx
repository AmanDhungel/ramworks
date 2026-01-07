import { useFormContext } from "react-hook-form";
import { TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const MOCK_USERS = [
  { id: "1", name: "John Doe", img: "https://github.com/shadcn.png" },
  { id: "2", name: "Jane Doe", img: "https://github.com/shadcn.png" },
];

export default function MembersTab() {
  const { watch, setValue } = useFormContext();
  const selectedMembers = watch("members") || [];

  const toggleMember = (id: string) => {
    const next = selectedMembers.includes(id)
      ? selectedMembers.filter((m: string) => m !== id)
      : [...selectedMembers, id];
    setValue("members", next);
  };

  return (
    <TabsContent value="members" className="space-y-4">
      <div className="space-y-4">
        <h3 className="font-bold">Members</h3>
        <div className="space-y-2">
          {/* {MOCK_USERS.filter((u) => selectedMembers.includes(u.id)).map(
            (user) => (
              <div
                key={user.id}
                className="flex items-center justify-between p-2 bg-slate-50 rounded">
                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={user.img} />
                  </Avatar>
                  <span className="text-sm">{user.name}</span>
                </div>
                <Button
                  variant="destructive"
                  onClick={() => toggleMember(user.id)}>
                  Remove
                </Button>
              </div>
            )
          )} */}
        </div>

        <div className="space-y-2 pt-4">
          <p className="text-sm font-bold">Search Members</p>
          <Input placeholder="Search" className="bg-slate-50 border-none" />
          <div className="space-y-1">
            {MOCK_USERS.map((user) => (
              <div
                key={user.id}
                onClick={() => toggleMember(user.id)}
                className="flex items-center gap-2 p-2 hover:bg-slate-100 cursor-pointer rounded">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={user.img} />
                </Avatar>
                <span className="text-sm">{user.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </TabsContent>
  );
}
