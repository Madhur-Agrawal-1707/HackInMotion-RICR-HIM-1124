import React from 'react';

interface ControlsProps {
  onSkip: () => void;
  onPause: () => void;
  onEnd: () => void;
}

export const Controls: React.FC<ControlsProps> = ({ onSkip, onPause, onEnd }) => {
  return (
    <div className="flex gap-3 items-center justify-center py-4">
      <button
        onClick={onSkip}
        className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
      >
        Skip Question
      </button>
      <button
        onClick={onPause}
        className="px-4 py-2 text-sm font-medium text-yellow-700 bg-yellow-100 rounded-lg hover:bg-yellow-200 transition-colors"
      >
        Pause Interview
      </button>
      <button
        onClick={onEnd}
        className="px-4 py-2 text-sm font-medium text-red-700 bg-red-100 rounded-lg hover:bg-red-200 transition-colors"
      >
        End Interview
      </button>
    </div>
  );
};
