import { useState } from 'react';
import { cn } from '@/lib/utils';

export type ChartTab = 'overview' | 'bills' | 'notes-orders' | 'history' | 'admin';

interface ChartTabsProps {
  activeTab: ChartTab;
  onTabChange: (tab: ChartTab) => void;
}

const tabs: { id: ChartTab; label: string }[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'bills', label: 'Bills' },
  { id: 'notes-orders', label: 'Notes & Orders' },
  { id: 'history', label: 'History' },
  { id: 'admin', label: 'Admin' },
];

export function ChartTabs({ activeTab, onTabChange }: ChartTabsProps) {
  return (
    <div className="border-b border-border bg-card sticky top-[52px] z-10">
      <div className="flex items-center px-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              "px-4 py-2.5 text-sm font-medium relative transition-colors",
              activeTab === tab.id
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {tab.label}
            {activeTab === tab.id && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-t-full" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
