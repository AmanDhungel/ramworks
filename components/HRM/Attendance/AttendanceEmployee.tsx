"use client";
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
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function EmployeeProfile() {
  return (
    <div className="p-6 bg-[#F8F9FA] min-h-screen font-sans">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
          <ChevronLeft className="h-4 w-4" /> Employee Details
        </div>
        <Button className="bg-[#FF6B35] hover:bg-[#E85A20] gap-2">
          <span className="border rounded-full p-0.5">
            <Plus className="h-3 w-3" />
          </span>{" "}
          Bank & Statutory
        </Button>
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-3 space-y-6">
          <Card className="border-none shadow-sm overflow-hidden">
            <div className="h-24 bg-gradient-to-r from-orange-400 to-orange-500 relative">
              <div className="absolute -bottom-10 left-1/2 -translate-x-1/2">
                <div className="relative">
                  <Avatar className="h-24 w-24 border-4 border-white shadow-md">
                    <AvatarImage src="/api/placeholder/100/100" />
                    <AvatarFallback>SP</AvatarFallback>
                  </Avatar>
                  <div className="absolute bottom-1 right-1 h-5 w-5 bg-emerald-500 border-4 border-white rounded-full flex items-center justify-center">
                    <ShieldCheck className="h-3 w-3 text-white" />
                  </div>
                </div>
              </div>
            </div>
            <CardContent className="pt-12 text-center pb-6">
              <h2 className="text-xl font-bold text-slate-900 flex items-center justify-center gap-1">
                Stephan Peralt{" "}
                <ShieldCheck className="h-4 w-4 text-emerald-500" />
              </h2>
              <div className="flex justify-center gap-2 mt-2 mb-6">
                <Badge
                  variant="secondary"
                  className="bg-slate-100 text-slate-600 font-medium px-2 py-0.5">
                  ● Software Developer
                </Badge>
                <Badge
                  variant="secondary"
                  className="bg-blue-50 text-blue-600 font-medium px-2 py-0.5">
                  10+ years of Experience
                </Badge>
              </div>

              <div className="space-y-4 text-left">
                {[
                  {
                    icon: <Briefcase className="h-4 w-4" />,
                    label: "Employee ID",
                    val: "EMP-0001",
                  },
                  {
                    icon: <User className="h-4 w-4" />,
                    label: "Team",
                    val: "UI/UX Design",
                  },
                  {
                    icon: <Calendar className="h-4 w-4" />,
                    label: "Date Of Join",
                    val: "1st Jan 2023",
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center text-sm">
                    <span className="text-slate-400 flex items-center gap-2">
                      {item.icon} {item.label}
                    </span>
                    <span className="font-bold text-slate-800">{item.val}</span>
                  </div>
                ))}
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-400 flex items-center gap-2">
                    <Briefcase className="h-4 w-4" /> Report Office
                  </span>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src="/api/placeholder/24/24" />
                    </Avatar>
                    <span className="font-bold text-slate-800">
                      Doglas Martini
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-8">
                <Button
                  variant="outline"
                  className="border-slate-800 text-slate-800 font-bold h-11">
                  <Pencil className="h-4 w-4 mr-2" /> Edit Info
                </Button>
                <Button className="bg-[#FF6B35] hover:bg-[#E85A20] font-bold h-11">
                  <MessageSquare className="h-4 w-4 mr-2" /> Message
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Basic Information Card */}
          <InfoCard
            title="Basic information"
            data={[
              {
                icon: <Phone className="h-4 w-4" />,
                label: "Phone",
                val: "+1 458 7877 879",
              },
              {
                icon: <Mail className="h-4 w-4" />,
                label: "Email",
                val: "perralt12@example.com",
                copy: true,
              },
              {
                icon: <User className="h-4 w-4" />,
                label: "Gender",
                val: "Male",
              },
              {
                icon: <Calendar className="h-4 w-4" />,
                label: "Birthday",
                val: "24th July 2000",
              },
              {
                icon: <MapPin className="h-4 w-4" />,
                label: "Address",
                val: "1861 Bayonne Ave, Manchester, NJ, 08759",
                multiline: true,
              },
            ]}
          />
        </div>

        <div className="col-span-12 lg:col-span-9 space-y-6">
          <SectionCard
            title="About Employee"
            description="As an award winning designer, I deliver exceptional quality work and bring value to your brand! With 10 years of experience and 350+ projects completed worldwide with satisfied customers, I developed the 360° brand approach, which helped me to create numerous brands that are relevant, meaningful and loved."
          />

          <SectionCard
            title="Bank Information"
            gridCols={4}
            data={[
              { label: "Bank name", val: "Swiz International Bank" },
              { label: "Bank account no", val: "159843014641" },
              { label: "IFSC Code", val: "ICI24504" },
              { label: "Branch", val: "Alabama USA" },
            ]}
          />

          <SectionCard
            title="Family Information"
            gridCols={4}
            data={[
              { label: "Name", val: "Hendry Peralt" },
              { label: "Relationship", val: "Brother" },
              { label: "Date of birth", val: "25 May 2014" },
              { label: "Phone", val: "+1 265 6956 961" },
            ]}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <EducationExperience
              title="Education Details"
              icon={<GraduationCap />}
              items={[
                {
                  name: "Oxford University",
                  sub: "Computer Science",
                  date: "2020 - 2022",
                },
                {
                  name: "Cambridge University",
                  sub: "Computer Network & Systems",
                  date: "2016 - 2019",
                },
                { name: "Oxford School", sub: "Grade X", date: "2012 - 2016" },
              ]}
            />
            <EducationExperience
              title="Experience"
              icon={<Briefcase />}
              items={[
                {
                  name: "Google",
                  sub: "UI/UX Developer",
                  date: "Jan 2013 - Present",
                  badge: true,
                },
                {
                  name: "Salesforce",
                  sub: "Web Developer",
                  date: "Dec 2012 - Jan 2015",
                  badge: true,
                },
                {
                  name: "HubSpot",
                  sub: "Product Designer",
                  date: "Dec 2011 - Jan 2012",
                  badge: true,
                },
              ]}
            />
          </div>

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
                    completed: 9,
                    deadline: "22 Aug 2025",
                    lead: "Young",
                    color: "text-blue-600 bg-blue-50",
                  },
                  {
                    title: "Hospital Administration",
                    tasks: 8,
                    completed: 15,
                    deadline: "31 July 2025",
                    lead: "Leona",
                    color: "text-indigo-600 bg-indigo-50",
                  },
                  {
                    title: "Video Calling App",
                    tasks: 22,
                    completed: 15,
                    deadline: "16 Jan 2025",
                    lead: "Mathis",
                    color: "text-red-600 bg-red-50",
                  },
                ].map((proj, i) => (
                  <Card key={i} className="border border-slate-100 shadow-sm">
                    <CardContent className="p-5">
                      <div className="flex items-center gap-3 mb-6">
                        <div
                          className={`h-12 w-12 rounded-full flex items-center justify-center ${proj.color}`}>
                          <Globe className="h-6 w-6" />
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-800">
                            {proj.title}
                          </h4>
                          <p className="text-xs text-slate-400">
                            {proj.tasks} tasks ● {proj.completed} Completed
                          </p>
                        </div>
                      </div>
                      <div className="flex justify-between text-xs">
                        <div>
                          <p className="text-slate-400 mb-1">Deadline</p>
                          <p className="font-bold text-slate-800">
                            {proj.deadline}
                          </p>
                        </div>
                        <div>
                          <p className="text-slate-400 mb-1 text-right">
                            Project Lead
                          </p>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src="/api/placeholder/24/24" />
                            </Avatar>
                            <p className="font-bold text-slate-800">
                              {proj.lead}
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
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

// --- Sub-components for 100% UI Match ---

const InfoCard = ({ title, data }: any) => (
  <Card className="border-none shadow-sm">
    <CardHeader className="flex flex-row items-center justify-between py-4 border-b">
      <CardTitle className="text-sm font-bold text-slate-900">
        {title}
      </CardTitle>
      <div className="flex gap-2 text-slate-400">
        <Pencil className="h-3 w-3 cursor-pointer" />
        <ChevronDown className="h-3 w-3 cursor-pointer" />
      </div>
    </CardHeader>
    <CardContent className="py-4 space-y-4">
      {data.map((item: any, i: number) => (
        <div key={i} className="flex justify-between text-sm">
          <span className="text-slate-400 flex items-center gap-2">
            {item.icon} {item.label}
          </span>
          <span
            className={`font-bold text-slate-800 text-right ${item.multiline ? "max-w-[140px]" : ""}`}>
            {item.val}{" "}
            {item.copy && (
              <Copy className="h-3 w-3 inline ml-1 text-slate-300" />
            )}
          </span>
        </div>
      ))}
    </CardContent>
  </Card>
);

const SectionCard = ({ title, description, gridCols = 1, data = [] }: any) => (
  <Card className="border-none shadow-sm">
    <CardHeader className="flex flex-row items-center justify-between py-4 border-b">
      <CardTitle className="text-sm font-bold text-slate-900">
        {title}
      </CardTitle>
      <div className="flex gap-2 text-slate-400">
        <Pencil className="h-3 w-3 cursor-pointer" />
        <ChevronDown className="h-3 w-3 cursor-pointer" />
      </div>
    </CardHeader>
    <CardContent className="py-5">
      {description && (
        <p className="text-sm text-slate-500 leading-relaxed">{description}</p>
      )}
      {data.length > 0 && (
        <div className={`grid grid-cols-1 md:grid-cols-${gridCols} gap-6`}>
          {data.map((item: any, i: number) => (
            <div key={i}>
              <p className="text-xs text-slate-400 font-medium mb-1">
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

const EducationExperience = ({ title, items }: any) => (
  <Card className="border-none shadow-sm">
    <CardHeader className="flex flex-row items-center justify-between py-4 border-b">
      <CardTitle className="text-sm font-bold text-slate-900">
        {title}
      </CardTitle>
      <div className="flex gap-2 text-slate-400">
        <Pencil className="h-3 w-3 cursor-pointer" />
        <ChevronDown className="h-3 w-3 cursor-pointer" />
      </div>
    </CardHeader>
    <CardContent className="py-5 space-y-6">
      {items.map((item: any, i: number) => (
        <div key={i} className="flex justify-between items-start">
          <div>
            <h5 className="text-sm font-bold text-slate-800">{item.name}</h5>
            {item.badge ? (
              <Badge
                variant="secondary"
                className="mt-1 bg-blue-50 text-blue-600 text-[10px] font-bold py-0">
                {item.sub}
              </Badge>
            ) : (
              <p className="text-xs text-slate-400 mt-1">{item.sub}</p>
            )}
          </div>
          <span className="text-xs text-slate-400 font-medium">
            {item.date}
          </span>
        </div>
      ))}
    </CardContent>
  </Card>
);

function ChevronLeft(props: any) {
  return (
    <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 19l-7-7 7-7"
      />
    </svg>
  );
}
function Plus(props: any) {
  return (
    <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={3}
        d="M12 4v16m8-8H4"
      />
    </svg>
  );
}
