import React, { useState } from 'react';
import { useStartInterview } from '../api/interviewApi';
import type { StartInterviewRequest } from '../types/interview';

export const InterviewSetup: React.FC = () => {
  const startMutation = useStartInterview();
  const [formData, setFormData] = useState<StartInterviewRequest>({
    targetRole: '',
    experienceLevel: 'Fresher',
    interviewType: 'Technical',
    preferredDifficulty: 'Medium',
    duration: 30,
    domain: '',
    company: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startMutation.mutate(formData, {
      onSuccess: (data) => {
        // Redirect to interview session or handle start
        console.log('Interview Started', data);
      }
    });
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-sm border border-gray-200 mt-10">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Setup New Interview</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">Target Role</label>
            <input name="targetRole" value={formData.targetRole} onChange={handleChange} required className="p-2 border rounded-md" placeholder="e.g. Backend Developer" />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">Domain</label>
            <input name="domain" value={formData.domain} onChange={handleChange} required className="p-2 border rounded-md" placeholder="e.g. Node.js" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">Experience Level</label>
            <select name="experienceLevel" value={formData.experienceLevel} onChange={handleChange} className="p-2 border rounded-md bg-white">
              <option value="Student">Student</option>
              <option value="Fresher">Fresher</option>
              <option value="Junior">Junior</option>
              <option value="Mid-Level">Mid-Level</option>
              <option value="Senior">Senior</option>
              <option value="Lead">Lead</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">Interview Type</label>
            <select name="interviewType" value={formData.interviewType} onChange={handleChange} className="p-2 border rounded-md bg-white">
              <option value="Technical">Technical</option>
              <option value="HR">HR</option>
              <option value="Behavioral">Behavioral</option>
              <option value="Coding">Coding</option>
              <option value="Technical + Coding">Technical + Coding</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">Duration (minutes)</label>
            <select name="duration" value={formData.duration} onChange={handleChange} className="p-2 border rounded-md bg-white">
              <option value={15}>15 minutes</option>
              <option value={30}>30 minutes</option>
              <option value={45}>45 minutes</option>
              <option value={60}>60 minutes</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">Starting Difficulty</label>
            <select name="preferredDifficulty" value={formData.preferredDifficulty} onChange={handleChange} className="p-2 border rounded-md bg-white">
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
              <option value="Expert">Expert</option>
            </select>
          </div>
        </div>

        <button type="submit" disabled={startMutation.isPending} className="w-full mt-6 py-3 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 disabled:opacity-50">
          {startMutation.isPending ? 'Starting...' : 'Start Interview'}
        </button>
      </form>
    </div>
  );
};
