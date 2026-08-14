import { BrowserRouter, Navigate, Route, Routes, useParams } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './lib/react-query';

// Auth Pages
import Login from './features/auth/pages/Login';
import Register from './features/auth/pages/Register';
import ForgotPassword from './features/auth/pages/ForgotPassword';
import ResetPassword from './features/auth/pages/ResetPassword';
import { ProtectedRoute } from './features/auth/components/ProtectedRoute';
import { PublicRoute } from './features/auth/components/PublicRoute';

// User Pages
import Profile from './features/user/pages/Profile';
import Settings from './features/user/pages/Settings';

// Company Pages
import { CompanyExplorer } from './features/company/pages/CompanyExplorer';
import { CompanyDetails } from './features/company/pages/CompanyDetails';
import { CompanyQuestionBank } from './features/company/pages/CompanyQuestionBank';
import { CompanyInterviewSetup } from './features/company/pages/CompanyInterviewSetup';

// Interview Pages
import { InterviewHistory } from './features/interview/pages/InterviewHistory';
import { InterviewSetup } from './features/interview/pages/InterviewSetup';
import { LiveInterview } from './features/interview/pages/LiveInterview';
import { CodingInterview } from './features/interview/pages/CodingInterview';

// Feedback Pages
import { FeedbackDashboard } from './features/feedback/pages/FeedbackDashboard';

// Resume Pages
import { ResumeDashboard } from './features/resume/pages/ResumeDashboard';
import { UploadResumePage } from './features/resume/pages/UploadResumePage';
import { ResumeBuilderPage } from './features/resume/pages/ResumeBuilderPage';
import { ResumeHistoryPage } from './features/resume/pages/ResumeHistoryPage';

// Roadmap Pages
import { RoadmapDashboard } from './features/roadmap/pages/RoadmapDashboard';
import { RoadmapDetails } from './features/roadmap/pages/RoadmapDetails';

// Home Page
import HomePage from './pages/HomePage';

// Wrapper for FeedbackDashboard to accept URL param
const FeedbackWrapper = () => {
  const { id } = useParams<{ id: string }>();
  return <FeedbackDashboard interviewId={id || 'demo-interview'} />;
};

// Wrapper for RoadmapDetails to accept URL param
const RoadmapWrapper = () => {
  const { id } = useParams<{ id: string }>();
  if (!id) return <Navigate to="/roadmap" replace />;
  return <RoadmapDetails roadmapId={id} />;
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          {/* Public Auth Routes */}
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
          </Route>

          {/* Protected Feature Routes */}
          <Route element={<ProtectedRoute />}>
            {/* User Routes */}
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />

            {/* Company Routes */}
            <Route path="/companies" element={<CompanyExplorer />} />
            <Route path="/companies/:slug" element={<CompanyDetails />} />
            <Route path="/companies/:slug/questions" element={<CompanyQuestionBank />} />
            <Route path="/companies/:slug/interview" element={<CompanyInterviewSetup />} />

            {/* Interview Routes */}
            <Route path="/interviews" element={<InterviewHistory />} />
            <Route path="/interviews/setup" element={<InterviewSetup />} />
            <Route path="/interviews/live/:id" element={<LiveInterview />} />
            <Route path="/interviews/coding/:id" element={<CodingInterview />} />

            {/* Feedback Routes */}
            <Route path="/feedback/:id" element={<FeedbackWrapper />} />
            <Route path="/feedback" element={<FeedbackDashboard interviewId="demo-interview" />} />

            {/* Resume Routes */}
            <Route path="/resume" element={<ResumeDashboard />} />
            <Route path="/resume/upload" element={<UploadResumePage />} />
            <Route path="/resume/build/:id" element={<ResumeBuilderPage />} />
            <Route path="/resume/history/:id" element={<ResumeHistoryPage />} />

            {/* Roadmap Routes */}
            <Route path="/roadmap" element={<RoadmapDashboard />} />
            <Route path="/roadmap/:id" element={<RoadmapWrapper />} />
          </Route>

          {/* Root/Fallback */}
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
