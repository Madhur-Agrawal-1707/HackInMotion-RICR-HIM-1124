export const RECOMMENDATION_PROMPT = `Based on the evaluated answers, scores, strengths, weaknesses, and skill gaps, generate actionable recommendations.
Provide actionable steps categorized by technical, problem-solving, communication, or behavioral areas.

Context:
Target Role: {targetRole}
Skill Gaps: {skillGaps}
Weaknesses: {weaknesses}

Return a list of recommendations, each with a 'category' and 'actionableStep'.`;
