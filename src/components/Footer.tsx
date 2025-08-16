import React from 'react';
import { Building2, Phone, Mail, MapPin, Clock, Facebook, Twitter, Linkedin, Instagram, MessageCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface FooterProps {
  onNavigate?: (page: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { language, t } = useLanguage();

  return (
    <footer className={`bg-gray-900 text-white ${language === 'en' ? 'ltr' : 'rtl'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className={`flex items-center ${language === 'en' ? 'space-x-3' : 'space-x-3 space-x-reverse'} mb-4`}>
              <img 
                src="/شعار اسس الاعمار المتقدمة-0١.svg" 
                alt={t('company.name')} 
                className="h-10 w-10 object-contain bg-white p-1 rounded-lg"
                onError={(e) => {
                  // Fallback to icon if image fails to load
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling?.classList.remove('hidden');
                }}
              />
              <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-2 rounded-lg hidden">
                <Building2 className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold">{t('company.name')}</h3>
                <p className="text-gray-400">{t('company.subtitle')}</p>
              </div>
            </div>
            <p className="text-gray-300 mb-4 leading-relaxed">
              {t('footer.description')}
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">{t('footer.quicklinks')}</h4>
            <ul className="space-y-2">
              <li><button onClick={() => onNavigate?.('about')} className={`text-gray-300 hover:text-white transition-colors ${language === 'en' ? 'text-left' : 'text-right'}`}>{t('nav.about')}</button></li>
              <li><button onClick={() => onNavigate?.('services')} className={`text-gray-300 hover:text-white transition-colors ${language === 'en' ? 'text-left' : 'text-right'}`}>{t('nav.services')}</button></li>
              <li><button onClick={() => onNavigate?.('projects')} className={`text-gray-300 hover:text-white transition-colors ${language === 'en' ? 'text-left' : 'text-right'}`}>{t('nav.projects')}</button></li>
              <li><button onClick={() => onNavigate?.('about')} className={`text-gray-300 hover:text-white transition-colors ${language === 'en' ? 'text-left' : 'text-right'}`}>{t('footer.vision')}</button></li>
              <li><button onClick={() => onNavigate?.('contact')} className={`text-gray-300 hover:text-white transition-colors ${language === 'en' ? 'text-left' : 'text-right'}`}>{t('nav.contact')}</button></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">{t('footer.contact')}</h4>
            <div className="space-y-3">
              <div className={`flex items-center ${language === 'en' ? 'space-x-3' : 'space-x-3 space-x-reverse'}`}>
                <Phone className="h-4 w-4 text-blue-400" />
                <div className="flex items-center space-x-2">
                  <span className="text-gray-300">+966 55 929 9897</span>
                  <a 
                    href="https://wa.me/966559299897" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-green-400 hover:text-green-300 transition-colors"
                    title={t('footer.whatsapp')}
                  >
                    <MessageCircle className="h-5 w-5" />
                  </a>
                </div>
              </div>
              <div className={`flex items-center ${language === 'en' ? 'space-x-3' : 'space-x-3 space-x-reverse'}`}>
                <Mail className="h-4 w-4 text-blue-400" />
                <span className="text-gray-300">info@osos-imar.com</span>
              </div>
              <div className={`flex items-start ${language === 'en' ? 'space-x-3' : 'space-x-3 space-x-reverse'}`}>
                <MapPin className="h-4 w-4 text-blue-400 mt-1" />
                <a 
                  href="https://maps.app.goo.gl/q3E3nxtTZpsv82S5A" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-blue-400 transition-colors"
                >
                  {language === 'ar' 
                    ? 'حي المنار، شارع الملك فهد طريق المطار جوار مطعم البيك، الدمام 32273'
                    : 'Al-Manar District, King Fahd Airport Road, next to Al-Baik Restaurant, Dammam 32273'
                  }
                </a>
              </div>
              <div className={`flex items-start ${language === 'en' ? 'space-x-3' : 'space-x-3 space-x-reverse'}`}>
                <Clock className="h-4 w-4 text-blue-400 mt-1" />
                <span className="text-gray-300">
                  {t('footer.hours')}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <div className="space-y-3">
            <p className="text-gray-400">
              {t('footer.rights')}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-gray-500">
              <span>{t('footer.designer')}</span>
              <div className="flex items-center gap-3">
                <a 
                  href="tel:+966547465459" 
                  className="flex items-center gap-1 text-gray-400 hover:text-blue-400 transition-colors"
                  title={t('footer.call')}
                >
                  <Phone className="h-4 w-4" />
                  <span>+966 54 746 5459</span>
                </a>
                <a 
                  href="https://wa.me/966547465459" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-gray-400 hover:text-green-400 transition-colors"
                  title={t('footer.whatsapp')}
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>{language === 'ar' ? 'واتساب' : 'WhatsApp'}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;