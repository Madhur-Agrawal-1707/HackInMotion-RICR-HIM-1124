import React from 'react';
import type { Company } from '../types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '../../../components/ui/card';
import { Badge } from '../../../components/ui/badge';
import { Button } from '../../../components/ui/button';
import { Link } from 'react-router-dom';

interface CompanyCardProps {
  company: Company;
}

export const CompanyCard: React.FC<CompanyCardProps> = ({ company }) => {
  return (
    <Card className="flex flex-col h-full hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl mb-1">{company.name}</CardTitle>
            <CardDescription>{company.industry}</CardDescription>
          </div>
          {company.logo && (
            <img src={company.logo} alt={`${company.name} logo`} className="w-10 h-10 rounded-full object-cover" />
          )}
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="text-sm text-gray-600 line-clamp-3">{company.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Badge variant="secondary">{company.roles.length} Roles</Badge>
        </div>
      </CardContent>
      <CardFooter>
        <Link to={`/company/${company.slug}`} className="w-full">
          <Button variant="outline" className="w-full">View Details</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};
