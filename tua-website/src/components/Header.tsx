import React from 'react';

const Header = () => {
  return (
    <header className="relative">
      <img src="./images/banner-image.jpeg" alt="Banner" className="w-full" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
        <h1 className="text-4xl font-bold text-white">Language Planning</h1>
        <h2 className="text-2xl text-white">Spell Checking and Text Editing</h2>
      </div>
    </header>
  );
};

export default Header;