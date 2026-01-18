import React from "react";
import {
  Mail,
  Phone,
  Calendar,
  MapPin,
  Shield,
  Flag,
  Heart,
  Users,
  Briefcase,
  GraduationCap,
  Building2,
  CreditCard,
  Pencil,
  MessageSquare,
  Plus,
  ExternalLink,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

const EmployeeProfile = () => {
  return (
    <div className="bg-slate-50 min-h-screen p-6 font-sans text-slate-900">
      {/* Top Header Navigation */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2 text-sm font-medium text-slate-600">
          <span>←</span> Employee Details
        </div>
        <Button
          variant="destructive"
          className="bg-orange-600 hover:bg-orange-700">
          Bank & Statutory
        </Button>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* LEFT COLUMN: Profile & Basic Info */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          {/* Main Profile Card */}
          <Card className="overflow-hidden">
            <div className="h-24 bg-gradient-to-r from-orange-400 to-orange-600 relative">
              <div className="absolute -bottom-10 left-1/2 -translate-x-1/2">
                <Avatar className="h-24 w-24 border-4 border-white shadow-lg">
                  <AvatarImage src="/api/placeholder/100/100" />
                  <AvatarFallback>SP</AvatarFallback>
                </Avatar>
              </div>
            </div>
            <CardContent className="pt-12 text-center pb-6">
              <div className="flex items-center justify-center gap-2 mb-1">
                <h2 className="text-xl font-bold">Stephan Peralt</h2>
                <div className="bg-green-500 rounded-full p-0.5">
                  <span className="text-[10px] text-white">✓</span>
                </div>
              </div>
              <div className="flex justify-center gap-2 mb-6">
                <Badge variant="secondary" className="font-normal">
                  Software Developer
                </Badge>
                <Badge
                  variant="secondary"
                  className="font-normal text-blue-600 bg-blue-50">
                  10+ years of Experience
                </Badge>
              </div>

              <div className="space-y-3 text-sm text-left px-2">
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 flex items-center gap-2">
                    <Briefcase size={16} /> Employee ID
                  </span>
                  <span className="font-medium">EMP-0001</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 flex items-center gap-2">
                    <Users size={16} /> Team
                  </span>
                  <span className="font-medium">UI/UX Design</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 flex items-center gap-2">
                    <Calendar size={16} /> Date Of Join
                  </span>
                  <span className="font-medium">1st Jan 2023</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 flex items-center gap-2">
                    <Building2 size={16} /> Report Office
                  </span>
                  <div className="flex items-center gap-2 font-medium">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src="/api/placeholder/24/24" />
                    </Avatar>
                    Doglas Martini
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-6">
                <Button variant="outline" className="w-full gap-2">
                  <Pencil size={14} /> Edit Info
                </Button>
                <Button
                  variant="destructive"
                  className="w-full bg-orange-600 gap-2">
                  <MessageSquare size={14} /> Message
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Basic Information Card */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between py-4">
              <CardTitle className="text-md font-bold">
                Basic Information
              </CardTitle>
              <div className="flex gap-2">
                <Pencil size={14} className="text-slate-400 cursor-pointer" />
                <span className="text-slate-400 text-xs">▼</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-500 flex gap-2">
                  <Phone size={16} /> Phone
                </span>
                <span className="font-medium">+1 458 7877 879</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 flex gap-2">
                  <Mail size={16} /> Email
                </span>
                <span className="text-blue-600 font-medium">
                  perralt12@example.com
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 flex gap-2">⚥ Gender</span>
                <span className="font-medium">Male</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 flex gap-2">
                  <Calendar size={16} /> Birthday
                </span>
                <span className="font-medium">24th July 2000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 flex gap-2 flex-shrink-0">
                  <MapPin size={16} /> Address
                </span>
                <span className="font-medium text-right">
                  1861 Bayonne Ave, Manchester, NJ, 08759
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Personal Information */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between py-4">
              <CardTitle className="text-md font-bold">
                Personal Information
              </CardTitle>
              <div className="flex gap-2">
                <Pencil size={14} className="text-slate-400 cursor-pointer" />
                <span className="text-slate-400 text-xs">▼</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-500 flex gap-2 items-center">
                  <Shield size={16} /> Passport No
                </span>
                <span className="font-bold">QRET4566FGRT</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 flex gap-2 items-center">
                  <Calendar size={16} /> Passport Exp Date
                </span>
                <span className="font-medium">15 May 2029</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 flex gap-2 items-center">
                  <Flag size={16} /> Nationality
                </span>
                <span className="font-medium">Indian</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 flex gap-2 items-center">
                  <Heart size={16} /> Religion
                </span>
                <span className="font-medium">Christianity</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* RIGHT COLUMN: Professional Details */}
        <div className="col-span-12 lg:col-span-8 space-y-6">
          {/* About Employee */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">About Employee</CardTitle>
              <div className="flex gap-2 text-slate-400">
                <Pencil size={16} /> <span>▼</span>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-500 leading-relaxed">
                As an award winning designer, I deliver exceptional quality work
                and bring value to your brand! With 10 years of experience and
                350+ projects completed worldwide with satisfied customers, I
                developed the 360° brand approach, which helped me to create
                numerous brands that are relevant, meaningful and loved.
              </p>
            </CardContent>
          </Card>

          {/* Bank Information */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Bank Information</CardTitle>
              <div className="flex gap-2 text-slate-400">
                <Pencil size={16} /> <span>▼</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-slate-400 mb-1">Bank name</p>
                  <p className="font-semibold">Swiz Intenational Bank</p>
                </div>
                <div>
                  <p className="text-slate-400 mb-1">Bank account no</p>
                  <p className="font-semibold text-lg">159843014641</p>
                </div>
                <div>
                  <p className="text-slate-400 mb-1">IFSC Code</p>
                  <p className="font-semibold uppercase">ICI24504</p>
                </div>
                <div>
                  <p className="text-slate-400 mb-1">Branch</p>
                  <p className="font-semibold">Alabama USA</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Education & Experience Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Education Details */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg">Education Details</CardTitle>
                <div className="flex gap-2 text-slate-400">
                  <Pencil size={16} /> <span>▼</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {[
                  {
                    school: "Oxford University",
                    degree: "Computer Science",
                    date: "2020 - 2022",
                  },
                  {
                    school: "Cambridge University",
                    degree: "Computer Network & Systems",
                    date: "2016- 2019",
                  },
                  {
                    school: "Oxford School",
                    degree: "Grade X",
                    date: "2012 - 2016",
                  },
                ].map((edu, i) => (
                  <div key={i} className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-sm">{edu.school}</h4>
                      <p className="text-xs text-slate-500">{edu.degree}</p>
                    </div>
                    <span className="text-xs text-slate-400">{edu.date}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Experience */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg">Experience</CardTitle>
                <div className="flex gap-2 text-slate-400">
                  <Pencil size={16} /> <span>▼</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {[
                  {
                    company: "Google",
                    role: "UI/UX Developer",
                    date: "Jan 2013 - Present",
                    color: "text-blue-500 bg-blue-50",
                  },
                  {
                    company: "Salesforce",
                    role: "Web Developer",
                    date: "Dec 2012- Jan 2015",
                    color: "text-blue-500 bg-blue-50",
                  },
                  {
                    company: "HubSpot",
                    role: "Product Desiger",
                    date: "Dec 2011- Jan 2012",
                    color: "text-blue-500 bg-blue-50",
                  },
                ].map((exp, i) => (
                  <div key={i} className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-sm">{exp.company}</h4>
                      <Badge
                        variant="secondary"
                        className={`text-[10px] mt-1 font-normal ${exp.color}`}>
                        ● {exp.role}
                      </Badge>
                    </div>
                    <span className="text-xs text-slate-400">{exp.date}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Projects & Assets Tabs */}
          <Tabs defaultValue="projects" className="w-full">
            <TabsList className="bg-transparent border-b w-full justify-start rounded-none h-auto p-0 mb-6">
              <TabsTrigger
                value="projects"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-orange-500 data-[state=active]:bg-transparent px-6 py-3">
                Projects
              </TabsTrigger>
              <TabsTrigger
                value="assets"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-orange-500 data-[state=active]:bg-transparent px-6 py-3 text-slate-400">
                Assets
              </TabsTrigger>
            </TabsList>

            <TabsContent
              value="projects"
              className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  name: "World Health",
                  tasks: 1,
                  completed: 9,
                  deadline: "22 Aug 2025",
                  lead: "Young",
                  icon: "C",
                },
                {
                  name: "Hospital Administration",
                  tasks: 8,
                  completed: 15,
                  deadline: "31 July 2025",
                  lead: "Leona",
                  icon: "H",
                },
                {
                  name: "Video Calling App",
                  tasks: 22,
                  completed: 15,
                  deadline: "16 Jan 2025",
                  lead: "Mathis",
                  icon: "V",
                },
              ].map((project, i) => (
                <Card key={i} className="border-slate-100">
                  <CardContent className="p-4">
                    <div className="flex gap-3 mb-6">
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                        {project.icon}
                      </div>
                      <div>
                        <h4 className="font-bold text-sm">{project.name}</h4>
                        <p className="text-[11px] text-slate-400">
                          {project.tasks} tasks • {project.completed} Completed
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-[10px]">
                      <div>
                        <p className="text-slate-400">Deadline</p>
                        <p className="font-bold">{project.deadline}</p>
                      </div>
                      <div>
                        <p className="text-slate-400">Project Lead</p>
                        <div className="flex items-center gap-1 font-bold">
                          <Avatar className="h-4 w-4">
                            <AvatarImage src="/api/placeholder/16/16" />
                          </Avatar>
                          {project.lead}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
            <TabsContent value="assets">
              <div className="p-8 text-center text-slate-400">
                No assets assigned.
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default EmployeeProfile;
