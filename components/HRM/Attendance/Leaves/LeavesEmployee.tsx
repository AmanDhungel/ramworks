"use client";

import React from "react";
import {
  Pencil,
  MessageSquare,
  Phone,
  Mail,
  MapPin,
  Calendar,
  ShieldCheck,
  User,
  Globe,
  ChevronDown,
  Briefcase,
  GraduationCap,
  Copy,
  ChevronLeft,
  Plus,
  MoreVertical,
  Clock,
  Download,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

export default function EmployeeProfile() {
  return (
    <div className="p-6 bg-[#F8F9FA] min-h-screen font-sans text-slate-900">
      {/* Header Navigation */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2 text-sm font-bold text-slate-700 cursor-pointer">
          <ChevronLeft className="h-4 w-4" /> Employee Details
        </div>
        <Button className="bg-[#FF6B35] hover:bg-[#E85A20] gap-2 rounded-md px-6">
          <Plus className="h-4 w-4 border rounded-full p-0.5" /> Bank &
          Statutory
        </Button>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* LEFT COLUMN: Personal Meta & Info */}
        <div className="col-span-12 lg:col-span-3 space-y-6">
          {/* Main Identity Card */}
          <Card className="border-none shadow-sm overflow-hidden">
            <div className="h-28 bg-gradient-to-r from-orange-400 to-orange-500 relative">
              <div className="absolute -bottom-12 left-1/2 -translate-x-1/2">
                <div className="relative">
                  <Avatar className="h-24 w-24 border-4 border-white shadow-lg">
                    <AvatarImage src="/api/placeholder/100/100" />
                    <AvatarFallback>SP</AvatarFallback>
                  </Avatar>
                  <div className="absolute bottom-1 right-1 h-6 w-6 bg-emerald-500 border-4 border-white rounded-full flex items-center justify-center">
                    <ShieldCheck className="h-3 w-3 text-white" />
                  </div>
                </div>
              </div>
            </div>
            <CardContent className="pt-16 pb-6 px-6 text-center">
              <h2 className="text-xl font-bold flex items-center justify-center gap-1.5">
                Stephan Peralt{" "}
                <ShieldCheck className="h-4 w-4 text-emerald-500 fill-emerald-500/20" />
              </h2>
              <div className="flex flex-wrap justify-center gap-2 mt-2 mb-8">
                <Badge
                  variant="secondary"
                  className="bg-slate-100 text-slate-500 font-bold border-none px-3 py-1">
                  ● Software Developer
                </Badge>
                <Badge
                  variant="secondary"
                  className="bg-blue-50 text-blue-600 font-bold border-none px-3 py-1">
                  10+ years of Experience
                </Badge>
              </div>

              <div className="space-y-4 text-left">
                {[
                  {
                    icon: <Briefcase size={16} />,
                    label: "Employee ID",
                    val: "EMP-0001",
                  },
                  {
                    icon: <User size={16} />,
                    label: "Team",
                    val: "UI/UX Design",
                  },
                  {
                    icon: <Calendar size={16} />,
                    label: "Date Of Join",
                    val: "1st Jan 2023",
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center text-sm">
                    <span className="text-slate-400 font-medium flex items-center gap-2">
                      {item.icon} {item.label}
                    </span>
                    <span className="font-bold">{item.val}</span>
                  </div>
                ))}
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-400 font-medium flex items-center gap-2">
                    <Briefcase size={16} /> Report Office
                  </span>
                  <div className="flex items-center gap-2 font-bold">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src="/api/placeholder/24/24" />
                    </Avatar>
                    Doglas Martini
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-8">
                <Button
                  variant="outline"
                  className="border-slate-800 text-slate-800 font-bold h-11 border-2">
                  <Pencil size={16} className="mr-2" /> Edit Info
                </Button>
                <Button className="bg-[#FF6B35] hover:bg-[#E85A20] font-bold h-11">
                  <MessageSquare size={16} className="mr-2" /> Message
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Basic Information */}
          <SidebarInfoCard
            title="Basic information"
            data={[
              {
                icon: <Phone size={14} />,
                label: "Phone",
                val: "+1 458 7877 879",
              },
              {
                icon: <Mail size={14} />,
                label: "Email",
                val: "perralt12@example.com",
                copy: true,
              },
              { icon: <User size={14} />, label: "Gender", val: "Male" },
              {
                icon: <Calendar size={14} />,
                label: "Birthday",
                val: "24th July 2000",
              },
              {
                icon: <MapPin size={14} />,
                label: "Address",
                val: "1861 Bayonne Ave, Manchester, NJ, 08759",
                multi: true,
              },
            ]}
          />

          {/* Personal Information */}
          <SidebarInfoCard
            title="Personal Information"
            data={[
              {
                icon: <Briefcase size={14} />,
                label: "Passport No",
                val: "QRET4566FGRT",
              },
              {
                icon: <Calendar size={14} />,
                label: "Passport Exp Date",
                val: "15 May 2029",
              },
              {
                icon: <Globe size={14} />,
                label: "Nationality",
                val: "Indian",
              },
              {
                icon: <ShieldCheck size={14} />,
                label: "Religion",
                val: "Christianity",
              },
              { icon: <User size={14} />, label: "Marital status", val: "Yes" },
              {
                icon: <User size={14} />,
                label: "Employment of spouse",
                val: "No",
              },
              { icon: <User size={14} />, label: "No. of children", val: "2" },
            ]}
          />
        </div>

        {/* RIGHT COLUMN: Details & Projects */}
        <div className="col-span-12 lg:col-span-9 space-y-6">
          {/* About Section */}
          <MainContentCard
            title="About Employee"
            description="As an award winning designer, I deliver exceptional quality work and bring value to your brand! With 10 years of experience and 350+ projects completed worldwide with satisfied customers, I developed the 360° brand approach, which helped me to create numerous brands that are relevant, meaningful and loved."
          />

          {/* Bank Info */}
          <MainContentCard
            title="Bank Information"
            gridCols={4}
            data={[
              { label: "Bank name", val: "Swiz International Bank" },
              { label: "Bank account no", val: "159843014641" },
              { label: "IFSC Code", val: "ICI24504" },
              { label: "Branch", val: "Alabama USA" },
            ]}
          />

          {/* Family Info */}
          <MainContentCard
            title="Family Information"
            gridCols={4}
            data={[
              { label: "Name", val: "Hendry Peralt" },
              { label: "Relationship", val: "Brother" },
              { label: "Date of birth", val: "25 May 2014" },
              { label: "Phone", val: "+1 265 6956 961" },
            ]}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TimelineCard
              title="Education Details"
              icon={<GraduationCap />}
              items={[
                {
                  title: "Oxford University",
                  sub: "Computer Science",
                  date: "2020 - 2022",
                },
                {
                  title: "Cambridge University",
                  sub: "Computer Network & Systems",
                  date: "2016- 2019",
                },
                { title: "Oxford School", sub: "Grade X", date: "2012 - 2016" },
              ]}
            />
            <TimelineCard
              title="Experience"
              icon={<Briefcase />}
              items={[
                {
                  title: "Google",
                  sub: "UI/UX Developer",
                  date: "Jan 2013 - Present",
                  badge: true,
                },
                {
                  title: "Salesforce",
                  sub: "Web Developer",
                  date: "Dec 2012- Jan 2015",
                  badge: true,
                },
                {
                  title: "HubSpot",
                  sub: "Product Desiger",
                  date: "Dec 2011- Jan 2012",
                  badge: true,
                },
              ]}
            />
          </div>

          {/* Tabs Section */}
          <div className="pt-4">
            <Tabs defaultValue="projects" className="w-full">
              <TabsList className="bg-transparent h-auto p-0 mb-6 gap-8 border-b w-full justify-start rounded-none">
                <TabsTrigger
                  value="projects"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#FF6B35] data-[state=active]:text-[#FF6B35] data-[state=active]:bg-transparent px-0 pb-3 font-bold">
                  Projects
                </TabsTrigger>
                <TabsTrigger
                  value="assets"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#FF6B35] data-[state=active]:text-[#FF6B35] data-[state=active]:bg-transparent px-0 pb-3 font-bold text-slate-400">
                  Assets
                </TabsTrigger>
              </TabsList>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    title: "World Health",
                    tasks: 1,
                    comp: 9,
                    deadline: "22 Aug 2025",
                    lead: "Young",
                    color: "text-blue-600 bg-blue-50",
                  },
                  {
                    title: "Hospital Administration",
                    tasks: 8,
                    comp: 15,
                    deadline: "31 July 2025",
                    lead: "Leona",
                    color: "text-indigo-600 bg-indigo-50",
                  },
                  {
                    title: "Video Calling App",
                    tasks: 22,
                    comp: 15,
                    deadline: "16 Jan 2025",
                    lead: "Mathis",
                    color: "text-red-600 bg-red-50",
                  },
                ].map((p, i) => (
                  <Card
                    key={i}
                    className="border border-slate-100 shadow-sm p-5">
                    <div className="flex items-center gap-3 mb-6">
                      <div
                        className={`h-12 w-12 rounded-full flex items-center justify-center ${p.color}`}>
                        <Globe size={24} />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-800">{p.title}</h4>
                        <p className="text-xs text-slate-400 font-medium">
                          {p.tasks} tasks ● {p.comp} Completed
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-between items-end">
                      <div>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight mb-1">
                          Deadline
                        </p>
                        <p className="text-sm font-bold text-slate-800">
                          {p.deadline}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight mb-1">
                          Project Lead
                        </p>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src="/api/placeholder/24/24" />
                          </Avatar>
                          <span className="text-sm font-bold text-slate-800">
                            {p.lead}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- High-Fidelity Sub-Components ---

const SidebarInfoCard = ({ title, data }: any) => (
  <Card className="border-none shadow-sm">
    <CardHeader className="flex flex-row items-center justify-between py-4 px-6 border-b">
      <CardTitle className="text-sm font-bold">{title}</CardTitle>
      <div className="flex gap-2 text-slate-400">
        <Pencil size={14} className="cursor-pointer" />
        <ChevronDown size={14} className="cursor-pointer" />
      </div>
    </CardHeader>
    <CardContent className="p-6 space-y-4">
      {data.map((item: any, i: number) => (
        <div key={i} className="flex justify-between items-start text-sm">
          <span className="text-slate-400 font-medium flex items-center gap-2">
            {item.icon} {item.label}
          </span>
          <span
            className={`font-bold text-right ${item.multi ? "max-w-[150px]" : ""}`}>
            {item.val}{" "}
            {item.copy && (
              <Copy size={12} className="inline ml-1 text-slate-300" />
            )}
          </span>
        </div>
      ))}
    </CardContent>
  </Card>
);

const MainContentCard = ({
  title,
  description,
  gridCols = 1,
  data = [],
}: any) => (
  <Card className="border-none shadow-sm">
    <CardHeader className="flex flex-row items-center justify-between py-4 px-6 border-b">
      <CardTitle className="text-sm font-bold">{title}</CardTitle>
      <div className="flex gap-2 text-slate-400">
        <Pencil size={14} className="cursor-pointer" />
        <ChevronDown size={14} className="cursor-pointer" />
      </div>
    </CardHeader>
    <CardContent className="p-6">
      {description && (
        <p className="text-sm text-slate-500 leading-relaxed font-medium">
          {description}
        </p>
      )}
      {data.length > 0 && (
        <div className={`grid grid-cols-1 md:grid-cols-${gridCols} gap-6`}>
          {data.map((item: any, i: number) => (
            <div key={i}>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">
                {item.label}
              </p>
              <p className="text-sm font-bold text-slate-800">{item.val}</p>
            </div>
          ))}
        </div>
      )}
    </CardContent>
  </Card>
);

const TimelineCard = ({ title, items }: any) => (
  <Card className="border-none shadow-sm">
    <CardHeader className="flex flex-row items-center justify-between py-4 px-6 border-b">
      <CardTitle className="text-sm font-bold">{title}</CardTitle>
      <div className="flex gap-2 text-slate-400">
        <Pencil size={14} className="cursor-pointer" />
        <ChevronDown size={14} className="cursor-pointer" />
      </div>
    </CardHeader>
    <CardContent className="p-6 space-y-6">
      {items.map((item: any, i: number) => (
        <div key={i} className="flex justify-between items-start">
          <div>
            <h5 className="text-sm font-bold text-slate-800">{item.title}</h5>
            {item.badge ? (
              <Badge
                variant="secondary"
                className="mt-1 bg-blue-50 text-blue-600 text-[10px] font-bold px-2 py-0 border-none">
                ● {item.sub}
              </Badge>
            ) : (
              <p className="text-xs text-slate-400 font-medium mt-0.5">
                {item.sub}
              </p>
            )}
          </div>
          <span className="text-xs text-slate-400 font-bold">{item.date}</span>
        </div>
      ))}
    </CardContent>
  </Card>
);
