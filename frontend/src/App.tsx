
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FeedbackDashboard } from './features/feedback/pages/FeedbackDashboard';

const queryClient = new QueryClient();

function App() {
  // In a real application, this ID would come from the router
  const mockInterviewId = '12345-mock-id';

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gray-50">
        <FeedbackDashboard interviewId={mockInterviewId} />
      </div>
    </QueryClientProvider>
  );
}

export default App;
