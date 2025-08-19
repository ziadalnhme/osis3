import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Settings, 
  Users, 
  MessageSquare, 
  Star, 
  Building2, 
  Palette,
  LogOut,
  Save,
  X,
  Plus,
  Edit,
  Trash2,
  Eye,
  EyeOff
} from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('designs');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const adminAuth = localStorage.getItem('adminAuth');
    if (!adminAuth) {
      navigate('/admin');
      return;
    }
    setIsAuthenticated(true);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    navigate('/admin');
  };

  if (!isAuthenticated) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex" dir="rtl">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-6 border-b">
          <h1 className="text-xl font-bold text-gray-800">لوحة التحكم</h1>
        </div>
        
        <nav className="mt-6">
          <button
            onClick={() => setActiveTab('designs')}
            className={`w-full flex items-center px-6 py-3 text-right hover:bg-gray-50 ${
              activeTab === 'designs' ? 'bg-blue-50 border-l-4 border-blue-500 text-blue-600' : 'text-gray-600'
            }`}
          >
            <Building2 className="ml-3 h-5 w-5" />
            أعمال التصميم
          </button>
          
          <button
            onClick={() => setActiveTab('supervision')}
            className={`w-full flex items-center px-6 py-3 text-right hover:bg-gray-50 ${
              activeTab === 'supervision' ? 'bg-blue-50 border-l-4 border-blue-500 text-blue-600' : 'text-gray-600'
            }`}
          >
            <Settings className="ml-3 h-5 w-5" />
            أعمال الإشراف
          </button>
          
          <button
            onClick={() => setActiveTab('featured')}
            className={`w-full flex items-center px-6 py-3 text-right hover:bg-gray-50 ${
              activeTab === 'featured' ? 'bg-blue-50 border-l-4 border-blue-500 text-blue-600' : 'text-gray-600'
            }`}
          >
            <Star className="ml-3 h-5 w-5" />
            المشاريع المميزة
          </button>
          
          <button
            onClick={() => setActiveTab('clients')}
            className={`w-full flex items-center px-6 py-3 text-right hover:bg-gray-50 ${
              activeTab === 'clients' ? 'bg-blue-50 border-l-4 border-blue-500 text-blue-600' : 'text-gray-600'
            }`}
          >
            <Users className="ml-3 h-5 w-5" />
            شعارات العملاء
          </button>
          
          <button
            onClick={() => setActiveTab('team')}
            className={`w-full flex items-center px-6 py-3 text-right hover:bg-gray-50 ${
              activeTab === 'team' ? 'bg-blue-50 border-l-4 border-blue-500 text-blue-600' : 'text-gray-600'
            }`}
          >
            <Users className="ml-3 h-5 w-5" />
            فريق العمل
          </button>
          
          <button
            onClick={() => setActiveTab('background')}
            className={`w-full flex items-center px-6 py-3 text-right hover:bg-gray-50 ${
              activeTab === 'background' ? 'bg-blue-50 border-l-4 border-blue-500 text-blue-600' : 'text-gray-600'
            }`}
          >
            <Palette className="ml-3 h-5 w-5" />
            إعدادات الخلفية
          </button>
          
          <button
            onClick={() => setActiveTab('messages')}
            className={`w-full flex items-center px-6 py-3 text-right hover:bg-gray-50 ${
              activeTab === 'messages' ? 'bg-blue-50 border-l-4 border-blue-500 text-blue-600' : 'text-gray-600'
            }`}
          >
            <MessageSquare className="ml-3 h-5 w-5" />
            الرسائل
          </button>
        </nav>
        
        <div className="absolute bottom-0 w-64 p-6 border-t">
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg"
          >
            <LogOut className="ml-3 h-5 w-5" />
            تسجيل الخروج
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            {activeTab === 'designs' && 'إدارة أعمال التصميم'}
            {activeTab === 'supervision' && 'إدارة أعمال الإشراف'}
            {activeTab === 'featured' && 'إدارة المشاريع المميزة'}
            {activeTab === 'clients' && 'إدارة شعارات العملاء'}
            {activeTab === 'team' && 'إدارة فريق العمل'}
            {activeTab === 'background' && 'إعدادات الخلفية'}
            {activeTab === 'messages' && 'إدارة الرسائل'}
          </h2>
          
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Settings className="mx-auto h-16 w-16" />
            </div>
            <p className="text-gray-600">
              قسم {activeTab === 'designs' && 'أعمال التصميم'}
              {activeTab === 'supervision' && 'أعمال الإشراف'}
              {activeTab === 'featured' && 'المشاريع المميزة'}
              {activeTab === 'clients' && 'شعارات العملاء'}
              {activeTab === 'team' && 'فريق العمل'}
              {activeTab === 'background' && 'إعدادات الخلفية'}
              {activeTab === 'messages' && 'الرسائل'} قيد التطوير
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;