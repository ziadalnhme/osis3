import { useState, useEffect } from 'react';

interface CMSData {
  [key: string]: any;
}

export const useNetlifyCMS = () => {
  const [data, setData] = useState<CMSData>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // تحميل البيانات من ملفات JSON
  const loadData = async () => {
    try {
      setLoading(true);
      
      // تحميل الإعدادات العامة
      const settingsResponse = await fetch('/src/data/settings.json');
      const settings = await settingsResponse.json();
      
      // تحميل إعدادات القسم الرئيسي
      const heroResponse = await fetch('/src/data/hero.json');
      const hero = await heroResponse.json();
      
      // تحميل معلومات الشركة
      const aboutResponse = await fetch('/src/data/about.json');
      const about = await aboutResponse.json();
      
      // تحميل معلومات التواصل
      const contactResponse = await fetch('/src/data/contact.json');
      const contact = await contactResponse.json();
      
      // تحميل أعمال التصميم
      const designWorks = await loadCollectionData('design-works');
      
      // تحميل أعمال الإشراف
      const supervisionWorks = await loadCollectionData('supervision-works');
      
      // تحميل المشاريع المميزة
      const featuredProjects = await loadCollectionData('featured-projects');
      
      // تحميل فريق العمل
      const teamMembers = await loadCollectionData('team-members');
      
      // تحميل شعارات العملاء
      const clientLogos = await loadCollectionData('client-logos');
      
      // تحميل الخدمات
      const services = await loadCollectionData('services');
      
      // تحميل آراء العملاء
      const testimonials = await loadCollectionData('testimonials');
      
      // تحميل المدونة
      const blog = await loadCollectionData('blog');
      
      setData({
        settings,
        hero,
        about,
        contact,
        designWorks,
        supervisionWorks,
        featuredProjects,
        teamMembers,
        clientLogos,
        services,
        testimonials,
        blog
      });
      
      setError(null);
    } catch (err) {
      console.error('خطأ في تحميل البيانات من Netlify CMS:', err);
      setError('فشل في تحميل البيانات');
      
      // استخدام البيانات الافتراضية في حالة الخطأ
      setData(getDefaultData());
    } finally {
      setLoading(false);
    }
  };

  // تحميل بيانات مجموعة معينة
  const loadCollectionData = async (collectionName: string) => {
    try {
      // في البيئة الحقيقية، سيتم تحميل الملفات من مجلد البيانات
      // هنا سنستخدم البيانات الافتراضية
      return getDefaultCollectionData(collectionName);
    } catch (error) {
      console.error(`خطأ في تحميل ${collectionName}:`, error);
      return [];
    }
  };

  // البيانات الافتراضية
  const getDefaultData = () => ({
    settings: {
      companyName: "أسس الأعمار للاستشارات الهندسية",
      companyDescription: "شركة رائدة في مجال الاستشارات الهندسية",
      phone: "+966 55 929 9897",
      email: "info@osos-imar.com",
      address: "حي المنار، شارع الملك فهد طريق المطار، جوار مطعم البيك، الدمام 32273",
      workingHours: "السبت - الخميس: 8:00 ص - 12:00 م و 4:00 م - 8:00 م",
      whatsappLink: "https://wa.me/966559299897",
      logo: "/شعار اسس الاعمار المتقدمة-0١.svg"
    },
    hero: {
      title: "شركة أسس الأعمار للاستشارات الهندسية",
      subtitle: "نحن نبني المستقبل من خلال حلول هندسية مبتكرة ومتطورة",
      backgroundImage: "",
      overlayOpacity: 60,
      gradientColors: {
        from: "from-blue-900",
        via: "via-blue-800",
        to: "to-blue-900"
      }
    },
    designWorks: [],
    supervisionWorks: [],
    featuredProjects: [],
    teamMembers: [],
    clientLogos: [],
    services: [],
    testimonials: [],
    blog: []
  });

  const getDefaultCollectionData = (collectionName: string) => {
    // إرجاع مصفوفة فارغة للمجموعات
    return [];
  };

  // تحديث البيانات
  const updateData = (key: string, newData: any) => {
    setData(prev => ({
      ...prev,
      [key]: newData
    }));
  };

  // إعادة تحميل البيانات
  const reloadData = () => {
    loadData();
  };

  useEffect(() => {
    loadData();
  }, []);

  return {
    data,
    loading,
    error,
    updateData,
    reloadData
  };
};

// Hook لتحميل مجموعة معينة
export const useNetlifyCMSCollection = (collectionName: string) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadCollection = async () => {
    try {
      setLoading(true);
      // تحميل البيانات من المجلد المناسب
      const response = await fetch(`/src/data/${collectionName}/index.json`);
      if (response.ok) {
        const collectionData = await response.json();
        setData(collectionData);
      } else {
        setData([]);
      }
      setError(null);
    } catch (err) {
      console.error(`خطأ في تحميل ${collectionName}:`, err);
      setError(`فشل في تحميل ${collectionName}`);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCollection();
  }, [collectionName]);

  return {
    data,
    loading,
    error,
    reload: loadCollection
  };
};