// نظام مصادقة بسيط للوحة التحكم
export interface AdminUser {
  id: string;
  username: string;
  password: string;
  email: string;
  role: 'admin' | 'editor';
  lastLogin?: string;
}

// بيانات المدير الافتراضية
const DEFAULT_ADMIN: AdminUser = {
  id: '1',
  username: 'admin',
  password: 'admin123',
  email: 'admin@osos-imar.com',
  role: 'admin'
};

// الحصول على بيانات المدير المحفوظة أو الافتراضية
const getAdminCredentials = (): AdminUser => {
  const saved = localStorage.getItem('adminCredentials');
  return saved ? JSON.parse(saved) : DEFAULT_ADMIN;
};

// حفظ بيانات المدير
const saveAdminCredentials = (admin: AdminUser): void => {
  localStorage.setItem('adminCredentials', JSON.stringify(admin));
};

// فحص تسجيل الدخول
export const isLoggedIn = (): boolean => {
  const user = localStorage.getItem('adminUser');
  const adminLoggedIn = localStorage.getItem('adminLoggedIn');
  return !!(user || adminLoggedIn === 'true');
};

// الحصول على بيانات المستخدم الحالي
export const getCurrentUser = (): AdminUser | null => {
  const user = localStorage.getItem('adminUser');
  return user ? JSON.parse(user) : null;
};

// تسجيل الدخول
export const login = (username: string, password: string): boolean => {
  const adminCredentials = getAdminCredentials();
  
  if (username === adminCredentials.username && password === adminCredentials.password) {
    const user = { ...adminCredentials, lastLogin: new Date().toISOString() };
    localStorage.setItem('adminUser', JSON.stringify(user));
    return true;
  }
  return false;
};

// تسجيل الخروج
export const logout = (): void => {
  localStorage.removeItem('adminUser');
};

// تغيير كلمة المرور
export const updateAdminCredentials = (newUsername: string, newPassword: string, newEmail: string): boolean => {
  const currentUser = getCurrentUser();
  if (!currentUser) return false;
  
  const updatedAdmin: AdminUser = {
    ...currentUser,
    username: newUsername,
    password: newPassword,
    email: newEmail
  };
  
  saveAdminCredentials(updatedAdmin);
  localStorage.setItem('adminUser', JSON.stringify(updatedAdmin));
  return true;
};

// التحقق من كلمة المرور الحالية
export const verifyCurrentPassword = (password: string): boolean => {
  const adminCredentials = getAdminCredentials();
  return password === adminCredentials.password;
};

// الحصول على بيانات المدير للتعديل
export const getAdminCredentials_Public = (): AdminUser => {
  return getAdminCredentials();
};

// حفظ الصور المرفوعة
export const saveUploadedImage = (file: File): Promise<string> => {
  return new Promise((resolve) => {
    // فحص حجم الملف (أقل من 2MB)
    if (file.size > 2 * 1024 * 1024) {
      reject(new Error('حجم الملف كبير جداً. يرجى اختيار صورة أصغر من 2MB'));
      return;
    }
    
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const imageData = e.target?.result as string;
        
        // فحص حجم البيانات المُرمزة
        if (imageData.length > 500000) { // حوالي 500KB
          console.warn('الصورة كبيرة، سيتم ضغطها');
          // يمكن إضافة ضغط الصورة هنا في المستقبل
        }
        
        resolve(imageData);
      } catch (error) {
        reject(error);
      }
    };
    
    reader.onerror = () => {
      reject(new Error('فشل في قراءة الملف'));
    };
    
    reader.readAsDataURL(file);
  });
};

// الحصول على الصورة المحفوظة
export const getUploadedImage = (imageId: string): string | null => {
  // لا نحتاج هذه الوظيفة بعد الآن لأننا لا نحفظ الصور في localStorage
  return null;
};

// حفظ بيانات المحتوى
export const saveContentData = (key: string, data: any): void => {
  try {
    // تنظيف البيانات من الصور الكبيرة قبل الحفظ
    const cleanedData = cleanDataForStorage(data);
    localStorage.setItem(`content_${key}`, JSON.stringify(cleanedData));
  } catch (error) {
    if (error instanceof DOMException && error.name === 'QuotaExceededError') {
      console.warn('تجاوز حد التخزين المحلي، سيتم حفظ البيانات بدون الصور');
      // حفظ البيانات بدون الصور
      const dataWithoutImages = removeImagesFromData(data);
      try {
        localStorage.setItem(`content_${key}`, JSON.stringify(dataWithoutImages));
      } catch (secondError) {
        console.error('فشل في حفظ البيانات حتى بدون الصور:', secondError);
      }
    } else {
      console.error('خطأ في حفظ البيانات:', error);
    }
  }
};

