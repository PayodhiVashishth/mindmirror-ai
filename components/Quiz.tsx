import React, { useState } from 'react';
import { Test } from '../types';

interface QuizProps {
  test: Test;
  onShowResults: (score: number) => void;
  onBack: () => void;
}

const Quiz: React.FC<QuizProps> = ({ test, onShowResults, onBack }) => {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const allQuestionsAnswered = Object.keys(answers).length === test.questions.length;

  const handleAnswerChange = (questionId: number, value: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const handleSubmit = () => {
    const totalScore = Object.values(answers).reduce((sum: number, value: number) => sum + value, 0);
    onShowResults(totalScore);
  };


  return (
    <div className="p-6 md:p-8 bg-slate-50 h-full">
      <div className="mb-6">
        <button onClick={onBack} className="text-sm text-teal-600 hover:underline mb-2">&larr; Back to tests</button>
        <h2 className="text-xl font-bold text-slate-800">{test.title}</h2>
        <p className="text-slate-600 text-sm mt-1">Over the last 2 weeks, how often have you been bothered by any of the following problems?</p>
      </div>

      <div className="space-y-6">
        {test.questions.map((q, index) => (
          <div key={q.id} className="p-4 bg-white rounded-lg border border-slate-200">
            <p className="font-medium text-slate-700">{index + 1}. {q.question}</p>
            <div className="mt-3 space-y-2">
              {q.options.map(option => (
                <label key={option.value} className="flex items-center gap-3 p-2 rounded-md hover:bg-slate-100 cursor-pointer">
                  <input
                    type="radio"
                    name={`question-${q.id}`}
                    value={option.value}
                    checked={answers[q.id] === option.value}
                    onChange={() => handleAnswerChange(q.id, option.value)}
                    className="form-radio h-4 w-4 text-teal-600 focus:ring-teal-500"
                  />
                  <span className="text-sm text-slate-600">{option.text}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8 text-center">
        <button
          onClick={handleSubmit}
          disabled={!allQuestionsAnswered}
          className="px-8 py-3 bg-teal-500 text-white font-semibold rounded-full shadow-lg hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-75 transition-all disabled:bg-slate-300 disabled:shadow-none disabled:cursor-not-allowed"
        >
          Get My Results
        </button>
      </div>
    </div>
  );
};

export default Quiz;
