import React from 'react';
import Bubble, { BubbleProps } from "./Bubble";

export const About: React.FC = () => {
  const aboutProps: BubbleProps = {
    title: 'About Us',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    text: 'Learn More'
  };

  return (
    <div className="about">
      <Bubble {...aboutProps} />
    </div>
  );
};

export default About;