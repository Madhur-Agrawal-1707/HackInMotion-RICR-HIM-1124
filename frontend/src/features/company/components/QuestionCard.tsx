import React from 'react';
import type { CompanyInterviewQuestion } from '../types';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '../../../components/ui/card';
import { SourceBadge } from './SourceBadge';
import { Badge } from '../../../components/ui/badge';

interface QuestionCardProps {
  question: CompanyInterviewQuestion;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({ question }) => {
  return (
    <Card className="mb-4">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start gap-4">
          <CardTitle className="text-lg font-medium leading-tight">
            {question.questionText}
          </CardTitle>
          <SourceBadge sourceType={question.sourceType} verified={question.verified} />
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex flex-wrap gap-2 text-sm text-gray-500 mb-2">
          <span>{question.category}</span>
          <span>•</span>
          <span className={`font-semibold ${
            question.difficulty === 'EASY' ? 'text-green-600' :
            question.difficulty === 'MEDIUM' ? 'text-yellow-600' :
            question.difficulty === 'HARD' ? 'text-red-600' : 'text-purple-600'
          }`}>
            {question.difficulty}
          </span>
          <span>•</span>
          <span>{question.round.replace('_', ' ')}</span>
          {question.sourceYear && (
            <>
              <span>•</span>
              <span>Reported in {question.sourceYear}</span>
            </>
          )}
        </div>
        
        {question.tags && question.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {question.tags.map(tag => (
              <Badge key={tag} variant="outline" className="text-xs font-normal bg-gray-50">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
      {question.sourceUrl && (
        <CardFooter className="pt-2 pb-4">
          <a href={question.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline">
            View Source {question.sourceTitle && `- ${question.sourceTitle}`}
          </a>
        </CardFooter>
      )}
    </Card>
  );
};
