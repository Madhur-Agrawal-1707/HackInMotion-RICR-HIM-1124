import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Plus } from 'lucide-react';
import { useInterviewHistory } from '../api/interviewApi';

export const InterviewHistory: React.FC = () => {
  const { data: history, isLoading, isError } = useInterviewHistory();

  return (
    <div className="max-w-4xl mx-auto p-6 mt-10">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <Link to="/" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-800">Interview History</h1>
        </div>
        
        <Link 
          to="/interviews/setup" 
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          New Interview
        </Link>
      </div>
      
      {isLoading ? (
        <div className="text-center py-10 text-gray-500">Loading history...</div>
      ) : isError ? (
        <div className="text-center py-10 text-red-500">Failed to load history</div>
      ) : history && history.length > 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">Date & Time</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {history.map((item) => {
                const dateObj = new Date(item.createdAt);
                const isCompleted = item.status === 'COMPLETED';
                return (
                  <tr key={item._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm text-gray-600">
                      <div className="font-medium text-gray-900">{dateObj.toLocaleDateString()}</div>
                      <div className="text-xs text-gray-500 mt-0.5">{dateObj.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{item.targetRole}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      <div className="flex flex-wrap gap-1">
                        {Array.isArray(item.interviewType) ? item.interviewType.join(', ') : item.interviewType}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${isCompleted ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-right">
                      {isCompleted ? (
                        <button
                          onClick={() => window.location.href = `/feedback/${item._id}`}
                          className="text-indigo-600 hover:text-indigo-900 font-medium bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-lg transition-colors"
                        >
                          View Feedback
                        </button>
                      ) : (
                        <span className="text-gray-400 text-xs">Incomplete</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-10 text-center text-gray-500">
          No interview history found. Click "New Interview" to start one!
        </div>
      )}
    </div>
  );
};
