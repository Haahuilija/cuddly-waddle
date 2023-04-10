import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-200 text-center py-2">
      <p className="text-sm">
        © {new Date().getFullYear()} Copyright
        <a href="https://tuatahkapaa.fi" className="text-green-500 ml-1">
          tuatahkapaa.fi
        </a>
      </p>
    </footer>
  );
};

export default Footer;