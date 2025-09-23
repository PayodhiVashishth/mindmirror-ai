import React from 'react';

export const LogoIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M12 12a8 8 0 1 0-8-8" />
    <path d="M12 2v2" />
    <path d="M12 12a2 2 0 1 1-2-2" />
    <path d="M12 12a2 2 0 1 0 2-2" />
    <path d="M12 12a2 2 0 1 0-2 2" />
    <path d="M12 12a2 2 0 1 1 2 2" />
    <path d="M12 12a8 8 0 0 0-8 8h16a8 8 0 0 0-8-8Z" />
    <path d="M4 4l2 2" />
  </svg>
);
