import React from "react";
import {
  ChevronLeft,
  Edit2,
  Mail,
  Phone,
  MapPin,
  Calendar,
  User,
  Globe,
  MessageSquare,
  Plus,
  Briefcase,
  GraduationCap,
  Users,
  Landmark,
  CheckCircle2,
  Copy,
  MoreVertical,
  Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function EmployeeDetailsPage() {
  return (
    <div className="min-h-screen bg-[#F8F9FA] p-4 md:p-6 font-sans text-slate-700">
      {/* Top Header Navigation */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ChevronLeft size={18} />
          </Button>
          <h1 className="text-sm font-bold">Employee Details</h1>
        </div>
        <Button className="bg-[#FF6B35] hover:bg-orange-600 text-white font-bold h-9 gap-2 rounded-lg shadow-md">
          <Landmark size={16} /> Bank & Statutory
        </Button>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* LEFT COLUMN - Profile & Basic Info */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          {/* Main Profile Card */}
          <Card className="overflow-hidden border-none shadow-sm">
            <div className="h-24 bg-gradient-to-r from-orange-400 to-orange-600 relative" />
            <CardContent className="pt-0 relative flex flex-col items-center">
              <div className="relative -mt-12 mb-4">
                <Avatar className="h-24 w-24 border-4 border-white shadow-lg">
                  <AvatarImage src="https://i.pravatar.cc/150?u=stephan" />
                  <AvatarFallback>SP</AvatarFallback>
                </Avatar>
                <div className="absolute bottom-1 right-1 bg-white rounded-full p-0.5">
                  <CheckCircle2
                    size={18}
                    className="text-emerald-500 fill-emerald-500 text-white"
                  />
                </div>
              </div>
              <h2 className="text-xl font-bold text-slate-800">
                Stephan Peralt
              </h2>
              <div className="flex gap-2 mt-2">
                <Badge className="bg-slate-100 text-slate-600 hover:bg-slate-100 font-bold text-[10px] px-2 py-0.5 border-none">
                  Software Developer
                </Badge>
                <Badge className="bg-sky-50 text-sky-600 hover:bg-sky-50 font-bold text-[10px] px-2 py-0.5 border-none">
                  10+ years of Experience
                </Badge>
              </div>

              <div className="w-full space-y-3 mt-6 text-xs border-t pt-6">
                <div className="flex justify-between">
                  <span className="text-slate-400">Employee ID</span>
                  <span className="font-bold">EMP-0001</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Team</span>
                  <span className="font-bold">UI/UX Design</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Date Of Join</span>
                  <span className="font-bold text-slate-800">1st Jan 2023</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Report Office</span>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-5 w-5">
                      <AvatarImage src="https://i.pravatar.cc/150?u=doglas" />
                    </Avatar>
                    <span className="font-bold">Doglas Martini</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 w-full mt-6">
                <Button
                  variant="outline"
                  className="border-slate-200 text-slate-700 font-bold h-9 gap-2">
                  <Edit2 size={14} /> Edit Info
                </Button>
                <Button className="bg-[#FF6B35] hover:bg-orange-600 text-white font-bold h-9 gap-2 shadow-sm">
                  <MessageSquare size={14} /> Message
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Basic Information Card */}
          <Card className="border-none shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between py-4 border-b">
              <CardTitle className="text-sm font-bold">
                Basic Information
              </CardTitle>
              <div className="flex gap-2 text-slate-400">
                <Edit2 size={14} className="cursor-pointer" />
                <ChevronDown size={14} className="cursor-pointer" />
              </div>
            </CardHeader>
            <CardContent className="space-y-4 pt-4 text-xs">
              <InfoRow
                icon={<Phone size={14} />}
                label="Phone"
                value="+1 458 7877 879"
              />
              <InfoRow
                icon={<Mail size={14} />}
                label="Email"
                value="perralt12@example.com"
                extra={<Copy size={12} className="text-slate-300 ml-1" />}
                valColor="text-sky-500"
              />
              <InfoRow icon={<User size={14} />} label="Gender" value="Male" />
              <InfoRow
                icon={<Calendar size={14} />}
                label="Birthday"
                value="24th July 2000"
              />
              <InfoRow
                icon={<MapPin size={14} />}
                label="Address"
                value="1861 Bayonne Ave, Manchester, NJ, 08759"
              />
            </CardContent>
          </Card>

          {/* Personal Information */}
          <Card className="border-none shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between py-4 border-b">
              <CardTitle className="text-sm font-bold">
                Personal Information
              </CardTitle>
              <div className="flex gap-2 text-slate-400">
                <Edit2 size={14} className="cursor-pointer" />
                <ChevronDown size={14} className="cursor-pointer" />
              </div>
            </CardHeader>
            <CardContent className="space-y-4 pt-4 text-xs">
              <InfoRow label="Passport No" value="QRET4566FGRT" />
              <InfoRow label="Passport Exp Date" value="15 May 2029" />
              <InfoRow label="Nationality" value="Indian" />
              <InfoRow label="Religion" value="Christianity" />
              <InfoRow label="Marital status" value="Yes" />
              <InfoRow label="Employment of spouse" value="No" />
              <InfoRow label="No. of children" value="2" />
            </CardContent>
          </Card>
        </div>

        {/* RIGHT COLUMN - Professional Details */}
        <div className="col-span-12 lg:col-span-8 space-y-6">
          {/* About Employee */}
          <Card className="border-none shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between py-4 border-b">
              <CardTitle className="text-sm font-bold">
                About Employee
              </CardTitle>
              <div className="flex gap-2 text-slate-400">
                <Edit2 size={14} className="cursor-pointer" />
                <ChevronDown size={14} className="cursor-pointer" />
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <p className="text-xs leading-relaxed text-slate-500">
                As an award winning designer, I deliver exceptional quality work
                and bring value to your brand! With 10 years of experience and
                350+ projects completed worldwide with satisfied customers, I
                developed the 360° brand approach, which helped me to create
                numerous brands that are relevant, meaningful and loved.
              </p>
            </CardContent>
          </Card>

          {/* Info Grids: Bank, Family, Education */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-none shadow-sm md:col-span-2">
              <CardHeader className="flex flex-row items-center justify-between py-4 border-b">
                <CardTitle className="text-sm font-bold">
                  Bank Information
                </CardTitle>
                <div className="flex gap-2 text-slate-400">
                  <Edit2 size={14} className="cursor-pointer" />
                  <ChevronDown size={14} className="cursor-pointer" />
                </div>
              </CardHeader>
              <CardContent className="grid grid-cols-4 gap-4 pt-4 text-xs">
                <DataField label="Bank name" value="Swiz Intentional Bank" />
                <DataField label="Bank account no" value="159843014641" />
                <DataField label="IFSC Code" value="ICI24504" />
                <DataField label="Branch" value="Alabama USA" />
              </CardContent>
            </Card>

            {/* Family Info */}
            <Card className="border-none shadow-sm md:col-span-2">
              <CardHeader className="flex flex-row items-center justify-between py-4 border-b">
                <CardTitle className="text-sm font-bold">
                  Family Information
                </CardTitle>
                <div className="flex gap-2 text-slate-400">
                  <Edit2 size={14} className="cursor-pointer" />
                  <ChevronDown size={14} className="cursor-pointer" />
                </div>
              </CardHeader>
              <CardContent className="grid grid-cols-4 gap-4 pt-4 text-xs">
                <DataField label="Name" value="Hendry Peralt" />
                <DataField label="Relationship" value="Brother" />
                <DataField label="Date of birth" value="25 May 2014" />
                <DataField label="Phone" value="+1 265 6956 961" />
              </CardContent>
            </Card>
          </div>

          {/* Education & Experience in 2 columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SectionCard title="Education Details">
              <TimelineItem
                title="Oxford University"
                subtitle="Computer Science"
                date="2020 - 2022"
              />
              <TimelineItem
                title="Cambridge University"
                subtitle="Computer Network & Systems"
                date="2016 - 2019"
              />
              <TimelineItem
                title="Oxford School"
                subtitle="Grade X"
                date="2012 - 2016"
              />
            </SectionCard>

            <SectionCard title="Experience">
              <TimelineItem
                title="Google"
                date="Jan 2013 - Present"
                badge={
                  <Badge className="bg-sky-50 text-sky-500 text-[9px] h-4 border-none px-1">
                    UI/UX Developer
                  </Badge>
                }
              />
              <TimelineItem
                title="Salesforce"
                date="Dec 2012 - Jan 2015"
                badge={
                  <Badge className="bg-sky-50 text-sky-500 text-[9px] h-4 border-none px-1">
                    Web Developer
                  </Badge>
                }
              />
              <TimelineItem
                title="HubSpot"
                date="Dec 2011 - Jan 2012"
                badge={
                  <Badge className="bg-sky-50 text-sky-500 text-[9px] h-4 border-none px-1">
                    Product Designer
                  </Badge>
                }
              />
            </SectionCard>
          </div>

          {/* Projects & Assets Tabs */}
          <Tabs defaultValue="projects" className="w-full">
            <TabsList className="bg-transparent border-b w-full justify-start rounded-none h-12 p-0">
              <TabsTrigger
                value="projects"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#FF6B35] data-[state=active]:text-[#FF6B35] data-[state=active]:bg-transparent font-bold">
                Projects
              </TabsTrigger>
              <TabsTrigger
                value="assets"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#FF6B35] data-[state=active]:text-[#FF6B35] data-[state=active]:bg-transparent font-bold">
                Assets
              </TabsTrigger>
            </TabsList>
            <TabsContent value="projects" className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <ProjectCard
                  name="World Health"
                  tasks="1 tasks • 9 Completed"
                  deadline="22 Aug 2025"
                  lead="Young"
                  color="bg-sky-500"
                  icon="C"
                />
                <ProjectCard
                  name="Hospital Administration"
                  tasks="8 tasks • 15 Completed"
                  deadline="31 July 2025"
                  lead="Leona"
                  color="bg-indigo-500"
                  icon="H"
                />
                <ProjectCard
                  name="Video Calling App"
                  tasks="22 tasks • 15 Completed"
                  deadline="16 Jan 2025"
                  lead="Mathis"
                  color="bg-orange-500"
                  icon="V"
                />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

// --- Helper Components ---

function InfoRow({
  icon,
  label,
  value,
  extra,
  valColor = "text-slate-800",
}: any) {
  return (
    <div className="flex items-start gap-3">
      {icon && <div className="text-slate-400 mt-0.5">{icon}</div>}
      <div className="flex-1">
        <p className="text-slate-400 mb-0.5">{label}</p>
        <p className={cn("font-bold", valColor)}>
          {value} {extra}
        </p>
      </div>
    </div>
  );
}

function DataField({ label, value }: any) {
  return (
    <div className="space-y-1">
      <p className="text-slate-400 font-medium">{label}</p>
      <p className="font-bold text-slate-800">{value}</p>
    </div>
  );
}

function SectionCard({ title, children }: any) {
  return (
    <Card className="border-none shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between py-4 border-b">
        <CardTitle className="text-sm font-bold">{title}</CardTitle>
        <div className="flex gap-2 text-slate-400">
          <Edit2 size={14} className="cursor-pointer" />
          <ChevronDown size={14} className="cursor-pointer" />
        </div>
      </CardHeader>
      <CardContent className="pt-4 space-y-4">{children}</CardContent>
    </Card>
  );
}

function TimelineItem({ title, subtitle, date, badge }: any) {
  return (
    <div className="flex justify-between items-start">
      <div>
        <p className="text-xs font-bold text-slate-800">{title}</p>
        {subtitle && (
          <p className="text-[10px] text-slate-400 font-medium">{subtitle}</p>
        )}
        {badge && <div className="mt-1">{badge}</div>}
      </div>
      <p className="text-[10px] text-slate-400 font-medium">{date}</p>
    </div>
  );
}

function ProjectCard({ name, tasks, deadline, lead, color, icon }: any) {
  return (
    <Card className="border-slate-100 shadow-none hover:shadow-sm transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-center gap-3 mb-4">
          <div
            className={cn(
              "h-10 w-10 rounded-full flex items-center justify-center text-white font-bold",
              color
            )}>
            {icon}
          </div>
          <div className="overflow-hidden">
            <h4 className="text-xs font-bold text-slate-800 truncate">
              {name}
            </h4>
            <p className="text-[10px] text-slate-400">{tasks}</p>
          </div>
        </div>
        <div className="flex justify-between border-t pt-3">
          <div className="space-y-1">
            <p className="text-[9px] text-slate-400 font-medium">Deadline</p>
            <p className="text-[10px] font-bold">{deadline}</p>
          </div>
          <div className="space-y-1 text-right">
            <p className="text-[9px] text-slate-400 font-medium">
              Project Lead
            </p>
            <div className="flex items-center gap-1 justify-end">
              <Avatar className="h-4 w-4">
                <AvatarImage src={`https://i.pravatar.cc/100?u=${lead}`} />
              </Avatar>
              <span className="text-[10px] font-bold">{lead}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Utility for cleaner class joining
function cn(...inputs: any) {
  return inputs.filter(Boolean).join(" ");
}

function ChevronDown({ size, className }: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}
