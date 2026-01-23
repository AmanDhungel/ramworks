"use client";
import {
  LayoutDashboard,
  Users,
  Building2,
  UserCircle,
  ChevronDown,
  LucideIcon,
  WrenchIcon,
  SmilePlus,
  TrendingUp,
  ShoppingCart,
  Calendar1,
  Settings2,
  FileChartLine,
  UserCheck,
  HeartHandshake,
  FileClock,
  GraduationCap,
  PenBox,
  CircleX,
  SquareArrowOutUpRight,
  Megaphone,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { useState } from "react";

export type NavItem = {
  title: string;
  icon: LucideIcon;
  link?: string;
  hasDropdown: boolean;
  children?: { title: string; link: string; active?: boolean }[];
  active?: boolean;
};

export type NavGroup = {
  groupLabel: string;
  items: NavItem[];
};

const Sidebar = () => {
  const [openDropdowns, setOpenDropdowns] = useState<string[]>([]);
  const pathname = usePathname();

  const menuData: NavGroup[] = [
    {
      groupLabel: "Workspace",
      items: [
        {
          title: "Domain Workspace",
          icon: LayoutDashboard,
          link: "/domain-workspace",
          hasDropdown: false,
          active: pathname.startsWith("/domain-workspace"),
        },
      ],
    },
    {
      groupLabel: "Application",
      items: [
        {
          title: "Calendar",
          icon: Calendar1,
          link: "/calender",
          hasDropdown: false,
          active: pathname.startsWith("/calender"),
        },
      ],
    },

    {
      groupLabel: "CRM",
      items: [
        {
          title: "Contacts",
          icon: Users,
          link: "/crm/contacts",
          hasDropdown: false,
          active: pathname.startsWith("/crm/contacts"),
        },
        {
          title: "Companies",
          icon: Building2,
          link: "/crm/companies",
          hasDropdown: false,
          active: pathname.startsWith("/crm/companies"),
        },

        {
          title: "Deals",
          icon: HeartHandshake,
          link: "/crm/deals",
          hasDropdown: false,
          active: pathname.startsWith("/crm/deals"),
        },
        {
          title: "Leads",
          icon: UserCheck,
          link: "/crm/leads",
          hasDropdown: false,
          active: pathname.startsWith("/crm/leads"),
        },
        {
          title: "Pipeline",
          icon: Settings2,
          link: "/crm/pipeline",
          hasDropdown: false,
          active: pathname.startsWith("/crm/pipeline"),
        },
        {
          title: "Analytics",
          icon: FileChartLine,
          link: "/crm/analytics",
          hasDropdown: false,
          active: pathname.startsWith("/crm/analytics"),
        },
        {
          title: "Activities",
          icon: TrendingUp,
          link: "/crm/activity",
          hasDropdown: false,
          active: pathname.startsWith("/crm/activity"),
        },
      ],
    },
    {
      groupLabel: "HRM",
      items: [
        {
          title: "Employees",
          icon: UserCircle,
          hasDropdown: true,
          active: pathname.startsWith("/hrm/employees"),
          children: [
            {
              title: "Employee",
              link: "/hrm/employees/employee",
              active: pathname.startsWith("/hrm/employees/employee"),
            },
            {
              title: "Departments",
              link: "/hrm/employees/departments",
              active: pathname.startsWith("/hrm/employees/departments"),
            },
            {
              title: "Designations",
              link: "/hrm/employees/designations",
              active: pathname.startsWith("/hrm/employees/designations"),
            },
            {
              title: "Policies",
              link: "/hrm/employees/policies",
              active: pathname.startsWith("/hrm/employees/policies"),
            },
          ],
        },
        {
          title: "Tickets",
          icon: UserCircle,
          hasDropdown: true,
          children: [
            {
              title: "Tickets",
              link: "/hrm/tickets/tickets",
              active: pathname.startsWith("/hrm/tickets/tickets"),
            },
          ],
          active: pathname.startsWith("/hrm/tickets"),
        },
        {
          title: "Holidays",
          icon: Calendar1,
          hasDropdown: false,
          link: "/hrm/holidays",
          active: pathname.startsWith("/hrm/holidays"),
        },
        {
          title: "Attenadance",
          icon: FileClock,
          hasDropdown: true,
          active: pathname.startsWith("/hrm/attendance"),
          children: [
            {
              title: "Leaves (Admin)",
              link: "/hrm/leaves/leave-admin",
              active: pathname.startsWith("/hrm/leaves/leave-admin"),
            },
            {
              title: "Leaves (Employee)",
              link: "/hrm/leaves/leave-employee",
              active: pathname.startsWith("/hrm/leaves/leave-employee"),
            },
            {
              title: "Leaves Settings",
              link: "/hrm/leaves/leave-settings",
              active: pathname.startsWith("/hrm/leaves/leave-settings"),
            },
            {
              title: "Attendance (Admin)",
              link: "/hrm/attendance-admin",
              active: pathname.startsWith("/hrm/attendance-admin"),
            },
            {
              title: "Attendance (Employee)",
              link: "/hrm/attendance-employee",
              active: pathname.startsWith("/hrm/attendance-employee"),
            },
            {
              title: "Timesheets",
              link: "/hrm/timesheets",
              active: pathname.startsWith("/hrm/timesheets"),
            },
            {
              title: "Shift & Schedule",
              link: "/hrm/shift-schedule",
              active: pathname.startsWith("/hrm/shift-schedule"),
            },
            {
              title: "Overtime",
              link: "/hrm/overtime",
              active: pathname.startsWith("/hrm/overtime"),
            },
          ],
        },
        {
          title: "Performance",
          icon: GraduationCap,
          hasDropdown: true,
          active: pathname.startsWith("/hrm/performance"),
          children: [
            {
              title: "Performance Indicator",
              link: "/hrm/performance/performance-indicator",
              active: pathname.startsWith(
                "/hrm/performance/performance-indicator",
              ),
            },
            {
              title: "Performance Review",
              link: "/hrm/performance/performance-review",
              active: pathname.startsWith(
                "/hrm/performance/performance-review",
              ),
            },
            {
              title: "Performance Appraisal",
              link: "/hrm/performance/performance-appraisal",
              active: pathname.startsWith(
                "/hrm/performance/performance-appraisal",
              ),
            },
            {
              title: "Goal List",
              link: "/hrm/performance/goal-list",
              active: pathname.startsWith("/hrm/performance/goal-list"),
            },
            {
              title: "Goal Type",
              link: "/hrm/performance/goal-type",
              active: pathname.startsWith("/hrm/performance/goal-type"),
            },
          ],
        },
        {
          title: "Training",
          icon: PenBox,
          hasDropdown: true,
          active: pathname.startsWith("/hrm/training"),
          children: [
            {
              title: "Training List",
              link: "/hrm/training/training-list",
              active: pathname.startsWith("/hrm/training/training-list"),
            },
            {
              title: "Trainers",
              link: "/hrm/training/trainers",
              active: pathname.startsWith("/hrm/training/trainers"),
            },

            {
              title: "Training Type",
              link: "/hrm/training/training-type",
              active: pathname.startsWith("/hrm/training/training-type"),
            },
          ],
        },
        {
          title: "Promotion",
          icon: Megaphone,
          hasDropdown: false,
          link: "/hrm/promotion",
          active: pathname.startsWith("/hrm/promotion"),
        },
        {
          title: "Resignation",
          icon: SquareArrowOutUpRight,
          hasDropdown: false,
          link: "/hrm/resignation",
          active: pathname.startsWith("/hrm/resignation"),
        },
        {
          title: "Termination",
          icon: CircleX,
          hasDropdown: false,
          link: "/hrm/termination",
          active: pathname.startsWith("/hrm/termination"),
        },
      ],
    },
    {
      groupLabel: "Support / operations",
      items: [
        {
          title: "Repair & Maintenance",
          icon: WrenchIcon,
          hasDropdown: false,
          link: "/support-operation/repair-maintenance",
          active: pathname.startsWith("/support-operation/repair-maintenance"),
        },
        {
          title: "Complaints",
          icon: SmilePlus,
          link: "/support-operation/complaints",
          hasDropdown: false,
          active: pathname.startsWith("/support-operation/complaints"),
        },
      ],
    },
    {
      groupLabel: "Finance & Accounts",
      items: [
        {
          title: "Sales",
          icon: ShoppingCart,
          hasDropdown: true,
          active: pathname.startsWith("/finance/sales"),
          children: [
            {
              title: "Invoices",
              link: "/finance/invoices",
              active: pathname.startsWith("/finance/invoices"),
            },
          ],
        },
      ],
    },
  ];

  const toggleDropdown = (title: string) => {
    setOpenDropdowns((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title],
    );
  };

  return (
    <div className="w-64 h-screen bg-white border-r overflow-y-auto flex flex-col p-4 font-sans text-sm text-slate-600">
      {menuData.map((group, idx) => (
        <div key={idx} className="mb-6">
          <p className="text-[11px] font-bold text-slate-400 mb-4 tracking-wider uppercase">
            {group.groupLabel}
          </p>

          <div className="space-y-1">
            {group.items.map((item) => {
              const isOpen = openDropdowns.includes(item.title);

              return (
                <div key={item.title}>
                  <button
                    onClick={() =>
                      item.hasDropdown && toggleDropdown(item.title)
                    }
                    className={`w-full flex items-center justify-between p-2 rounded-lg transition-colors ${item.active && "bg-slate-100"} hover:bg-slate-100 ${
                      !item.hasDropdown ? "cursor-pointer" : "cursor-default"
                    }`}>
                    <div className="flex items-center gap-3">
                      <item.icon size={18} strokeWidth={1.5} />
                      <Link
                        href={item.link ? item.link : ""}
                        className="font-medium ">
                        {item.title}
                      </Link>
                      {item.title === "Dashboard" && (
                        <span className="bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-md font-bold">
                          Hot
                        </span>
                      )}
                    </div>
                    {item.hasDropdown && (
                      <ChevronDown
                        size={16}
                        className={`transition-transform duration-200 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    )}
                  </button>

                  {item.hasDropdown && isOpen && (
                    <div className="ml-9 mt-1 space-y-1">
                      {item.children?.map((child) => (
                        <Link
                          key={child.title}
                          href={child.link}
                          className={`block p-2  border-l-2 ${child.active ? "border-l-orange-500 text-orange-500" : "text-slate-500"} hover:text-blue-600 transition-colors`}>
                          {child.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
