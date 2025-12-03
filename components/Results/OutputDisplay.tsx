import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Icons } from '../ui/Icons';

interface OutputDisplayProps {
  content: string | null;
  isLoading: boolean;
  onCopy: () => void;
  onRegenerate: () => void;
}

const OutputDisplay: React.FC<OutputDisplayProps> = ({ content, isLoading, onCopy, onRegenerate }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    onCopy();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (isLoading) {
    return (
      <div className="h-full min-h-[400px] flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 border-dashed animate-pulse transition-colors duration-200">
        <div className="relative">
          <div className="w-12 h-12 rounded-full border-4 border-primary-200 dark:border-primary-900 border-t-primary-600 dark:border-t-primary-500 animate-spin"></div>
        </div>
        <p className="mt-4 text-gray-500 dark:text-gray-400 font-medium">Generating creative magic...</p>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">This may take a few seconds</p>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="h-full min-h-[400px] flex flex-col items-center justify-center bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 transition-colors duration-200">
        <div className="p-4 bg-primary-50 dark:bg-primary-900/20 rounded-full mb-4">
          <Icons.FileText className="w-8 h-8 text-primary-400 dark:text-primary-500" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Ready to create?</h3>
        <p className="text-gray-500 dark:text-gray-400 text-center max-w-sm mt-2 px-4">
          Select a content type and enter your prompt to generate high-quality AI content instantly.
        </p>
      </div>
    );
  }

  const wordCount = content.split(/\s+/).filter(word => word.length > 0).length;

  return (
    <div className="h-full flex flex-col bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden transition-colors duration-200">
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-700/30">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">Generated Result</span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
            {wordCount} words
          </span>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={onRegenerate}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-md text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-white dark:hover:bg-gray-700 hover:shadow-sm transition-all hover:text-primary-600 dark:hover:text-primary-400"
            title="Regenerate with same settings"
          >
            <Icons.RefreshCw size={16} />
            <span className="hidden sm:inline">Regenerate</span>
          </button>
          <button
            onClick={handleCopy}
            className={`
              flex items-center space-x-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-all
              ${copied 
                ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' 
                : 'text-gray-600 dark:text-gray-400 hover:bg-white dark:hover:bg-gray-700 hover:shadow-sm'}
            `}
          >
            {copied ? <Icons.Check size={16} /> : <Icons.Copy size={16} />}
            <span>{copied ? 'Copied!' : 'Copy'}</span>
          </button>
        </div>
      </div>
      
      <div className="flex-1 p-6 overflow-y-auto max-h-[600px] prose prose-indigo dark:prose-invert prose-sm sm:prose-base max-w-none">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </div>
  );
};

export default OutputDisplay;