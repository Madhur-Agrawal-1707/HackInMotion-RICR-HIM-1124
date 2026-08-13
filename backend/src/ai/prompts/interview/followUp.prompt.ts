export const FOLLOW_UP_PROMPT = `
Based on the candidate's previous answer, generate a follow-up question.

Original Question: {questionText}
Candidate's Answer: {answerText}
Follow-up Type: {followUpType}
Target Role: {targetRole}
Difficulty: {difficulty}

Generate a focused follow-up question.
`;
