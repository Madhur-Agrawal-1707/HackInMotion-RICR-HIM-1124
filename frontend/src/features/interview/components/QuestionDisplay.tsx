import React from 'react';
import { useInterviewStore } from '../store/interviewStore';

export const QuestionDisplay: React.FC = () => {
  const currentQuestion = useInterviewStore((state) => state.currentQuestion);

  if (!currentQuestion) {
    return <div className="p-4 text-gray-500 italic text-center">Loading next question...</div>;
  }

  return (
    <div className="p-8 bg-white rounded-xl shadow-md border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
          Question {currentQuestion.sequence}
        </span>
        <div className="flex gap-2">
          <span className="text-xs font-medium bg-blue-50 text-blue-600 px-2 py-1 rounded">
            {currentQuestion.topic}
          </span>
          <span className="text-xs font-medium bg-purple-50 text-purple-600 px-2 py-1 rounded">
            {currentQuestion.difficulty}
          </span>
        </div>
      </div>
      <h2 className="text-2xl font-bold text-gray-800 leading-relaxed">
        {currentQuestion.questionText}
      </h2>
    </div>
  );
};
