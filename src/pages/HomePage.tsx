import React from 'react';
import { ArrowRight, CheckCircle, Users, Award, Clock, Building, MessageCircle, Eye, Target, Download, FileText, Play, Pause, Calendar, Briefcase, Home, ShoppingBag, Zap, Hammer } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { loadPublicContent, ContentData } from '../utils/contentManager';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const { language, t } = useLanguage();
  const [isGalleryPlaying, setIsGalleryPlaying] = React.useState(true);
  const [currentProjectIndex, setCurrentProjectIndex] = React.useState(0);
  const [animatedStats, setAnimatedStats] = React.useState({
    projects: 0,
    clients: 0,
    experience: 0,
    engineers: 0
  });
  const [hasAnimated, setHasAnimated] = React.useState(false);
  const [heroSettings, setHeroSettings] = React.useState({
    backgroundImage: '',
    overlayOpacity: 40,
    gradientColors: {
      from: 'from-blue-900',
      via: 'via-blue-800',
      to: 'to-blue-900'
    }
  });
  const [contentData, setContentData] = React.useState<ContentData | null>(null);

  // Projects Gallery - moved before usage
  const projectsGallery = [
    {
      id: 1,
      title: language === 'ar' ? 'مبنى سكني' : 'residential building',
      category: t('residential projects'),
      image: 'https://i.postimg.cc/0rg07wvB/2.jpg',
      description: language === 'ar' ? 'مبنى سكني فاخر يضم 120 وحدة سكنية' : 'Luxury residential building with 120 residential units'
    },
    {
      id: 2,
      title: language === 'ar' ? 'مبنى سكني' : 'residential building',
      category: t('residential projects'),
      image: 'https://i.postimg.cc/d116FFn4/8.jpg',
      description: language === 'ar' ? 'مبنى سكني حديث بتصميم مبتكر' : 'Modern residential building with innovative design'
    },
    {
      id: 3,
      title: language === 'ar' ? 'فل دوبلكس' : 'Full duplex',
      category: t('luxury villas'),
      image: 'https://i.postimg.cc/fyQv9dDg/2.jpg',
      description: language === 'ar' ? 'فله دوبلكس بتصميم فاخر' : 'Luxuriously designed duplex villa'
    },
    {
      id: 4,
      title: language === 'ar' ? 'فله بتصميم كلاسيك' : 'Classic design villa',
      category: t('luxury villas'),
      image: 'https://i.postimg.cc/85SFdmfW/Enscape-2024-07-04-19-59-09.jpg',
      description: language === 'ar' ? 'فله بتصميم فاخر كلاسيكي' : 'Villa with a classic luxury design'
    },
    {
      id: 5,
      title: language === 'ar' ? 'تجـــــــــارية' : 'Commercial',
      category: t('Business projects'),
      image: 'https://i.postimg.cc/VLrY6bdc/6.jpg',
      description: language === 'ar' ? 'مجمع تجاري بتصميم حديث' : 'Modern design shopping mall'
    },
    {
      id: 6,
      title: language === 'ar' ? 'شركة اسرار الشامل' : 'Asrar Al-Shamel Company',
      category: t('Business projects'),
      image: 'https://i.postimg.cc/9M5xGKBp/1-0.jpg',
      description: language === 'ar' ? 'شركة اسرار الشامل تصميم تجاري حديث' : 'Asrar Al-Shamel Company, Modern Commercial Design'
    }
  ];

  // Design work categories
  const designCategories = [
    {
      id: 'villas',
      title: 'فلل سكنية',
      icon: Home,
      images: [
        'https://i.postimg.cc/DwzyTYLB/11.jpg',
        'https://i.postimg.cc/g0Zpc9Jq/Enscape-2024-02-18-10-53-58.jpg',
        'https://i.postimg.cc/8kHSzm13/33.jpg',
        'https://i.postimg.cc/s2pL03x8/16.jpg'
      ]
    },
    {
      id: 'commercial',
      title: 'تجــــــــــارية',
      icon: ShoppingBag,
      images: [
        'https://i.postimg.cc/vT8sbckC/41.jpg',
        'https://i.postimg.cc/rpWcJ65Z/5.jpg',
        'https://i.postimg.cc/gjtfp4v6/22.jpg',
        'https://i.postimg.cc/sxnRX3Rx/2.jpg'
      ]
    },
    {
      id: 'residential',
      title: 'مجمعات سكنية',
      icon: Building,
      images: [
        'https://i.postimg.cc/bYMWdDK9/3.jpg',
        'https://i.postimg.cc/RZxYLrC3/10.jpg',
        'https://i.postimg.cc/Y04PbMmF/18.jpg',
        'https://i.postimg.cc/X7Ch5NWS/36.jpg'
      ]
    }
  ];

  // Supervision work categories
  const supervisionCategories = [
    {
      id: 'towers',
      title: 'أبراج إدارية',
      icon: Building,
      images: [
        'https://images.pexels.com/photos/2467558/pexels-photo-2467558.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/3862132/pexels-photo-3862132.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1267338/pexels-photo-1267338.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/2166711/pexels-photo-2166711.jpeg?auto=compress&cs=tinysrgb&w=800'
      ]
    },
    {
      id: 'buildings',
      title: 'عمائر سكنية',
      icon: Home,
      images: [
        'https://images.pexels.com/photos/280232/pexels-photo-280232.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=800'
      ]
    },
    {
      id: 'mosques',
      title: 'مساجد',
      icon: Award,
      images: [
        'https://images.pexels.com/photos/2166711/pexels-photo-2166711.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/3862132/pexels-photo-3862132.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1267338/pexels-photo-1267338.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/2467558/pexels-photo-2467558.jpeg?auto=compress&cs=tinysrgb&w=800'
      ]
    }
  ];

  // Client logos
  const clientLogos = [
    { name: 'شركة أرامكو السعودية', logo: 'https://m.eyeofriyadh.com/news_images/2022/10/1b83cab8ab6a1.jpg' },
    { name: 'شركة سابك', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Logo_of_Sabic.svg/1200px-Logo_of_Sabic.svg.png' },
    { name: 'شركة الراجحي', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRm6UEYNPH2WBsqWWVXZ-3rpEYZLud_mpGdyg&s' },
    { name: 'شركة الاتصالات السعودية', logo: 'https://upload.wikimedia.org/wikipedia/commons/e/e3/STC-01.svg' },
    { name: 'شركة المراعي', logo: 'https://upload.wikimedia.org/wikipedia/ar/thumb/d/d7/Almarai_Corporate_Logo.svg/1200px-Almarai_Corporate_Logo.svg.png' },
    { name: 'شركة الكهرباء السعودية', logo: 'https://salogos.org/wp-content/uploads/2021/11/salogos.org-%D8%B4%D8%B9%D8%A7%D8%B1-%D8%A7%D9%84%D9%83%D9%87%D8%B1%D8%A8%D8%A7%D8%A1.svg' },
    { name: 'شركة معادن', logo: 'https://www.pif.gov.sa/-/media/project/pif-corporate/pif-corporate-site/our-investments/portfolio/pc-logos/maaden-new-logo.png' },
    { name: 'شركة الخطوط السعودية', logo: 'https://upload.wikimedia.org/wikipedia/commons/d/dc/Saudia_logo_2023.png' }
  ];

  // تحميل البيانات من localStorage أو استخدام البيانات الافتراضية
  const [loadedDesignCategories, setLoadedDesignCategories] = React.useState(designCategories);
  const [loadedSupervisionCategories, setLoadedSupervisionCategories] = React.useState(supervisionCategories);
  const [loadedProjectsGallery, setLoadedProjectsGallery] = React.useState(projectsGallery);
  const [loadedClientLogos, setLoadedClientLogos] = React.useState(clientLogos);

  React.useEffect(() => {
    // دالة تحميل البيانات من localStorage
    const loadDataFromStorage = () => {
      console.log('تحميل البيانات من localStorage...');
      
      // تحميل أعمال التصميم
      const designWorksData = localStorage.getItem('content_designWorks');
      if (designWorksData) {
        try {
          const parsedData = JSON.parse(designWorksData);
          setLoadedDesignCategories(parsedData.map((work: any) => ({
            ...work,
            icon: work.icon === '🏠' ? Home : work.icon === '🏢' ? ShoppingBag : Building
          })));
          console.log('تم تحميل أعمال التصميم من localStorage');
        } catch (error) {
          console.error('خطأ في تحليل أعمال التصميم:', error);
        }
      }
      
      // تحميل أعمال الإشراف
      const supervisionWorksData = localStorage.getItem('content_supervisionWorks');
      if (supervisionWorksData) {
        try {
          const parsedData = JSON.parse(supervisionWorksData);
          setLoadedSupervisionCategories(parsedData.map((work: any) => ({
            ...work,
            icon: work.icon === '🏗️' ? Building : work.icon === '🏠' ? Home : Award
          })));
          console.log('تم تحميل أعمال الإشراف من localStorage');
        } catch (error) {
          console.error('خطأ في تحليل أعمال الإشراف:', error);
        }
      }
      
      // تحميل المشاريع المميزة
      const featuredProjectsData = localStorage.getItem('content_featuredProjects');
      if (featuredProjectsData) {
        try {
          const parsedData = JSON.parse(featuredProjectsData);
          setLoadedProjectsGallery(parsedData);
          console.log('تم تحميل المشاريع المميزة من localStorage');
        } catch (error) {
          console.error('خطأ في تحليل المشاريع المميزة:', error);
        }
      }
      
      // تحميل شعارات العملاء
      const clientLogosData = localStorage.getItem('content_clientLogos');
      if (clientLogosData) {
        try {
          const parsedData = JSON.parse(clientLogosData);
          setLoadedClientLogos(parsedData);
          console.log('تم تحميل شعارات العملاء من localStorage');
        } catch (error) {
          console.error('خطأ في تحليل شعارات العملاء:', error);
        }
      }
      
      // تحميل إعدادات الخلفية
      const heroSettingsData = localStorage.getItem('content_heroSettings');
      if (heroSettingsData) {
        try {
          const parsedData = JSON.parse(heroSettingsData);
          setHeroSettings(parsedData);
          console.log('تم تحميل إعدادات الخلفية من localStorage');
        } catch (error) {
          console.error('خطأ في تحليل إعدادات الخلفية:', error);
        }
      }
    };
    
    // تحميل البيانات عند بدء التشغيل
    loadDataFromStorage();
    
    // مراقبة تحديثات المحتوى من المدير
    const handleContentUpdate = (e: CustomEvent) => {
      console.log('تحديث محتوى:', e.detail);
      const { section, data } = e.detail;
      
      // تحديث البيانات حسب النوع
      if (section === 'designWorks') {
        setLoadedDesignCategories(data.map((work: any) => ({
          ...work,
          icon: work.icon === '🏠' ? Home : work.icon === '🏢' ? ShoppingBag : Building
        })));
      } else if (section === 'supervisionWorks') {
        setLoadedSupervisionCategories(data.map((work: any) => ({
          ...work,
          icon: work.icon === '🏗️' ? Building : work.icon === '🏠' ? Home : Award
        })));
      } else if (section === 'featuredProjects') {
        setLoadedProjectsGallery(data);
      } else if (section === 'clientLogos') {
        setLoadedClientLogos(data);
      } else if (section === 'heroSettings') {
        setHeroSettings(data);
      }
      
      console.log(`تم تحديث ${section} في الصفحة الرئيسية`);
    };

    const handleAdminContentUpdate = (e: CustomEvent) => {
      console.log('تحديث محتوى من المدير:', e.detail);
      handleContentUpdate(e);
    };

    // إضافة مستمعي الأحداث
    window.addEventListener('contentUpdated', handleContentUpdate as EventListener);
    window.addEventListener('adminContentUpdated', handleAdminContentUpdate as EventListener);
    
    return () => {
      window.removeEventListener('contentUpdated', handleContentUpdate as EventListener);
      window.removeEventListener('adminContentUpdated', handleAdminContentUpdate as EventListener);
    };
  }, []);

  const engineeringImages = [
    'https://i.postimg.cc/bYMWdDK9/3.jpg',
    'https://i.postimg.cc/J02DVVtV/24.jpg',
    'https://i.postimg.cc/5yT0KBkf/9.jpg',
    'https://i.postimg.cc/VLrY6bdc/6.jpg',
    'https://i.postimg.cc/YqFqqmsm/34.jpg'
  ];

  const services = [
    {
      icon: Building,
      title: t('services.architectural'),
      description: t('services.arch.desc')
    },
    {
      icon: Users,
      title: t('services.structural'),
      description: t('services.struct.desc')
    },
    {
      icon: Award,
      title: t('services.mep'),
      description: t('services.mep.desc')
    },
    {
      icon: Clock,
      title: t('services.management'),
      description: t('services.mgmt.desc')
    }
  ];

  const stats = [
    { number: '250+', label: t('stats.projects'), key: 'projects', target: 250, icon: Building },
    { number: '120+', label: t('stats.clients'), key: 'clients', target: 120, icon: Users },
    { number: '15+', label: t('stats.experience'), key: 'experience', target: 15, icon: Calendar },
    { number: '35+', label: t('stats.engineers'), key: 'engineers', target: 35, icon: Briefcase }
  ];

  React.useEffect(() => {
    if (isGalleryPlaying) {
      const interval = setInterval(() => {
        setCurrentProjectIndex((prev) => (prev + 1) % loadedProjectsGallery.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isGalleryPlaying, loadedProjectsGallery.length]);

  // Animated counter effect
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            
            // Animate each stat
            stats.forEach((stat) => {
              let current = 0;
              const increment = stat.target / 50; // 50 steps for smooth animation
              const timer = setInterval(() => {
                current += increment;
                if (current >= stat.target) {
                  current = stat.target;
                  clearInterval(timer);
                }
                setAnimatedStats(prev => ({
                  ...prev,
                  [stat.key]: Math.floor(current)
                }));
              }, 40); // 40ms interval for smooth animation
            });
          }
        });
      },
      { threshold: 0.5 }
    );

    const statsSection = document.getElementById('stats-section');
    if (statsSection) {
      observer.observe(statsSection);
    }

    return () => observer.disconnect();
  }, [hasAnimated, stats]);
  return (
    <div className={`min-h-screen ${language === 'en' ? 'ltr' : 'rtl'}`}>
      {/* Hero Section */}
      <section className={`relative bg-gradient-to-br ${heroSettings.gradientColors.from} ${heroSettings.gradientColors.via} ${heroSettings.gradientColors.to} text-white py-20 overflow-hidden`}>
        {/* Animated Background Images */}
        {heroSettings.backgroundImage ? (
          <div className="absolute inset-0 overflow-hidden">
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(${heroSettings.backgroundImage})`
              }}
            />
          </div>
        ) : (
          <div className="absolute inset-0 overflow-hidden">
            {engineeringImages.map((image, index) => (
              <div
                key={index}
                className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-0 animate-fade-in-out"
                style={{
                  backgroundImage: `url(${image})`,
                  animationDelay: `${index * 4}s`,
                  animationDuration: '20s'
                }}
              />
            ))}
          </div>
        )}
        
        {/* Overlay for better text readability */}
        <div 
          className="absolute inset-0 bg-blue-900"
          style={{ opacity: heroSettings.overlayOpacity / 100 }}
        ></div>
        
        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                {language === 'ar' ? (
                  <>شركة <span className="text-yellow-400">أسس الأعمار</span><br />للاستشارات الهندسية</>
                ) : (
                  <><span className="text-yellow-400">Osos Al-Imar</span><br />Engineering Consultancy</>
                )}
              </h1>
              <p className="text-lg text-blue-100 mb-8 leading-relaxed">
                {t('home.hero.subtitle')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => onNavigate('quote')}
                  className="bg-yellow-500 hover:bg-yellow-600 text-black px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
                >
                  <span>{t('home.hero.quote')}</span>
                  <ArrowRight className={`h-5 w-5 ${language === 'ar' ? 'rotate-180' : ''}`} />
                </button>
                <button
                  onClick={() => onNavigate('contact')}
                  className="border-2 border-white hover:bg-white hover:text-blue-900 px-8 py-3 rounded-lg font-semibold transition-all duration-300"
                >
                  {t('home.hero.contact')}
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <h3 className="text-xl font-bold mb-6 text-center">{t('home.hero.why')}</h3>
                <div className="space-y-4">
                  {[
                    t('home.hero.experience'),
                    t('home.hero.team'),
                    t('home.hero.technology'),
                    t('home.hero.quality')
                  ].map((item, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-yellow-400 flex-shrink-0" />
                      <span className="text-blue-100">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats-section" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center relative z-10">
                <div className="relative mx-auto mb-6 w-24 h-24 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl transform hover:scale-110 hover:rotate-6 transition-all duration-500 shadow-xl hover:shadow-2xl flex flex-col items-center justify-center text-white group animate-pulse-glow">
                  {/* Icon */}
                  <stat.icon className="h-6 w-6 mb-1 group-hover:scale-125 transition-transform duration-300 animate-icon-float group-hover:animate-spin" />
                  {/* Number */}
                  <span className="text-lg font-bold">
                    {animatedStats[stat.key as keyof typeof animatedStats]}+
                  </span>
                  
                  {/* Floating particles effect */}
                  <div className="absolute inset-0 overflow-hidden rounded-2xl">
                    <div className="absolute top-1 right-1 w-1 h-1 bg-white rounded-full opacity-60 animate-ping animation-delay-100"></div>
                    <div className="absolute bottom-1 left-1 w-1.5 h-1.5 bg-yellow-300 rounded-full opacity-80 animate-bounce animation-delay-300"></div>
                    <div className="absolute top-3 left-2 w-1 h-1 bg-yellow-200 rounded-full opacity-70 animate-pulse animation-delay-500"></div>
                    <div className="absolute bottom-3 right-2 w-0.5 h-0.5 bg-white rounded-full opacity-50 animate-ping animation-delay-700"></div>
                  </div>
                  
                  {/* Rotating ring effect */}
                  <div className="absolute inset-0 border-2 border-yellow-400 rounded-2xl opacity-0 group-hover:opacity-30 animate-spin transition-opacity duration-500"></div>
                  <div className="absolute inset-2 border border-white rounded-xl opacity-20 animate-pulse"></div>
                </div>
                <p className="text-gray-700 font-semibold hover:text-blue-600 transition-colors duration-300">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Design Work Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">أعمالنا في التصميم</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              نفخر بتقديم تصاميم معمارية مبتكرة ومتنوعة تلبي احتياجات عملائنا
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {loadedDesignCategories.map((category, index) => (
              <div key={category.id} className="bg-gray-50 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="bg-blue-600 text-white p-3 rounded-lg ml-3">
                      {React.createElement(category.icon, { className: "h-6 w-6" })}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">{category.title}</h3>
                  </div>
                </div>
                <div className="relative h-48 overflow-hidden">
                  {category.images.map((image, imgIndex) => (
                    <img
                      key={imgIndex}
                      src={image}
                      alt={`${category.title} ${imgIndex + 1}`}
                      className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                        imgIndex === 0 ? 'opacity-100' : 'opacity-0'
                      }`}
                      style={{
                        animationDelay: `${imgIndex * 3}s`,
                        animation: `fadeInOut 12s infinite ${imgIndex * 3}s`
                      }}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Supervision Work Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">أعمالنا في الإشراف</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              نقدم خدمات إشراف هندسي متميزة لضمان تنفيذ المشاريع وفقاً لأعلى المعايير
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {loadedSupervisionCategories.map((category, index) => (
              <div key={category.id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="bg-yellow-500 text-white p-3 rounded-lg ml-3">
                      {React.createElement(category.icon, { className: "h-6 w-6" })}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">{category.title}</h3>
                  </div>
                </div>
                <div className="relative h-48 overflow-hidden">
                  {category.images.map((image, imgIndex) => (
                    <img
                      key={imgIndex}
                      src={image}
                      alt={`${category.title} ${imgIndex + 1}`}
                      className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                        imgIndex === 0 ? 'opacity-100' : 'opacity-0'
                      }`}
                      style={{
                        animationDelay: `${imgIndex * 3}s`,
                        animation: `fadeInOut 12s infinite ${imgIndex * 3}s`
                      }}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision & Goals Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">{t('vision.title')}</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {t('vision.subtitle')}
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Vision */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8">
              <div className="flex items-center mb-6">
                <div className="bg-blue-600 text-white p-3 rounded-full ml-4">
                  <Eye className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">{t('vision.our')}</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                {t('vision.text')}
              </p>
            </div>

            {/* Goals */}
            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-2xl p-8">
              <div className="flex items-center mb-6">
                <div className="bg-yellow-500 text-white p-3 rounded-full ml-4">
                  <Target className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">{t('goals.our')}</h3>
              </div>
              <div className="space-y-4">
                {[
                  t('goals.leadership'),
                  t('goals.development'),
                  t('goals.innovation'),
                  t('goals.vision2030'),
                  t('goals.partnerships')
                ].map((goal, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-1" />
                    <span className="text-gray-700">{goal}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Animated Projects Gallery */}
      <section className="py-20 bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">{t('gallery.title')}</h2>
            <p className="text-lg text-blue-100 max-w-3xl mx-auto">
              {t('gallery.subtitle')}
            </p>
          </div>
          
          <div className="relative">
            {/* Main Gallery Display */}
            <div className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              {loadedProjectsGallery.map((project, index) => (
                <div
                  key={project.id}
                  className={`absolute inset-0 transition-all duration-1000 ${
                    index === currentProjectIndex 
                      ? 'opacity-100 scale-100' 
                      : 'opacity-0 scale-105'
                  }`}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <div className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm inline-block mb-4">
                      {project.category}
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold mb-2">{project.title}</h3>
                    <p className="text-blue-100">{project.description}</p>
                  </div>
                </div>
              ))}
              
              {/* Play/Pause Button */}
              <button
                onClick={() => setIsGalleryPlaying(!isGalleryPlaying)}
                className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300"
              >
                {isGalleryPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
              </button>
            </div>

            {/* Thumbnails */}
            <div className="flex justify-center mt-8 space-x-4 overflow-x-auto pb-4">
              {loadedProjectsGallery.map((project, index) => (
                <button
                  key={project.id}
                  onClick={() => setCurrentProjectIndex(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                    index === currentProjectIndex
                      ? 'border-yellow-400 scale-110'
                      : 'border-transparent hover:border-blue-400'
                  }`}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Progress Indicators */}
            <div className="flex justify-center mt-6 space-x-2">
              {loadedProjectsGallery.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentProjectIndex
                      ? 'w-8 bg-yellow-400'
                      : 'w-2 bg-gray-600 hover:bg-blue-400'
                  }`}
                />
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Company Profile Download Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="bg-white rounded-2xl shadow-xl p-12 max-w-4xl mx-auto">
              <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white p-6 rounded-full inline-block mb-8">
                <img 
                  src="/شعار اسس الاعمار المتقدمة-0١.svg" 
                  alt="شعار الشركة" 
                  className="h-12 w-12 object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling?.classList.remove('hidden');
                  }}
                />
                <FileText className="h-12 w-12 hidden" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">{t('profile.title')}</h2>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                {t('profile.subtitle')}
              </p>
              <p className="text-gray-700 mb-8 max-w-3xl mx-auto">
                {t('profile.description')}
              </p>
              <button
                onClick={() => {
                  window.open('https://drive.google.com/file/d/12kL0cCvkybGzv1YvWveIqIIryYVGMHKY/view?usp=sharing', '_blank');
                }}
                className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white px-10 py-4 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105 inline-flex items-center space-x-3"
              >
                <Download className="h-6 w-6" />
                <span>{t('profile.download')}</span>
              </button>
              <div className="mt-6 text-sm text-gray-500">
                PDF • {language === 'ar' ? 'حجم الملف: 2.5 ميجابايت' : 'File size: 2.5 MB'}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">{t('services.title')}</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {t('services.subtitle')}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div 
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group"
              >
                <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white p-3 rounded-lg inline-block mb-4 group-hover:scale-110 transition-transform duration-300">
                  <service.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <button
              onClick={() => onNavigate('quote')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-300 inline-flex items-center space-x-2"
            >
              <span>{t('home.hero.quote')}</span>
              <ArrowRight className={`h-5 w-5 ${language === 'ar' ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>
      </section>

      {/* Our Clients Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">عملاؤنا</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              نفخر بثقة كبرى الشركات والمؤسسات في المملكة العربية السعودية
            </p>
          </div>
          <div className="relative overflow-hidden">
            <div className="flex animate-scroll">
              {[...loadedClientLogos, ...loadedClientLogos].map((client, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 mx-8 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-4"
                  style={{ minWidth: '180px' }}
                >
                  <img
                    src={client.logo}
                    alt={client.name}
                    className="w-full h-16 object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">{t('cta.title')}</h2>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            {t('cta.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onNavigate('quote')}
              className="bg-yellow-500 hover:bg-yellow-600 text-black px-10 py-4 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105"
            >
              {t('cta.consultation')}
            </button>
            <button
              onClick={() => window.open('https://wa.me/966559299897')}
              className="bg-green-500 hover:bg-green-600 text-white px-10 py-4 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
            >
              <MessageCircle className="h-6 w-6" />
              <span>{t('cta.whatsapp')}</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
