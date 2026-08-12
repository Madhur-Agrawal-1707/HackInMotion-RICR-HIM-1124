import React from 'react';
import { CheckCircle, AlertTriangle, Lightbulb } from 'lucide-react';

interface StrengthListProps {
  strengths: Array<{ topic: string; description: string }>;
}

export const StrengthList: React.FC<StrengthListProps> = ({ strengths }) => (
  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
    <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-4">
      <CheckCircle className="text-green-500 w-5 h-5" /> Strengths
    </h3>
    <ul className="space-y-4">
      {strengths.map((s, i) => (
        <li key={i} className="flex gap-3 items-start">
          <div className="w-2 h-2 rounded-full bg-green-500 mt-2"></div>
          <div>
            <p className="font-medium text-gray-800">{s.topic}</p>
            <p className="text-sm text-gray-500">{s.description}</p>
          </div>
        </li>
      ))}
    </ul>
  </div>
);

interface WeaknessListProps {
  weaknesses: Array<{ topic: string; description: string }>;
}

export const WeaknessList: React.FC<WeaknessListProps> = ({ weaknesses }) => (
  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
    <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-4">
      <AlertTriangle className="text-amber-500 w-5 h-5" /> Areas for Improvement
    </h3>
    <ul className="space-y-4">
      {weaknesses.map((w, i) => (
        <li key={i} className="flex gap-3 items-start">
          <div className="w-2 h-2 rounded-full bg-amber-500 mt-2"></div>
          <div>
            <p className="font-medium text-gray-800">{w.topic}</p>
            <p className="text-sm text-gray-500">{w.description}</p>
          </div>
        </li>
      ))}
    </ul>
  </div>
);

interface RecommendationListProps {
  recommendations: Array<{ category: string; actionableStep: string }>;
}

export const RecommendationList: React.FC<RecommendationListProps> = ({ recommendations }) => (
  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
    <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-4">
      <Lightbulb className="text-blue-500 w-5 h-5" /> Actionable Recommendations
    </h3>
    <ul className="space-y-4">
      {recommendations.map((r, i) => (
        <li key={i} className="flex gap-3 items-start">
          <div className="w-2 h-2 rounded-full bg-blue-500 mt-2"></div>
          <div>
            <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">{r.category}</p>
            <p className="text-sm text-gray-700">{r.actionableStep}</p>
          </div>
        </li>
      ))}
    </ul>
  </div>
);
