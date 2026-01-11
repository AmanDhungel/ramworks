"use client";
import { useState, useMemo, useEffect, useCallback } from "react";
import {
  Search,
  MoreHorizontal,
  ChevronRight,
  Users,
  Edit,
  Settings,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import CreateWorkspaceDialog from "./CreateDomainWorkspaceDialog";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useGetWorkspace } from "@/services/workspace.service";
import Loading from "../Loading";
import useDialogOpen from "@/context/Dialog";

const DOMAINS = [
  {
    id: 1,
    title: "HVAC",
    image:
      "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400&q=80",
  },
  {
    id: 2,
    title: "Plumbing",
    image:
      "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=400&q=80",
  },
  {
    id: 3,
    title: "Electrical",
    image:
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&q=80",
  },
  {
    id: 4,
    title: "Painting",
    image:
      "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=400&q=80",
  },
  {
    id: 5,
    title: "Cleaning",
    image:
      "https://images.unsplash.com/photo-1581578731522-745d05ad9a2d?w=400&q=80",
  },
  {
    id: 6,
    title: "Landscaping",
    image:
      "https://images.unsplash.com/photo-1592419044706-39796d40f98c?w=400&q=80",
  },
  {
    id: 7,
    title: "Carpentry",
    image:
      "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=400&q=80",
  },
  {
    id: 8,
    title: "Elevator",
    image:
      "https://images.unsplash.com/photo-1541888946425-d81bb19480c5?w=400&q=80",
  },
  {
    id: 9,
    title: "Roofing",
    image:
      "https://images.unsplash.com/photo-1632759162353-194941ee24fd?w=400&q=80",
  },
  {
    id: 10,
    title: "Flooring",
    image:
      "https://images.unsplash.com/photo-1581850518616-bcb8190ce241?w=400&q=80",
  },
  {
    id: 11,
    title: "Windows & Doors",
    image:
      "https://images.unsplash.com/photo-1503708995433-f12d4c0f477d?w=400&q=80",
  },
  {
    id: 12,
    title: "Appliance Repair",
    image:
      "https://images.unsplash.com/photo-1581092921461-7d6550774c42?w=400&q=80",
  },
];

export default function DomainWorkspace() {
  const { setIsOpen } = useDialogOpen();
  const [search, setSearch] = useState("");
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  const handleOpenEdit = (id: string) => {
    router.push(pathname + "?" + createQueryString("id", id), {
      scroll: false,
    });

    setIsOpen();
  };

  const { data: workspace, isLoading } = useGetWorkspace();

  const filteredDomains = useMemo(() => {
    if (!isLoading) {
      return workspace?.data?.filter(
        (domain) =>
          search.toLowerCase() === "" ||
          domain.title.toLowerCase().includes(search.toLowerCase())
      );
    }
  }, [search, workspace?.data, isLoading]);

  return (
    <div className="p-8 w-full mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Domain Workspace</h1>
          <p className="text-sm text-muted-foreground">/ Domain Workspace</p>
        </div>
        <CreateWorkspaceDialog />
      </div>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="flex justify-between items-center border-b pb-4">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-semibold">Workspaces</h2>
              <span className="bg-gray-100 px-2 py-0.5 rounded text-sm text-gray-600">
                {filteredDomains?.length}
              </span>
            </div>
            <div className="relative w-72">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search"
                className="pl-8"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredDomains?.map((item) => (
              <Card
                key={item._id}
                className="relative overflow-hidden group h-48 rounded-xl">
                <Image
                  width={500}
                  height={500}
                  src={`${process.env.NEXT_PUBLIC_API_URL}/${
                    item.image ? item.image : ""
                  }`}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform group-hover:scale-105 cursor-pointer"
                />
                <div
                  className="absolute inset-0 bg-black/20 cursor-pointer"
                  onClick={() =>
                    router.push(
                      `/domain-workspace/${item.title
                        .split(" ")
                        .join("-")
                        .toLowerCase()}?id=${item._id}`
                    )
                  }
                />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-3 py-1 rounded-md flex items-center gap-2">
                  <span className="text-xs font-bold text-gray-800 uppercase tracking-wide">
                    {item.title}
                  </span>
                </div>
                <div className="absolute top-3 right-3">
                  {openMenuId === item._id ? (
                    <div className="bg-white/90 backdrop-blur rounded-md flex items-center p-1 shadow-lg animate-in slide-in-from-right-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 cursor-pointer"
                        onClick={() => {
                          setOpenMenuId(null);
                        }}>
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 cursor-pointer"
                        onClick={() => {
                          router.push("/domain-workspace/members");
                        }}>
                        <Users className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 cursor-pointer"
                        onClick={() => handleOpenEdit(item._id)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w- cursor-pointer"
                        onClick={() => {
                          router.push("/domain-workspace/settings");
                        }}>
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <Button
                      variant="secondary"
                      size="icon"
                      className="h-8 w-8 bg-white/80"
                      onClick={() => {
                        setOpenMenuId(item._id);
                      }}>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
