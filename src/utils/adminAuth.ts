// نظام مصادقة بسيط للوحة التحكم
export interface AdminUser {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'editor';
  lastLogin?: string;
}

// بيانات المدير الافتراضية
const DEFAULT_ADMIN: AdminUser = {
  id: '1',
  username: 'admin',
  email: 'admin@osos-imar.com',
  role: 'admin'
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
  // في البيئة الحقيقية، يجب التحقق من قاعدة البيانات
  if (username === 'admin' && password === 'admin123') {
    const user = { ...DEFAULT_ADMIN, lastLogin: new Date().toISOString() };
    localStorage.setItem('adminUser', JSON.stringify(user));
    return true;
  }
  return false;
};

// تسجيل الخروج
export const logout = (): void => {
  localStorage.removeItem('adminUser');
  localStorage.removeItem('siteSettings');
};

// تغيير كلمة المرور
export const changePassword = (oldPassword: string, newPassword: string): boolean => {
  // في البيئة الحقيقية، يجب التحقق من كلمة المرور القديمة
  if (oldPassword === 'admin123') {
    // حفظ كلمة المرور الجديدة (يجب تشفيرها)
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