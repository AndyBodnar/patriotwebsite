'use client';

import { ReactNode } from 'react';

interface DashboardCardProps {
  title: string;
  children: ReactNode;
  action?: ReactNode;
  className?: string;
}

export default function DashboardCard({ title, children, action, className = '' }: DashboardCardProps) {
  return (
    <div className={`bg-patriot-navy border-2 border-phoenix-coral/30 rounded-lg p-6 hover:border-phoenix-coral/60 transition-colors ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-desert-tan">{title}</h3>
        {action && <div>{action}</div>}
      </div>
      <div>{children}</div>
    </div>
  );
}
