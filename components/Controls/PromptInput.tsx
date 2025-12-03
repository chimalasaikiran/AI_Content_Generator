import React from 'react';
import { MAX_CHAR_LIMIT } from '../../constants';
import { Icons } from '../ui/Icons';

interface PromptInputProps {
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
  disabled?: boolean;
}

const PromptInput: React.FC<PromptInputProps> = ({ value, onChange, onClear, disabled }) => {
  const charCount = value.length;
  const isNearLimit = charCount > MAX_CHAR_LIMIT * 0.9;
  const isAtLimit = charCount >= MAX_CHAR_LIMIT;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    if (newValue.length <= MAX_CHAR_LIMIT) {
      onChange(newValue);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
          2. Describe Your Topic
        </label>
        {value && !disabled && (
          <button 
            onClick={onClear}
            className="text-xs text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 flex items-center transition-colors"
          >
            <Icons.X size={12} className="mr-1" />
            Clear
          </button>
        )}
      </div>
      
      <div className="relative">
        <textarea
          value={value}
          onChange={handleChange}
          disabled={disabled}
          placeholder="E.g., A sustainable coffee brand launching a new cold brew line..."
          className={`
            w-full h-32 p-4 rounded-xl border bg-white dark:bg-gray-800 resize-none 
            text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500
            focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all
            ${disabled ? 'bg-gray-50 dark:bg-gray-800/50 text-gray-500 cursor-not-allowed' : 'border-gray-200 dark:border-gray-700'}
          `}
        />
        <div className="absolute bottom-3 right-3 text-xs font-medium">
          <span className={`${isAtLimit ? 'text-red-600 dark:text-red-400' : isNearLimit ? 'text-amber-500' : 'text-gray-400 dark:text-gray-500'}`}>
            {charCount}
          </span>
          <span className="text-gray-300 dark:text-gray-600"> / {MAX_CHAR_LIMIT}</span>
        </div>
      </div>
    </div>
  );
};

export default PromptInput;