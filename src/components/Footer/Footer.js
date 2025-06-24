import React from 'react';
import './Footer.scss';

const Footer = ({ data }) => {
  return (
    <footer className="Footer">
      <div className="Footer-content">
        <div className="Footer-left">
          v2.6 {' '}
          <a
            href="https://github.com/Rillus/glasto/"
            target="_blank"
            rel="noopener noreferrer">
            About this app
          </a>
        </div>
        <div className="Footer-right">
          {data?.modified && `Lineup updated: ${data.modified}`}
        </div>
      </div>
    </footer>
  );
};

export default Footer; 