import React, { useState, useEffect } from 'react';
import { BarChart3, Users, MessageSquare, Settings, Bell, Search, Filter, Download, Eye, Trash2, Edit, Plus, Save, X, Calendar, Clock, Mail, Phone, Building, FileText, AlertCircle, TrendingUp, Activity, DollarSign, Star, CheckCircle } from 'lucide-react';
import {
  Shield, LogOut,
  ArrowUpDown, MapPin, User, Send, Reply,
  Upload
} from 'lucide-react';
import { getCurrentUser, logout, hasPermission } from '../utils/adminAuth';

interface AdminDashboardProps {
  onNavigate: (page: string) => void;
}

interface Message {
  id: number;
  type: 'contact' | 'quote';
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  date: string;
  status: 'new' | 'read' | 'replied';
  city?: string;
  projectDetails?: any;
}

interface Project {
  id: number;
  title: string;
  category: string;
  location: string;
  year: string;
  area: string;
  image: string;
  description: string;
  services: string[];
  details: string;
}

interface Service {
  id: number;
  title: string;
  description: string;
  features: string[];
}

interface TeamMember {
  id: number;
  name: string;
  position: string;
  experience: string;
  specialization: string;
  image?: string;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [messages, setMessages] = useState<Message[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [editingTeamMember, setEditingTeamMember] = useState<TeamMember | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showProjectsPageModal, setShowProjectsPageModal] = useState(false);
  const [editingProjectsPage, setEditingProjectsPage] = useState<any>(null);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyText, setReplyText] = useState('');

  const user = getCurrentUser();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    // Load messages
    const savedMessages = localStorage.getItem('adminMessages');
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }

    // Load projects
    const savedProjects = localStorage.getItem('adminProjects');
    if (savedProjects) {
      setProjects(JSON.parse(savedProjects));
    } else {
      // Default projects
      const defaultProjects: Project[] = [
        {
          id: 1,
          title: 'مجمع الأمير السكني',
          category: 'residential',
          location: 'الرياض',
          year: '2023',
          area: '15,000 م²',
          image: 'https://images.pexels.com/photos/280232/pexels-photo-280232.jpeg?auto=compress&cs=tinysrgb&w=800',
          description: 'مجمع سكني فاخر يضم 120 وحدة سكنية',
          services: ['التصميم المعماري', 'التصميم الإنشائي'],
          details: 'مشروع سكني متكامل يجمع بين التصميم العصري والطابع المعماري المحلي'
        }
      ];
      setProjects(defaultProjects);
      localStorage.setItem('adminProjects', JSON.stringify(defaultProjects));
    }

    // Load services
    const savedServices = localStorage.getItem('adminServices');
    if (savedServices) {
      setServices(JSON.parse(savedServices));
    } else {
      // Default services
      const defaultServices: Service[] = [
        {
          id: 1,
          title: 'التصميم المعماري',
          description: 'تصميم معماري مبتكر يجمع بين الجمالية والوظيفية',
          features: ['تصميم المباني السكنية', 'التصميم الداخلي', 'المخططات التنفيذية']
        }
      ];
      setServices(defaultServices);
      localStorage.setItem('adminServices', JSON.stringify(defaultServices));
    }

    // Load team members
    const savedTeam = localStorage.getItem('adminTeam');
    if (savedTeam) {
      setTeamMembers(JSON.parse(savedTeam));
    } else {
      // Default team
      const defaultTeam: TeamMember[] = [
        {
          id: 1,
          name: 'م. أحمد السعيد',
          position: 'المدير العام',
          experience: '20 سنة خبرة',
          specialization: 'الهندسة المعمارية'
        }
      ];
      setTeamMembers(defaultTeam);
      localStorage.setItem('adminTeam', JSON.stringify(defaultTeam));
    }
  };

  const handleLogout = () => {
    logout();
    onNavigate('home');
  };

  const updateMessageStatus = (messageId: number, status: 'new' | 'read' | 'replied') => {
    const updatedMessages = messages.map(msg => 
      msg.id === messageId ? { ...msg, status } : msg
    );
    setMessages(updatedMessages);
    localStorage.setItem('adminMessages', JSON.stringify(updatedMessages));
  };

  const deleteMessage = (messageId: number) => {
    if (confirm('هل أنت متأكد من حذف هذه الرسالة؟')) {
      const updatedMessages = messages.filter(msg => msg.id !== messageId);
      setMessages(updatedMessages);
      localStorage.setItem('adminMessages', JSON.stringify(updatedMessages));
      setSelectedMessage(null);
    }
  };

  const saveProject = (project: Project) => {
    let updatedProjects;
    if (project.id) {
      updatedProjects = projects.map(p => p.id === project.id ? project : p);
    } else {
      const newProject = { ...project, id: Date.now() };
      updatedProjects = [...projects, newProject];
    }
    setProjects(updatedProjects);
    localStorage.setItem('adminProjects', JSON.stringify(updatedProjects));
    setEditingProject(null);
  };

  const deleteProject = (projectId: number) => {
    if (confirm('هل أنت متأكد من حذف هذا المشروع؟')) {
      const updatedProjects = projects.filter(p => p.id !== projectId);
      setProjects(updatedProjects);
      localStorage.setItem('adminProjects', JSON.stringify(updatedProjects));
    }
  };

  const saveService = (service: Service) => {
    let updatedServices;
    if (service.id) {
      updatedServices = services.map(s => s.id === service.id ? service : s);
    } else {
      const newService = { ...service, id: Date.now() };
      updatedServices = [...services, newService];
    }
    setServices(updatedServices);
    localStorage.setItem('adminServices', JSON.stringify(updatedServices));
    setEditingService(null);
  };

  const deleteService = (serviceId: number) => {
    if (confirm('هل أنت متأكد من حذف هذه الخدمة؟')) {
      const updatedServices = services.filter(s => s.id !== serviceId);
      setServices(updatedServices);
      localStorage.setItem('adminServices', JSON.stringify(updatedServices));
    }
  };

  const saveTeamMember = (member: TeamMember) => {
    let updatedTeam;
    if (member.id) {
      updatedTeam = teamMembers.map(m => m.id === member.id ? member : m);
    } else {
      const newMember = { ...member, id: Date.now() };
      updatedTeam = [...teamMembers, newMember];
    }
    setTeamMembers(updatedTeam);
    localStorage.setItem('adminTeam', JSON.stringify(updatedTeam));
    setEditingTeamMember(null);
  };

  const deleteTeamMember = (memberId: number) => {
    if (confirm('هل أنت متأكد من حذف هذا العضو؟')) {
      const updatedTeam = teamMembers.filter(m => m.id !== memberId);
      setTeamMembers(updatedTeam);
      localStorage.setItem('adminTeam', JSON.stringify(updatedTeam));
    }
  };

  const sendReply = () => {
    if (selectedMessage && replyText.trim()) {
      updateMessageStatus(selectedMessage.id, 'replied');
      setShowReplyForm(false);
      setReplyText('');
      alert('تم إرسال الرد بنجاح!');
    }
  };

  const filteredMessages = messages.filter(message => {
    const matchesSearch = message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || message.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-red-100 text-red-800';
      case 'read': return 'bg-yellow-100 text-yellow-800';
      case 'replied': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'new': return 'جديد';
      case 'read': return 'مقروء';
      case 'replied': return 'تم الرد';
      default: return status;
    }
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">الرسائل الجديدة</p>
              <p className="text-2xl font-bold text-blue-600">
                {messages.filter(m => m.status === 'new').length}
              </p>
            </div>
            <MessageSquare className="h-8 w-8 text-blue-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">إجمالي المشاريع</p>
              <p className="text-2xl font-bold text-green-600">{projects.length}</p>
            </div>
            <Building className="h-8 w-8 text-green-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">الخدمات</p>
              <p className="text-2xl font-bold text-purple-600">{services.length}</p>
            </div>
            <FileText className="h-8 w-8 text-purple-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">فريق العمل</p>
              <p className="text-2xl font-bold text-orange-600">{teamMembers.length}</p>
            </div>
            <Users className="h-8 w-8 text-orange-600" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">الرسائل الأخيرة</h3>
        <div className="space-y-3">
          {messages.slice(0, 5).map((message) => (
            <div key={message.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">{message.name}</p>
                <p className="text-sm text-gray-600">{message.subject}</p>
              </div>
              <div className="flex items-center space-x-3">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(message.status)}`}>
                  {getStatusText(message.status)}
                </span>
                <span className="text-sm text-gray-500">{message.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderMessages = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">إدارة الرسائل</h2>
        <div className="flex gap-4">
          <div className="relative">
            <Search className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="البحث في الرسائل..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">جميع الحالات</option>
            <option value="new">جديد</option>
            <option value="read">مقروء</option>
            <option value="replied">تم الرد</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الاسم</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الموضوع</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">التاريخ</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">النوع</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الحالة</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredMessages.map((message) => (
                <tr key={message.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{message.name}</div>
                      <div className="text-sm text-gray-500">{message.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{message.subject}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {message.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      message.type === 'quote' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                    }`}>
                      {message.type === 'quote' ? 'طلب تسعيرة' : 'رسالة تواصل'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(message.status)}`}>
                      {getStatusText(message.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => {
                          setSelectedMessage(message);
                          if (message.status === 'new') {
                            updateMessageStatus(message.id, 'read');
                          }
                        }}
                        className="text-blue-600 hover:text-blue-900"
                        title="عرض"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => deleteMessage(message.id)}
                        className="text-red-600 hover:text-red-900"
                        title="حذف"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderProjects = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">إدارة المشاريع</h2>
        <button
          onClick={() => setEditingProject({
            id: 0,
            title: '',
            category: '',
            location: '',
            year: '',
            area: '',
            image: '',
            description: '',
            services: [],
            details: ''
          })}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>إضافة مشروع</span>
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">المشروع</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الفئة</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الموقع</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">السنة</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {projects.map((project) => (
                <tr key={project.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img className="h-10 w-10 rounded-lg object-cover" src={project.image} alt={project.title} />
                      <div className="mr-4">
                        <div className="text-sm font-medium text-gray-900">{project.title}</div>
                        <div className="text-sm text-gray-500">{project.area}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{project.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{project.location}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{project.year}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setEditingProject(project)}
                        className="text-blue-600 hover:text-blue-900"
                        title="تعديل"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => deleteProject(project.id)}
                        className="text-red-600 hover:text-red-900"
                        title="حذف"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderServices = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">إدارة الخدمات</h2>
        <button
          onClick={() => setEditingService({
            id: 0,
            title: '',
            description: '',
            features: []
          })}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>إضافة خدمة</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <div key={service.id} className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-3">{service.title}</h3>
            <p className="text-gray-600 mb-4">{service.description}</p>
            <div className="space-y-2 mb-4">
              {service.features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setEditingService(service)}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center justify-center space-x-2"
              >
                <Edit className="h-4 w-4" />
                <span>تعديل</span>
              </button>
              <button
                onClick={() => deleteService(service.id)}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderTeam = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">إدارة فريق العمل</h2>
        <button
          onClick={() => setEditingTeamMember({
            id: 0,
            name: '',
            position: '',
            experience: '',
            specialization: '',
            image: ''
          })}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>إضافة عضو</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teamMembers.map((member) => (
          <div key={member.id} className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="w-20 h-20 bg-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
              {member.image ? (
                <img src={member.image} alt={member.name} className="w-full h-full rounded-full object-cover" />
              ) : (
                <User className="h-10 w-10 text-gray-500" />
              )}
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">{member.name}</h3>
            <p className="text-blue-600 font-medium mb-1">{member.position}</p>
            <p className="text-gray-600 text-sm mb-2">{member.experience}</p>
            <p className="text-gray-700 text-sm mb-4">{member.specialization}</p>
            <div className="flex space-x-2">
              <button
                onClick={() => setEditingTeamMember(member)}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center justify-center space-x-2"
              >
                <Edit className="h-4 w-4" />
                <span>تعديل</span>
              </button>
              <button
                onClick={() => deleteTeamMember(member.id)}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return renderDashboard();
      case 'messages':
        return renderMessages();
      case 'projects':
        return renderProjects();
      case 'services':
        return renderServices();
      case 'team':
        return renderTeam();
      default:
        return renderDashboard();
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <Shield className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">غير مصرح</h2>
          <p className="text-gray-600 mb-4">يجب تسجيل الدخول للوصول لهذه الصفحة</p>
          <button
            onClick={() => onNavigate('home')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
          >
            العودة للرئيسية
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-lg">
          <div className="p-6">
            <div className="flex items-center space-x-3 mb-8">
              <Shield className="h-8 w-8 text-blue-600" />
              <div>
                <h2 className="text-lg font-bold text-gray-900">لوحة التحكم</h2>
                <p className="text-sm text-gray-600">مرحباً {user.username}</p>
              </div>
            </div>

            <nav className="space-y-2">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-right transition-colors ${
                  activeTab === 'dashboard' ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600' : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <BarChart3 className="h-5 w-5" />
                <span>لوحة التحكم</span>
              </button>

              <button
                onClick={() => setActiveTab('messages')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-right transition-colors ${
                  activeTab === 'messages' ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600' : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <MessageSquare className="h-5 w-5" />
                <span>الرسائل</span>
                {messages.filter(m => m.status === 'new').length > 0 && (
                  <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1 mr-auto">
                    {messages.filter(m => m.status === 'new').length}
                  </span>
                )}
              </button>

              <button
                onClick={() => setActiveTab('projects')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-right transition-colors ${
                  activeTab === 'projects' ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600' : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Building className="h-5 w-5" />
                <span>إدارة المشاريع</span>
              </button>

              <button
                onClick={() => setActiveTab('services')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-right transition-colors ${
                  activeTab === 'services' ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600' : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <FileText className="h-5 w-5" />
                <span>إدارة الخدمات</span>
              </button>

              <button
                onClick={() => setActiveTab('team')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-right transition-colors ${
                  activeTab === 'team' ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600' : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Users className="h-5 w-5" />
                <span>فريق العمل</span>
              </button>
            </nav>
          </div>

          <div className="absolute bottom-0 w-64 p-6 border-t">
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut className="h-5 w-5" />
              <span>تسجيل الخروج</span>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          {renderContent()}
        </div>
      </div>

      {/* Message Details Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className={`p-6 rounded-t-2xl ${
              selectedMessage.type === 'quote' ? 'bg-gradient-to-r from-blue-600 to-blue-800' : 'bg-gradient-to-r from-green-600 to-green-800'
            } text-white`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                    <span className="text-xl font-bold">
                      {selectedMessage.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">
                      {selectedMessage.type === 'quote' ? 'طلب تسعيرة' : 'رسالة تواصل'}
                    </h2>
                    <p className="text-blue-100">{selectedMessage.subject}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedMessage(null)}
                  className="text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-full transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                {/* Client Info */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">معلومات العميل</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <User className="h-5 w-5 text-gray-400" />
                      <span className="text-gray-700">{selectedMessage.name}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Mail className="h-5 w-5 text-gray-400" />
                      <a href={`mailto:${selectedMessage.email}`} className="text-blue-600 hover:underline">
                        {selectedMessage.email}
                      </a>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="h-5 w-5 text-gray-400" />
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-700">{selectedMessage.phone}</span>
                        <a href={`tel:${selectedMessage.phone}`} className="text-blue-600 hover:text-blue-800">
                          <Phone className="h-4 w-4" />
                        </a>
                        <a href={`https://wa.me/${selectedMessage.phone.replace(/\D/g, '')}`} target="_blank\" rel="noopener noreferrer\" className="text-green-600 hover:text-green-800">
                          <MessageSquare className="h-4 w-4" />
                        </a>
                      </div>
                    </div>
                    {selectedMessage.city && (
                      <div className="flex items-center space-x-3">
                        <MapPin className="h-5 w-5 text-gray-400" />
                        <span className="text-gray-700">{selectedMessage.city}</span>
                      </div>
                    )}
                    <div className="flex items-center space-x-3">
                      <Calendar className="h-5 w-5 text-gray-400" />
                      <span className="text-gray-700">{selectedMessage.date}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedMessage.status)}`}>
                        {getStatusText(selectedMessage.status)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Project Details for Quote Requests */}
                {selectedMessage.type === 'quote' && selectedMessage.projectDetails && (
                  <div className="bg-blue-50 rounded-xl p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">تفاصيل المشروع</h3>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <span className="text-sm text-gray-600">نوع المشروع:</span>
                        <p className="font-medium">{selectedMessage.projectDetails.projectType}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">الموقع:</span>
                        <p className="font-medium">{selectedMessage.projectDetails.projectLocation}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">مساحة الأرض:</span>
                        <p className="font-medium">{selectedMessage.projectDetails.plotArea} م²</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">مساحة البناء:</span>
                        <p className="font-medium">{selectedMessage.projectDetails.buildingArea} م²</p>
                      </div>
                    </div>
                    
                    {selectedMessage.projectDetails.services && (
                      <div className="mb-4">
                        <span className="text-sm text-gray-600 block mb-2">الخدمات المطلوبة:</span>
                        <div className="flex flex-wrap gap-2">
                          {Object.entries(selectedMessage.projectDetails.services).map(([key, value]) => 
                            value && (
                              <span key={key} className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs flex items-center space-x-1">
                                <CheckCircle className="h-3 w-3" />
                                <span>
                                  {key === 'architecturalDesign' && 'التصميم المعماري'}
                                  {key === 'structuralDesign' && 'التصميم الإنشائي'}
                                  {key === 'mepDesign' && 'أنظمة الكهروميكانيك'}
                                  {key === 'interiorDesign' && 'التصميم الداخلي'}
                                  {key === 'landscapeDesign' && 'تنسيق الحدائق'}
                                  {key === 'projectManagement' && 'إدارة المشروع'}
                                </span>
                              </span>
                            )
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Message Content */}
              <div className="bg-white border rounded-xl p-6 mb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">محتوى الرسالة</h3>
                <div className="prose max-w-none">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{selectedMessage.message}</p>
                </div>
              </div>

              {/* Reply Form */}
              {showReplyForm && (
                <div className="bg-gray-50 rounded-xl p-6 mb-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">الرد على العميل</h3>
                  <textarea
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="اكتب ردك هنا..."
                  />
                  <div className="flex space-x-3 mt-4">
                    <button
                      onClick={sendReply}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium flex items-center space-x-2"
                    >
                      <Send className="h-4 w-4" />
                      <span>إرسال الرد</span>
                    </button>
                    <button
                      onClick={() => setShowReplyForm(false)}
                      className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-6 py-2 rounded-lg font-medium"
                    >
                      إلغاء
                    </button>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setShowReplyForm(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium flex items-center space-x-2"
                >
                  <MessageSquare className="h-5 w-5" />
                  <span>رد على العميل</span>
                </button>
                
                <a
                  href={`mailto:${selectedMessage.email}?subject=رد على: ${selectedMessage.subject}&body=عزيزي ${selectedMessage.name}،%0A%0Aشكراً لتواصلك معنا...`}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium flex items-center space-x-2"
                >
                  <Mail className="h-5 w-5" />
                  <span>رد بالإيميل</span>
                </a>
                
                <a
                  href={`https://wa.me/${selectedMessage.phone.replace(/\D/g, '')}?text=مرحباً ${selectedMessage.name}، شكراً لتواصلك مع شركة أسس الأعمار للاستشارات الهندسية`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium flex items-center space-x-2"
                >
                  <Phone className="h-5 w-5" />
                  <span>رد بالواتساب</span>
                </a>
                
                <button
                  onClick={() => updateMessageStatus(selectedMessage.id, 'replied')}
                  className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-3 rounded-lg font-medium flex items-center space-x-2"
                >
                  <CheckCircle className="h-5 w-5" />
                  <span>تم الرد</span>
                </button>
              </div>

              <div className="mt-6 pt-6 border-t text-center text-sm text-gray-500">
                معرف الرسالة: #{selectedMessage.id}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Project Edit Modal */}
      {editingProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 rounded-t-2xl">
              <h2 className="text-xl font-bold">
                {editingProject.id ? 'تعديل المشروع' : 'إضافة مشروع جديد'}
              </h2>
            </div>
            <div className="p-6">
              <form onSubmit={(e) => {
                e.preventDefault();
                saveProject(editingProject);
              }} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">اسم المشروع</label>
                  <input
                    type="text"
                    required
                    value={editingProject.title}
                    onChange={(e) => setEditingProject({...editingProject, title: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">الفئة</label>
                    <select
                      value={editingProject.category}
                      onChange={(e) => setEditingProject({...editingProject, category: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">اختر الفئة</option>
                      <option value="residential">سكني</option>
                      <option value="commercial">تجاري</option>
                      <option value="educational">تعليمي</option>
                      <option value="healthcare">صحي</option>
                      <option value="industrial">صناعي</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">الموقع</label>
                    <input
                      type="text"
                      value={editingProject.location}
                      onChange={(e) => setEditingProject({...editingProject, location: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">السنة</label>
                    <input
                      type="text"
                      value={editingProject.year}
                      onChange={(e) => setEditingProject({...editingProject, year: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">المساحة</label>
                    <input
                      type="text"
                      value={editingProject.area}
                      onChange={(e) => setEditingProject({...editingProject, area: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">رابط الصورة</label>
                  <input
                    type="url"
                    value={editingProject.image}
                    onChange={(e) => setEditingProject({...editingProject, image: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">الوصف</label>
                  <textarea
                    value={editingProject.description}
                    onChange={(e) => setEditingProject({...editingProject, description: e.target.value})}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">التفاصيل</label>
                  <textarea
                    value={editingProject.details}
                    onChange={(e) => setEditingProject({...editingProject, details: e.target.value})}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="flex space-x-3 pt-4">
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium flex items-center space-x-2"
                  >
                    <Save className="h-4 w-4" />
                    <span>حفظ</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingProject(null)}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-6 py-3 rounded-lg font-medium"
                  >
                    إلغاء
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Service Edit Modal */}
      {editingService && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white p-6 rounded-t-2xl">
              <h2 className="text-xl font-bold">
                {editingService.id ? 'تعديل الخدمة' : 'إضافة خدمة جديدة'}
              </h2>
            </div>
            <div className="p-6">
              <form onSubmit={(e) => {
                e.preventDefault();
                saveService(editingService);
              }} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">اسم الخدمة</label>
                  <input
                    type="text"
                    required
                    value={editingService.title}
                    onChange={(e) => setEditingService({...editingService, title: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">وصف الخدمة</label>
                  <textarea
                    value={editingService.description}
                    onChange={(e) => setEditingService({...editingService, description: e.target.value})}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">المميزات (كل مميزة في سطر منفصل)</label>
                  <textarea
                    value={editingService.features.join('\n')}
                    onChange={(e) => setEditingService({...editingService, features: e.target.value.split('\n').filter(f => f.trim())})}
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="مميزة 1&#10;مميزة 2&#10;مميزة 3"
                  />
                </div>
                <div className="flex space-x-3 pt-4">
                  <button
                    type="submit"
                    className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium flex items-center space-x-2"
                  >
                    <Save className="h-4 w-4" />
                    <span>حفظ</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingService(null)}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-6 py-3 rounded-lg font-medium"
                  >
                    إلغاء
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Team Member Edit Modal */}
      {editingTeamMember && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="bg-gradient-to-r from-orange-600 to-orange-800 text-white p-6 rounded-t-2xl">
              <h2 className="text-xl font-bold">
                {editingTeamMember.id ? 'تعديل عضو الفريق' : 'إضافة عضو جديد'}
              </h2>
            </div>
            <div className="p-6">
              <form onSubmit={(e) => {
                e.preventDefault();
                saveTeamMember(editingTeamMember);
              }} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">الاسم</label>
                  <input
                    type="text"
                    required
                    value={editingTeamMember.name}
                    onChange={(e) => setEditingTeamMember({...editingTeamMember, name: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">المنصب</label>
                  <input
                    type="text"
                    value={editingTeamMember.position}
                    onChange={(e) => setEditingTeamMember({...editingTeamMember, position: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">سنوات الخبرة</label>
                  <input
                    type="text"
                    value={editingTeamMember.experience}
                    onChange={(e) => setEditingTeamMember({...editingTeamMember, experience: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">التخصص</label>
                  <input
                    type="text"
                    value={editingTeamMember.specialization}
                    onChange={(e) => setEditingTeamMember({...editingTeamMember, specialization: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">رابط الصورة</label>
                  <input
                    type="url"
                    value={editingTeamMember.image || ''}
                    onChange={(e) => setEditingTeamMember({...editingTeamMember, image: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
                <div className="flex space-x-3 pt-4">
                  <button
                    type="submit"
                    className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-medium flex items-center space-x-2"
                  >
                    <Save className="h-4 w-4" />
                    <span>حفظ</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingTeamMember(null)}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-6 py-3 rounded-lg font-medium"
                  >
                    إلغاء
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;