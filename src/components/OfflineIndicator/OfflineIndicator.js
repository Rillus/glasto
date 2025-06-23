import React, { useState, useEffect } from 'react';
import { useOffline } from '../../hooks/useOffline';
import './OfflineIndicator.scss';

const OfflineIndicator = () => {
  const isOffline = useOffline();
  const [showIndicator, setShowIndicator] = useState(false);

  useEffect(() => {
    if (isOffline) {
      // Only show indicator if we're offline and don't have cached content
      // Check if we have festival data cached
      caches.match('/g2025.json')
        .then(response => {
          if (!response) {
            // No cached data, show indicator
            setShowIndicator(true);
          } else {
            // We have cached data, don't show indicator
            setShowIndicator(false);
          }
        })
        .catch(() => {
          // Error checking cache, show indicator to be safe
          setShowIndicator(true);
        });
    } else {
      setShowIndicator(false);
    }
  }, [isOffline]);

  if (!showIndicator) {
    return null;
  }

  return (
    <div className="offline-indicator">
      <div className="offline-content">
        <span className="offline-icon">📱</span>
        <span className="offline-text">Limited connectivity - using cached data</span>
      </div>
    </div>
  );
};

export default OfflineIndicator; 