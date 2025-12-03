import React, { useState, useEffect } from 'react';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import ContentTypeSelector from './components/Controls/ContentTypeSelector';
import PromptInput from './components/Controls/PromptInput';
import OutputDisplay from './components/Results/OutputDisplay';
import HistoryList from './components/Results/HistoryList';
import { ContentType, GenerationHistoryItem } from './types';
import { CONTENT_OPTIONS, MAX_HISTORY_ITEMS } from './constants';
import { generateContent } from './services/geminiService';
import { Icons } from './components/ui/Icons';

const App: React.FC = () => {
  // State
  const [selectedType, setSelectedType] = useState<ContentType>(CONTENT_OPTIONS[0].id);
  const [prompt, setPrompt] = useState('');
  const [generatedContent, setGeneratedContent] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<GenerationHistoryItem[]>([]);
  
  // Track last successful generation parameters for regenerate functionality
  const [lastUsedParams, setLastUsedParams] = useState<{type: ContentType, prompt: string} | null>(null);
  
  // Theme State
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // Initialize Theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('ai_generator_theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      setTheme(savedTheme);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
    }
  }, []);

  // Apply Theme to DOM and persist
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('ai_generator_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  // Load history from local storage on mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('ai_generator_history');
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.error("Failed to parse history", e);
      }
    }
  }, []);

  // Save history to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('ai_generator_history', JSON.stringify(history));
  }, [history]);

  const executeGeneration = async (type: ContentType, text: string) => {
    setIsLoading(true);
    setError(null);
    setGeneratedContent(null);

    try {
      const result = await generateContent(type, text);
      setGeneratedContent(result);

      // Add to history
      const newItem: GenerationHistoryItem = {
        id: Date.now().toString(),
        type: type,
        prompt: text,
        result: result,
        timestamp: Date.now()
      };

      setHistory(prev => [newItem, ...prev].slice(0, MAX_HISTORY_ITEMS));
      
      // Update last used params
      setLastUsedParams({ type, prompt: text });

    } catch (err: any) {
      setError(err.message || "Failed to generate content. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError("Please enter a topic or description.");
      return;
    }
    await executeGeneration(selectedType, prompt);
  };

  const handleRegenerate = async () => {
    if (lastUsedParams) {
      await executeGeneration(lastUsedParams.type, lastUsedParams.prompt);
    } else if (prompt.trim()) {
      // Fallback to current inputs if no last params (unlikely if content is showing)
      await executeGeneration(selectedType, prompt);
    }
  };

  const handleClearAll = () => {
    setPrompt('');
    setGeneratedContent(null);
    setError(null);
    setLastUsedParams(null);
  };

  const handleHistorySelect = (item: GenerationHistoryItem) => {
    setSelectedType(item.type);
    setPrompt(item.prompt);
    setGeneratedContent(item.result);
    setLastUsedParams({ type: item.type, prompt: item.prompt });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCopy = () => {
    if (generatedContent) {
      navigator.clipboard.writeText(generatedContent);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 font-sans text-gray-900 dark:text-gray-100 transition-colors duration-200">
      <Header isDark={theme === 'dark'} toggleTheme={toggleTheme} />

      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 flex items-start text-red-700 dark:text-red-400 animate-fade-in">
            <Icons.AlertCircle className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="font-medium text-sm">Error</h3>
              <p className="text-sm mt-1">{error}</p>
            </div>
            <button onClick={() => setError(null)} className="text-red-500 hover:text-red-700 dark:hover:text-red-300">
              <Icons.X size={16} />
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Controls */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 space-y-8 transition-colors duration-200">
              <ContentTypeSelector 
                selectedType={selectedType} 
                onSelect={setSelectedType}
                disabled={isLoading}
              />
              
              <PromptInput 
                value={prompt} 
                onChange={setPrompt} 
                onClear={() => setPrompt('')}
                disabled={isLoading}
              />

              <div className="pt-4 flex space-x-4">
                <button
                  onClick={handleGenerate}
                  disabled={isLoading || !prompt.trim()}
                  className={`
                    flex-1 flex items-center justify-center py-3 px-4 rounded-xl text-white font-semibold shadow-sm transition-all
                    ${isLoading || !prompt.trim() 
                      ? 'bg-gray-300 dark:bg-gray-600 cursor-not-allowed' 
                      : 'bg-primary-600 hover:bg-primary-700 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0'}
                  `}
                >
                  {isLoading ? (
                    <>
                      <Icons.RefreshCw className="animate-spin mr-2 h-5 w-5" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Icons.Sparkles className="mr-2 h-5 w-5" />
                      Generate Content
                    </>
                  )}
                </button>
                
                <button
                  onClick={handleClearAll}
                  disabled={isLoading}
                  className="px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white font-medium transition-colors"
                >
                  Clear All
                </button>
              </div>
            </div>

            {/* Mobile History */}
            <div className="block lg:hidden">
              <HistoryList 
                history={history} 
                onSelect={handleHistorySelect}
                onClear={() => setHistory([])}
              />
            </div>
          </div>

          {/* Right Column: Output & History */}
          <div className="lg:col-span-7 flex flex-col h-full">
            <OutputDisplay 
              content={generatedContent} 
              isLoading={isLoading} 
              onCopy={handleCopy}
              onRegenerate={handleRegenerate}
            />
            
            <div className="hidden lg:block">
              <HistoryList 
                history={history} 
                onSelect={handleHistorySelect}
                onClear={() => setHistory([])}
              />
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default App;