import React, { useState } from 'react';
import { Test, Interpretation } from '../types';
import { TESTS } from '../constants';
import TestSelector from './TestSelector';
import Quiz from './Quiz';
import Results from './Results';

const ScreeningHome: React.FC = () => {
  const [selectedTest, setSelectedTest] = useState<Test | null>(null);
  const [result, setResult] = useState<{ score: number; interpretation: Interpretation } | null>(null);

  const handleSelectTest = (test: Test) => {
    setSelectedTest(test);
    setResult(null);
  };

  const handleShowResults = (score: number) => {
    if (!selectedTest) return;

    // Find the highest score threshold that the user's score meets
    const interpretation = [...selectedTest.interpretations]
        .reverse()
        .find(i => score >= i.score);

    if (interpretation) {
      setResult({ score, interpretation });
    }
  };
  
  const handleReset = () => {
      setSelectedTest(null);
      setResult(null);
  }

  if (result && selectedTest) {
    return <Results score={result.score} interpretation={result.interpretation} onReset={handleReset} />;
  }

  if (selectedTest) {
    return <Quiz test={selectedTest} onShowResults={handleShowResults} onBack={handleReset} />;
  }

  return <TestSelector tests={TESTS} onSelectTest={handleSelectTest} />;
};

export default ScreeningHome;
