import React from 'react';
import { Timer } from '../components/Timer';
import { QuestionDisplay } from '../components/QuestionDisplay';
import { AnswerInput } from '../components/AnswerInput';
import { Controls } from '../components/Controls';
import { useParams } from 'react-router-dom';
import { useSubmitAnswer, useInterviewSession, useNextQuestion } from '../api/interviewApi';
import { useInterviewStore } from '../store/interviewStore';

export const LiveInterview: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  
  const { data: sessionData, isLoading: isSessionLoading } = useInterviewSession(id || '');
  const { data: nextQuestionData, isLoading: isQuestionLoading, refetch: refetchNextQuestion } = useNextQuestion(id || '');
  
  const submitMutation = useSubmitAnswer();
  
  const { currentSession, currentQuestion, setSession, setCurrentQuestion, setTimeRemaining } = useInterviewStore();

  // Sync session and question data to store
  React.useEffect(() => {
    if (sessionData) {
      setSession(sessionData);
    }
  }, [sessionData, setSession]);

  React.useEffect(() => {
    if (nextQuestionData) {
      setCurrentQuestion(nextQuestionData);
      // Initialize timer based on the question's timeLimit (default 120s if undefined)
      setTimeRemaining(nextQuestionData.timeLimit || 120);
    }
  }, [nextQuestionData, setCurrentQuestion, setTimeRemaining]);

  const handleAnswerSubmit = (answer: string) => {
    if (!currentSession || !currentQuestion) return;
    submitMutation.mutate({
      sessionId: currentSession._id,
      answer: {
        questionId: currentQuestion.questionId,
        answerText: answer,
        isSkipped: false,
      }
    }, {
      onSuccess: () => {
        // Fetch the next question after successfully submitting
        refetchNextQuestion();
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

  if (isSessionLoading || isQuestionLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading interview session...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen flex flex-col gap-6 pt-10">
      <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <div>
          <h1 className="text-xl font-bold text-gray-800">Technical Interview</h1>
          <p className="text-sm text-gray-500">{currentSession?.targetRole || 'Developer'} - {currentSession?.domain || 'General'}</p>
        </div>
        <Timer onTimeUp={() => handleSkip()} />
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
