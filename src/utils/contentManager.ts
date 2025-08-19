// نظام إدارة المحتوى العالمي
export interface ContentData {
  designWorks: DesignWork[];
  supervisionWorks: SupervisionWork[];
  featuredProjects: FeaturedProject[];
  clientLogos: ClientLogo[];
  teamMembers: TeamMember[];
  heroSettings: HeroSettings;
}

export interface DesignWork {
  id: string;
  title: string;
  icon: string;
  images: string[];
}

export interface SupervisionWork {
  id: string;
  title: string;
  icon: string;
  images: string[];
}

export interface FeaturedProject {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
}

export interface ClientLogo {
  id: string;
  name: string;
  logo: string;
}

export interface TeamMember {
  id: string;
  name: string;
  position: string;
  experience: string;
  specialization: string;
  image?: string;
}

export interface HeroSettings {
  backgroundImage: string;
  overlayOpacity: number;
  gradientColors: {
    from: string;
    via: string;
    to: string;
  };
}

// تحميل المحتوى من الملف العام
export const loadGlobalContent = async (): Promise<ContentData | null> => {
  try {
    const response = await fetch('/content.json');
    if (!response.ok) {
      throw new Error('Failed to load content');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('خطأ في تحميل المحتوى العالمي:', error);
    return null;
  }
};

// حفظ المحتوى (للمدير فقط - محاكاة)
export const saveGlobalContent = async (data: ContentData): Promise<boolean> => {
  try {
    // في البيئة الحقيقية، هذا سيرسل البيانات لخادم
    // هنا سنحفظ في localStorage كنسخة احتياطية
    localStorage.setItem('globalContent', JSON.stringify(data));
    
    // إرسال إشعار للصفحات الأخرى
    window.dispatchEvent(new CustomEvent('globalContentUpdated', { 
      detail: data 
    }));
    
    console.log('تم حفظ المحتوى العالمي');
    return true;
  } catch (error) {
    console.error('خطأ في حفظ المحتوى العالمي:', error);
    return false;
  }
};

// دمج المحتوى المحلي مع العالمي
export const mergeContent = (globalContent: ContentData, localContent: any): ContentData => {
  return {
    designWorks: localContent.designWorks || globalContent.designWorks,
    supervisionWorks: localContent.supervisionWorks || globalContent.supervisionWorks,
    featuredProjects: localContent.featuredProjects || globalContent.featuredProjects,
    clientLogos: localContent.clientLogos || globalContent.clientLogos,
    teamMembers: localContent.teamMembers || globalContent.teamMembers,
    heroSettings: localContent.heroSettings || globalContent.heroSettings,
  };
};

// تحديث قسم معين من المحتوى
export const updateContentSection = async (section: keyof ContentData, data: any): Promise<boolean> => {
  try {
    const currentContent = await loadGlobalContent();
    if (!currentContent) return false;
    
    const updatedContent = {
      ...currentContent,
      [section]: data
    };
    
    return await saveGlobalContent(updatedContent);
  } catch (error) {
    console.error('خطأ في تحديث قسم المحتوى:', error);
    return false;
  }
};

// الحصول على قسم معين من المحتوى
export const getContentSection = async (section: keyof ContentData): Promise<any> => {
  try {
    const content = await loadGlobalContent();
    return content ? content[section] : null;
  } catch (error) {
    console.error('خطأ في الحصول على قسم المحتوى:', error);
    return null;
  }
};

// فحص ما إذا كان المستخدم مدير
export const isAdmin = (): boolean => {
  const user = localStorage.getItem('adminUser');
  return !!user;
};

// تحديث المحتوى للمدير
export const adminUpdateContent = async (section: keyof ContentData, data: any): Promise<boolean> => {
  if (!isAdmin()) {
    console.error('غير مصرح لك بتحديث المحتوى');
    return false;
  }
  
  // حفظ في localStorage للمدير
  const existingData = JSON.parse(localStorage.getItem('globalContent') || '{}');
  existingData[section] = data;
  localStorage.setItem('globalContent', JSON.stringify(existingData));
  
  // إرسال إشعار للصفحات
  window.dispatchEvent(new CustomEvent('adminContentUpdated', { 
    detail: { section, data } 
  }));
  
  return true;
};

// تحميل المحتوى للعرض العام
export const loadPublicContent = async (): Promise<ContentData> => {
  try {
    // محاولة تحميل المحتوى المحدث من المدير
    const adminContent = localStorage.getItem('globalContent');
    if (adminContent) {
      const parsedAdminContent = JSON.parse(adminContent);
      console.log('تم تحميل المحتوى المحدث من المدير');
      return parsedAdminContent;
    }
    
    // إذا لم يوجد محتوى من المدير، تحميل المحتوى الافتراضي
    const defaultContent = await loadGlobalContent();
    if (defaultContent) {
      console.log('تم تحميل المحتوى الافتراضي');
      return defaultContent;
    }
    
    // إذا فشل كل شيء، إرجاع محتوى فارغ
    throw new Error('فشل في تحميل المحتوى');
  } catch (error) {
    console.error('خطأ في تحميل المحتوى العام:', error);
    // إرجاع محتوى افتراضي في حالة الخطأ
    return getDefaultContent();
  }
};

// المحتوى الافتراضي في حالة الخطأ
const getDefaultContent = (): ContentData => {
  return {
    designWorks: [
      {
        id: 'villas',
        title: 'فلل وقصور',
        icon: '🏠',
        images: ['https://images.pexels.com/photos/280232/pexels-photo-280232.jpeg?auto=compress&cs=tinysrgb&w=800']
      }
    ],
    supervisionWorks: [
      {
        id: 'towers',
        title: 'أبراج إدارية',
        icon: '🏗️',
        images: ['https://images.pexels.com/photos/2467558/pexels-photo-2467558.jpeg?auto=compress&cs=tinysrgb&w=800']
      }
    ],
    featuredProjects: [
      {
        id: '1',
        title: 'مشروع تجريبي',
        category: 'مشاريع سكنية',
        image: 'https://images.pexels.com/photos/280232/pexels-photo-280232.jpeg?auto=compress&cs=tinysrgb&w=800',
        description: 'وصف المشروع'
      }
    ],
    clientLogos: [
      {
        id: '1',
        name: 'عميل تجريبي',
        logo: 'https://via.placeholder.com/150x80/1e40af/ffffff?text=عميل'
      }
    ],
    teamMembers: [
      {
        id: '1',
        name: 'م. أحمد السعيد',
        position: 'المدير العام',
        experience: '20 سنة خبرة',
        specialization: 'الهندسة المعمارية'
      }
    ],
    heroSettings: {
      backgroundImage: '',
      overlayOpacity: 60,
      gradientColors: {
        from: 'from-blue-900',
        via: 'via-blue-800',
        to: 'to-blue-900'
      }
    }
  };
};