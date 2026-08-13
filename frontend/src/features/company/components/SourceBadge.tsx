import React from 'react';
import { Badge } from '../../../components/ui/badge';

interface SourceBadgeProps {
  sourceType: 'OFFICIAL' | 'VERIFIED_REPORT' | 'COMMUNITY_REPORTED' | 'CURATED' | 'AI_GENERATED';
  verified?: boolean;
}

export const SourceBadge: React.FC<SourceBadgeProps> = ({ sourceType, verified }) => {
  const getBadgeVariant = () => {
    switch (sourceType) {
      case 'OFFICIAL':
        return 'success';
      case 'VERIFIED_REPORT':
        return 'info';
      case 'COMMUNITY_REPORTED':
        return 'warning';
      case 'CURATED':
        return 'secondary';
      case 'AI_GENERATED':
        return 'outline';
      default:
        return 'default';
    }
  };

  const getLabel = () => {
    return sourceType.replace('_', ' ');
  };

  return (
    <Badge variant={getBadgeVariant()} className="uppercase text-[10px] tracking-wider">
      {getLabel()} {verified && '✓'}
    </Badge>
  );
};
