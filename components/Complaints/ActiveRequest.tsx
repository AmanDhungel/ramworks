import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, Filter, Clock, ArrowRight } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function ActiveRequests() {
  const activeItems = [
    {
      id: "MNT-2024-001",
      title: "Leaking Kitchen Faucet",
      property: "Sunset Apartments - Unit 304",
      priority: "High",
      status: "In Progress",
      progress: 70,
      updated: "2 hours ago",
      category: "Plumbing",
      submitted: "2024-01-15",
      expectedResolution: "2024-01-20",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search by ID, title or property..."
            className="pl-10 bg-white"
          />
        </div>
        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" /> Filter
        </Button>
      </div>

      <div className="space-y-4">
        {activeItems.map((item) => (
          <Card
            key={item.id}
            className="p-6  hover:shadow-md transition-shadow cursor-pointer border-slate-100">
            <div className="flex justify-between items-start">
              <div className="space-y-3 flex-1">
                <div className="flex items-center gap-3">
                  <Badge className="bg-red-500 hover:bg-red-600 font-bold">
                    {item.priority}
                  </Badge>
                  <Badge
                    variant="outline"
                    className="text-orange-500 border-orange-200 bg-orange-50/30">
                    {item.status}
                  </Badge>
                </div>

                <div>
                  <h3 className="text-[15px] font-bold text-slate-400">
                    {item.title}
                  </h3>
                  <span className="text-xs font-bold text-slate-400 mb-4">
                    {item.id}
                  </span>
                  <div className="w-full flex-1 flex justify-between">
                    <div className="flex flex-col w-full">
                      <div>
                        <p className="text-[15px] text-slate-400 font-medium mt-4">
                          Property
                        </p>
                        <p className="text-sm text-slate-500 font-medium">
                          {item.property}
                        </p>
                      </div>
                      <div>
                        <p className="text-[15px] text-slate-400 font-medium mt-4">
                          Submitted
                        </p>
                        <p className="text-sm text-slate-500 font-medium">
                          {item.submitted}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col ">
                      <div>
                        <p className="text-[15px] text-slate-400 font-medium mt-4">
                          Category
                        </p>
                        <p className="text-sm text-slate-500 font-medium">
                          {item.category}
                        </p>
                      </div>

                      <div>
                        <p className="text-[15px] text-nowrap text-slate-400 font-medium mt-4">
                          Expected Resolution
                        </p>
                        <p className="text-sm text-slate-500 font-medium">
                          {item.expectedResolution}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className=" space-y-2">
                  <span className="text-slate-400 text-[15px]">Progress</span>
                  <Progress
                    value={item.progress}
                    className="w-full h-2 bg-slate-200"
                  />

                  <div className="flex gap-3 mt-4">
                    <Avatar>
                      <AvatarImage
                        src={
                          "https://www.pexels.com/photo/fashionable-woman-in-sunglasses-outdoor-portrait-35130806/"
                        }
                        alt="Service Provider Avatar"
                      />
                      <AvatarFallback>SP</AvatarFallback>
                    </Avatar>
                    <h1 className="flex flex-col">
                      John Doe{" "}
                      <p className="text-sm text-slate-400">Service Provider</p>
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
