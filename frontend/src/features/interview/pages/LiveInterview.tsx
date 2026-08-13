import React from 'react';
import { Timer } from '../components/Timer';
import { QuestionDisplay } from '../components/QuestionDisplay';
import { AnswerInput } from '../components/AnswerInput';
import { Controls } from '../components/Controls';
import { useSubmitAnswer } from '../api/interviewApi';
import { useInterviewStore } from '../store/interviewStore';

export const LiveInterview: React.FC = () => {
  const submitMutation = useSubmitAnswer();
  const currentSession = useInterviewStore(state => state.currentSession);
  const currentQuestion = useInterviewStore(state => state.currentQuestion);

  const handleAnswerSubmit = (answer: string) => {
    if (!currentSession || !currentQuestion) return;
    submitMutation.mutate({
      sessionId: currentSession._id,
      answer: {
        questionId: currentQuestion.questionId,
        answerText: answer,
        isSkipped: false,
      }
    });
  };

  const handleSkip = () => {
    if (!currentSession || !currentQuestion) return;
    submitMutation.mutate({
      sessionId: currentSession._id,
      answer: {
        questionId: currentQuestion.questionId,
        answerText: '',
        isSkipped: true,
      }
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen flex flex-col gap-6 pt-10">
      <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <div>
          <h1 className="text-xl font-bold text-gray-800">Technical Interview</h1>
          <p className="text-sm text-gray-500">React & Node.js Developer</p>
        </div>
        <Timer />
      </div>

      <div className="flex-1 flex flex-col gap-6">
        <QuestionDisplay />
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex-1">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">Your Answer</h3>
          <AnswerInput onSubmit={handleAnswerSubmit} isSubmitting={submitMutation.isPending} />
        </div>
      </div>

      <Controls 
        onSkip={handleSkip} 
        onPause={() => console.log('Paused')} 
        onEnd={() => console.log('Ended')} 
      />
    </div>
  );
};