// تنظيف البيانات من الصور الكبيرة
const cleanDataForStorage = (data: any): any => {
  if (Array.isArray(data)) {
    return data.map(item => cleanDataForStorage(item));
  }
  
  if (typeof data === 'object' && data !== null) {
    const cleaned: any = {};
    for (const key in data) {
      if (key === 'images' && Array.isArray(data[key])) {
        // الاحتفاظ فقط بالصور التي ليست Data URLs كبيرة
        cleaned[key] = data[key].filter((img: string) => 
          !img.startsWith('data:') || img.length < 50000 // أقل من 50KB
        );
      } else if (key === 'image' && typeof data[key] === 'string') {
        // الاحتفاظ بالصورة فقط إذا لم تكن Data URL كبيرة
        if (!data[key].startsWith('data:') || data[key].length < 50000) {
          cleaned[key] = data[key];
        } else {
          cleaned[key] = 'https://images.pexels.com/photos/280232/pexels-photo-280232.jpeg?auto=compress&cs=tinysrgb&w=800';
        }
      } else if (key === 'logo' && typeof data[key] === 'string') {
        // الاحتفاظ بالشعار فقط إذا لم يكن Data URL كبير
        if (!data[key].startsWith('data:') || data[key].length < 50000) {
          cleaned[key] = data[key];
        } else {
          cleaned[key] = 'https://via.placeholder.com/150x80/1e40af/ffffff?text=شعار';
        }
      } else {
        cleaned[key] = cleanDataForStorage(data[key]);
      }
    }
    return cleaned;
  }
  
  return data;
};

// إزالة الصور من البيانات كحل أخير
const removeImagesFromData = (data: any): any => {
  if (Array.isArray(data)) {
    return data.map(item => removeImagesFromData(item));
  }
  
  if (typeof data === 'object' && data !== null) {
    const cleaned: any = {};
    for (const key in data) {
      if (key === 'images') {
        cleaned[key] = ['https://images.pexels.com/photos/280232/pexels-photo-280232.jpeg?auto=compress&cs=tinysrgb&w=800'];
      } else if (key === 'image') {
        cleaned[key] = 'https://images.pexels.com/photos/280232/pexels-photo-280232.jpeg?auto=compress&cs=tinysrgb&w=800';
      } else if (key === 'logo') {
        cleaned[key] = 'https://via.placeholder.com/150x80/1e40af/ffffff?text=شعار';
      } else {
        cleaned[key] = removeImagesFromData(data[key]);
      }
    }
    return cleaned;
  }
  
  return data;
};

// الحصول على بيانات المحتوى
export const getContentData = (key: string): any => {
  const data = localStorage.getItem(`content_${key}`);
  return data ? JSON.parse(data) : null;
};

// حذف بيانات المحتوى
export const deleteContentData = (key: string): void => {
  localStorage.removeItem(`content_${key}`);
};

// أنواع البيانات للمحتوى
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

export interface Project {
  id: string;
  title: string;
  category: 'residential' | 'commercial' | 'educational' | 'healthcare' | 'industrial';
  location: string;
  year: string;
  area: string;
  description: string;
  image: string;
  services: string[];
  details: string;
}

// الحصول على البيانات الافتراضية
export const getDefaultData = () => {
  return {
    designWorks: [
      {
        id: 'villas',
        title: 'فلل ور',
        icon: '🏠',
        images: [
          'https://i.postimg.cc/bYMWdDK9/3.jpg',
          'https://images.pexels.com/photos/280232/pexels-photo-280232.jpeg?auto=compress&cs=tinysrgb&w=800'
        ]
      },
      {
        id: 'commercial',
        title: 'مشاريع تجارية',
        icon: '🏢',
        images: [
          'https://images.pexels.com/photos/2467558/pexels-photo-2467558.jpeg?auto=compress&cs=tinysrgb&w=800'
        ]
      }
    ],
    supervisionWorks: [
      {
        id: 'towers',
        title: 'أبراج إدارية',
        icon: '🏗️',
        images: [
          'https://images.pexels.com/photos/2467558/pexels-photo-2467558.jpeg?auto=compress&cs=tinysrgb&w=800'
        ]
      }
    ],
    featuredProjects: [
      {
        id: '1',
        title: 'مجمع الأمير السكني',
        category: 'مشاريع سكنية',
        image: 'https://images.pexels.com/photos/280232/pexels-photo-280232.jpeg?auto=compress&cs=tinysrgb&w=800',
        description: 'مجمع سكني فاخر يضم 120 وحدة سكنية'
      }
    ],
    clientLogos: [
      {
        id: '1',
        name: 'شركة أرامكو السعودية',
        logo: 'https://via.placeholder.com/150x80/1e40af/ffffff?text=أرامكو'
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
    },
    projects: [
      {
        id: '1',
        title: 'مجمع الأمير السكني',
        category: 'residential' as const,
        location: 'الرياض',
        year: '2023',
        area: '15,000 م²',
        description: 'مجمع سكني فاخر يضم 120 وحدة سكنية مع مرافق ترفيهية ومساحات خضراء',
        image: 'https://images.pexels.com/photos/280232/pexels-photo-280232.jpeg?auto=compress&cs=tinysrgb&w=800',
        services: ['التصميم المعماري', 'التصميم الإنشائي', 'أنظمة الكهروميكانيك'],
        details: 'مشروع سكني متكامل يجمع بين التصميم العصري والطابع المعماري المحلي'
      }
    ]
  };
};

// فحص الصلاحيات
export const hasPermission = (permission: string): boolean => {
  const user = getCurrentUser();
  if (!user) return false;
  
  // المدير له جميع الصلاحيات
  if (user.role === 'admin') return true;
  
  // المحرر له صلاحيات محدودة
  if (user.role === 'editor') {
    const editorPermissions = ['read', 'edit_content', 'manage_projects'];
    return editorPermissions.includes(permission);
  }
  
  return false;
};
