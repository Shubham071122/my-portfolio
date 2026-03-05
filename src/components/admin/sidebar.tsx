"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Users, 
  Briefcase, 
  Settings, 
  FileText, 
  ChevronLeft,
  Menu,
  Zap,
  Computer
} from "lucide-react";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";

const sidebarItems = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Work Experience", href: "/admin/work-experience", icon: Briefcase },
  { name: "Projects", href: "/admin/projects", icon: Computer },
  { name: "Skills", href: "/admin/skills", icon: Zap },
  { name: "User Management", href: "/admin/users", icon: Users },
  { name: "Static Pages", href: "/admin/pages", icon: FileText },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside 
      className={cn(
        "relative flex flex-col border-r bg-muted/20 transition-all duration-300 ease-in-out md:h-screen",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex h-16 items-center border-b px-4">
        {!collapsed && (
          <span className="text-lg font-bold tracking-tight">Admin CMS</span>
        )}
        <Button 
          variant="ghost" 
          size="icon" 
          className="ml-auto" 
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <Menu className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
        </Button>
      </div>

      <nav className="flex-1 space-y-1 p-2">
        {sidebarItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
                isActive 
                  ? "bg-primary text-primary-foreground" 
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
                collapsed && "justify-center"
              )}
            >
              <item.icon className={cn("h-5 w-5", !collapsed && "mr-3")} />
              {!collapsed && <span>{item.name}</span>}
            </Link>
          );
        })}
      </nav>

      <div className="border-t p-4">
        <Link 
          href="/"
          className={cn(
            "flex items-center text-xs text-muted-foreground hover:text-foreground",
            collapsed && "justify-center"
          )}
        >
          <FileText className={cn("h-4 w-4", !collapsed && "mr-2")} />
          {!collapsed && <span>Back to Site</span>}
        </Link>
      </div>
    </aside>
  );
}
