import React from 'react';

interface BubbleProps {
  title: string;
  content: string;
}

const Bubble = ({ title, content }: BubbleProps) => {
  return (
    <div className="flex flex-col items-center justify-center w-full p-6 md:w-1/2 md:p-10">
      <div className="w-20 h-20 mb-4 rounded-full bg-green-500"></div>
      <h3 className="mb-2 text-2xl font-bold">{title}</h3>
      <p className="text-lg text-center">{content}</p>
    </div>
  );
};

export default Bubble;