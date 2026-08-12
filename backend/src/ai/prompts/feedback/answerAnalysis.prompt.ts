export const ANSWER_ANALYSIS_PROMPT = `Analyze the candidate's answers from the interview based on the questions provided.

Context:
Target Role: {targetRole}
Experience Level: {experienceLevel}

Questions and Answers:
{qaPairs}

Provide an analysis for each answer based on: Correctness, Completeness, Technical Depth, Problem Solving, Reasoning, Communication, Relevance, Confidence.
For each answer, score it from 0 to 100 and identify strong/weak points.`;
