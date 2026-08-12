import React from 'react';
import { useFeedback } from '../api/feedback.api';
import { ScoreCard } from '../components/ScoreCard';
import { PerformanceChart } from '../components/PerformanceChart';
import { StrengthList, WeaknessList, RecommendationList } from '../components/ListComponents';
import { Trophy, Code, BrainCircuit, MessageSquare, Download } from 'lucide-react';

export const FeedbackDashboard: React.FC<{ interviewId: string }> = ({ interviewId }) => {
  const { data: report, isLoading, error } = useFeedback(interviewId);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[500px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error || !report) {
    return (
      <div className="p-8 text-center text-red-500">
        Failed to load feedback report. {error?.message}
      </div>
    );
  }

  const radarData = [
    { subject: 'Technical', A: report.technicalScore, fullMark: 100 },
    { subject: 'Problem Solving', A: report.problemSolvingScore, fullMark: 100 },
    { subject: 'Communication', A: report.communicationScore, fullMark: 100 },
    { subject: 'Coding', A: report.codingScore, fullMark: 100 },
    { subject: 'Behavioral', A: report.behavioralScore, fullMark: 100 },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Interview Feedback Report</h1>
          <p className="text-gray-500 mt-2">Detailed analysis of your recent interview performance</p>
        </div>
        <button 
          onClick={() => window.open(`http://localhost:3000/api/feedback/${interviewId}/pdf`, '_blank')}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-medium transition-colors"
        >
          <Download className="w-5 h-5" /> Download PDF
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <ScoreCard title="Overall Score" score={report.overallScore} icon={Trophy} colorClass="bg-indigo-500" />
        <ScoreCard title="Technical" score={report.technicalScore} icon={Code} colorClass="bg-blue-500" />
        <ScoreCard title="Problem Solving" score={report.problemSolvingScore} icon={BrainCircuit} colorClass="bg-purple-500" />
        <ScoreCard title="Communication" score={report.communicationScore} icon={MessageSquare} colorClass="bg-emerald-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Executive Summary</h2>
          <p className="text-gray-700 leading-relaxed">{report.summary}</p>
        </div>
        <div className="lg:col-span-1">
          <PerformanceChart data={radarData} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <StrengthList strengths={report.strengths} />
        <WeaknessList weaknesses={report.weaknesses} />
        <RecommendationList recommendations={report.recommendations} />
      </div>
    </div>
  );
};
