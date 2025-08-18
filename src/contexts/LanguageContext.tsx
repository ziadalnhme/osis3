import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'ar' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  ar: {
    // Header
    'nav.home': 'الرئيسية',
    'nav.about': 'حول الشركة',
    'nav.services': 'خدماتنا',
    'nav.quote': 'طلب تسعيرة',
    'nav.contact': 'اتصل بنا',
    'company.name': 'أسس الأعمار',
    'company.subtitle': 'للاستشارات الهندسية',
    
    // Services dropdown
    'services.architectural': 'التصميم المعماري',
    'services.structural': 'التصميم الإنشائي',
    'services.mep': 'أنظمة الكهروميكانيك',
    'services.management': 'إدارة المشاريع',
    'services.consulting': 'الاستشارات الفنية',
    
    // Home page
    'home.hero.title': 'شركة أسس الأعمار للاستشارات الهندسية',
    'home.hero.subtitle': 'نحن نبني المستقبل من خلال حلول هندسية مبتكرة ومتطورة. فريقنا من المهندسين المتخصصين يقدم أفضل الخدمات في التصميم والاستشارات الهندسية.',
    'home.hero.quote': 'احصل على تسعيرة مجانية',
    'home.hero.contact': 'تواصل معنا',
    'home.hero.why': 'لماذا نحن؟',
    'home.hero.experience': 'خبرة تزيد عن 15 عاماً في المجال',
    'home.hero.team': 'فريق من أفضل المهندسين المتخصصين',
    'home.hero.technology': 'استخدام أحدث التقنيات والبرامج',
    'home.hero.quality': 'التزام بالمواعيد والجودة العالية',
    
    // Stats
    'stats.projects': 'مشروع مكتمل',
    'stats.clients': 'عميل راضي',
    'stats.experience': 'سنة خبرة',
    'stats.engineers': 'مهندس متخصص',
    
    // Vision & Goals
    'vision.title': 'رؤيتنا وأهدافنا',
    'vision.subtitle': 'نحو مستقبل مشرق في عالم الهندسة والتصميم',
    'vision.our': 'رؤيتنا',
    'vision.text': 'أن نكون الشركة الرائدة في مجال الاستشارات الهندسية في المملكة العربية السعودية، ونساهم في تشييد مستقبل مستدام ومبتكر للأجيال القادمة من خلال تقديم حلول هندسية متطورة تواكب أحدث التقنيات العالمية.',
    'goals.our': 'أهدافنا',
    'goals.leadership': 'تحقيق الريادة في السوق السعودي للاستشارات الهندسية',
    'goals.development': 'تطوير قدرات فريق العمل باستمرار ومواكبة التطورات',
    'goals.innovation': 'تقديم حلول مبتكرة تواكب التطورات العالمية',
    'goals.vision2030': 'المساهمة الفعالة في تحقيق رؤية المملكة 2030',
    'goals.partnerships': 'بناء شراكات استراتيجية مع أفضل الشركات العالمية',
    
    // Services
    'services.title': 'خدماتنا المتميزة',
    'services.subtitle': 'نقدم مجموعة شاملة من الخدمات الهندسية المتخصصة لتلبية احتياجات عملائنا',
    'services.arch.desc': 'تصميم معماري مبتكر يجمع بين الجمالية والوظيفية',
    'services.struct.desc': 'حلول إنشائية متطورة وآمنة لجميع أنواع المباني',
    'services.mep.desc': 'تصميم وتنفيذ أنظمة متكاملة للكهرباء والميكانيك',
    'services.mgmt.desc': 'إدارة احترافية للمشاريع من البداية حتى التسليم',
    
    // CTA
    'cta.title': 'هل لديك مشروع في الذهن؟',
    'cta.subtitle': 'تواصل معنا اليوم واحصل على استشارة مجانية لمشروعك القادم',
    'cta.consultation': 'احصل على استشارة مجانية',
    'cta.whatsapp': 'تواصل عبر الواتساب',
    
    // Company Profile
    'profile.title': 'الملف التعريفي للشركة',
    'profile.subtitle': 'تعرف على تاريخنا وخدماتنا ومشاريعنا المميزة',
    'profile.download': 'تحميل الملف التعريفي',
    'profile.description': 'ملف شامل يحتوي على معلومات الشركة وخدماتها ومشاريعها السابقة',
    
    // Projects Gallery
    'gallery.title': 'مشاريعنا المميزة',
    'gallery.subtitle': 'نفخر بتقديم مجموعة متنوعة من المشاريع الهندسية المبتكرة والمتطورة',
    'gallery.residential': 'مشاريع سكنية',
    'gallery.commercial': 'مشاريع تجارية',
    'gallery.educational': 'مشاريع تعليمية',
    'gallery.healthcare': 'مشاريع صحية',
    'gallery.industrial': 'مشاريع صناعية',
    'gallery.infrastructure': 'مشاريع البنية التحتية',
    'gallery.viewall': 'عرض جميع المشاريع',
    
    // Footer
    'footer.description': 'نحن شركة رائدة في مجال الاستشارات الهندسية، نقدم حلولاً مبتكرة ومتكاملة في التصميم المعماري والإنشائي وأنظمة الكهروميكانيك، مع فريق من المهندسين المتخصصين ذوي الخبرة الواسعة.',
    'footer.quicklinks': 'روابط سريعة',
    'footer.vision': 'الرؤية والأهداف',
    'footer.contact': 'معلومات الاتصال',
    'footer.rights': '© 2024 شركة أسس الأعمار للاستشارات الهندسية. جميع الحقوق محفوظة.',
    'footer.hours': 'السبت - الخميس: 8:00 ص - 12:00 م و 4:00 م - 8:00 م',
    'footer.designer': 'تصميم م/ زياد فؤاد',
    'footer.call': 'اتصال مباشر',
    'footer.whatsapp': 'تواصل عبر الواتساب',
  },
  en: {
    // Header
    'nav.home': 'Home',
    'nav.about': 'About Us',
    'nav.services': 'Our Services',
    'nav.quote': 'Request Quote',
    'nav.contact': 'Contact Us',
    'company.name': 'Osos Al-Imar',
    'company.subtitle': 'Engineering Consultancy',
    
    // Services dropdown
    'services.architectural': 'Architectural Design',
    'services.structural': 'Structural Design',
    'services.mep': 'MEP Systems',
    'services.management': 'Project Management',
    'services.consulting': 'Technical Consulting',
    
    // Home page
    'home.hero.title': 'Osos Al-Imar Engineering Consultancy',
    'home.hero.subtitle': 'We build the future through innovative and advanced engineering solutions. Our team of specialized engineers provides the best services in design and engineering consultancy.',
    'home.hero.quote': 'Get Free Quote',
    'home.hero.contact': 'Contact Us',
    'home.hero.why': 'Why Choose Us?',
    'home.hero.experience': 'Over 15 years of experience in the field',
    'home.hero.team': 'Team of the best specialized engineers',
    'home.hero.technology': 'Using the latest technologies and software',
    'home.hero.quality': 'Commitment to deadlines and high quality',
    
    // Stats
    'stats.projects': 'Completed Projects',
    'stats.clients': 'Satisfied Clients',
    'stats.experience': 'Years Experience',
    'stats.engineers': 'Specialized Engineers',
    
    // Vision & Goals
    'vision.title': 'Our Vision & Goals',
    'vision.subtitle': 'Towards a bright future in the world of engineering and design',
    'vision.our': 'Our Vision',
    'vision.text': 'To be the leading company in engineering consultancy in Saudi Arabia, and contribute to building a sustainable and innovative future for future generations through providing advanced engineering solutions that keep pace with the latest global technologies.',
    'goals.our': 'Our Goals',
    'goals.leadership': 'Achieving leadership in the Saudi engineering consultancy market',
    'goals.development': 'Continuously developing team capabilities and keeping up with developments',
    'goals.innovation': 'Providing innovative solutions that keep pace with global developments',
    'goals.vision2030': 'Effective contribution to achieving Saudi Vision 2030',
    'goals.partnerships': 'Building strategic partnerships with the best global companies',
    
    // Services
    'services.title': 'Our Distinguished Services',
    'services.subtitle': 'We provide a comprehensive range of specialized engineering services to meet our clients\' needs',
    'services.arch.desc': 'Innovative architectural design combining aesthetics and functionality',
    'services.struct.desc': 'Advanced and safe structural solutions for all types of buildings',
    'services.mep.desc': 'Design and implementation of integrated electrical and mechanical systems',
    'services.mgmt.desc': 'Professional project management from start to delivery',
    
    // CTA
    'cta.title': 'Do you have a project in mind?',
    'cta.subtitle': 'Contact us today and get a free consultation for your next project',
    'cta.consultation': 'Get Free Consultation',
    'cta.whatsapp': 'Contact via WhatsApp',
    
    // Company Profile
    'profile.title': 'Company Profile',
    'profile.subtitle': 'Learn about our history, services, and distinguished projects',
    'profile.download': 'Download Company Profile',
    'profile.description': 'Comprehensive file containing company information, services, and previous projects',
    
    // Projects Gallery
    'gallery.title': 'Our Distinguished Projects',
    'gallery.subtitle': 'We are proud to present a diverse range of innovative and advanced engineering projects',
    'gallery.residential': 'Residential Projects',
    'gallery.commercial': 'Commercial Projects',
    'gallery.educational': 'Educational Projects',
    'gallery.healthcare': 'Healthcare Projects',
    'gallery.industrial': 'Industrial Projects',
    'gallery.infrastructure': 'Infrastructure Projects',
    'gallery.viewall': 'View All Projects',
    
    // Footer
    'footer.description': 'We are a leading company in engineering consultancy, providing innovative and integrated solutions in architectural and structural design and MEP systems, with a team of specialized engineers with extensive experience.',
    'footer.quicklinks': 'Quick Links',
    'footer.vision': 'Vision & Goals',
    'footer.contact': 'Contact Information',
    'footer.rights': '© 2024 Osos Al-Imar Engineering Consultancy. All rights reserved.',
    'footer.hours': 'Saturday - Thursday: 8:00 AM - 12:00 PM & 4:00 PM - 8:00 PM',
    'footer.designer': 'Designed by Eng. Ziad Fouad',
    'footer.call': 'Direct Call',
    'footer.whatsapp': 'Contact via WhatsApp',
  }
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('ar');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['ar']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};