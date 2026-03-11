import { useState } from 'react';
import { 
  LayoutGrid, 
  Users, 
  FileText, 
  Calendar, 
  Settings, 
  Bell,
  Search,
  ChevronLeft,
  ChevronRight,
  Stethoscope,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface NavRailProps {
  collapsed: boolean;
  onToggle: () => void;
}

const navItems = [
  { icon: LayoutGrid, label: 'Dashboard', active: false },
  { icon: Users, label: 'Patients', active: true },
  { icon: FileText, label: 'Documents', active: false },
  { icon: Calendar, label: 'Schedule', active: false },
];

const bottomItems = [
  { icon: Bell, label: 'Notifications', badge: 3 },
  { icon: Search, label: 'Search' },
  { icon: Settings, label: 'Settings' },
];

export function NavRail({ collapsed, onToggle }: NavRailProps) {
  return (
    <nav 
      className={cn(
        "flex flex-col h-screen bg-sidebar text-sidebar-foreground border-r border-sidebar-border",
        "transition-all duration-200 ease-in-out",
        collapsed ? "w-14" : "w-48"
      )}
    >
      {/* Logo */}
      <div className="flex items-center h-header-height px-3 border-b border-sidebar-border">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <Stethoscope className="w-5 h-5 text-primary-foreground" />
          </div>
          {!collapsed && (
            <span className="font-semibold text-sm tracking-tight">SugboDoc</span>
          )}
        </div>
      </div>

      {/* Main nav */}
      <div className="flex-1 py-3 space-y-1 px-2">
        {navItems.map((item) => (
          <Tooltip key={item.label} delayDuration={0}>
            <TooltipTrigger asChild>
              <button
                className={cn(
                  "w-full flex items-center gap-3 px-2.5 py-2 rounded-md text-sm",
                  "transition-colors duration-150",
                  item.active 
                    ? "bg-sidebar-accent text-sidebar-primary" 
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                )}
              >
                <item.icon className="w-5 h-5 shrink-0" />
                {!collapsed && <span>{item.label}</span>}
              </button>
            </TooltipTrigger>
            {collapsed && (
              <TooltipContent side="right" sideOffset={8}>
                {item.label}
              </TooltipContent>
            )}
          </Tooltip>
        ))}
      </div>

      {/* Bottom nav */}
      <div className="py-3 space-y-1 px-2 border-t border-sidebar-border">
        {bottomItems.map((item) => (
          <Tooltip key={item.label} delayDuration={0}>
            <TooltipTrigger asChild>
              <button
                className={cn(
                  "w-full flex items-center gap-3 px-2.5 py-2 rounded-md text-sm",
                  "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground",
                  "transition-colors duration-150 relative"
                )}
              >
                <item.icon className="w-5 h-5 shrink-0" />
                {!collapsed && <span>{item.label}</span>}
                {'badge' in item && item.badge && (
                  <span className="absolute top-1 left-6 w-4 h-4 rounded-full bg-destructive text-[10px] font-medium flex items-center justify-center text-destructive-foreground">
                    {item.badge}
                  </span>
                )}
              </button>
            </TooltipTrigger>
            {collapsed && (
              <TooltipContent side="right" sideOffset={8}>
                {item.label}
              </TooltipContent>
            )}
          </Tooltip>
        ))}
      </div>

      {/* Collapse toggle */}
      <button
        onClick={onToggle}
        className="flex items-center justify-center h-10 border-t border-sidebar-border text-sidebar-foreground/50 hover:text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
      >
        {collapsed ? (
          <ChevronRight className="w-4 h-4" />
        ) : (
          <ChevronLeft className="w-4 h-4" />
        )}
      </button>
    </nav>
  );
}
