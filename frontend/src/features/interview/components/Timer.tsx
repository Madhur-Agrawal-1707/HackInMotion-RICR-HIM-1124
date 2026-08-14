import React, { useEffect } from 'react';
import { useInterviewStore } from '../store/interviewStore';

export const Timer: React.FC<{ onTimeUp?: () => void }> = ({ onTimeUp }) => {
  const { timeRemaining, setTimeRemaining } = useInterviewStore();

  useEffect(() => {
    if (timeRemaining <= 0) {
      if (onTimeUp) onTimeUp();
      return;
    }
    const interval = setInterval(() => {
      setTimeRemaining(timeRemaining - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timeRemaining, setTimeRemaining, onTimeUp]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div className="font-mono text-2xl text-blue-600 font-bold p-2 bg-blue-50 rounded-md shadow-sm border border-blue-100">
      {formatTime(timeRemaining)}
    </div>
  );
};
