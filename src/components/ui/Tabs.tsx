import React, { useState } from 'react';
import { cn } from '../../utils/cn';

export interface TabItem {
  id: string;
  label: string;
  badge?: string | number;
  content: React.ReactNode;
}

export interface TabsProps {
  tabs: TabItem[];
  defaultTabId?: string;
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({ tabs, defaultTabId, className }) => {
  const [activeTab, setActiveTab] = useState<string>(defaultTabId || tabs[0]?.id);

  const currentTab = tabs.find((t) => t.id === activeTab);

  return (
    <div className={cn('w-full', className)}>
      <div className="flex border-b border-zinc-800/80 space-x-2 pb-1">
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'relative flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-colors rounded-lg',
                isActive
                  ? 'text-white bg-zinc-800/60'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/30'
              )}
            >
              {tab.label}
              {tab.badge !== undefined && (
                <span
                  className={cn(
                    'rounded-full px-2 py-0.5 text-xs',
                    isActive ? 'bg-[#7C5CFC]/20 text-[#7C5CFC]' : 'bg-zinc-800 text-zinc-400'
                  )}
                >
                  {tab.badge}
                </span>
              )}
              {isActive && (
                <div className="absolute bottom-[-5px] left-2 right-2 h-[2px] rounded-full bg-[#7C5CFC]" />
              )}
            </button>
          );
        })}
      </div>
      <div className="pt-4">{currentTab?.content}</div>
    </div>
  );
};
