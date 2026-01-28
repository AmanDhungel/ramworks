"use client";
import React, { useState, useMemo } from "react";
import {
  Search,
  Home,
  Plus,
  MoreHorizontal,
  ChevronRight,
  Eye,
  Users,
  Settings,
  Edit2,
  Loader2,
} from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { CreateNewBoard } from "./CreateNewBoard";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useGetBoard } from "@/services/board.service";
import useDialogOpen from "@/context/Dialog";
import { useUpdateParams } from "@/helper/removeparam";

interface Board {
  _id: string;
  title: string;
  image: string;
  urlId: string;
  urlVendor: string;
}

const BoardCard = ({ board }: { board: Board }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { setIsOpen } = useDialogOpen();
  // const { setParam } = useUpdateParams();
  const router = useRouter();
  const params = useParams();

  return (
    <div className="group relative cursor-pointer min-w-sm">
      <Card className="overflow-hidden border-none shadow-sm rounded-2xl bg-white ring-1 ring-slate-200">
        <div className="relative h-36 w-full overflow-hidden">
          <Image
            width={500}
            height={500}
            src={
              (board.image.length > 0 &&
                process.env.NEXT_PUBLIC_API_URL + board.image[0]) ||
              "/placeholder-image.png"
            }
            alt={board.title}
            className="h-full w-full object-cover"
            onClick={() =>
              router.push(
                `/domain-workspace/${params.id}/${params.vendors}/${board._id}`,
              )
            }
          />

          <div className="absolute top-3 right-3 flex items-center transition-all duration-200">
            {isMenuOpen ? (
              <div className="flex items-center gap-1 rounded-lg bg-white/90 backdrop-blur-md p-1 shadow-sm border border-slate-200">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 text-slate-600 hover:bg-slate-100"
                  onClick={() => setIsMenuOpen(false)}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 text-slate-600 hover:bg-slate-100">
                  <Eye className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 text-slate-600 hover:bg-slate-100">
                  <Users className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 text-slate-600 hover:bg-slate-100"
                  onClick={() => {
                    setIsOpen();
                    // setParam({
                    //   board: board._id,
                    // });
                  }}>
                  <Edit2 className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 text-slate-600 hover:bg-slate-100">
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <Button
                variant="secondary"
                className="h-8 w-12 bg-white/90 backdrop-blur hover:bg-white shadow-sm"
                onClick={() => setIsMenuOpen(true)}>
                <MoreHorizontal className="h-4 w-4 text-slate-700" />
              </Button>
            )}
          </div>
        </div>

        <CardContent className="p-4 bg-white">
          <p className="text-sm font-bold text-slate-800 tracking-tight">
            {board.title}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default function VendorDashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const { id, vendors } = useParams();
  const vendor = useSearchParams().get("vendor");
  const { data, isFetching } = useGetBoard(vendor ?? "");

  const filteredBoards = useMemo(() => {
    return (data?.data ?? [])
      .map((board: any) => ({
        _id: board._id,
        title: board.title,
        image: board.background_images ?? "/placeholder-image.png",
        urlId: board.urlId ?? "",
        urlVendor: board.urlVendor ?? "",
      }))
      .filter((board: Board) =>
        board.title.toLowerCase().includes(searchQuery.toLowerCase()),
      );
  }, [searchQuery, data?.data]);

  return (
    <div className="flex flex-col min-h-screen bg-white p-8 space-y-8">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Vendor Name
        </h1>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/" className="flex items-center">
                <Home className="h-4 w-4" />
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Workspace</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="#" className="capitalize">
                {id} Workspace
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="capitalize font-medium text-slate-900">
                {vendors}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-semibold text-slate-800">Boards</h2>
          <Badge
            variant="secondary"
            className="rounded-md bg-slate-100 px-2 text-slate-600 border-none">
            {data?.data.length}
          </Badge>
        </div>

        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input
            placeholder="Search boards..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 bg-slate-50/50 border-slate-200"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-col-2 xl:grid-col-2 gap-10">
        {isFetching ? (
          <Loader2 className="animate-spin" />
        ) : (
          <>
            {filteredBoards &&
              filteredBoards.map((board, index) => (
                <BoardCard key={`${board._id}-${index}`} board={board} />
              ))}
            <CreateNewBoard />
          </>
        )}
      </div>
    </div>
  );
}
