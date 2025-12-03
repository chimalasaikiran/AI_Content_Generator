import { FileText } from 'lucide-react';
import React from 'react';
import { Icons } from '../ui/Icons';

interface HeaderProps {
  isDark: boolean;
  toggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ isDark, toggleTheme }) => {
  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-primary-600 p-2 rounded-lg">
            <FileText className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white leading-tight">AI Content Generator</h1>
           
          </div>
        </div>
        <div className="flex items-center space-x-4">
            <span className="hidden sm:inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5"></span>
              System Operational
            </span>
            
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
              aria-label="Toggle Dark Mode"
            >
              {isDark ? (
                <Icons.Sun className="w-5 h-5" />
              ) : (
                <Icons.Moon className="w-5 h-5" />
              )}
            </button>
        </div>
      </div>
    </header>
  );
};

export default Header;