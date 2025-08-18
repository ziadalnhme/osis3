import React, { useState, useEffect } from 'react';
import { 
  Settings, 
  Users, 
  FileText, 
  BarChart3, 
  LogOut, 
  Plus, 
  Edit, 
  Trash2, 
  Save, 
  X, 
  Eye, 
  MessageSquare,
  Building,
  Briefcase,
  Award,
  Home,
  ShoppingBag,
  User,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Link
} from 'lucide-react';
import { 
  logout, 
  getCurrentUser, 
  saveContentData, 
  getContentData, 
  updateAdminCredentials,
  verifyCurrentPassword,
  getAdminCredentials_Public
} from '../utils/adminAuth';

interface AdminDashboardProps {
  onNavigate: (page: string) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [currentUser, setCurrentUser] = useState(getCurrentUser());
  const [messages, setMessages] = useState<any[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<any>(null);

  // بيانات المحتوى
  const [designWorks, setDesignWorks] = useState<any[]>([]);
  const [supervisionWorks, setSupervisionWorks] = useState<any[]>([]);
  const [featuredProjects, setFeaturedProjects] = useState<any[]>([]);
  const [clientLogos, setClientLogos] = useState<any[]>([]);
  const [teamMembers, setTeamMembers] = useState<any[]>([]);
  const [loadedProjects, setLoadedProjects] = useState([
    {
      id: '1',
      title: 'مجمع الأمير السكني',
      category: 'residential',
      location: 'الرياض',
      year: '2023',
      area: '15,000 م²',
      description: 'مجمع سكني فاخر يضم 120 وحدة سكنية مع مرافق ترفيهية ومساحات خضراء',
      image: 'https://images.pexels.com/photos/280232/pexels-photo-280232.jpeg?auto=compress&cs=tinysrgb&w=800',
      services: ['التصميم المعماري', 'التصميم الإنشائي', 'أنظمة الكهروميكانيك'],
      details: 'مشروع سكني متكامل يجمع بين التصميم العصري والطابع المعماري المحلي، مع مراعاة أعلى معايير الجودة والاستدامة البيئية.'
    }
  ]);

  // حالات التحرير
  const [editingDesignWork, setEditingDesignWork] = useState<any>(null);
  const [editingSupervisionWork, setEditingSupervisionWork] = useState<any>(null);
  const [editingProject, setEditingProject] = useState<any>(null);
  const [editingClient, setEditingClient] = useState<any>(null);
  const [editingTeamMember, setEditingTeamMember] = useState<any>(null);
  const [newProject, setNewProject] = useState({
    title: '',
    category: 'residential',
    location: '',
    year: '',
    area: '',
    description: '',
    image: '',
    services: [''],
    details: ''
  });

  // إعدادات الحساب
  const [accountSettings, setAccountSettings] = useState({
    username: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // تحميل البيانات عند بدء التشغيل
  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = () => {
    // تحميل الرسائل
    const savedMessages = JSON.parse(localStorage.getItem('adminMessages') || '[]');
    setMessages(savedMessages);

    // تحميل بيانات المحتوى
    const savedDesignWorks = getContentData('designWorks') || getDefaultDesignWorks();
    const savedSupervisionWorks = getContentData('supervisionWorks') || getDefaultSupervisionWorks();
    const savedFeaturedProjects = getContentData('featuredProjects') || getDefaultFeaturedProjects();
    const savedClientLogos = getContentData('clientLogos') || getDefaultClientLogos();
    const savedTeamMembers = getContentData('teamMembers') || getDefaultTeamMembers();

    setDesignWorks(savedDesignWorks);
    setSupervisionWorks(savedSupervisionWorks);
    setFeaturedProjects(savedFeaturedProjects);
    setClientLogos(savedClientLogos);
    setTeamMembers(savedTeamMembers);

    const savedProjects = getContentData('projects');
    if (savedProjects && Array.isArray(savedProjects)) {
      setLoadedProjects(savedProjects);
    }

    // تحميل إعدادات الحساب
    const adminCredentials = getAdminCredentials_Public();
    setAccountSettings(prev => ({
      ...prev,
      username: adminCredentials.username,
      email: adminCredentials.email
    }));
  };

  // البيانات الافتراضية
  const getDefaultDesignWorks = () => [
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
  ];

  const getDefaultSupervisionWorks = () => [
    {
      id: 'towers',
      title: 'أبراج إدارية',
      icon: '🏗️',
      images: [
        'https://images.pexels.com/photos/2467558/pexels-photo-2467558.jpeg?auto=compress&cs=tinysrgb&w=800'
      ]
    }
  ];

  const getDefaultFeaturedProjects = () => [
    {
      id: '1',
      title: 'مجمع الأمير السكني',
      category: 'مشاريع سكنية',
      image: 'https://images.pexels.com/photos/280232/pexels-photo-280232.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'مجمع سكني فاخر يضم 120 وحدة سكنية'
    }
  ];

  const getDefaultClientLogos = () => [
    {
      id: '1',
      name: 'شركة أرامكو السعودية',
      logo: 'https://via.placeholder.com/150x80/1e40af/ffffff?text=أرامكو'
    }
  ];

  const getDefaultTeamMembers = () => [
    {
      id: '1',
      name: 'م. أحمد السعيد',
      position: 'المدير العام',
      experience: '20 سنة خبرة',
      specialization: 'الهندسة المعمارية',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300'
    }
  ];

  const handleLogout = () => {
    logout();
    onNavigate('home');
  };

  const handleSaveDesignWork = (work: any) => {
    if (work.id) {
      // تحديث موجود
      const updated = designWorks.map(w => w.id === work.id ? work : w);
      setDesignWorks(updated);
      saveContentData('designWorks', updated);
    } else {
      // إضافة جديد
      const newWork = { ...work, id: Date.now().toString() };
      const updated = [...designWorks, newWork];
      setDesignWorks(updated);
      saveContentData('designWorks', updated);
    }
    setEditingDesignWork(null);
    
    // إشعار التحديث
    window.dispatchEvent(new CustomEvent('contentUpdated', { detail: { key: 'designWorks' } }));
  };

  const handleSaveSupervisionWork = (work: any) => {
    if (work.id) {
      const updated = supervisionWorks.map(w => w.id === work.id ? work : w);
      setSupervisionWorks(updated);
      saveContentData('supervisionWorks', updated);
    } else {
      const newWork = { ...work, id: Date.now().toString() };
      const updated = [...supervisionWorks, newWork];
      setSupervisionWorks(updated);
      saveContentData('supervisionWorks', updated);
    }
    setEditingSupervisionWork(null);
    window.dispatchEvent(new CustomEvent('contentUpdated', { detail: { key: 'supervisionWorks' } }));
  };

  const handleSaveProject = (project: any) => {
    if (project.id) {
      const updated = featuredProjects.map(p => p.id === project.id ? project : p);
      setFeaturedProjects(updated);
      saveContentData('featuredProjects', updated);
    } else {
      const newProject = { ...project, id: Date.now().toString() };
      const updated = [...featuredProjects, newProject];
      setFeaturedProjects(updated);
      saveContentData('featuredProjects', updated);
    }
    setEditingProject(null);
    window.dispatchEvent(new CustomEvent('contentUpdated', { detail: { key: 'featuredProjects' } }));
  };

  const handleSaveClient = (client: any) => {
    if (client.id) {
      const updated = clientLogos.map(c => c.id === client.id ? client : c);
      setClientLogos(updated);
      saveContentData('clientLogos', updated);
    } else {
      const newClient = { ...client, id: Date.now().toString() };
      const updated = [...clientLogos, newClient];
      setClientLogos(updated);
      saveContentData('clientLogos', updated);
    }
    setEditingClient(null);
    window.dispatchEvent(new CustomEvent('contentUpdated', { detail: { key: 'clientLogos' } }));
  };

  const handleSaveTeamMember = (member: any) => {
    if (member.id) {
      const updated = teamMembers.map(m => m.id === member.id ? member : m);
      setTeamMembers(updated);
      saveContentData('teamMembers', updated);
    } else {
      const newMember = { ...member, id: Date.now().toString() };
      const updated = [...teamMembers, newMember];
      setTeamMembers(updated);
      saveContentData('teamMembers', updated);
    }
    setEditingTeamMember(null);
    window.dispatchEvent(new CustomEvent('contentUpdated', { detail: { key: 'teamMembers' } }));
  };

  const handleDeleteItem = (type: string, id: string) => {
    if (!confirm('هل أنت متأكد من الحذف؟')) return;

    switch (type) {
      case 'designWork':
        const updatedDesignWorks = designWorks.filter(w => w.id !== id);
        setDesignWorks(updatedDesignWorks);
        saveContentData('designWorks', updatedDesignWorks);
        window.dispatchEvent(new CustomEvent('contentUpdated', { detail: { key: 'designWorks' } }));
        break;
      case 'supervisionWork':
        const updatedSupervisionWorks = supervisionWorks.filter(w => w.id !== id);
        setSupervisionWorks(updatedSupervisionWorks);
        saveContentData('supervisionWorks', updatedSupervisionWorks);
        window.dispatchEvent(new CustomEvent('contentUpdated', { detail: { key: 'supervisionWorks' } }));
        break;
      case 'project':
        const updatedProjects = featuredProjects.filter(p => p.id !== id);
        setFeaturedProjects(updatedProjects);
        saveContentData('featuredProjects', updatedProjects);
        window.dispatchEvent(new CustomEvent('contentUpdated', { detail: { key: 'featuredProjects' } }));
        break;
      case 'client':
        const updatedClients = clientLogos.filter(c => c.id !== id);
        setClientLogos(updatedClients);
        saveContentData('clientLogos', updatedClients);
        window.dispatchEvent(new CustomEvent('contentUpdated', { detail: { key: 'clientLogos' } }));
        break;
      case 'teamMember':
        const updatedTeamMembers = teamMembers.filter(m => m.id !== id);
        setTeamMembers(updatedTeamMembers);
        saveContentData('teamMembers', updatedTeamMembers);
        window.dispatchEvent(new CustomEvent('contentUpdated', { detail: { key: 'teamMembers' } }));
        break;
    }
  };

  const handleUpdateAccount = () => {
    if (!accountSettings.currentPassword) {
      alert('يرجى إدخال كلمة المرور الحالية');
      return;
    }

    if (!verifyCurrentPassword(accountSettings.currentPassword)) {
      alert('كلمة المرور الحالية غير صحيحة');
      return;
    }

    if (accountSettings.newPassword && accountSettings.newPassword !== accountSettings.confirmPassword) {
      alert('كلمة المرور الجديدة غير متطابقة');
      return;
    }

    const success = updateAdminCredentials(
      accountSettings.username,
      accountSettings.newPassword || accountSettings.currentPassword,
      accountSettings.email
    );

    if (success) {
      alert('تم تحديث البيانات بنجاح');
      setAccountSettings(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }));
      setCurrentUser(getCurrentUser());
    } else {
      alert('فشل في تحديث البيانات');
    }
  };

  // إضافة مشروع جديد
  const addProject = () => {
    if (newProject.title && newProject.description) {
      const updatedProjects = [...loadedProjects, { ...newProject, id: Date.now().toString() }];
      setLoadedProjects(updatedProjects);
      saveContentData('projects', updatedProjects);
      setNewProject({
        title: '',
        category: 'residential',
        location: '',
        year: '',
        area: '',
        description: '',
        image: '',
        services: [''],
        details: ''
      });
    }
  };

  // تحديث مشروع
  const updateProject = () => {
    if (editingProject) {
      const updatedProjects = loadedProjects.map(project =>
        project.id === editingProject.id ? editingProject : project
      );
      setLoadedProjects(updatedProjects);
      saveContentData('projects', updatedProjects);
      setEditingProject(null);
    }
  };

  // حذف مشروع
  const deleteProject = (id: string) => {
    const updatedProjects = loadedProjects.filter(project => project.id !== id);
    setLoadedProjects(updatedProjects);
    saveContentData('projects', updatedProjects);
  };

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-blue-50 p-6 rounded-lg">
          <div className="flex items-center">
            <MessageSquare className="h-8 w-8 text-blue-600" />
            <div className="mr-4">
              <p className="text-2xl font-bold text-blue-600">{messages.length}</p>
              <p className="text-blue-600">الرسائل</p>
            </div>
          </div>
        </div>
        <div className="bg-green-50 p-6 rounded-lg">
          <div className="flex items-center">
            <Building className="h-8 w-8 text-green-600" />
            <div className="mr-4">
              <p className="text-2xl font-bold text-green-600">{featuredProjects.length}</p>
              <p className="text-green-600">المشاريع المميزة</p>
            </div>
          </div>
        </div>
        <div className="bg-yellow-50 p-6 rounded-lg">
          <div className="flex items-center">
            <Users className="h-8 w-8 text-yellow-600" />
            <div className="mr-4">
              <p className="text-2xl font-bold text-yellow-600">{teamMembers.length}</p>
              <p className="text-yellow-600">أعضاء الفريق</p>
            </div>
          </div>
        </div>
        <div className="bg-purple-50 p-6 rounded-lg">
          <div className="flex items-center">
            <Award className="h-8 w-8 text-purple-600" />
            <div className="mr-4">
              <p className="text-2xl font-bold text-purple-600">{clientLogos.length}</p>
              <p className="text-purple-600">العملاء</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">الرسائل الحديثة</h3>
        <div className="space-y-4">
          {messages.slice(0, 5).map((message) => (
            <div key={message.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium">{message.name}</p>
                <p className="text-sm text-gray-600">{message.subject}</p>
                <p className="text-xs text-gray-500">{message.date}</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 rounded-full text-xs ${
                  message.status === 'new' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                }`}>
                  {message.status === 'new' ? 'جديد' : 'مقروء'}
                </span>
                <button
                  onClick={() => setSelectedMessage(message)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <Eye className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderMessages = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold">الرسائل والاستفسارات</h3>
        </div>
        <div className="divide-y">
          {messages.map((message) => (
            <div key={message.id} className="p-6 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-4">
                    <div>
                      <p className="font-medium text-gray-900">{message.name}</p>
                      <p className="text-sm text-gray-600">{message.email}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{message.subject}</p>
                      <p className="text-xs text-gray-500">{message.date}</p>
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-gray-700 line-clamp-2">{message.message}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    message.status === 'new' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                  }`}>
                    {message.status === 'new' ? 'جديد' : 'مقروء'}
                  </span>
                  <button
                    onClick={() => setSelectedMessage(message)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderContentManagement = () => (
    <div className="space-y-8">
      {/* أعمال التصميم */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b flex justify-between items-center">
          <h3 className="text-lg font-semibold">أعمال التصميم</h3>
          <button
            onClick={() => setEditingDesignWork({ title: '', icon: '🏠', images: [''] })}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>إضافة جديد</span>
          </button>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {designWorks.map((work) => (
              <div key={work.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">{work.icon}</span>
                    <h4 className="font-medium">{work.title}</h4>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setEditingDesignWork(work)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteItem('designWork', work.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {work.images.slice(0, 4).map((image: string, index: number) => (
                    <img
                      key={index}
                      src={image}
                      alt={`${work.title} ${index + 1}`}
                      className="w-full h-20 object-cover rounded"
                    />
                  ))}
                </div>
                <p className="text-sm text-gray-600 mt-2">{work.images.length} صورة</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* أعمال الإشراف */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b flex justify-between items-center">
          <h3 className="text-lg font-semibold">أعمال الإشراف</h3>
          <button
            onClick={() => setEditingSupervisionWork({ title: '', icon: '🏗️', images: [''] })}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>إضافة جديد</span>
          </button>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {supervisionWorks.map((work) => (
              <div key={work.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">{work.icon}</span>
                    <h4 className="font-medium">{work.title}</h4>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setEditingSupervisionWork(work)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteItem('supervisionWork', work.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {work.images.slice(0, 4).map((image: string, index: number) => (
                    <img
                      key={index}
                      src={image}
                      alt={`${work.title} ${index + 1}`}
                      className="w-full h-20 object-cover rounded"
                    />
                  ))}
                </div>
                <p className="text-sm text-gray-600 mt-2">{work.images.length} صورة</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* المشاريع المميزة */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b flex justify-between items-center">
          <h3 className="text-lg font-semibold">المشاريع المميزة</h3>
          <button
            onClick={() => setEditingProject({ title: '', category: '', image: '', description: '' })}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>إضافة جديد</span>
          </button>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map((project) => (
              <div key={project.id} className="border rounded-lg p-4">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-32 object-cover rounded mb-4"
                />
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{project.title}</h4>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setEditingProject(project)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteItem('project', project.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <p className="text-sm text-blue-600 mb-2">{project.category}</p>
                <p className="text-sm text-gray-600">{project.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* شعارات العملاء */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b flex justify-between items-center">
          <h3 className="text-lg font-semibold">شعارات العملاء</h3>
          <button
            onClick={() => setEditingClient({ name: '', logo: '' })}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>إضافة جديد</span>
          </button>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {clientLogos.map((client) => (
              <div key={client.id} className="border rounded-lg p-4 text-center">
                <img
                  src={client.logo}
                  alt={client.name}
                  className="w-full h-20 object-contain mb-4"
                />
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-sm">{client.name}</h4>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setEditingClient(client)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteItem('client', client.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* فريق العمل */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b flex justify-between items-center">
          <h3 className="text-lg font-semibold">فريق العمل</h3>
          <button
            onClick={() => setEditingTeamMember({ name: '', position: '', experience: '', specialization: '', image: '' })}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>إضافة جديد</span>
          </button>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamMembers.map((member) => (
              <div key={member.id} className="border rounded-lg p-4">
                <img
                  src={member.image || 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300'}
                  alt={member.name}
                  className="w-full h-32 object-cover rounded mb-4"
                />
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{member.name}</h4>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setEditingTeamMember(member)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteItem('teamMember', member.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <p className="text-sm text-blue-600 mb-1">{member.position}</p>
                <p className="text-sm text-gray-600 mb-1">{member.experience}</p>
                <p className="text-xs text-gray-500">{member.specialization}</p>
              </div>
            ))}
          </div>
        </div>

        {/* إدارة المشاريع */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Building className="h-6 w-6 text-blue-600 ml-2" />
            إدارة المشاريع
          </h2>
          
          {/* نموذج إضافة مشروع جديد */}
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">إضافة مشروع جديد</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">عنوان المشروع</label>
                <input
                  type="text"
                  value={newProject.title}
                  onChange={(e) => setNewProject({...newProject, title: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="مثال: مجمع الأمير السكني"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">فئة المشروع</label>
                <select
                  value={newProject.category}
                  onChange={(e) => setNewProject({...newProject, category: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                  value={newProject.location}
                  onChange={(e) => setNewProject({...newProject, location: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="مثال: الرياض"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">سنة التنفيذ</label>
                <input
                  type="text"
                  value={newProject.year}
                  onChange={(e) => setNewProject({...newProject, year: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="مثال: 2023"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">المساحة</label>
                <input
                  type="text"
                  value={newProject.area}
                  onChange={(e) => setNewProject({...newProject, area: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="مثال: 15,000 م²"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Link className="h-4 w-4 inline ml-1" />
                  رابط الصورة
                </label>
                <input
                  type="url"
                  value={newProject.image}
                  onChange={(e) => setNewProject({...newProject, image: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://example.com/image.jpg"
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">وصف المشروع</label>
              <textarea
                value={newProject.description}
                onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={3}
                placeholder="وصف مختصر للمشروع..."
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">تفاصيل المشروع</label>
              <textarea
                value={newProject.details}
                onChange={(e) => setNewProject({...newProject, details: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={4}
                placeholder="تفاصيل شاملة عن المشروع..."
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">الخدمات المقدمة</label>
              {newProject.services.map((service, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={service}
                    onChange={(e) => {
                      const updatedServices = [...newProject.services];
                      updatedServices[index] = e.target.value;
                      setNewProject({...newProject, services: updatedServices});
                    }}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="مثال: التصميم المعماري"
                  />
                  {newProject.services.length > 1 && (
                    <button
                      onClick={() => {
                        const updatedServices = newProject.services.filter((_, i) => i !== index);
                        setNewProject({...newProject, services: updatedServices});
                      }}
                      className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
              ))}
              <button
                onClick={() => setNewProject({...newProject, services: [...newProject.services, '']})}
                className="mt-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm"
              >
                إضافة خدمة أخرى
              </button>
            </div>
            <button
              onClick={addProject}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
            >
              إضافة المشروع
            </button>
          </div>

          {/* عرض المشاريع */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loadedProjects.map((project) => (
              <div key={project.id} className="bg-white rounded-xl shadow-lg overflow-hidden border">
                <div className="relative h-48 overflow-hidden">
                  {project.image ? (
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center">
                      <Building className="h-16 w-16 text-white opacity-50" />
                    </div>
                  )}
                  <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
                    {project.year}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{project.title}</h3>
                  <p className="text-gray-600 text-sm mb-2">📍 {project.location}</p>
                  <p className="text-gray-600 text-sm mb-2">📐 {project.area}</p>
                  <p className="text-gray-700 text-sm mb-4 line-clamp-3">{project.description}</p>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.services.slice(0, 2).map((service: string, index: number) => (
                      <span key={index} className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-xs">
                        {service}
                      </span>
                    ))}
                    {project.services.length > 2 && (
                      <span className="text-blue-600 text-xs">+{project.services.length - 2}</span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setEditingProject(project)}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
                    >
                      تعديل
                    </button>
                    <button
                      onClick={() => deleteProject(project.id)}
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
                    >
                      حذف
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold">إعدادات الحساب</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                اسم المستخدم
              </label>
              <input
                type="text"
                value={accountSettings.username}
                onChange={(e) => setAccountSettings(prev => ({ ...prev, username: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                البريد الإلكتروني
              </label>
              <input
                type="email"
                value={accountSettings.email}
                onChange={(e) => setAccountSettings(prev => ({ ...prev, email: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                كلمة المرور الحالية *
              </label>
              <input
                type="password"
                value={accountSettings.currentPassword}
                onChange={(e) => setAccountSettings(prev => ({ ...prev, currentPassword: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="مطلوبة للتأكيد"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                كلمة المرور الجديدة (اختياري)
              </label>
              <input
                type="password"
                value={accountSettings.newPassword}
                onChange={(e) => setAccountSettings(prev => ({ ...prev, newPassword: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="اتركها فارغة إذا لم ترد التغيير"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                تأكيد كلمة المرور الجديدة
              </label>
              <input
                type="password"
                value={accountSettings.confirmPassword}
                onChange={(e) => setAccountSettings(prev => ({ ...prev, confirmPassword: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="تأكيد كلمة المرور الجديدة"
              />
            </div>
          </div>
          <div className="mt-6">
            <button
              onClick={handleUpdateAccount}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 flex items-center space-x-2"
            >
              <Save className="h-4 w-4" />
              <span>حفظ التغييرات</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // مكونات التحرير
  const DesignWorkEditor = ({ work, onSave, onCancel }: any) => {
    const [formData, setFormData] = useState(work);

    const handleImageChange = (index: number, value: string) => {
      const newImages = [...formData.images];
      newImages[index] = value;
      setFormData({ ...formData, images: newImages });
    };

    const addImageField = () => {
      setFormData({ ...formData, images: [...formData.images, ''] });
    };

    const removeImageField = (index: number) => {
      const newImages = formData.images.filter((_: any, i: number) => i !== index);
      setFormData({ ...formData, images: newImages });
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">
              {work.id ? 'تحرير عمل التصميم' : 'إضافة عمل تصميم جديد'}
            </h3>
            <button onClick={onCancel} className="text-gray-500 hover:text-gray-700">
              <X className="h-6 w-6" />
            </button>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">العنوان</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">الأيقونة</label>
              <input
                type="text"
                value={formData.icon}
                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="🏠"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">روابط الصور</label>
              {formData.images.map((image: string, index: number) => (
                <div key={index} className="flex items-center space-x-2 mb-2">
                  <Link className="h-4 w-4 text-gray-400" />
                  <input
                    type="url"
                    value={image}
                    onChange={(e) => handleImageChange(index, e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="https://example.com/image.jpg"
                  />
                  {formData.images.length > 1 && (
                    <button
                      onClick={() => removeImageField(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
              ))}
              <button
                onClick={addImageField}
                className="text-blue-600 hover:text-blue-800 text-sm flex items-center space-x-1"
              >
                <Plus className="h-4 w-4" />
                <span>إضافة صورة أخرى</span>
              </button>
            </div>
          </div>
          
          <div className="flex justify-end space-x-4 mt-6">
            <button
              onClick={onCancel}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              إلغاء
            </button>
            <button
              onClick={() => onSave(formData)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center space-x-2"
            >
              <Save className="h-4 w-4" />
              <span>حفظ</span>
            </button>
          </div>
        </div>
      </div>
    );
  };

  const SupervisionWorkEditor = ({ work, onSave, onCancel }: any) => {
    const [formData, setFormData] = useState(work);

    const handleImageChange = (index: number, value: string) => {
      const newImages = [...formData.images];
      newImages[index] = value;
      setFormData({ ...formData, images: newImages });
    };

    const addImageField = () => {
      setFormData({ ...formData, images: [...formData.images, ''] });
    };

    const removeImageField = (index: number) => {
      const newImages = formData.images.filter((_: any, i: number) => i !== index);
      setFormData({ ...formData, images: newImages });
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">
              {work.id ? 'تحرير عمل الإشراف' : 'إضافة عمل إشراف جديد'}
            </h3>
            <button onClick={onCancel} className="text-gray-500 hover:text-gray-700">
              <X className="h-6 w-6" />
            </button>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">العنوان</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">الأيقونة</label>
              <input
                type="text"
                value={formData.icon}
                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="🏗️"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">روابط الصور</label>
              {formData.images.map((image: string, index: number) => (
                <div key={index} className="flex items-center space-x-2 mb-2">
                  <Link className="h-4 w-4 text-gray-400" />
                  <input
                    type="url"
                    value={image}
                    onChange={(e) => handleImageChange(index, e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="https://example.com/image.jpg"
                  />
                  {formData.images.length > 1 && (
                    <button
                      onClick={() => removeImageField(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
              ))}
              <button
                onClick={addImageField}
                className="text-blue-600 hover:text-blue-800 text-sm flex items-center space-x-1"
              >
                <Plus className="h-4 w-4" />
                <span>إضافة صورة أخرى</span>
              </button>
            </div>
          </div>
          
          <div className="flex justify-end space-x-4 mt-6">
            <button
              onClick={onCancel}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              إلغاء
            </button>
            <button
              onClick={() => onSave(formData)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center space-x-2"
            >
              <Save className="h-4 w-4" />
              <span>حفظ</span>
            </button>
          </div>
        </div>
      </div>
    );
  };

  const ProjectEditor = ({ project, onSave, onCancel }: any) => {
    const [formData, setFormData] = useState(project);

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">
              {project.id ? 'تحرير المشروع' : 'إضافة مشروع جديد'}
            </h3>
            <button onClick={onCancel} className="text-gray-500 hover:text-gray-700">
              <X className="h-6 w-6" />
            </button>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">عنوان المشروع</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">الفئة</label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="مشاريع سكنية"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">رابط الصورة</label>
              <div className="flex items-center space-x-2">
                <Link className="h-4 w-4 text-gray-400" />
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://example.com/image.jpg"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">الوصف</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          
          <div className="flex justify-end space-x-4 mt-6">
            <button
              onClick={onCancel}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              إلغاء
            </button>
            <button
              onClick={() => onSave(formData)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center space-x-2"
            >
              <Save className="h-4 w-4" />
              <span>حفظ</span>
            </button>
          </div>
        </div>
      </div>
    );
  };

  const ClientEditor = ({ client, onSave, onCancel }: any) => {
    const [formData, setFormData] = useState(client);

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-md">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">
              {client.id ? 'تحرير العميل' : 'إضافة عميل جديد'}
            </h3>
            <button onClick={onCancel} className="text-gray-500 hover:text-gray-700">
              <X className="h-6 w-6" />
            </button>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">اسم العميل</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">رابط الشعار</label>
              <div className="flex items-center space-x-2">
                <Link className="h-4 w-4 text-gray-400" />
                <input
                  type="url"
                  value={formData.logo}
                  onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://example.com/logo.png"
                />
              </div>
            </div>
          </div>
          
          <div className="flex justify-end space-x-4 mt-6">
            <button
              onClick={onCancel}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              إلغاء
            </button>
            <button
              onClick={() => onSave(formData)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center space-x-2"
            >
              <Save className="h-4 w-4" />
              <span>حفظ</span>
            </button>
          </div>
        </div>
      </div>
    );
  };

  const TeamMemberEditor = ({ member, onSave, onCancel }: any) => {
    const [formData, setFormData] = useState(member);

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">
              {member.id ? 'تحرير عضو الفريق' : 'إضافة عضو جديد'}
            </h3>
            <button onClick={onCancel} className="text-gray-500 hover:text-gray-700">
              <X className="h-6 w-6" />
            </button>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">الاسم</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">المنصب</label>
              <input
                type="text"
                value={formData.position}
                onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">سنوات الخبرة</label>
              <input
                type="text"
                value={formData.experience}
                onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="15 سنة خبرة"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">التخصص</label>
              <input
                type="text"
                value={formData.specialization}
                onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="الهندسة المعمارية"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">رابط الصورة</label>
              <div className="flex items-center space-x-2">
                <Link className="h-4 w-4 text-gray-400" />
                <input
                  type="url"
                  value={formData.image || ''}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://example.com/photo.jpg"
                />
              </div>
            </div>
          </div>
          
          <div className="flex justify-end space-x-4 mt-6">
            <button
              onClick={onCancel}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              إلغاء
            </button>
            <button
              onClick={() => onSave(formData)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center space-x-2"
            >
              <Save className="h-4 w-4" />
              <span>حفظ</span>
            </button>
          </div>
        </div>
      </div>
    );
  };

  const MessageModal = ({ message, onClose }: any) => {
    if (!message) return null;

    const markAsRead = () => {
      const updatedMessages = messages.map(m => 
        m.id === message.id ? { ...m, status: 'read' } : m
      );
      setMessages(updatedMessages);
      localStorage.setItem('adminMessages', JSON.stringify(updatedMessages));
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">تفاصيل الرسالة</h3>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X className="h-6 w-6" />
            </button>
          </div>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">الاسم</label>
                <p className="text-gray-900">{message.name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">البريد الإلكتروني</label>
                <p className="text-gray-900">{message.email}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">الهاتف</label>
                <p className="text-gray-900">{message.phone}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">التاريخ</label>
                <p className="text-gray-900">{message.date}</p>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">الموضوع</label>
              <p className="text-gray-900">{message.subject}</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">الرسالة</label>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-900 whitespace-pre-wrap">{message.message}</p>
              </div>
            </div>

            {message.type === 'quote' && message.projectDetails && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">تفاصيل المشروع</label>
                <div className="bg-blue-50 p-4 rounded-lg space-y-2">
                  <p><strong>نوع المشروع:</strong> {message.projectDetails.projectType}</p>
                  <p><strong>الموقع:</strong> {message.projectDetails.projectLocation}</p>
                  <p><strong>مساحة الأرض:</strong> {message.projectDetails.plotArea} م²</p>
                  <p><strong>مساحة البناء:</strong> {message.projectDetails.buildingArea} م²</p>
                  <p><strong>الميزانية:</strong> {message.projectDetails.budget}</p>
                  <p><strong>الإطار الزمني:</strong> {message.projectDetails.timeline}</p>
                </div>
              </div>
            )}
          </div>
          
          <div className="flex justify-between mt-6">
            <div className="flex space-x-2">
              <a
                href={`tel:${message.phone}`}
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 flex items-center space-x-2"
              >
                <Phone className="h-4 w-4" />
                <span>اتصال</span>
              </a>
              <a
                href={`mailto:${message.email}`}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center space-x-2"
              >
                <Mail className="h-4 w-4" />
                <span>إيميل</span>
              </a>
            </div>
            <div className="flex space-x-2">
              {message.status === 'new' && (
                <button
                  onClick={markAsRead}
                  className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
                >
                  تم القراءة
                </button>
              )}
              <button
                onClick={onClose}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                إغلاق
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const tabs = [
    { id: 'overview', label: 'نظرة عامة', icon: BarChart3 },
    { id: 'messages', label: 'الرسائل', icon: MessageSquare },
    { id: 'content', label: 'إدارة المحتوى', icon: FileText },
    { id: 'settings', label: 'الإعدادات', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="bg-blue-600 text-white p-2 rounded-lg">
                <Settings className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">لوحة التحكم</h1>
                <p className="text-sm text-gray-600">أسس الأعمار للاستشارات الهندسية</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">مرحباً، {currentUser?.username}</p>
                <p className="text-xs text-gray-600">{currentUser?.email}</p>
              </div>
              <button
                onClick={() => onNavigate('home')}
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                عرض الموقع
              </button>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 flex items-center space-x-2"
              >
                <LogOut className="h-4 w-4" />
                <span>تسجيل الخروج</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex">
          {/* Sidebar */}
          <div className="w-64 bg-white rounded-lg shadow p-6 ml-8">
            <nav className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-right transition-colors ${
                    activeTab === tab.id
                      ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <tab.icon className="h-5 w-5" />
                  <span>{tab.label}</span>
                  {tab.id === 'messages' && messages.filter(m => m.status === 'new').length > 0 && (
                    <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1 mr-auto">
                      {messages.filter(m => m.status === 'new').length}
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow">
              <div className="p-6">
                {activeTab === 'overview' && renderOverview()}
                {activeTab === 'messages' && renderMessages()}
                {activeTab === 'content' && renderContentManagement()}
                {activeTab === 'settings' && renderSettings()}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {editingDesignWork && (
        <DesignWorkEditor
          work={editingDesignWork}
          onSave={handleSaveDesignWork}
          onCancel={() => setEditingDesignWork(null)}
        />
      )}

      {editingSupervisionWork && (
        <SupervisionWorkEditor
          work={editingSupervisionWork}
          onSave={handleSaveSupervisionWork}
          onCancel={() => setEditingSupervisionWork(null)}
        />
      )}

      {editingProject && (
        <ProjectEditor
          project={editingProject}
          onSave={handleSaveProject}
          onCancel={() => setEditingProject(null)}
        />
      )}

      {editingClient && (
        <ClientEditor
          client={editingClient}
          onSave={handleSaveClient}
          onCancel={() => setEditingClient(null)}
        />
      )}

      {editingTeamMember && (
        <TeamMemberEditor
          member={editingTeamMember}
          onSave={handleSaveTeamMember}
          onCancel={() => setEditingTeamMember(null)}
        />
      )}

      {selectedMessage && (
        <MessageModal
          message={selectedMessage}
          onClose={() => setSelectedMessage(null)}
        />
      )}

      {/* نافذة تعديل المشروع */}
      {editingProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">تعديل المشروع</h2>
                <button
                  onClick={() => setEditingProject(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">عنوان المشروع</label>
                  <input
                    type="text"
                    value={editingProject.title}
                    onChange={(e) => setEditingProject({...editingProject, title: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">فئة المشروع</label>
                  <select
                    value={editingProject.category}
                    onChange={(e) => setEditingProject({...editingProject, category: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                    value={editingProject.location}
                    onChange={(e) => setEditingProject({...editingProject, location: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">سنة التنفيذ</label>
                  <input
                    type="text"
                    value={editingProject.year}
                    onChange={(e) => setEditingProject({...editingProject, year: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">المساحة</label>
                  <input
                    type="text"
                    value={editingProject.area}
                    onChange={(e) => setEditingProject({...editingProject, area: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Link className="h-4 w-4 inline ml-1" />
                    رابط الصورة
                  </label>
                  <input
                    type="url"
                    value={editingProject.image}
                    onChange={(e) => setEditingProject({...editingProject, image: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">وصف المشروع</label>
                <textarea
                  value={editingProject.description}
                  onChange={(e) => setEditingProject({...editingProject, description: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={3}
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">تفاصيل المشروع</label>
                <textarea
                  value={editingProject.details}
                  onChange={(e) => setEditingProject({...editingProject, details: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={4}
                />
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">الخدمات المقدمة</label>
                {editingProject.services.map((service: string, index: number) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={service}
                      onChange={(e) => {
                        const updatedServices = [...editingProject.services];
                        updatedServices[index] = e.target.value;
                        setEditingProject({...editingProject, services: updatedServices});
                      }}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    {editingProject.services.length > 1 && (
                      <button
                        onClick={() => {
                          const updatedServices = editingProject.services.filter((_: any, i: number) => i !== index);
                          setEditingProject({...editingProject, services: updatedServices});
                        }}
                        className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  onClick={() => setEditingProject({...editingProject, services: [...editingProject.services, '']})}
                  className="mt-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm"
                >
                  إضافة خدمة أخرى
                </button>
              </div>
              
              <div className="flex gap-4">
                <button
                  onClick={updateProject}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
                >
                  حفظ التغييرات
                </button>
                <button
                  onClick={() => setEditingProject(null)}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg transition-colors"
                >
                  إلغاء
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;