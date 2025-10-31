'use client';

import { ReactNode } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon?: ReactNode;
  suffix?: string;
}

export default function MetricCard({ title, value, change, icon, suffix = '' }: MetricCardProps) {
  const isPositive = change && change > 0;
  const isNegative = change && change < 0;

  return (
    <div className="bg-patriot-navy border-2 border-phoenix-coral/30 rounded-lg p-6 hover:border-phoenix-coral transition-all hover:scale-105">
      <div className="flex items-start justify-between mb-2">
        <p className="text-desert-sand text-sm font-medium">{title}</p>
        {icon && <div className="text-phoenix-coral">{icon}</div>}
      </div>
      <div className="flex items-end justify-between">
        <div>
          <p className="text-3xl font-bold text-desert-tan">{value}{suffix}</p>
          {change !== undefined && (
            <div className={`flex items-center gap-1 mt-1 text-sm ${isPositive ? 'text-green-400' : isNegative ? 'text-red-400' : 'text-gray-400'}`}>
              {isPositive && <TrendingUp className="w-4 h-4" />}
              {isNegative && <TrendingDown className="w-4 h-4" />}
              <span>{Math.abs(change)}%</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
