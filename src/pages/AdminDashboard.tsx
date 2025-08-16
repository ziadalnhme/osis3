import React, { useState, useEffect } from 'react';
import { 
  Settings, 
  LogOut, 
  Users, 
  Building, 
  Home, 
  Briefcase, 
  Edit, 
  Trash2, 
  Plus, 
  Save, 
  X, 
  Upload,
  Eye,
  User,
  Lock,
  Mail,
  Image,
  FileText,
  Star,
  MapPin,
  Calendar
} from 'lucide-react';
import { 
  logout, 
  getCurrentUser, 
  updateAdminCredentials, 
  verifyCurrentPassword,
  getAdminCredentials_Public,
  saveUploadedImage,
  saveContentData,
  getContentData,
  getDefaultData,
  type DesignWork,
  type SupervisionWork,
  type FeaturedProject,
  type ClientLogo,
  type TeamMember,
  type Project
} from '../utils/adminAuth';

interface AdminDashboardProps {
  onNavigate: (page: string) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showSettings, setShowSettings] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [editingType, setEditingType] = useState<string>('');
  
  // بيانات المدير
  const [adminData, setAdminData] = useState({
    username: '',
    password: '',
    email: '',
    currentPassword: ''
  });

  // بيانات المحتوى
  const [designWorks, setDesignWorks] = useState<DesignWork[]>([]);
  const [supervisionWorks, setSupervisionWorks] = useState<SupervisionWork[]>([]);
  const [featuredProjects, setFeaturedProjects] = useState<FeaturedProject[]>([]);
  const [clientLogos, setClientLogos] = useState<ClientLogo[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);

  // رسائل النظام
  const [messages] = useState(() => {
    return JSON.parse(localStorage.getItem('adminMessages') || '[]');
  });

  // تحميل البيانات عند بدء التشغيل
  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = () => {
    const defaultData = getDefaultData();
    
    // تحميل بيانات المدير
    const adminCredentials = getAdminCredentials_Public();
    setAdminData({
      username: adminCredentials.username,
      password: '',
      email: adminCredentials.email,
      currentPassword: ''
    });

    // تحميل بيانات المحتوى أو استخدام البيانات الافتراضية
    setDesignWorks(getContentData('designWorks') || defaultData.designWorks);
    setSupervisionWorks(getContentData('supervisionWorks') || defaultData.supervisionWorks);
    setFeaturedProjects(getContentData('featuredProjects') || defaultData.featuredProjects);
    setClientLogos(getContentData('clientLogos') || defaultData.clientLogos);
    setTeamMembers(getContentData('teamMembers') || defaultData.teamMembers);
    setProjects(getContentData('projects') || defaultData.projects);
  };

  // حفظ بيانات المدير
  const handleSaveAdminData = () => {
    if (!adminData.currentPassword) {
      alert('يرجى إدخال كلمة المرور الحالية');
      return;
    }

    if (!verifyCurrentPassword(adminData.currentPassword)) {
      alert('كلمة المرور الحالية غير صحيحة');
      return;
    }

    const newPassword = adminData.password || adminData.currentPassword;
    
    if (updateAdminCredentials(adminData.username, newPassword, adminData.email)) {
      alert('تم تحديث البيانات بنجاح');
      setShowSettings(false);
      setAdminData(prev => ({ ...prev, password: '', currentPassword: '' }));
    } else {
      alert('حدث خطأ في تحديث البيانات');
    }
  };

  // رفع الصور
  const handleImageUpload = async (file: File): Promise<string> => {
    try {
      const imageUrl = await saveUploadedImage(file);
      return imageUrl;
    } catch (error) {
      console.error('خطأ في رفع الصورة:', error);
      throw error;
    }
  };

  // حفظ البيانات
  const saveData = (type: string, data: any[]) => {
    saveContentData(type, data);
  };

  // إضافة عنصر جديد
  const handleAdd = (type: string) => {
    const newItem = createNewItem(type);
    setEditingItem(newItem);
    setEditingType(type);
    setShowEditModal(true);
  };

  // تعديل عنصر
  const handleEdit = (type: string, item: any) => {
    setEditingItem({ ...item });
    setEditingType(type);
    setShowEditModal(true);
  };

  // حذف عنصر
  const handleDelete = (type: string, id: string) => {
    if (!confirm('هل أنت متأكد من الحذف؟')) return;

    switch (type) {
      case 'designWorks':
        const newDesignWorks = designWorks.filter(item => item.id !== id);
        setDesignWorks(newDesignWorks);
        saveData('designWorks', newDesignWorks);
        break;
      case 'supervisionWorks':
        const newSupervisionWorks = supervisionWorks.filter(item => item.id !== id);
        setSupervisionWorks(newSupervisionWorks);
        saveData('supervisionWorks', newSupervisionWorks);
        break;
      case 'featuredProjects':
        const newFeaturedProjects = featuredProjects.filter(item => item.id !== id);
        setFeaturedProjects(newFeaturedProjects);
        saveData('featuredProjects', newFeaturedProjects);
        break;
      case 'clientLogos':
        const newClientLogos = clientLogos.filter(item => item.id !== id);
        setClientLogos(newClientLogos);
        saveData('clientLogos', newClientLogos);
        break;
      case 'teamMembers':
        const newTeamMembers = teamMembers.filter(item => item.id !== id);
        setTeamMembers(newTeamMembers);
        saveData('teamMembers', newTeamMembers);
        break;
      case 'projects':
        const newProjects = projects.filter(item => item.id !== id);
        setProjects(newProjects);
        saveData('projects', newProjects);
        break;
    }
  };

  // إنشاء عنصر جديد
  const createNewItem = (type: string) => {
    const id = Date.now().toString();
    
    switch (type) {
      case 'designWorks':
        return { id, title: '', icon: '🏠', images: [] };
      case 'supervisionWorks':
        return { id, title: '', icon: '🏗️', images: [] };
      case 'featuredProjects':
        return { id, title: '', category: '', image: '', description: '' };
      case 'clientLogos':
        return { id, name: '', logo: '' };
      case 'teamMembers':
        return { id, name: '', position: '', experience: '', specialization: '', image: '' };
      case 'projects':
        return { 
          id, 
          title: '', 
          category: 'residential', 
          location: '', 
          year: new Date().getFullYear().toString(), 
          area: '', 
          description: '', 
          image: '', 
          services: [], 
          details: '' 
        };
      default:
        return {};
    }
  };

  // حفظ التعديلات
  const handleSaveEdit = async () => {
    if (!editingItem) return;

    try {
      switch (editingType) {
        case 'designWorks':
          const updatedDesignWorks = editingItem.id && designWorks.find(item => item.id === editingItem.id)
            ? designWorks.map(item => item.id === editingItem.id ? editingItem : item)
            : [...designWorks, editingItem];
          setDesignWorks(updatedDesignWorks);
          saveData('designWorks', updatedDesignWorks);
          break;
        case 'supervisionWorks':
          const updatedSupervisionWorks = editingItem.id && supervisionWorks.find(item => item.id === editingItem.id)
            ? supervisionWorks.map(item => item.id === editingItem.id ? editingItem : item)
            : [...supervisionWorks, editingItem];
          setSupervisionWorks(updatedSupervisionWorks);
          saveData('supervisionWorks', updatedSupervisionWorks);
          break;
        case 'featuredProjects':
          const updatedFeaturedProjects = editingItem.id && featuredProjects.find(item => item.id === editingItem.id)
            ? featuredProjects.map(item => item.id === editingItem.id ? editingItem : item)
            : [...featuredProjects, editingItem];
          setFeaturedProjects(updatedFeaturedProjects);
          saveData('featuredProjects', updatedFeaturedProjects);
          break;
        case 'clientLogos':
          const updatedClientLogos = editingItem.id && clientLogos.find(item => item.id === editingItem.id)
            ? clientLogos.map(item => item.id === editingItem.id ? editingItem : item)
            : [...clientLogos, editingItem];
          setClientLogos(updatedClientLogos);
          saveData('clientLogos', updatedClientLogos);
          break;
        case 'teamMembers':
          const updatedTeamMembers = editingItem.id && teamMembers.find(item => item.id === editingItem.id)
            ? teamMembers.map(item => item.id === editingItem.id ? editingItem : item)
            : [...teamMembers, editingItem];
          setTeamMembers(updatedTeamMembers);
          saveData('teamMembers', updatedTeamMembers);
          break;
        case 'projects':
          const updatedProjects = editingItem.id && projects.find(item => item.id === editingItem.id)
            ? projects.map(item => item.id === editingItem.id ? editingItem : item)
            : [...projects, editingItem];
          setProjects(updatedProjects);
          saveData('projects', updatedProjects);
          break;
      }
      
      setShowEditModal(false);
      setEditingItem(null);
      setEditingType('');
      alert('تم الحفظ بنجاح');
    } catch (error) {
      console.error('خطأ في الحفظ:', error);
      alert('حدث خطأ في الحفظ');
    }
  };

  // رفع صورة واحدة
  const handleSingleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const imageUrl = await handleImageUpload(file);
        setEditingItem(prev => ({ ...prev, [field]: imageUrl }));
      } catch (error) {
        alert('حدث خطأ في رفع الصورة');
      }
    }
  };

  // رفع صور متعددة
  const handleMultipleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    try {
      const imageUrls = await Promise.all(files.map(file => handleImageUpload(file)));
      setEditingItem(prev => ({ 
        ...prev, 
        images: [...(prev.images || []), ...imageUrls] 
      }));
    } catch (error) {
      alert('حدث خطأ في رفع الصور');
    }
  };

  // إزالة صورة من القائمة
  const removeImage = (index: number) => {
    setEditingItem(prev => ({
      ...prev,
      images: prev.images.filter((_: any, i: number) => i !== index)
    }));
  };

  const tabs = [
    { id: 'overview', label: 'نظرة عامة', icon: Home },
    { id: 'homepage', label: 'الصفحة الرئيسية', icon: Home },
    { id: 'about', label: 'حول الشركة', icon: Building },
    { id: 'projects', label: 'المشاريع', icon: Briefcase },
    { id: 'messages', label: 'الرسائل', icon: Users }
  ];

  const renderEditModal = () => {
    if (!showEditModal || !editingItem) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b border-gray-200 flex items-center justify-between">
            <h3 className="text-xl font-bold text-gray-900">
              {editingItem.id && (editingType === 'designWorks' ? designWorks.find(item => item.id === editingItem.id) : 
                editingType === 'supervisionWorks' ? supervisionWorks.find(item => item.id === editingItem.id) :
                editingType === 'featuredProjects' ? featuredProjects.find(item => item.id === editingItem.id) :
                editingType === 'clientLogos' ? clientLogos.find(item => item.id === editingItem.id) :
                editingType === 'teamMembers' ? teamMembers.find(item => item.id === editingItem.id) :
                editingType === 'projects' ? projects.find(item => item.id === editingItem.id) : null) 
                ? 'تعديل' : 'إضافة جديد'}
            </h3>
            <button
              onClick={() => setShowEditModal(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="p-6 space-y-6">
            {/* نموذج أعمال التصميم */}
            {editingType === 'designWorks' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">العنوان</label>
                  <input
                    type="text"
                    value={editingItem.title || ''}
                    onChange={(e) => setEditingItem(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">الأيقونة (إيموجي)</label>
                  <input
                    type="text"
                    value={editingItem.icon || ''}
                    onChange={(e) => setEditingItem(prev => ({ ...prev, icon: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="🏠"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">الصور</label>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleMultipleImageUpload}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                  <div className="mt-4 grid grid-cols-3 gap-4">
                    {editingItem.images?.map((image: string, index: number) => (
                      <div key={index} className="relative">
                        <img src={image} alt={`صورة ${index + 1}`} className="w-full h-24 object-cover rounded-lg" />
                        <button
                          onClick={() => removeImage(index)}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* نموذج أعمال الإشراف */}
            {editingType === 'supervisionWorks' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">العنوان</label>
                  <input
                    type="text"
                    value={editingItem.title || ''}
                    onChange={(e) => setEditingItem(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">الأيقونة (إيموجي)</label>
                  <input
                    type="text"
                    value={editingItem.icon || ''}
                    onChange={(e) => setEditingItem(prev => ({ ...prev, icon: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="🏗️"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">الصور</label>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleMultipleImageUpload}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                  <div className="mt-4 grid grid-cols-3 gap-4">
                    {editingItem.images?.map((image: string, index: number) => (
                      <div key={index} className="relative">
                        <img src={image} alt={`صورة ${index + 1}`} className="w-full h-24 object-cover rounded-lg" />
                        <button
                          onClick={() => removeImage(index)}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* نموذج المشاريع المميزة */}
            {editingType === 'featuredProjects' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">العنوان</label>
                  <input
                    type="text"
                    value={editingItem.title || ''}
                    onChange={(e) => setEditingItem(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">الفئة</label>
                  <input
                    type="text"
                    value={editingItem.category || ''}
                    onChange={(e) => setEditingItem(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">الوصف</label>
                  <textarea
                    value={editingItem.description || ''}
                    onChange={(e) => setEditingItem(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    rows={3}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">الصورة</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleSingleImageUpload(e, 'image')}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                  {editingItem.image && (
                    <img src={editingItem.image} alt="معاينة" className="mt-4 w-32 h-24 object-cover rounded-lg" />
                  )}
                </div>
              </>
            )}

            {/* نموذج شعارات العملاء */}
            {editingType === 'clientLogos' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">اسم العميل</label>
                  <input
                    type="text"
                    value={editingItem.name || ''}
                    onChange={(e) => setEditingItem(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">الشعار</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleSingleImageUpload(e, 'logo')}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                  {editingItem.logo && (
                    <img src={editingItem.logo} alt="معاينة الشعار" className="mt-4 w-32 h-20 object-contain rounded-lg border" />
                  )}
                </div>
              </>
            )}

            {/* نموذج فريق العمل */}
            {editingType === 'teamMembers' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">الاسم</label>
                  <input
                    type="text"
                    value={editingItem.name || ''}
                    onChange={(e) => setEditingItem(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">المنصب</label>
                  <input
                    type="text"
                    value={editingItem.position || ''}
                    onChange={(e) => setEditingItem(prev => ({ ...prev, position: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">سنوات الخبرة</label>
                  <input
                    type="text"
                    value={editingItem.experience || ''}
                    onChange={(e) => setEditingItem(prev => ({ ...prev, experience: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">التخصص</label>
                  <input
                    type="text"
                    value={editingItem.specialization || ''}
                    onChange={(e) => setEditingItem(prev => ({ ...prev, specialization: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">الصورة الشخصية</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleSingleImageUpload(e, 'image')}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                  {editingItem.image && (
                    <img src={editingItem.image} alt="معاينة الصورة" className="mt-4 w-24 h-24 object-cover rounded-full" />
                  )}
                </div>
              </>
            )}

            {/* نموذج المشاريع */}
            {editingType === 'projects' && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">اسم المشروع</label>
                    <input
                      type="text"
                      value={editingItem.title || ''}
                      onChange={(e) => setEditingItem(prev => ({ ...prev, title: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">الفئة</label>
                    <select
                      value={editingItem.category || 'residential'}
                      onChange={(e) => setEditingItem(prev => ({ ...prev, category: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="residential">مشاريع سكنية</option>
                      <option value="commercial">مشاريع تجارية</option>
                      <option value="educational">مشاريع تعليمية</option>
                      <option value="healthcare">مشاريع صحية</option>
                      <option value="industrial">مشاريع صناعية</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">الموقع</label>
                    <input
                      type="text"
                      value={editingItem.location || ''}
                      onChange={(e) => setEditingItem(prev => ({ ...prev, location: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">سنة التنفيذ</label>
                    <input
                      type="text"
                      value={editingItem.year || ''}
                      onChange={(e) => setEditingItem(prev => ({ ...prev, year: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">المساحة</label>
                    <input
                      type="text"
                      value={editingItem.area || ''}
                      onChange={(e) => setEditingItem(prev => ({ ...prev, area: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="مثال: 15,000 م²"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">وصف المشروع</label>
                  <textarea
                    value={editingItem.description || ''}
                    onChange={(e) => setEditingItem(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    rows={3}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">التفاصيل الكاملة</label>
                  <textarea
                    value={editingItem.details || ''}
                    onChange={(e) => setEditingItem(prev => ({ ...prev, details: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    rows={4}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">الخدمات المقدمة (منفصلة بفاصلة)</label>
                  <input
                    type="text"
                    value={Array.isArray(editingItem.services) ? editingItem.services.join(', ') : ''}
                    onChange={(e) => setEditingItem(prev => ({ 
                      ...prev, 
                      services: e.target.value.split(',').map(s => s.trim()).filter(s => s) 
                    }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="التصميم المعماري, التصميم الإنشائي, أنظمة الكهروميكانيك"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">الصورة الرئيسية</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleSingleImageUpload(e, 'image')}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                  {editingItem.image && (
                    <img src={editingItem.image} alt="معاينة المشروع" className="mt-4 w-48 h-32 object-cover rounded-lg" />
                  )}
                </div>
              </>
            )}
          </div>

          <div className="p-6 border-t border-gray-200 flex justify-end space-x-4">
            <button
              onClick={() => setShowEditModal(false)}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              إلغاء
            </button>
            <button
              onClick={handleSaveEdit}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
            >
              <Save className="h-4 w-4" />
              <span>حفظ</span>
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-900">لوحة التحكم</h1>
              <span className="text-sm text-gray-500">أسس الأعمار للاستشارات الهندسية</span>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowSettings(true)}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
                title="الإعدادات"
              >
                <Settings className="h-5 w-5" />
              </button>
              <button
                onClick={() => {
                  logout();
                  onNavigate('home');
                }}
                className="flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg"
              >
                <LogOut className="h-4 w-4" />
                <span>تسجيل الخروج</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64">
            <nav className="bg-white rounded-lg shadow-sm p-4">
              <ul className="space-y-2">
                {tabs.map((tab) => (
                  <li key={tab.id}>
                    <button
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-right transition-colors ${
                        activeTab === tab.id
                          ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <tab.icon className="h-5 w-5" />
                      <span>{tab.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* نظرة عامة */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">نظرة عامة</h2>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-blue-600">الرسائل الجديدة</p>
                          <p className="text-2xl font-bold text-blue-900">{messages.filter(m => m.status === 'new').length}</p>
                        </div>
                        <Users className="h-8 w-8 text-blue-600" />
                      </div>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-green-600">إجمالي المشاريع</p>
                          <p className="text-2xl font-bold text-green-900">{projects.length}</p>
                        </div>
                        <Building className="h-8 w-8 text-green-600" />
                      </div>
                    </div>
                    <div className="bg-yellow-50 p-4 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-yellow-600">فريق العمل</p>
                          <p className="text-2xl font-bold text-yellow-900">{teamMembers.length}</p>
                        </div>
                        <Users className="h-8 w-8 text-yellow-600" />
                      </div>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-purple-600">العملاء</p>
                          <p className="text-2xl font-bold text-purple-900">{clientLogos.length}</p>
                        </div>
                        <Star className="h-8 w-8 text-purple-600" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* الصفحة الرئيسية */}
            {activeTab === 'homepage' && (
              <div className="space-y-6">
                {/* أعمالنا في التصميم */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold text-gray-900">أعمالنا في التصميم</h3>
                    <button
                      onClick={() => handleAdd('designWorks')}
                      className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      <Plus className="h-4 w-4" />
                      <span>إضافة</span>
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {designWorks.map((work) => (
                      <div key={work.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <span className="text-2xl">{work.icon}</span>
                            <h4 className="font-semibold">{work.title}</h4>
                          </div>
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleEdit('designWorks', work)}
                              className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDelete('designWorks', work.id)}
                              className="p-1 text-red-600 hover:bg-red-50 rounded"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          {work.images.slice(0, 4).map((image, index) => (
                            <img key={index} src={image} alt="" className="w-full h-16 object-cover rounded" />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* أعمالنا في الإشراف */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold text-gray-900">أعمالنا في الإشراف</h3>
                    <button
                      onClick={() => handleAdd('supervisionWorks')}
                      className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      <Plus className="h-4 w-4" />
                      <span>إضافة</span>
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {supervisionWorks.map((work) => (
                      <div key={work.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <span className="text-2xl">{work.icon}</span>
                            <h4 className="font-semibold">{work.title}</h4>
                          </div>
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleEdit('supervisionWorks', work)}
                              className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDelete('supervisionWorks', work.id)}
                              className="p-1 text-red-600 hover:bg-red-50 rounded"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          {work.images.slice(0, 4).map((image, index) => (
                            <img key={index} src={image} alt="" className="w-full h-16 object-cover rounded" />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* المشاريع المميزة */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold text-gray-900">مشاريعنا المميزة</h3>
                    <button
                      onClick={() => handleAdd('featuredProjects')}
                      className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      <Plus className="h-4 w-4" />
                      <span>إضافة</span>
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {featuredProjects.map((project) => (
                      <div key={project.id} className="border border-gray-200 rounded-lg overflow-hidden">
                        <img src={project.image} alt={project.title} className="w-full h-32 object-cover" />
                        <div className="p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold">{project.title}</h4>
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleEdit('featuredProjects', project)}
                                className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                              >
                                <Edit className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => handleDelete('featuredProjects', project.id)}
                                className="p-1 text-red-600 hover:bg-red-50 rounded"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                          <p className="text-sm text-blue-600 mb-2">{project.category}</p>
                          <p className="text-sm text-gray-600">{project.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* شعارات العملاء */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold text-gray-900">شعارات العملاء</h3>
                    <button
                      onClick={() => handleAdd('clientLogos')}
                      className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      <Plus className="h-4 w-4" />
                      <span>إضافة</span>
                    </button>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {clientLogos.map((client) => (
                      <div key={client.id} className="border border-gray-200 rounded-lg p-4 text-center">
                        <img src={client.logo} alt={client.name} className="w-full h-16 object-contain mb-2" />
                        <p className="text-xs text-gray-600 mb-2">{client.name}</p>
                        <div className="flex justify-center space-x-2">
                          <button
                            onClick={() => handleEdit('clientLogos', client)}
                            className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                          >
                            <Edit className="h-3 w-3" />
                          </button>
                          <button
                            onClick={() => handleDelete('clientLogos', client.id)}
                            className="p-1 text-red-600 hover:bg-red-50 rounded"
                          >
                            <Trash2 className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* حول الشركة */}
            {activeTab === 'about' && (
              <div className="space-y-6">
                {/* فريق العمل */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold text-gray-900">فريق العمل</h3>
                    <button
                      onClick={() => handleAdd('teamMembers')}
                      className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      <Plus className="h-4 w-4" />
                      <span>إضافة عضو</span>
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {teamMembers.map((member) => (
                      <div key={member.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center space-x-4 mb-4">
                          {member.image ? (
                            <img src={member.image} alt={member.name} className="w-16 h-16 object-cover rounded-full" />
                          ) : (
                            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                              <User className="h-8 w-8 text-gray-400" />
                            </div>
                          )}
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900">{member.name}</h4>
                            <p className="text-sm text-blue-600">{member.position}</p>
                            <p className="text-xs text-gray-500">{member.experience}</p>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-4">{member.specialization}</p>
                        <div className="flex justify-end space-x-2">
                          <button
                            onClick={() => handleEdit('teamMembers', member)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDelete('teamMembers', member.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* المشاريع */}
            {activeTab === 'projects' && (
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold text-gray-900">جميع المشاريع</h3>
                    <button
                      onClick={() => handleAdd('projects')}
                      className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      <Plus className="h-4 w-4" />
                      <span>إضافة مشروع</span>
                    </button>
                  </div>
                  
                  {/* فلاتر الفئات */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {[
                      { key: 'all', label: 'جميع المشاريع' },
                      { key: 'residential', label: 'مشاريع سكنية' },
                      { key: 'commercial', label: 'مشاريع تجارية' },
                      { key: 'educational', label: 'مشاريع تعليمية' },
                      { key: 'healthcare', label: 'مشاريع صحية' },
                      { key: 'industrial', label: 'مشاريع صناعية' }
                    ].map((filter) => (
                      <button
                        key={filter.key}
                        className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
                      >
                        {filter.label}
                      </button>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project) => (
                      <div key={project.id} className="border border-gray-200 rounded-lg overflow-hidden">
                        <img src={project.image} alt={project.title} className="w-full h-48 object-cover" />
                        <div className="p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-gray-900">{project.title}</h4>
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleEdit('projects', project)}
                                className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                              >
                                <Edit className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => handleDelete('projects', project.id)}
                                className="p-1 text-red-600 hover:bg-red-50 rounded"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-gray-500 mb-2">
                            <div className="flex items-center space-x-1">
                              <MapPin className="h-4 w-4" />
                              <span>{project.location}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Calendar className="h-4 w-4" />
                              <span>{project.year}</span>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 mb-3">{project.description}</p>
                          <div className="flex flex-wrap gap-1">
                            {project.services.slice(0, 2).map((service, index) => (
                              <span key={index} className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-xs">
                                {service}
                              </span>
                            ))}
                            {project.services.length > 2 && (
                              <span className="text-blue-600 text-xs">+{project.services.length - 2}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* الرسائل */}
            {activeTab === 'messages' && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">الرسائل والاستفسارات</h3>
                <div className="space-y-4">
                  {messages.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">لا توجد رسائل حالياً</p>
                  ) : (
                    messages.map((message: any) => (
                      <div key={message.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-3">
                            <h4 className="font-semibold text-gray-900">{message.name}</h4>
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              message.status === 'new' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'
                            }`}>
                              {message.status === 'new' ? 'جديد' : 'مقروء'}
                            </span>
                          </div>
                          <span className="text-sm text-gray-500">{message.date}</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{message.email} | {message.phone}</p>
                        <p className="text-sm text-gray-800">{message.subject}</p>
                        {message.type === 'quote' && (
                          <div className="mt-2 p-3 bg-blue-50 rounded-lg">
                            <p className="text-sm text-blue-800">طلب تسعيرة - {message.projectDetails?.projectType}</p>
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* نافذة الإعدادات */}
      {showSettings && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900">إعدادات المدير</h3>
              <button
                onClick={() => setShowSettings(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">اسم المستخدم</label>
                <div className="relative">
                  <input
                    type="text"
                    value={adminData.username}
                    onChange={(e) => setAdminData(prev => ({ ...prev, username: e.target.value }))}
                    className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                  <User className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">البريد الإلكتروني</label>
                <div className="relative">
                  <input
                    type="email"
                    value={adminData.email}
                    onChange={(e) => setAdminData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                  <Mail className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">كلمة المرور الحالية *</label>
                <div className="relative">
                  <input
                    type="password"
                    value={adminData.currentPassword}
                    onChange={(e) => setAdminData(prev => ({ ...prev, currentPassword: e.target.value }))}
                    className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="أدخل كلمة المرور الحالية"
                  />
                  <Lock className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">كلمة المرور الجديدة (اختياري)</label>
                <div className="relative">
                  <input
                    type="password"
                    value={adminData.password}
                    onChange={(e) => setAdminData(prev => ({ ...prev, password: e.target.value }))}
                    className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="اتركه فارغاً للاحتفاظ بالحالية"
                  />
                  <Lock className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-end space-x-4">
              <button
                onClick={() => setShowSettings(false)}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                إلغاء
              </button>
              <button
                onClick={handleSaveAdminData}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                حفظ التغييرات
              </button>
            </div>
          </div>
        </div>
      )}

      {/* نافذة التعديل */}
      {renderEditModal()}
    </div>
  );
};

export default AdminDashboard;