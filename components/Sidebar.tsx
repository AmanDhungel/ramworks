"use client";
import {
  LayoutDashboard,
  Users,
  Building2,
  Briefcase,
  Target,
  Rocket,
  UserCircle,
  Calendar,
  ClipboardCheck,
  ChevronDown,
  LucideIcon,
  WrenchIcon,
  SmilePlus,
  TrendingUp,
  ShoppingCart,
} from "lucide-react";
import Link from "next/link";

import React, { useState } from "react";

export type NavItem = {
  title: string;
  icon: LucideIcon;
  link?: string;
  hasDropdown: boolean;
  children?: { title: string; link: string }[];
};

export type NavGroup = {
  groupLabel: string;
  items: NavItem[];
};

const menuData: NavGroup[] = [
  {
    groupLabel: "Workspace",
    items: [
      {
        title: "Domain Workspace",
        icon: LayoutDashboard,
        link: "/domain-workspace",
        hasDropdown: false,
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
      },
      {
        title: "Companies",
        icon: Building2,
        link: "/crm/companies",
        hasDropdown: false,
      },
      {
        title: "Deals",
        icon: Briefcase,
        link: "/crm/deals",
        hasDropdown: false,
      },
      { title: "Leads", icon: Target, link: "/crm/leads", hasDropdown: false },
      {
        title: "Pipeline",
        icon: Rocket,
        link: "/crm/pipeline",
        hasDropdown: false,
      },
      {
        title: "Analytics",
        icon: Rocket,
        hasDropdown: false,
      },
      {
        title: "Activities",
        icon: TrendingUp,
        link: "/crm/activity",
        hasDropdown: false,
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
        children: [{ title: "Employee", link: "/hrm/employee" }],
      },
      {
        title: "Holidays",
        icon: Calendar,
        link: "/hrm/holidays",
        hasDropdown: false,
      },
      {
        title: "Attendance",
        icon: ClipboardCheck,
        hasDropdown: true,
        children: [{ title: "Daily Log", link: "/hrm/attendance/log" }],
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
      },
      {
        title: "Complaints",
        icon: SmilePlus,
        link: "/support-operation/complaints",
        hasDropdown: false,
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
        children: [
          { title: "Estimates", link: "#" },
          { title: "Invoices", link: "/finance/invoices" },
        ],
      },
    ],
  },
];

const Sidebar = () => {
  const [openDropdowns, setOpenDropdowns] = useState<string[]>([]);

  const toggleDropdown = (title: string) => {
    setOpenDropdowns((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]
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
                    className={`w-full flex items-center justify-between p-2 rounded-lg transition-colors hover:bg-slate-100 ${
                      !item.hasDropdown ? "cursor-pointer" : "cursor-default"
                    }`}>
                    <div className="flex items-center gap-3">
                      <item.icon size={18} strokeWidth={1.5} />
                      <Link
                        href={item.link ? item.link : ""}
                        className="font-medium">
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
                          className="block p-2 text-slate-500 hover:text-blue-600 rounded-md transition-colors">
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
