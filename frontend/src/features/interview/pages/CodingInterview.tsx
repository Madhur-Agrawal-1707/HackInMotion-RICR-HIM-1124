import React, { useState } from 'react';
import { Timer } from '../components/Timer';
import { QuestionDisplay } from '../components/QuestionDisplay';
import { CodeEditor } from '../components/CodeEditor';
import { Controls } from '../components/Controls';
import { useSubmitAnswer } from '../api/interviewApi';
import { useInterviewStore } from '../store/interviewStore';

export const CodingInterview: React.FC = () => {
  const [code, setCode] = useState('');
  const submitMutation = useSubmitAnswer();
  const currentSession = useInterviewStore(state => state.currentSession);
  const currentQuestion = useInterviewStore(state => state.currentQuestion);

  const handleSubmit = () => {
    if (!currentSession || !currentQuestion) return;
    submitMutation.mutate({
      sessionId: currentSession._id,
      answer: {
        questionId: currentQuestion.questionId,
        answerText: code,
        isSkipped: false,
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white px-6 py-4 flex justify-between items-center border-b border-gray-200">
        <h1 className="text-xl font-bold text-gray-800">Coding Assessment</h1>
        <Timer />
      </header>
      
      <div className="flex-1 flex overflow-hidden">
        {/* Left Side: Question */}
        <div className="w-1/3 border-r border-gray-200 bg-white p-6 overflow-y-auto">
          <QuestionDisplay />
        </div>
        
        {/* Right Side: Editor */}
        <div className="flex-1 p-6 flex flex-col">
          <div className="flex-1 flex flex-col">
            <CodeEditor 
              language="javascript" 
              initialCode="// Write your solution here..."
              onChange={setCode}
            />
            <div className="mt-4 flex justify-end">
              <button 
                onClick={handleSubmit}
                disabled={submitMutation.isPending}
                className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                Submit Code
              </button>
            </div>
          </div>
          
          <div className="mt-auto pt-6">
            <Controls 
              onSkip={() => {}} 
              onPause={() => {}} 
              onEnd={() => {}} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};
