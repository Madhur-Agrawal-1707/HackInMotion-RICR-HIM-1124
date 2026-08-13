import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useCompany, useCompanyRoles, useStartInterview } from '../hooks/api/useCompanyApi';
import { RoleSelector } from '../components/RoleSelector';
import { Button } from '../../../components/ui/button';

export const CompanyInterviewSetup: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { data: companyData, isLoading: isLoadingCompany } = useCompany(slug || '');
  const companyId = companyData?.data?.id || '';
  const { data: rolesData, isLoading: isLoadingRoles } = useCompanyRoles(companyId);
  const startInterview = useStartInterview();

  const [selectedRole, setSelectedRole] = useState<string>('');
  const [selectedRound, setSelectedRound] = useState<string>('');
  const [difficulty, setDifficulty] = useState<string>('MEDIUM');
  
  if (isLoadingCompany || isLoadingRoles) {
    return <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div></div>;
  }

  const company = companyData?.data;
  const roles = rolesData?.data || [];

  const handleStartInterview = async () => {
    if (!companyId || !selectedRole || !selectedRound) return;
    
    try {
      const response = await startInterview.mutateAsync({
        companyId,
        roleId: selectedRole,
        interviewType: selectedRound,
        context: { difficulty }
      });
      
      // Navigate to the interview session 
      if (response.success && response.data.interviewId) {
        navigate(`/interview/${response.data.interviewId}`);
      }
    } catch (error) {
      console.error('Failed to start interview:', error);
      alert('Failed to start interview. Please try again.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <Link to={`/company/${slug}`} className="text-sm text-blue-600 hover:underline mb-6 inline-block">
        ← Back to {company?.name || 'Company'}
      </Link>
      
      <div className="bg-white rounded-xl shadow-sm border p-6 md:p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Configure Practice Interview</h1>
        <p className="text-gray-600 mb-8">
          Customize your mock interview for {company?.name}. The AI will tailor the questions and evaluation 
          based on the company's historical interview patterns and the specific role.
        </p>

        <div className="space-y-6">
          <RoleSelector 
            roles={roles} 
            selectedRoleId={selectedRole} 
            onSelectRole={setSelectedRole} 
          />

          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium text-gray-700">Interview Round</label>
            <select
              className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={selectedRound}
              onChange={(e) => setSelectedRound(e.target.value)}
            >
              <option value="" disabled>Select round type</option>
              <option value="ONLINE_ASSESSMENT">Online Assessment</option>
              <option value="CODING">Coding</option>
              <option value="TECHNICAL">Technical</option>
              <option value="SYSTEM_DESIGN">System Design</option>
              <option value="BEHAVIORAL">Behavioral</option>
            </select>
          </div>

          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium text-gray-700">Difficulty Level</label>
            <select
              className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
            >
              <option value="EASY">Easy</option>
              <option value="MEDIUM">Medium</option>
              <option value="HARD">Hard</option>
              <option value="EXPERT">Expert</option>
            </select>
          </div>

          <div className="pt-4">
            <Button 
              className="w-full" 
              size="lg"
              disabled={!selectedRole || !selectedRound || startInterview.isPending}
              onClick={handleStartInterview}
            >
              {startInterview.isPending ? 'Preparing Interview...' : 'Start Interview'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
