import React, { useState, useMemo } from 'react';
import { RESOURCES, RESOURCE_CATEGORIES } from '../constants';
import { Resource, ResourceCategory } from '../types';
import ResourceCard from './ResourceCard';
import ResourceDetail from './ResourceDetail';

const ResourceHub: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<ResourceCategory | 'All'>('All');
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);

  const filteredResources = useMemo(() => {
    if (selectedCategory === 'All') {
      return RESOURCES;
    }
    return RESOURCES.filter(r => r.category === selectedCategory);
  }, [selectedCategory]);

  const handleSelectResource = (resource: Resource) => {
    setSelectedResource(resource);
  };

  const handleBack = () => {
    setSelectedResource(null);
  };
  
  const getCategoryClasses = (category: ResourceCategory | 'All') => {
      const isActive = selectedCategory === category;
      return `px-4 py-2 text-sm font-medium rounded-full transition-colors ${
          isActive ? 'bg-teal-500 text-white' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
      }`
  }

  if (selectedResource) {
    return <ResourceDetail resource={selectedResource} onBack={handleBack} />;
  }

  return (
    <div className="p-4 md:p-6">
      <h2 className="text-2xl font-bold text-slate-800 mb-2">Resource Hub</h2>
      <p className="text-slate-600 mb-6">Explore articles and videos to support your well-being.</p>

      <div className="flex flex-wrap items-center gap-2 mb-6">
        <button onClick={() => setSelectedCategory('All')} className={getCategoryClasses('All')}>
          All
        </button>
        {RESOURCE_CATEGORIES.map(category => (
          <button key={category} onClick={() => setSelectedCategory(category)} className={getCategoryClasses(category)}>
            {category}
          </button>
        ))}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map(resource => (
            <ResourceCard key={resource.id} resource={resource} onSelect={handleSelectResource} />
        ))}
      </div>
    </div>
  );
};

export default ResourceHub;