import React from 'react';
import Bubble from './Bubble';

const About = () => {
  return (
    <div className="flex justify-center">
      <Bubble>
        <div className="flex justify-center">
          <img src="/images/entrepreneur.jpeg" alt="Entrepreneur" className="rounded-full h-40 w-40 object-cover" />
        </div>
        <h3 className="text-xl font-bold text-center mt-4">About the Entrepreneur</h3>
        <p className="text-gray-700 text-center mt-2">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vel interdum ex. Sed ultrices, elit in
          imperdiet sollicitudin, lorem ante aliquet justo, quis vestibulum massa nibh ut nunc. Integer
          tristique sapien eu augue consectetur, ut blandit libero vulputate.
        </p>
      </Bubble>
    </div>
  );
};

export default About;