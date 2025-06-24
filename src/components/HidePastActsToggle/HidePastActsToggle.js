import React from 'react';
import './HidePastActsToggle.scss';

const HidePastActsToggle = ({ hidePastActs, onToggle }) => {
  return (
    <button 
      className={`HidePastActsToggle ${hidePastActs ? 'HidePastActsToggle--active' : ''}`}
      onClick={onToggle}
      title={hidePastActs ? 'Currently hiding past acts. Click to show all acts.' : 'Currently showing all acts. Click to hide past acts.'}
    >
      <span className="HidePastActsToggle-icon">
        {hidePastActs ? '🙈' : '👁️'}
      </span>
      <span className="HidePastActsToggle-text">
        {hidePastActs ? 'Past hidden' : 'Past shown'}
      </span>
    </button>
  );
};

export default HidePastActsToggle; 