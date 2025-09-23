import React from 'react';
import { Test } from '../types';
import { ClipboardIcon } from './icons/ClipboardIcon';

interface TestSelectorProps {
  tests: Test[];
  onSelectTest: (test: Test) => void;
}

const TestSelector: React.FC<TestSelectorProps> = ({ tests, onSelectTest }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full p-8 bg-slate-50 text-center">
      <h2 className="text-2xl font-bold text-slate-800 mb-2">Confidential Screening Tools</h2>
      <p className="max-w-xl text-slate-600 mb-8">
        These tools can help you understand your feelings better. They are not a diagnosis but can be a helpful starting point for a conversation. Your results are private.
      </p>
      <div className="w-full max-w-md space-y-4">
        {tests.map(test => (
          <button
            key={test.id}
            onClick={() => onSelectTest(test)}
            className="w-full flex items-center gap-4 p-5 bg-white border border-slate-200 rounded-xl text-left shadow-sm hover:shadow-md hover:border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
          >
            <div className="p-3 bg-teal-100 rounded-full">
                <ClipboardIcon className="w-6 h-6 text-teal-600" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-800">{test.title}</h3>
              <p className="text-sm text-slate-500">{test.description}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TestSelector;
