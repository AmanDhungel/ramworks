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
import { useParams } from "next/navigation";

interface Board {
  id: string;
  title: string;
  image: string;
}

const BoardCard = ({ board }: { board: Board }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="group relative">
      <Card className="overflow-hidden border-none shadow-sm rounded-2xl bg-white ring-1 ring-slate-200">
        <div className="relative h-36 w-full overflow-hidden">
          <Image
            width={500}
            height={500}
            src={board.image}
            alt={board.title}
            className="h-full w-full object-cover"
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
                  className="h-7 w-7 text-slate-600 hover:bg-slate-100">
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

      <Button
        variant="outline"
        size="icon"
        className="absolute -bottom-3 -right-2 h-8 w-8 rounded-full border-slate-200 bg-white shadow-md hover:bg-slate-50">
        <Plus className="h-4 w-4 text-slate-500" />
      </Button>
    </div>
  );
};

export default function VendorDashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const { id, vendors } = useParams();

  const filteredBoards = useMemo(() => {
    const boards: Board[] = [
      {
        id: "1",
        title: "Electrical Layout",
        image:
          "https://images.unsplash.com/photo-1581092162384-8987c1794ed9?auto=format&fit=crop&q=80&w=600",
      },
      {
        id: "2",
        title: "Modern Architecture",
        image:
          "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=600",
      },
    ];
    return boards.filter((board) =>
      board.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

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
            {filteredBoards.length}
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

      <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredBoards.map((board) => (
          <BoardCard key={board.id} board={board} />
        ))}

        <CreateNewBoard />
      </div>
    </div>
  );
}
