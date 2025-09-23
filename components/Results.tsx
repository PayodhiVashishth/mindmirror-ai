import React from 'react';
import { Interpretation } from '../types';

interface ResultsProps {
  score: number;
  interpretation: Interpretation;
  onReset: () => void;
}

const Results: React.FC<ResultsProps> = ({ score, interpretation, onReset }) => {
    
  return (
    <div className="flex flex-col items-center justify-center h-full p-8 bg-slate-50 text-center">
      <h2 className="text-2xl font-bold text-slate-800 mb-2">Your Results</h2>
      <p className="text-slate-600 mb-6">This is not a diagnosis. It's a snapshot to help you understand your feelings.</p>

      <div className="w-full max-w-md p-6 bg-white rounded-xl border border-slate-200 shadow-sm">
        <p className="text-sm text-slate-500">Your Score</p>
        <p className="text-6xl font-bold text-slate-800 my-2">{score}</p>
        <div className="flex items-center justify-center gap-2">
            <div className={`w-3 h-3 rounded-full ${interpretation.color || 'bg-slate-400'}`}></div>
            <p className="text-lg font-semibold text-slate-700">{interpretation.level}</p>
        </div>
        <p className="mt-4 text-slate-600">{interpretation.text}</p>
      </div>

      <button
        onClick={onReset}
        className="mt-8 px-6 py-2 bg-white border border-slate-300 text-slate-700 font-semibold rounded-full shadow-sm hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
      >
        Take Another Test
      </button>
    </div>
  );
};

export default Results;