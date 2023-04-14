import React from 'react';
import '../app/styles.css';

export interface BubbleProps {
  title: string;
  items: string[];
  img: string;
}

const Bubble: React.FC<BubbleProps> = ({ title, items, img }) => {
  const iconSrc = `${img}`;

  return (
    <div className="bubble">
      <img src={iconSrc} alt={title} />
      <h2 className="bubble-title">{title}</h2>
      <ul className="bubble-list">
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default Bubble;