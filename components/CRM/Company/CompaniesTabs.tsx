import React from "react";
import {
  Activity,
  FileText,
  Phone,
  Files,
  Mail,
  PlusCircle,
  MoreVertical,
  Download,
  Edit2,
  Trash2,
  MessageSquare,
  Clock,
  ChevronDown,
  Calendar,
  CheckCircle2,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";

const CompaniesProjectDashboard = () => {
  return (
    <div className="w-full  mx-auto p-6 pl-4 min-h-screen">
      <Tabs defaultValue="activities" className="w-full">
        {/* Navigation Header */}
        <div className="bg-white border-b px-4 rounded-t-xl">
          <TabsList className="bg-transparent h-14 w-full justify-start gap-8">
            <TabsTrigger
              value="activities"
              className="data-[state=active]:border-b-2 data-[state=active]:border-orange-500 rounded-none bg-transparent shadow-none gap-2 px-0">
              <Activity className="w-4 h-4" /> Activities
            </TabsTrigger>
            <TabsTrigger
              value="notes"
              className="data-[state=active]:border-b-2 data-[state=active]:border-orange-500 rounded-none bg-transparent shadow-none gap-2 px-0">
              <FileText className="w-4 h-4" /> Notes
            </TabsTrigger>
            <TabsTrigger
              value="calls"
              className="data-[state=active]:border-b-2 data-[state=active]:border-orange-500 rounded-none bg-transparent shadow-none gap-2 px-0">
              <Phone className="w-4 h-4" /> Calls
            </TabsTrigger>
            <TabsTrigger
              value="files"
              className="data-[state=active]:border-b-2 data-[state=active]:border-orange-500 rounded-none bg-transparent shadow-none gap-2 px-0">
              <Files className="w-4 h-4" /> Files
            </TabsTrigger>
            <TabsTrigger
              value="email"
              className="data-[state=active]:border-b-2 data-[state=active]:border-orange-500 rounded-none bg-transparent shadow-none gap-2 px-0">
              <Mail className="w-4 h-4" /> Email
            </TabsTrigger>
          </TabsList>
        </div>

        {/* 1. ACTIVITIES TAB */}
        <TabsContent value="activities" className="mt-6 space-y-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-slate-800">Activities</h2>
            <Select defaultValue="last7">
              <SelectTrigger className="w-[180px] bg-white">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="last7">Sort By : Last 7 Days</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <DateLabel date="15 Feb 2024" />
          <ActivityCard
            icon={
              <div className="p-2 bg-cyan-100 rounded-full text-cyan-600">
                <MessageSquare size={18} />
              </div>
            }
            title="You sent 1 Message to the contact."
            time="10:25 pm"
          />

          <ActivityCard
            icon={
              <div className="p-2 bg-green-100 rounded-full text-green-600">
                <Phone size={18} />
              </div>
            }
            title="Denwar responded to your appointment schedule question by call at 09:30pm."
            time="09:25 pm"
          />

          <ActivityCard
            icon={
              <div className="p-2 bg-yellow-100 rounded-full text-yellow-600">
                <FileText size={18} />
              </div>
            }
            title="Notes added by Antony"
            time="10.00 pm"
            description="Please accept my apologies for the inconvenience caused. It would be much appreciated if it's possible to reschedule to 6:00 PM, or any other day that week."
          />

          <DateLabel date="15 Feb 2024" />
          <ActivityCard
            icon={
              <div className="p-2 bg-purple-100 rounded-full text-purple-600">
                <Avatar className="w-5 h-5 mr-1 inline-block">
                  <AvatarImage src="https://github.com/shadcn.png" />
                </Avatar>
              </div>
            }
            title="Meeting With Abraham"
            subtitle="Scheduled on 05:00 pm"
          />

          <DateLabel
            label="Upcoming Activity"
            color="bg-purple-100 text-purple-700"
          />
          <Card className="border-slate-200">
            <CardContent className="p-6">
              <div className="flex gap-4 items-start">
                <div className="p-2 bg-purple-100 rounded-full text-purple-600">
                  <Avatar className="w-6 h-6">
                    <AvatarImage src="https://github.com/shadcn.png" />
                  </Avatar>
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-slate-700">Product Meeting</h4>
                  <p className="text-slate-500 text-sm mt-1 leading-relaxed">
                    A product team meeting is a gathering of the
                    cross-functional product team — ideally including team
                    members from product, engineering, marketing, and customer
                    support.
                  </p>
                  <p className="text-slate-400 text-xs mt-2">
                    25 Jul 2023, 05:00 pm
                  </p>

                  <div className="grid grid-cols-3 gap-4 mt-6">
                    <div>
                      <span className="text-xs font-semibold text-slate-500">
                        Reminder
                      </span>
                      <Select defaultValue="reminder">
                        <SelectTrigger className="mt-1 h-9">
                          <Clock className="w-3 h-3 mr-2" />
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="reminder">Reminder</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-slate-500">
                        Task Priority
                      </span>
                      <Select defaultValue="high">
                        <SelectTrigger className="mt-1 h-9">
                          <div className="w-2 h-2 rounded-full bg-red-500 mr-2" />
                          High
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="high">High</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-slate-500">
                        Assigned to
                      </span>
                      <Select defaultValue="john">
                        <SelectTrigger className="mt-1 h-9">
                          <Avatar className="w-4 h-4 mr-2">
                            <AvatarImage src="https://github.com/shadcn.png" />
                          </Avatar>
                          John
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="john">John</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 2. NOTES TAB */}
        <TabsContent value="notes" className="mt-6 space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Notes</h2>
            <div className="flex gap-4">
              <Select defaultValue="last7">
                <SelectTrigger className="w-[180px] bg-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="last7">Sort By : Last 7 Days</SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant="ghost"
                className="text-orange-600 hover:text-orange-700 font-medium">
                {" "}
                <PlusCircle className="w-4 h-4 mr-2" /> Add New
              </Button>
            </div>
          </div>

          <NoteCard
            name="Darlee Robertson"
            date="15 Sep 2023, 12:10 pm"
            content="A project review evaluates the success of an initiative and identifies areas for improvement. It can also evaluate a current project to determine whether it's on the right track. Or, it can determine the success of a completed project."
            attachments={[
              { name: "Project Specs.xls", size: "365 KB", type: "xls" },
              { name: "090224.jpg", size: "365 KB", type: "jpg" },
            ]}
          />

          <NoteCard
            name="Sharon Roy"
            date="18 Sep 2023, 09:52 am"
            content="A project plan typically contains a list of the essential elements of a project, such as stakeholders, scope, timelines, estimated cost and communication methods. The project manager typically lists the information based on the assignment"
            attachments={[
              { name: "Project Specs.xls", size: "365 KB", type: "xls" },
            ]}
            comment={{
              author: "Aeron",
              text: "The best way to get a project done faster is to start sooner. A goal without a timeline is just a dream. The goal you set must be challenging. At the same time, it should be realistic and attainable, not impossible to reach.",
              date: "15 Sep 2023, 11:15 pm",
            }}
          />
        </TabsContent>

        {/* 3. CALLS TAB */}
        <TabsContent value="calls" className="mt-6 space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-slate-800">Calls</h2>
            <Button variant="ghost" className="text-orange-600 font-medium">
              <PlusCircle className="w-4 h-4 mr-2" /> Add New
            </Button>
          </div>
          <CallCard
            name="Darlee Robertson"
            time="23 Jul 2023, 10:00 pm"
            status="Busy"
            statusColor="bg-red-50 text-red-500"
          />
          <CallCard
            name="Sharon Roy"
            time="28 Jul 2023, 09:00 pm"
            status="No Answer"
            statusColor="bg-purple-50 text-purple-500"
          />
        </TabsContent>

        {/* 4. FILES TAB */}
        <TabsContent value="files" className="mt-6 space-y-4">
          <Card className="border-dashed border-2">
            <CardContent className="flex justify-between items-center p-6">
              <div>
                <h3 className="font-bold">Manage Documents</h3>
                <p className="text-sm text-slate-500">
                  Send customizable quotes, proposals and contracts to close
                  deals faster.
                </p>
              </div>
              <Button className="bg-orange-500 hover:bg-orange-600">
                Create Document
              </Button>
            </CardContent>
          </Card>

          <FileRow
            name="Collier-Turner Proposal"
            owner="Darlee Robertson"
            tags={["Proposal", "+ Proposal"]}
          />
          <FileRow
            name="Collier-Turner Proposal"
            owner="Sharon Roy"
            tags={["Quote"]}
            status="Sent"
          />
        </TabsContent>

        {/* 5. EMAIL TAB */}
        <TabsContent value="email" className="mt-6">
          <Card className="border-slate-200">
            <CardContent className="flex justify-between items-center p-6">
              <div>
                <h3 className="font-bold">Manage Emails</h3>
                <p className="text-sm text-slate-500">
                  You can send and reply to emails directly via this section.
                </p>
              </div>
              <Button className="bg-orange-500 hover:bg-orange-600 px-6">
                Connect Account
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

// --- Helper Components ---

const DateLabel = ({
  date,
  label,
  color,
}: {
  date?: string;
  label?: string;
  color?: string;
}) => (
  <div className="flex mb-4">
    <span
      className={`text-[10px] uppercase font-bold px-2 py-1 rounded ${color || "bg-purple-50 text-purple-400"}`}>
      <Calendar className="w-3 h-3 inline mr-1 mb-0.5" /> {label || date}
    </span>
  </div>
);

const ActivityCard = ({ icon, title, subtitle, time, description }: any) => (
  <Card className="mb-4 border-slate-200 shadow-sm">
    <CardContent className="p-4 flex gap-4">
      {icon}
      <div className="flex-1">
        <div className="flex justify-between">
          <h4 className="text-sm font-semibold text-slate-700">{title}</h4>
          {time && <span className="text-xs text-slate-400">{time}</span>}
        </div>
        {subtitle && <p className="text-xs text-slate-400 mt-1">{subtitle}</p>}
        {description && (
          <p className="text-sm text-slate-500 mt-2 leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </CardContent>
  </Card>
);

const NoteCard = ({ name, date, content, attachments, comment }: any) => (
  <Card className="border-slate-200">
    <CardContent className="p-5">
      <div className="flex justify-between items-start">
        <div className="flex gap-3">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
          </Avatar>
          <div>
            <h4 className="font-bold text-sm text-slate-700">{name}</h4>
            <p className="text-xs text-slate-400">{date}</p>
          </div>
        </div>
        <div className="flex gap-2 text-slate-400">
          <Edit2 className="w-4 h-4 cursor-pointer" />{" "}
          <Trash2 className="w-4 h-4 cursor-pointer" />
        </div>
      </div>
      <div className="mt-4">
        <p className="text-xs font-bold text-slate-500 uppercase">
          Notes added by Antony
        </p>
        <p className="text-sm text-slate-500 mt-2 leading-relaxed">{content}</p>
      </div>
      {attachments && (
        <div className="flex gap-4 mt-4">
          {attachments.map((file: any, i: number) => (
            <div
              key={i}
              className="flex items-center gap-3 p-3 border rounded-lg flex-1 bg-white">
              {file.type === "xls" ? (
                <div className="p-2 bg-green-100 text-green-600 rounded">
                  <FileText size={20} />
                </div>
              ) : (
                <div className="w-10 h-10 bg-slate-200 rounded overflow-hidden">
                  <Image
                    width={500}
                    height={500}
                    src="https://picsum.photos/40/40"
                    alt="thumb"
                  />
                </div>
              )}
              <div className="flex-1">
                <p className="text-xs font-bold truncate">{file.name}</p>
                <p className="text-[10px] text-slate-400">{file.size}</p>
              </div>
              <Download className="w-4 h-4 text-slate-400" />
            </div>
          ))}
        </div>
      )}
      {comment && (
        <div className="mt-6 p-4 bg-slate-50 rounded-lg">
          <p className="text-sm text-slate-600 italic">`{comment.text}`</p>
          <div className="mt-4 flex justify-between items-center">
            <p className="text-xs text-slate-400">
              Commented by{" "}
              <span className="text-orange-500">{comment.author}</span> on{" "}
              {comment.date}
            </p>
            <Button
              variant="outline"
              size="sm"
              className="bg-slate-800 text-white hover:bg-slate-700 h-8">
              Reply
            </Button>
          </div>
        </div>
      )}
      <div className="mt-4 flex justify-end">
        <Button
          variant="ghost"
          size="sm"
          className="text-orange-600 text-xs font-bold">
          <PlusCircle className="w-3 h-3 mr-1" /> Add Comment
        </Button>
      </div>
    </CardContent>
  </Card>
);

const CallCard = ({ name, time, status, statusColor }: any) => (
  <Card className="border-slate-200">
    <CardContent className="p-4 flex items-center justify-between">
      <div className="flex gap-4 items-center">
        <Avatar className="w-10 h-10">
          <AvatarImage src="https://github.com/shadcn.png" />
        </Avatar>
        <div>
          <p className="text-sm font-bold">
            {name}{" "}
            <span className="font-normal text-slate-500">
              logged a call on {time}
            </span>
          </p>
          <p className="text-xs text-slate-400 mt-1">
            A project review evaluates the success of an initiative and
            identifies areas for improvement...
          </p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Badge
          className={`${statusColor} border-none shadow-none px-4 py-1.5 flex gap-2`}>
          {status} <ChevronDown className="w-3 h-3" />
        </Badge>
        <Trash2 className="w-4 h-4 text-slate-400 cursor-pointer" />
      </div>
    </CardContent>
  </Card>
);

const FileRow = ({ name, owner, tags, status }: any) => (
  <Card className="border-slate-200">
    <CardContent className="p-5">
      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-bold text-slate-700">{name}</h4>
          <p className="text-sm text-slate-500 mt-1">
            Send customizable quotes, proposals and contracts to close deals
            faster.
          </p>
          <div className="mt-4 flex items-center gap-2">
            <Avatar className="w-8 h-8">
              <AvatarImage src="https://github.com/shadcn.png" />
            </Avatar>
            <div className="text-xs">
              <p className="text-slate-400">Owner</p>
              <p className="font-bold text-slate-700">{owner}</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end gap-6">
          <div className="flex gap-2 text-slate-400">
            <Download className="w-4 h-4" /> <Edit2 className="w-4 h-4" />{" "}
            <Trash2 className="w-4 h-4" />
          </div>
          <div className="flex gap-2">
            {tags.map((t: string) => (
              <Badge
                key={t}
                className="bg-purple-50 text-purple-400 border-none">
                {t}
              </Badge>
            ))}
            {status && (
              <Badge className="bg-green-50 text-green-500 border-none">
                • {status}
              </Badge>
            )}
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);

export default CompaniesProjectDashboard;
