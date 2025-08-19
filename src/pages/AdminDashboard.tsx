import React, { useState, useEffect } from 'react';
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
  EyeOff,
  Upload,
  Image as ImageIcon
} from 'lucide-react';
import { 
  logout, 
  getCurrentUser, 
  saveContentData, 
  getContentData,
  getDefaultData 
} from '../utils/adminAuth';

interface AdminDashboardProps {
  onNavigate: (page: string) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState('designs');
  
  // حالات البيانات
  const [designWorks, setDesignWorks] = useState(getDefaultData().designWorks);
  const [supervisionWorks, setSupervisionWorks] = useState(getDefaultData().supervisionWorks);
  const [featuredProjects, setFeaturedProjects] = useState(getDefaultData().featuredProjects);
  const [clientLogos, setClientLogos] = useState(getDefaultData().clientLogos);
  const [teamMembers, setTeamMembers] = useState(getDefaultData().teamMembers);
  const [heroSettings, setHeroSettings] = useState(getDefaultData().heroSettings);
  const [messages, setMessages] = useState([]);
  
  // حالات النوافذ المنبثقة
  const [isDesignModalOpen, setIsDesignModalOpen] = useState(false);
  const [isSupervisionModalOpen, setIsSupervisionModalOpen] = useState(false);
  const [isFeaturedModalOpen, setIsFeaturedModalOpen] = useState(false);
  const [isClientModalOpen, setIsClientModalOpen] = useState(false);
  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);
  const [isHeroModalOpen, setIsHeroModalOpen] = useState(false);
  
  // حالات التحرير
  const [selectedDesign, setSelectedDesign] = useState(null);
  const [selectedSupervision, setSelectedSupervision] = useState(null);
  const [selectedFeatured, setSelectedFeatured] = useState(null);
  const [selectedClient, setSelectedClient] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState(null);

  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = () => {
    const savedDesignWorks = getContentData('designWorks');
    const savedSupervisionWorks = getContentData('supervisionWorks');
    const savedFeaturedProjects = getContentData('featuredProjects');
    const savedClientLogos = getContentData('clientLogos');
    const savedTeamMembers = getContentData('teamMembers');
    const savedHeroSettings = getContentData('heroSettings');
    const savedMessages = JSON.parse(localStorage.getItem('adminMessages') || '[]');

    if (savedDesignWorks) setDesignWorks(savedDesignWorks);
    if (savedSupervisionWorks) setSupervisionWorks(savedSupervisionWorks);
    if (savedFeaturedProjects) setFeaturedProjects(savedFeaturedProjects);
    if (savedClientLogos) setClientLogos(savedClientLogos);
    if (savedTeamMembers) setTeamMembers(savedTeamMembers);
    if (savedHeroSettings) setHeroSettings(savedHeroSettings);
    setMessages(savedMessages);
  };

  const saveAndNotify = (key: string, data: any) => {
    saveContentData(key, data);
    
    // إرسال حدث مخصص لإشعار الصفحات الأخرى بالتحديث
    window.dispatchEvent(new CustomEvent('contentUpdated', { 
      detail: { key, data } 
    }));
    
    // إرسال حدث إضافي للتأكد من التحديث
    window.dispatchEvent(new CustomEvent('dataUpdated'));
    
    console.log(`تم حفظ ${key} وإرسال إشعار التحديث`);
  };

  const handleLogout = () => {
    logout();
    onNavigate('home');
  };

  // وظائف أعمال التصميم
  const addDesignWork = () => {
    const newWork = {
      id: Date.now().toString(),
      title: 'عمل جديد',
      icon: '🏠',
      images: ['https://images.pexels.com/photos/280232/pexels-photo-280232.jpeg?auto=compress&cs=tinysrgb&w=800']
    };
    const updatedWorks = [...designWorks, newWork];
    setDesignWorks(updatedWorks);
    saveAndNotify('designWorks', updatedWorks);
  };

  const updateDesignWork = (updatedWork: any) => {
    const updatedWorks = designWorks.map(work => 
      work.id === updatedWork.id ? updatedWork : work
    );
    setDesignWorks(updatedWorks);
    saveAndNotify('designWorks', updatedWorks);
    setIsDesignModalOpen(false);
    setSelectedDesign(null);
  };

  const deleteDesignWork = (id: string) => {
    const updatedWorks = designWorks.filter(work => work.id !== id);
    setDesignWorks(updatedWorks);
    saveAndNotify('designWorks', updatedWorks);
  };

  // وظائف أعمال الإشراف
  const addSupervisionWork = () => {
    const newWork = {
      id: Date.now().toString(),
      title: 'عمل إشراف جديد',
      icon: '🏗️',
      images: ['https://images.pexels.com/photos/2467558/pexels-photo-2467558.jpeg?auto=compress&cs=tinysrgb&w=800']
    };
    const updatedWorks = [...supervisionWorks, newWork];
    setSupervisionWorks(updatedWorks);
    saveAndNotify('supervisionWorks', updatedWorks);
  };

  const updateSupervisionWork = (updatedWork: any) => {
    const updatedWorks = supervisionWorks.map(work => 
      work.id === updatedWork.id ? updatedWork : work
    );
    setSupervisionWorks(updatedWorks);
    saveAndNotify('supervisionWorks', updatedWorks);
    setIsSupervisionModalOpen(false);
    setSelectedSupervision(null);
  };

  const deleteSupervisionWork = (id: string) => {
    const updatedWorks = supervisionWorks.filter(work => work.id !== id);
    setSupervisionWorks(updatedWorks);
    saveAndNotify('supervisionWorks', updatedWorks);
  };

  // وظائف المشاريع المميزة
  const addFeaturedProject = () => {
    const newProject = {
      id: Date.now().toString(),
      title: 'مشروع مميز جديد',
      category: 'مشاريع سكنية',
      image: 'https://images.pexels.com/photos/280232/pexels-photo-280232.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'وصف المشروع'
    };
    const updatedProjects = [...featuredProjects, newProject];
    setFeaturedProjects(updatedProjects);
    saveAndNotify('featuredProjects', updatedProjects);
  };

  const updateFeaturedProject = (updatedProject: any) => {
    const updatedProjects = featuredProjects.map(project => 
      project.id === updatedProject.id ? updatedProject : project
    );
    setFeaturedProjects(updatedProjects);
    saveAndNotify('featuredProjects', updatedProjects);
    setIsFeaturedModalOpen(false);
    setSelectedFeatured(null);
  };

  const deleteFeaturedProject = (id: string) => {
    const updatedProjects = featuredProjects.filter(project => project.id !== id);
    setFeaturedProjects(updatedProjects);
    saveAndNotify('featuredProjects', updatedProjects);
  };

  // وظائف شعارات العملاء
  const addClientLogo = () => {
    const newClient = {
      id: Date.now().toString(),
      name: 'عميل جديد',
      logo: 'https://via.placeholder.com/150x80/1e40af/ffffff?text=شعار'
    };
    const updatedClients = [...clientLogos, newClient];
    setClientLogos(updatedClients);
    saveAndNotify('clientLogos', updatedClients);
  };

  const updateClientLogo = (updatedClient: any) => {
    const updatedClients = clientLogos.map(client => 
      client.id === updatedClient.id ? updatedClient : client
    );
    setClientLogos(updatedClients);
    saveAndNotify('clientLogos', updatedClients);
    setIsClientModalOpen(false);
    setSelectedClient(null);
  };

  const deleteClientLogo = (id: string) => {
    const updatedClients = clientLogos.filter(client => client.id !== id);
    setClientLogos(updatedClients);
    saveAndNotify('clientLogos', updatedClients);
  };

  // وظائف فريق العمل
  const addTeamMember = () => {
    const newMember = {
      id: Date.now().toString(),
      name: 'عضو جديد',
      position: 'المنصب',
      experience: 'سنوات الخبرة',
      specialization: 'التخصص',
      image: ''
    };
    const updatedTeam = [...teamMembers, newMember];
    setTeamMembers(updatedTeam);
    saveAndNotify('teamMembers', updatedTeam);
  };

  const updateTeamMember = (updatedMember: any) => {
    const updatedTeam = teamMembers.map(member => 
      member.id === updatedMember.id ? updatedMember : member
    );
    setTeamMembers(updatedTeam);
    saveAndNotify('teamMembers', updatedTeam);
    setIsTeamModalOpen(false);
    setSelectedTeam(null);
  };

  const deleteTeamMember = (id: string) => {
    const updatedTeam = teamMembers.filter(member => member.id !== id);
    setTeamMembers(updatedTeam);
    saveAndNotify('teamMembers', updatedTeam);
  };

  // وظائف إعدادات الخلفية
  const updateHeroSettings = (newSettings: any) => {
    setHeroSettings(newSettings);
    saveAndNotify('heroSettings', newSettings);
    
    // إرسال حدث خاص لإعدادات الخلفية
    window.dispatchEvent(new CustomEvent('heroSettingsUpdated', { 
      detail: newSettings 
    }));
    
    setIsHeroModalOpen(false);
  };

  const deleteMessage = (id: number) => {
    const updatedMessages = messages.filter((msg: any) => msg.id !== id);
    setMessages(updatedMessages);
    localStorage.setItem('adminMessages', JSON.stringify(updatedMessages));
  };

  const markMessageAsRead = (id: number) => {
    const updatedMessages = messages.map((msg: any) => 
      msg.id === id ? { ...msg, status: 'read' } : msg
    );
    setMessages(updatedMessages);
    localStorage.setItem('adminMessages', JSON.stringify(updatedMessages));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex" dir="rtl">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-6 border-b">
          <h1 className="text-xl font-bold text-gray-800">لوحة التحكم</h1>
          <p className="text-sm text-gray-600 mt-1">
            مرحباً {getCurrentUser()?.username}
          </p>
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
            onClick={() => setActiveTab('hero')}
            className={`w-full flex items-center px-6 py-3 text-right hover:bg-gray-50 ${
              activeTab === 'hero' ? 'bg-blue-50 border-l-4 border-blue-500 text-blue-600' : 'text-gray-600'
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
            الرسائل {messages.filter((msg: any) => msg.status === 'new').length > 0 && (
              <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1 mr-2">
                {messages.filter((msg: any) => msg.status === 'new').length}
              </span>
            )}
          </button>
        </nav>
        
        <div className="absolute bottom-0 w-64 p-6 border-t">
          <button
            onClick={() => onNavigate('home')}
            className="w-full flex items-center px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg mb-2"
          >
            <Eye className="ml-3 h-5 w-5" />
            عرض الموقع
          </button>
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
          {/* أعمال التصميم */}
          {activeTab === 'designs' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">إدارة أعمال التصميم</h2>
                <button
                  onClick={addDesignWork}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center"
                >
                  <Plus className="h-5 w-5 ml-2" />
                  إضافة عمل جديد
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {designWorks.map((work: any) => (
                  <div key={work.id} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-bold text-lg">{work.title}</h3>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => {
                            setSelectedDesign(work);
                            setIsDesignModalOpen(true);
                          }}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => deleteDesignWork(work.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    <div className="text-2xl mb-2">{work.icon}</div>
                    <p className="text-sm text-gray-600">{work.images.length} صورة</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* أعمال الإشراف */}
          {activeTab === 'supervision' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">إدارة أعمال الإشراف</h2>
                <button
                  onClick={addSupervisionWork}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center"
                >
                  <Plus className="h-5 w-5 ml-2" />
                  إضافة عمل جديد
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {supervisionWorks.map((work: any) => (
                  <div key={work.id} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-bold text-lg">{work.title}</h3>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => {
                            setSelectedSupervision(work);
                            setIsSupervisionModalOpen(true);
                          }}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => deleteSupervisionWork(work.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    <div className="text-2xl mb-2">{work.icon}</div>
                    <p className="text-sm text-gray-600">{work.images.length} صورة</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* المشاريع المميزة */}
          {activeTab === 'featured' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">إدارة المشاريع المميزة</h2>
                <button
                  onClick={addFeaturedProject}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center"
                >
                  <Plus className="h-5 w-5 ml-2" />
                  إضافة مشروع جديد
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredProjects.map((project: any) => (
                  <div key={project.id} className="bg-gray-50 rounded-lg overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-32 object-cover"
                    />
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-lg">{project.title}</h3>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => {
                              setSelectedFeatured(project);
                              setIsFeaturedModalOpen(true);
                            }}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => deleteFeaturedProject(project.id)}
                            className="text-red-600 hover:text-red-800"
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
          )}

          {/* شعارات العملاء */}
          {activeTab === 'clients' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">إدارة شعارات العملاء</h2>
                <button
                  onClick={addClientLogo}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center"
                >
                  <Plus className="h-5 w-5 ml-2" />
                  إضافة عميل جديد
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {clientLogos.map((client: any) => (
                  <div key={client.id} className="bg-gray-50 rounded-lg p-4 text-center">
                    <img 
                      src={client.logo} 
                      alt={client.name}
                      className="w-full h-16 object-contain mb-3"
                    />
                    <h3 className="font-bold text-sm mb-3">{client.name}</h3>
                    <div className="flex justify-center space-x-2">
                      <button
                        onClick={() => {
                          setSelectedClient(client);
                          setIsClientModalOpen(true);
                        }}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => deleteClientLogo(client.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* فريق العمل */}
          {activeTab === 'team' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">إدارة فريق العمل</h2>
                <button
                  onClick={addTeamMember}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center"
                >
                  <Plus className="h-5 w-5 ml-2" />
                  إضافة عضو جديد
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {teamMembers.map((member: any) => (
                  <div key={member.id} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-bold text-lg">{member.name}</h3>
                        <p className="text-blue-600 text-sm">{member.position}</p>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => {
                            setSelectedTeam(member);
                            setIsTeamModalOpen(true);
                          }}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => deleteTeamMember(member.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">{member.experience}</p>
                    <p className="text-sm text-gray-600">{member.specialization}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* إعدادات الخلفية */}
          {activeTab === 'hero' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">إعدادات خلفية القسم الرئيسي</h2>
                <button
                  onClick={() => setIsHeroModalOpen(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center"
                >
                  <Edit className="h-5 w-5 ml-2" />
                  تعديل الإعدادات
                </button>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-bold text-lg mb-3">الإعدادات الحالية</h3>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">صورة الخلفية:</label>
                        <p className="text-sm text-gray-600">
                          {heroSettings.backgroundImage || 'الصور المتحركة الافتراضية'}
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">شفافية الطبقة العلوية:</label>
                        <p className="text-sm text-gray-600">{heroSettings.overlayOpacity}%</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">ألوان التدرج:</label>
                        <div className="flex space-x-2 mt-1">
                          <div className={`w-6 h-6 rounded bg-gradient-to-r ${heroSettings.gradientColors.from} ${heroSettings.gradientColors.via} ${heroSettings.gradientColors.to}`}></div>
                          <span className="text-sm text-gray-600">
                            {heroSettings.gradientColors.from.replace('from-', '')} → {heroSettings.gradientColors.to.replace('to-', '')}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-bold text-lg mb-3">معاينة</h3>
                    <div 
                      className={`w-full h-32 rounded-lg bg-gradient-to-br ${heroSettings.gradientColors.from} ${heroSettings.gradientColors.via} ${heroSettings.gradientColors.to} relative overflow-hidden`}
                    >
                      {heroSettings.backgroundImage && (
                        <div
                          className="absolute inset-0 bg-cover bg-center"
                          style={{ backgroundImage: `url(${heroSettings.backgroundImage})` }}
                        />
                      )}
                      <div 
                        className="absolute inset-0 bg-blue-900"
                        style={{ opacity: heroSettings.overlayOpacity / 100 }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-white font-bold">معاينة الخلفية</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* الرسائل */}
          {activeTab === 'messages' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">إدارة الرسائل</h2>
              
              {messages.length === 0 ? (
                <div className="text-center py-12">
                  <MessageSquare className="mx-auto h-16 w-16 text-gray-400 mb-4" />
                  <p className="text-gray-600">لا توجد رسائل حالياً</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {messages.map((message: any) => (
                    <div 
                      key={message.id} 
                      className={`bg-white border rounded-lg p-4 ${
                        message.status === 'new' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-bold text-lg">{message.name}</h3>
                          <p className="text-sm text-gray-600">{message.email} | {message.phone}</p>
                          <p className="text-sm text-blue-600">{message.subject}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded text-xs ${
                            message.status === 'new' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {message.status === 'new' ? 'جديد' : 'مقروء'}
                          </span>
                          <span className="text-xs text-gray-500">{message.date}</span>
                        </div>
                      </div>
                      
                      <div className="bg-gray-50 rounded p-3 mb-3">
                        <p className="text-sm whitespace-pre-wrap">{message.message}</p>
                      </div>
                      
                      <div className="flex justify-end space-x-2">
                        {message.status === 'new' && (
                          <button
                            onClick={() => markMessageAsRead(message.id)}
                            className="text-blue-600 hover:text-blue-800 text-sm"
                          >
                            تحديد كمقروء
                          </button>
                        )}
                        <button
                          onClick={() => deleteMessage(message.id)}
                          className="text-red-600 hover:text-red-800 text-sm"
                        >
                          حذف
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* النوافذ المنبثقة */}
      {/* نافذة تعديل أعمال التصميم */}
      {isDesignModalOpen && (
        <EditDesignModal
          work={selectedDesign}
          onSave={updateDesignWork}
          onClose={() => {
            setIsDesignModalOpen(false);
            setSelectedDesign(null);
          }}
        />
      )}

      {/* نافذة تعديل أعمال الإشراف */}
      {isSupervisionModalOpen && (
        <EditSupervisionModal
          work={selectedSupervision}
          onSave={updateSupervisionWork}
          onClose={() => {
            setIsSupervisionModalOpen(false);
            setSelectedSupervision(null);
          }}
        />
      )}

      {/* نافذة تعديل المشاريع المميزة */}
      {isFeaturedModalOpen && (
        <EditFeaturedModal
          project={selectedFeatured}
          onSave={updateFeaturedProject}
          onClose={() => {
            setIsFeaturedModalOpen(false);
            setSelectedFeatured(null);
          }}
        />
      )}

      {/* نافذة تعديل شعارات العملاء */}
      {isClientModalOpen && (
        <EditClientModal
          client={selectedClient}
          onSave={updateClientLogo}
          onClose={() => {
            setIsClientModalOpen(false);
            setSelectedClient(null);
          }}
        />
      )}

      {/* نافذة تعديل فريق العمل */}
      {isTeamModalOpen && (
        <EditTeamModal
          member={selectedTeam}
          onSave={updateTeamMember}
          onClose={() => {
            setIsTeamModalOpen(false);
            setSelectedTeam(null);
          }}
        />
      )}

      {/* نافذة تعديل إعدادات الخلفية */}
      {isHeroModalOpen && (
        <EditHeroModal
          settings={heroSettings}
          onSave={updateHeroSettings}
          onClose={() => setIsHeroModalOpen(false)}
        />
      )}
    </div>
  );
};

// مكونات النوافذ المنبثقة
const EditDesignModal: React.FC<{
  work: any;
  onSave: (work: any) => void;
  onClose: () => void;
}> = ({ work, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    title: work?.title || '',
    icon: work?.icon || '🏠',
    images: work?.images || ['']
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...work,
      ...formData,
      images: formData.images.filter(img => img.trim() !== '')
    });
  };

  const addImageField = () => {
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, '']
    }));
  };

  const updateImage = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.map((img, i) => i === index ? value : img)
    }));
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold">تعديل عمل التصميم</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">العنوان</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">الأيقونة</label>
            <input
              type="text"
              value={formData.icon}
              onChange={(e) => setFormData(prev => ({ ...prev, icon: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="🏠"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">الصور</label>
            {formData.images.map((image, index) => (
              <div key={index} className="flex items-center space-x-2 mb-2">
                <input
                  type="url"
                  value={image}
                  onChange={(e) => updateImage(index, e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="رابط الصورة"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addImageField}
              className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
            >
              <Plus className="h-4 w-4 ml-1" />
              إضافة صورة
            </button>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              حفظ التغييرات
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const EditSupervisionModal: React.FC<{
  work: any;
  onSave: (work: any) => void;
  onClose: () => void;
}> = ({ work, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    title: work?.title || '',
    icon: work?.icon || '🏗️',
    images: work?.images || ['']
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...work,
      ...formData,
      images: formData.images.filter(img => img.trim() !== '')
    });
  };

  const addImageField = () => {
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, '']
    }));
  };

  const updateImage = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.map((img, i) => i === index ? value : img)
    }));
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold">تعديل عمل الإشراف</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">العنوان</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">الأيقونة</label>
            <input
              type="text"
              value={formData.icon}
              onChange={(e) => setFormData(prev => ({ ...prev, icon: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="🏗️"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">الصور</label>
            {formData.images.map((image, index) => (
              <div key={index} className="flex items-center space-x-2 mb-2">
                <input
                  type="url"
                  value={image}
                  onChange={(e) => updateImage(index, e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="رابط الصورة"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addImageField}
              className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
            >
              <Plus className="h-4 w-4 ml-1" />
              إضافة صورة
            </button>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              حفظ التغييرات
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const EditFeaturedModal: React.FC<{
  project: any;
  onSave: (project: any) => void;
  onClose: () => void;
}> = ({ project, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    title: project?.title || '',
    category: project?.category || '',
    image: project?.image || '',
    description: project?.description || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...project,
      ...formData
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold">تعديل المشروع المميز</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">عنوان المشروع</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">الفئة</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">اختر الفئة</option>
              <option value="مشاريع سكنية">مشاريع سكنية</option>
              <option value="مشاريع تجارية">مشاريع تجارية</option>
              <option value="مشاريع تعليمية">مشاريع تعليمية</option>
              <option value="مشاريع صحية">مشاريع صحية</option>
              <option value="مشاريع صناعية">مشاريع صناعية</option>
              <option value="مشاريع البنية التحتية">مشاريع البنية التحتية</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">صورة المشروع</label>
            <input
              type="url"
              value={formData.image}
              onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="رابط الصورة"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">وصف المشروع</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              rows={3}
              required
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              حفظ التغييرات
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const EditClientModal: React.FC<{
  client: any;
  onSave: (client: any) => void;
  onClose: () => void;
}> = ({ client, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    name: client?.name || '',
    logo: client?.logo || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...client,
      ...formData
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold">تعديل شعار العميل</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">اسم العميل</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">رابط الشعار</label>
            <input
              type="url"
              value={formData.logo}
              onChange={(e) => setFormData(prev => ({ ...prev, logo: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="رابط الشعار"
              required
            />
          </div>

          {formData.logo && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">معاينة الشعار</label>
              <img 
                src={formData.logo} 
                alt="معاينة الشعار"
                className="w-32 h-16 object-contain border border-gray-300 rounded"
              />
            </div>
          )}

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              حفظ التغييرات
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const EditTeamModal: React.FC<{
  member: any;
  onSave: (member: any) => void;
  onClose: () => void;
}> = ({ member, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    name: member?.name || '',
    position: member?.position || '',
    experience: member?.experience || '',
    specialization: member?.specialization || '',
    image: member?.image || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...member,
      ...formData
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold">تعديل عضو الفريق</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">الاسم</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">المنصب</label>
            <input
              type="text"
              value={formData.position}
              onChange={(e) => setFormData(prev => ({ ...prev, position: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">سنوات الخبرة</label>
            <input
              type="text"
              value={formData.experience}
              onChange={(e) => setFormData(prev => ({ ...prev, experience: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">التخصص</label>
            <input
              type="text"
              value={formData.specialization}
              onChange={(e) => setFormData(prev => ({ ...prev, specialization: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">صورة العضو (اختياري)</label>
            <input
              type="url"
              value={formData.image}
              onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="رابط الصورة"
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              حفظ التغييرات
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const EditHeroModal: React.FC<{
  settings: any;
  onSave: (settings: any) => void;
  onClose: () => void;
}> = ({ settings, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    backgroundImage: settings?.backgroundImage || '',
    overlayOpacity: settings?.overlayOpacity || 60,
    gradientColors: settings?.gradientColors || {
      from: 'from-blue-900',
      via: 'via-blue-800',
      to: 'to-blue-900'
    }
  });

  const colorOptions = [
    { name: 'أزرق', from: 'from-blue-900', via: 'via-blue-800', to: 'to-blue-900' },
    { name: 'رمادي', from: 'from-gray-900', via: 'via-gray-800', to: 'to-gray-900' },
    { name: 'أخضر', from: 'from-green-900', via: 'via-green-800', to: 'to-green-900' },
    { name: 'بنفسجي', from: 'from-purple-900', via: 'via-purple-800', to: 'to-purple-900' },
    { name: 'أحمر', from: 'from-red-900', via: 'via-red-800', to: 'to-red-900' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold">تعديل إعدادات الخلفية</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              صورة الخلفية (اختياري)
            </label>
            <input
              type="url"
              value={formData.backgroundImage}
              onChange={(e) => setFormData(prev => ({ ...prev, backgroundImage: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="رابط الصورة (اتركه فارغاً للصور المتحركة الافتراضية)"
            />
            <p className="text-xs text-gray-500 mt-1">
              إذا تركت هذا الحقل فارغاً، ستظهر الصور المتحركة الافتراضية
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              شفافية الطبقة العلوية: {formData.overlayOpacity}%
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={formData.overlayOpacity}
              onChange={(e) => setFormData(prev => ({ ...prev, overlayOpacity: parseInt(e.target.value) }))}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>شفاف (0%)</span>
              <span>معتم (100%)</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">ألوان التدرج</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {colorOptions.map((color, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setFormData(prev => ({ 
                    ...prev, 
                    gradientColors: {
                      from: color.from,
                      via: color.via,
                      to: color.to
                    }
                  }))}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    formData.gradientColors.from === color.from
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className={`w-full h-8 rounded bg-gradient-to-r ${color.from} ${color.via} ${color.to} mb-2`}></div>
                  <span className="text-sm font-medium">{color.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">معاينة</label>
            <div 
              className={`w-full h-32 rounded-lg bg-gradient-to-br ${formData.gradientColors.from} ${formData.gradientColors.via} ${formData.gradientColors.to} relative overflow-hidden`}
            >
              {formData.backgroundImage && (
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${formData.backgroundImage})` }}
                />
              )}
              <div 
                className="absolute inset-0 bg-blue-900"
                style={{ opacity: formData.overlayOpacity / 100 }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white font-bold text-lg">معاينة الخلفية</span>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              حفظ التغييرات
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminDashboard;