import React from 'react';
import { Resource } from '../types';

interface ResourceDetailProps {
  resource: Resource;
  onBack: () => void;
}

const ResourceDetail: React.FC<ResourceDetailProps> = ({ resource, onBack }) => {
  
  const formatArticleContent = (content: string) => {
    return content.split('\n').map((paragraph, index) => (
      <p key={index} className="mb-4">{paragraph}</p>
    ));
  };

  return (
    <div className="p-4 md:p-8 h-full">
      <button onClick={onBack} className="text-sm text-teal-600 hover:underline mb-4">&larr; Back to Resources</button>
      <article>
        <h2 className="text-3xl font-bold text-slate-800 mb-2">{resource.title}</h2>
        <p className="text-sm font-semibold text-teal-600 uppercase tracking-wide mb-6">{resource.category}</p>

        {resource.type === 'video' ? (
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              src={resource.content}
              title={resource.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full rounded-lg shadow-lg"
              style={{ minHeight: '400px'}}
            ></iframe>
          </div>
        ) : (
          <div className="prose max-w-none text-slate-700">
            {formatArticleContent(resource.content)}
          </div>
        )}
      </article>
    </div>
  );
};

export default ResourceDetail;