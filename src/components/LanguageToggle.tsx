import React from 'react';
import { Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const LanguageToggle: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center space-x-2">
      <Globe className="h-5 w-5 text-gray-600" />
      <div className="flex bg-gray-100 rounded-lg p-1">
        <button
          onClick={() => setLanguage('ar')}
          className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
            language === 'ar'
              ? 'bg-blue-600 text-white'
              : 'text-gray-600 hover:text-blue-600'
          }`}
        >
          العربية
        </button>
        <button
          onClick={() => setLanguage('en')}
          className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
            language === 'en'
              ? 'bg-blue-600 text-white'
              : 'text-gray-600 hover:text-blue-600'
          }`}
        >
          English
        </button>
      </div>
    </div>
  );
};

export default LanguageToggle;