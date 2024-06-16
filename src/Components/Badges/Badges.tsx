// src/Components/Badge.tsx
import React from 'react';

const Badge: React.FC = () => {
  return (
    <div className="inline-flex items-center px-4 py-2 text-white bg-blue-500 bg-opacity-75 rounded-full">
      <span className="text-sm font-semibold">Made with NextJs, Typescript, and Tailwind ↗</span>
    </div>
  );
};

export default Badge;
