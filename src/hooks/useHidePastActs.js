import { useState, useEffect } from 'react';

export const useHidePastActs = () => {
  // Default to true (hide past acts by default)
  const [hidePastActs, setHidePastActs] = useState(() => {
    const saved = localStorage.getItem('hidePastActs');
    return saved !== null ? JSON.parse(saved) : true;
  });

  // Save to localStorage whenever the setting changes
  useEffect(() => {
    localStorage.setItem('hidePastActs', JSON.stringify(hidePastActs));
  }, [hidePastActs]);

  const toggleHidePastActs = () => {
    setHidePastActs(prev => !prev);
  };

  return { hidePastActs, toggleHidePastActs };
};

export default useHidePastActs; 