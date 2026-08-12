export const SUMMARY_PROMPT = `Write a professional, encouraging, and constructive executive summary of the candidate's interview performance.
The summary should be 2-3 paragraphs. It must be unbiased and objective.

Context:
Target Role: {targetRole}
Overall Score: {overallScore}
Strengths: {strengths}
Weaknesses: {weaknesses}

Provide just the summary text.`;
