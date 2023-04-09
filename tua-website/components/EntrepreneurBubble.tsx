import React from 'react';

const EntrepreneurBubble: React.FC = () => {
  return (
    <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md">
      <img
        className="w-40 h-40 rounded-full mb-4"
        src="/images/entrepreneur.jpeg"
        alt="Picture of the entrepreneur"
      />
      <h3 className="text-lg font-medium">Entrepreneur Name</h3>
      <p className="text-sm text-gray-600">Language Planner &amp; Editor</p>
    </div>
  );
};

export default EntrepreneurBubble;