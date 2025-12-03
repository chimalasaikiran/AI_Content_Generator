import React from 'react';
import { GenerationHistoryItem } from '../../types';
import { Icons } from '../ui/Icons';
import { CONTENT_OPTIONS } from '../../constants';

interface HistoryListProps {
  history: GenerationHistoryItem[];
  onSelect: (item: GenerationHistoryItem) => void;
  onClear: () => void;
}

const HistoryList: React.FC<HistoryListProps> = ({ history, onSelect, onClear }) => {
  if (history.length === 0) return null;

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center">
          <Icons.History size={16} className="mr-2" />
          Recent Generations
        </h3>
        <button 
          onClick={onClear}
          className="text-xs text-gray-500 dark:text-gray-500 hover:text-red-600 dark:hover:text-red-400 transition-colors"
        >
          Clear History
        </button>
      </div>
      
      <div className="space-y-3">
        {history.map((item) => {
          const typeLabel = CONTENT_OPTIONS.find(opt => opt.id === item.type)?.label || item.type;
          
          return (
            <div 
              key={item.id}
              onClick={() => onSelect(item)}
              className="group p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-primary-300 dark:hover:border-primary-600 hover:shadow-sm cursor-pointer transition-all"
            >
              <div className="flex justify-between items-start mb-1">
                <span className="text-xs font-semibold text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/30 px-2 py-0.5 rounded-full">
                  {typeLabel}
                </span>
                <span className="text-xs text-gray-400 dark:text-gray-500">
                  {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 font-medium">
                {item.prompt}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HistoryList;