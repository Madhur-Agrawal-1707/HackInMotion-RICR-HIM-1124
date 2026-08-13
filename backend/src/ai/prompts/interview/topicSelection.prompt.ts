export const TOPIC_SELECTION_PROMPT = `
Select the most appropriate next topic for the interview.

Target Role: {targetRole}
Domain: {domain}
Topics Covered: {topicsCovered}
Topics Remaining: {topicsRemaining}
Candidate Weaknesses: {weakAreas}
Interview Type: {interviewType}

Output only the name of the next topic from the remaining topics list.
`;
