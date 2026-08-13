import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCompany } from '../hooks/api/useCompanyApi';
import { Button } from '../../../components/ui/button';

export const CompanyDetails: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data, isLoading, error } = useCompany(slug || '');

  if (isLoading) {
    return <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div></div>;
  }

  if (error || !data) {
    return <div className="text-center py-20 text-red-600">Failed to load company details.</div>;
  }

  const company = data.data;

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/company" className="text-sm text-blue-600 hover:underline mb-6 inline-block">
        ← Back to Companies
      </Link>
      
      <div className="bg-white rounded-xl shadow-sm border p-6 md:p-8 mb-8">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          {company.logo && (
            <img src={company.logo} alt={company.name} className="w-24 h-24 rounded-xl object-cover border" />
          )}
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2">{company.name}</h1>
            <p className="text-gray-500 text-lg mb-4">{company.industry}</p>
            <p className="text-gray-700 max-w-3xl">{company.description}</p>
            {company.website && (
              <a href={company.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline mt-4 inline-block">
                Visit Website
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h2 className="text-xl font-semibold mb-4">Question Bank</h2>
          <p className="text-gray-600 mb-6">
            Browse through historical, curated, and AI-generated interview questions specific to {company.name}.
          </p>
          <Link to={`/company/${company.slug}/questions`}>
            <Button className="w-full">Browse Questions</Button>
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h2 className="text-xl font-semibold mb-4">Practice Interview</h2>
          <p className="text-gray-600 mb-6">
            Set up an AI-driven mock interview tailored to {company.name}'s specific roles and interview patterns.
          </p>
          <Link to={`/company/${company.slug}/interview-setup`}>
            <Button variant="secondary" className="w-full">Setup Interview</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
