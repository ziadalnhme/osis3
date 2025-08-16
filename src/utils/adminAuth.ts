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
  return !!user;
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
    const reader = new FileReader();
    reader.onload = (e) => {
      const imageData = e.target?.result as string;
      // في البيئة الحقيقية، يجب رفع الصورة إلى خادم
      // هنا نحفظها كـ base64 في localStorage
      const imageId = Date.now().toString();
      const images = JSON.parse(localStorage.getItem('uploadedImages') || '{}');
      images[imageId] = imageData;
      localStorage.setItem('uploadedImages', JSON.stringify(images));
      resolve(imageData);
    };
    reader.readAsDataURL(file);
  });
};

// الحصول على الصورة المحفوظة
export const getUploadedImage = (imageId: string): string | null => {
  const images = JSON.parse(localStorage.getItem('uploadedImages') || '{}');
  return images[imageId] || null;
};

// حفظ بيانات المحتوى
export const saveContentData = (key: string, data: any): void => {
  localStorage.setItem(`content_${key}`, JSON.stringify(data));
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
        title: 'فلل وقصور',
        icon: '🏠',
        images: [
          'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800',
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
    return true;
  }
  return false;
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