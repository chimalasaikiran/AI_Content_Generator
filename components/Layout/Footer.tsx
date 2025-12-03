import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-auto transition-colors duration-200">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 dark:text-gray-400">
          <div className="mb-4 md:mb-0">
            <p>&copy; {new Date().getFullYear()} AI Content Generator. All rights reserved.</p>
          </div>
          <div className="flex space-x-6">
            <span>Max 500 characters input</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;