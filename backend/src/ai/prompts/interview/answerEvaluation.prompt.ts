export const ANSWER_EVALUATION_PROMPT = `
Evaluate the candidate's answer based on the question asked.

Question: {questionText}
Candidate's Answer: {answerText}
Expected Difficulty: {difficulty}

Provide a structured evaluation with scores from 0-100 for correctness, technicalDepth, communication, confidence, and relevance.
`;
