import React from "react";

const Badge: React.FC = () => {
  return (
    <div className="inline-flex items-center px-4 py-2 text-white transition-all duration-300 ease-in-out transform bg-blue-500 bg-opacity-75 rounded-full cursor-pointer hover:bg-blue-600 hover:bg-opacity-100 hover:scale-105">
      <span className="text-sm font-semibold">
        Made with NextJs, Typescript, and Tailwind ↗
      </span>
    </div>
  );
};

export default Badge;
