import React, { useState } from 'react';
import { Menu, X, Building2, Home, Users, Briefcase, Phone, ChevronDown, Settings } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageToggle from './LanguageToggle';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const { language, t } = useLanguage();

  const menuItems = [
    { id: 'home', label: t('nav.home'), icon: Home },
    { id: 'about', label: t('nav.about'), icon: Building2 },
    { 
      id: 'services', 
      label: t('nav.services'), 
      icon: Briefcase,
      hasDropdown: true,
      dropdown: [
        t('services.architectural'),
        t('services.structural'),
        t('services.mep'),
        t('services.management'),
        t('services.consulting')
      ]
    },
    { id: 'projects', label: t('nav.projects'), icon: Users },
    { id: 'quote', label: t('nav.quote'), icon: Phone },
    { id: 'contact', label: t('nav.contact'), icon: Phone },
  ];

  return (
    <header className={`bg-white shadow-lg sticky top-0 z-50 ${language === 'en' ? 'ltr' : 'rtl'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className={`flex items-center ${language === 'en' ? 'space-x-3' : 'space-x-3 space-x-reverse'}`}>
            <img 
              src="/شعار اسس الاعمار المتقدمة-0١.svg" 
              alt={t('company.name')} 
              className="h-12 w-12 object-contain"
              onError={(e) => {
                // Fallback to icon if image fails to load
                e.currentTarget.style.display = 'none';
                e.currentTarget.nextElementSibling?.classList.remove('hidden');
              }}
            />
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-2 rounded-lg hidden">
              <Building2 className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">{t('company.name')}</h1>
              <p className="text-sm text-gray-600">{t('company.subtitle')}</p>
            </div>
          </div>

          {/* Language Toggle & Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <LanguageToggle />
            <button
              onClick={() => onNavigate('admin')}
              className="text-gray-600 hover:text-blue-600 transition-colors p-2 rounded-lg hover:bg-gray-100"
              title="لوحة التحكم"
            >
              <Settings className="h-5 w-5" />
            </button>
            <nav className="flex space-x-8">
            {menuItems.map((item) => (
              <div key={item.id} className="relative">
                <button
                  onClick={() => {
                    if (item.hasDropdown) {
                      setIsServicesOpen(!isServicesOpen);
                    } else {
                      onNavigate(item.id);
                      setIsServicesOpen(false);
                    }
                  }}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    currentPage === item.id
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                  {item.hasDropdown && <ChevronDown className="h-4 w-4" />}
                </button>

                {item.hasDropdown && isServicesOpen && (
                  <div className={`absolute ${language === 'en' ? 'left-0' : 'right-0'} mt-2 w-64 bg-white rounded-md shadow-lg py-2 z-50`}>
                    {item.dropdown?.map((service, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          onNavigate('services');
                          setIsServicesOpen(false);
                        }}
                        className={`block w-full ${language === 'en' ? 'text-left' : 'text-right'} px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600`}
                      >
                        {service}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            </nav>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-50"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="mb-4 px-3">
              <LanguageToggle />
            </div>
            <nav className="space-y-2">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    setIsMenuOpen(false);
                  }}
                  className={`flex items-center space-x-2 w-full px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    currentPage === item.id
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </button>
              ))}
              <button
                onClick={() => {
                  onNavigate('admin');
                  setIsMenuOpen(false);
                }}
                className="flex items-center space-x-2 w-full px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
              >
                <Settings className="h-4 w-4" />
                <span>لوحة التحكم</span>
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;