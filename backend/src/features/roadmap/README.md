# Roadmap Module

The Roadmap Module is responsible for converting candidate performance and skill gaps into a personalized, actionable learning roadmap.

## Architecture

This module follows a Feature-First Architecture, completely decoupled from other modules except via defined integration contracts (DTOs).
It utilizes Express.js for the API, Mongoose for the database model, and LangGraph for orchestrating the AI roadmap generation.

## LangGraph Workflow

The AI agent (`roadmapAgent`) executes the following sequential nodes:
1. `loadData`: Loads the candidate profile, resume skills, interview feedback, and target role requirements.
2. `analyzeSkillGaps`: Compares current skills against required skills to identify gaps.
3. `prioritizeSkills`: Prioritizes gaps based on role importance and interview performance.
4. `generateLearningPlan`: Generates sequential learning phases.
5. `generatePracticeTasks`: Assigns practical tasks to each phase.
6. `generateProjects`: Creates portfolio-worthy projects matching the skills.
7. `generateMilestones`: Defines measurable milestones for the roadmap.

## Data Sources

The Roadmap Agent consumes:
- Resume Data (Skills, Experience, Target Role)
- Interview Feedback (Scores, Strengths, Weaknesses, Topic Scores)
- User Preferences (Target Level, Timeline)

## API Endpoints

- `POST /api/roadmap/generate`: Generates a new roadmap, archives the previous one.
- `GET /api/roadmap`: Returns all roadmaps for the authenticated user.
- `GET /api/roadmap/:id`: Returns a specific roadmap details.
- `PATCH /api/roadmap/:id/progress`: Updates the progress of a roadmap (completing tasks/milestones).
- `DELETE /api/roadmap/:id`: Deletes a roadmap.

## Database Model

The `Roadmap` entity stores versions, target role, phases, milestones, projects, tasks, and tracking progress.

## Security

- All endpoints must be protected via authentication middleware (extracting `req.user.id`).
- Prompt injection defenses are built into the AI system prompts, and responses are validated via Zod structures.

## Environment Variables
- `MONGODB_URI`: Database connection.
- `OPENAI_API_KEY`: API key for the LangChain agent.
- `REDIS_URL`: For caching rate limits and role requirements.

## Testing
Run tests using the project's standard Jest setup:
\`\`\`bash
npm run test src/features/roadmap
\`\`\`
