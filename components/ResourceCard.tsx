import React from 'react';
import { Resource } from '../types';

interface ResourceCardProps {
  resource: Resource;
  onSelect: (resource: Resource) => void;
}

const ResourceCard: React.FC<ResourceCardProps> = ({ resource, onSelect }) => {
  return (
    <button
      onClick={() => onSelect(resource)}
      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 text-left border border-slate-200 w-full flex flex-col"
    >
      <img className="h-40 w-full object-cover" src={resource.imageUrl} alt={resource.title} />
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex-grow">
            <p className="text-xs font-semibold text-teal-600 uppercase tracking-wide">{resource.category}</p>
            <h3 className="mt-1 font-semibold text-lg text-slate-800 leading-tight">{resource.title}</h3>
            <p className="mt-2 text-sm text-slate-500">{resource.snippet}</p>
        </div>
        <div className="mt-4">
             <span className="text-sm font-medium text-teal-600 hover:text-teal-500">
                {resource.type === 'video' ? 'Watch Video →' : 'Read Article →'}
             </span>
        </div>
      </div>
    </button>
  );
};

export default ResourceCard;