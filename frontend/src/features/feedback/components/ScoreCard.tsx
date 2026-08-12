import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface ScoreCardProps {
  title: string;
  score: number;
  icon: LucideIcon;
  colorClass: string;
}

export const ScoreCard: React.FC<ScoreCardProps> = ({ title, score, icon: Icon, colorClass }) => {
  return (
    <div className={`p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 bg-white hover:shadow-md transition-shadow`}>
      <div className={`p-4 rounded-xl ${colorClass}`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <div>
        <p className="text-sm text-gray-500 font-medium">{title}</p>
        <p className="text-2xl font-bold text-gray-900">{score.toFixed(1)} <span className="text-sm font-normal text-gray-400">/ 100</span></p>
      </div>
    </div>
  );
};
