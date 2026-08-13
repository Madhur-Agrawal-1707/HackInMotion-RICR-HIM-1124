import React from 'react';

// Mock data
const mockHistory = [
  { id: '1', date: '2026-08-10', role: 'Frontend Developer', type: 'Technical', status: 'COMPLETED', score: 85 },
  { id: '2', date: '2026-08-12', role: 'Full Stack Engineer', type: 'Coding', status: 'COMPLETED', score: 92 },
];

export const InterviewHistory: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 mt-10">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Interview History</h1>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
            <tr>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4">Type</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Score</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {mockHistory.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-sm text-gray-600">{item.date}</td>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{item.role}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{item.type}</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {item.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm font-bold text-gray-900 text-right">{item.score}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
