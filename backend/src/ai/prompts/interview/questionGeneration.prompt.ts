export const QUESTION_GENERATION_PROMPT = `
Generate the next interview question based on the following context:

Target Role: {targetRole}
Experience Level: {experienceLevel}
Domain: {domain}
Current Topic: {currentTopic}
Difficulty: {difficulty}

Candidate Weaknesses: {weakAreas}
Candidate Strengths: {strongAreas}

Previous Q&A:
{qaHistory}

Generate a clear, concise, and role-specific question that avoids repeating previous questions.
`;
