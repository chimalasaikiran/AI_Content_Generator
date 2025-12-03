import React from 'react';
import { ContentType } from '../../types';
import { CONTENT_OPTIONS } from '../../constants';
import { Icons } from '../ui/Icons';

interface ContentTypeSelectorProps {
  selectedType: ContentType;
  onSelect: (type: ContentType) => void;
  disabled?: boolean;
}

const ContentTypeSelector: React.FC<ContentTypeSelectorProps> = ({ selectedType, onSelect, disabled }) => {
  return (
    <div className="space-y-3">
      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
        1. Select Content Type
      </label>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {CONTENT_OPTIONS.map((option) => {
          const isSelected = selectedType === option.id;
          const Icon = option.id === ContentType.SOCIAL_MEDIA ? Icons.Share2 :
                       option.id === ContentType.BLOG_IDEA ? Icons.FileText :
                       option.id === ContentType.PRODUCT_DESC ? Icons.ShoppingBag : Icons.Mail;

          return (
            <button
              key={option.id}
              onClick={() => onSelect(option.id)}
              disabled={disabled}
              className={`
                relative flex items-start p-4 border rounded-xl text-left transition-all duration-200
                ${isSelected 
                  ? 'border-primary-600 ring-1 ring-primary-600 bg-primary-50 dark:bg-primary-900/20 dark:border-primary-500 dark:ring-primary-500' 
                  : 'border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-750 bg-white dark:bg-gray-800'}
                ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
              `}
            >
              <div className={`
                flex-shrink-0 p-2 rounded-lg mr-3
                ${isSelected ? 'bg-primary-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400'}
              `}>
                <Icon size={20} />
              </div>
              <div>
                <span className={`block text-sm font-medium ${isSelected ? 'text-primary-900 dark:text-primary-300' : 'text-gray-900 dark:text-gray-200'}`}>
                  {option.label}
                </span>
                <span className={`block text-xs mt-1 ${isSelected ? 'text-primary-700 dark:text-primary-400' : 'text-gray-500 dark:text-gray-400'}`}>
                  {option.description}
                </span>
              </div>
              {isSelected && (
                <div className="absolute top-4 right-4 text-primary-600 dark:text-primary-400">
                  <Icons.Check size={16} />
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ContentTypeSelector;