import React, { useState } from 'react';
import { Building, Home, GraduationCap, ShoppingBag, Stethoscope, Factory, Eye, Calendar, MapPin, Users, Briefcase } from 'lucide-react';

interface ProjectsPageProps {
  onNavigate: (page: string) => void;
}

const ProjectsPage: React.FC<ProjectsPageProps> = ({ onNavigate }) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  const categories = [
    { id: 'all', label: 'جميع المشاريع', icon: Building },
    { id: 'residential', label: 'مشاريع سكنية', icon: Home },
    { id: 'commercial', label: 'مشاريع تجارية', icon: ShoppingBag },
    { id: 'educational', label: 'مشاريع تعليمية', icon: GraduationCap },
    { id: 'healthcare', label: 'مشاريع صحية', icon: Stethoscope },
    { id: 'industrial', label: 'مشاريع صناعية', icon: Factory }
  ];

  const projects = [
    {
      id: 1,
      title: 'مجمع الأمير السكني',
      category: 'residential',
      location: 'الرياض',
      year: '2023',
      area: '15,000 م²',
      description: 'مجمع سكني فاخر يضم 120 وحدة سكنية مع مرافق ترفيهية ومساحات خضراء',
      image: 'https://images.pexels.com/photos/280232/pexels-photo-280232.jpeg?auto=compress&cs=tinysrgb&w=800',
      services: ['التصميم المعماري', 'التصميم الإنشائي', 'أنظمة الكهروميكانيك'],
      details: 'مشروع سكني متكامل يجمع بين التصميم العصري والطابع المعماري المحلي، مع مراعاة أعلى معايير الجودة والاستدامة البيئية.'
    },
    {
      id: 2,
      title: 'مركز النور التجاري',
      category: 'commercial',
      location: 'جدة',
      year: '2023',
      area: '25,000 م²',
      description: 'مركز تجاري حديث يضم محلات تجارية ومطاعم ومكاتب إدارية',
      image: 'https://images.pexels.com/photos/2467558/pexels-photo-2467558.jpeg?auto=compress&cs=tinysrgb&w=800',
      services: ['التصميم المعماري', 'إدارة المشاريع', 'الاستشارات الفنية'],
      details: 'مركز تجاري عصري بتصميم مبتكر يوفر تجربة تسوق مميزة، مع أنظمة ذكية لإدارة الطاقة والأمان.'
    },
    {
      id: 3,
      title: 'مدرسة المستقبل',
      category: 'educational',
      location: 'الدمام',
      year: '2022',
      area: '18,000 م²',
      description: 'مدرسة نموذجية مجهزة بأحدث التقنيات التعليمية',
      image: 'https://images.pexels.com/photos/159490/yale-university-landscape-universities-schools-159490.jpeg?auto=compress&cs=tinysrgb&w=800',
      services: ['التصميم المعماري', 'التصميم الإنشائي', 'أنظمة الكهروميكانيك'],
      details: 'مدرسة عصرية مصممة لتوفير بيئة تعليمية محفزة ومريحة، مع فصول ذكية ومرافق رياضية متطورة.'
    },
    {
      id: 4,
      title: 'مستشفى الشفاء',
      category: 'healthcare',
      location: 'الرياض',
      year: '2022',
      area: '30,000 م²',
      description: 'مستشفى متخصص مجهز بأحدث المعدات الطبية',
      image: 'https://images.pexels.com/photos/668300/pexels-photo-668300.jpeg?auto=compress&cs=tinysrgb&w=800',
      services: ['التصميم المعماري', 'أنظمة الكهروميكانيك', 'إدارة المشاريع'],
      details: 'مستشفى حديث مصمم وفقاً لأحدث المعايير الطبية الدولية، مع أنظمة تهوية متطورة وتجهيزات طبية شاملة.'
    },
    {
      id: 5,
      title: 'مصنع الابتكار',
      category: 'industrial',
      location: 'ينبع',
      year: '2021',
      area: '40,000 م²',
      description: 'مصنع حديث للصناعات الغذائية مع أنظمة أتمتة متطورة',
      image: 'https://images.pexels.com/photos/1267338/pexels-photo-1267338.jpeg?auto=compress&cs=tinysrgb&w=800',
      services: ['التصميم الإنشائي', 'أنظمة الكهروميكانيك', 'الاستشارات الفنية'],
      details: 'مصنع عصري مجهز بخطوط إنتاج آلية ونظم مراقبة جودة متطورة، مع مراعاة معايير السلامة البيئية.'
    },
    {
      id: 6,
      title: 'فيلا الورد',
      category: 'residential',
      location: 'الطائف',
      year: '2023',
      area: '800 م²',
      description: 'فيلا فاخرة بتصميم معماري مميز وحدائق منسقة',
      image: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800',
      services: ['التصميم المعماري', 'التصميم الإنشائي', 'الاستشارات الفنية'],
      details: 'فيلا عصرية بتصميم معماري راقي يجمع بين الأصالة والحداثة، مع حدائق ومسابح ومرافق ترفيهية.'
    }
  ];

  const filteredProjects = activeCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">مشاريعنا المتميزة</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              اكتشف مجموعة من أفضل المشاريع التي نفذناها بنجاح وتميز
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-12 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center space-x-2 space-x-reverse px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  activeCategory === category.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                }`}
              >
                <category.icon className="h-5 w-5" />
                <span>{category.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div 
                key={project.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer"
                onClick={() => setSelectedProject(project.id)}
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                    <Eye className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
                    {project.year}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{project.title}</h3>
                  <p className="text-gray-600 mb-4">{project.description}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-4 w-4" />
                      <span>{project.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Building className="h-4 w-4" />
                      <span>{project.area}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.services.slice(0, 2).map((service, index) => (
                      <span 
                        key={index}
                        className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-xs"
                      >
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
      </section>

      {/* Project Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 left-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors z-10"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              {(() => {
                const project = projects.find(p => p.id === selectedProject);
                if (!project) return null;
                return (
                  <>
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-64 object-cover"
                    />
                    <div className="p-8">
                      <div className="flex items-center justify-between mb-6">
                        <h2 className="text-3xl font-bold text-gray-900">{project.title}</h2>
                        <span className="bg-blue-600 text-white px-4 py-2 rounded-full">{project.year}</span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 mb-4">تفاصيل المشروع</h3>
                          <div className="space-y-3">
                            <div className="flex items-center space-x-3">
                              <MapPin className="h-5 w-5 text-blue-600" />
                              <span className="text-gray-700">{project.location}</span>
                            </div>
                            <div className="flex items-center space-x-3">
                              <Building className="h-5 w-5 text-blue-600" />
                              <span className="text-gray-700">{project.area}</span>
                            </div>
                            <div className="flex items-center space-x-3">
                              <Calendar className="h-5 w-5 text-blue-600" />
                              <span className="text-gray-700">مكتمل في {project.year}</span>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 mb-4">الخدمات المقدمة</h3>
                          <div className="flex flex-wrap gap-2">
                            {project.services.map((service, index) => (
                              <span 
                                key={index}
                                className="bg-blue-100 text-blue-600 px-3 py-2 rounded-lg text-sm"
                              >
                                {service}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-4">وصف المشروع</h3>
                        <p className="text-gray-700 leading-relaxed">{project.details}</p>
                      </div>
                    </div>
                  </>
                );
              })()}
            </div>
          </div>
        </div>
      )}

      {/* Stats */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">إنجازاتنا بالأرقام</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: '250+', label: 'مشروع مكتمل', icon: Building },
              { number: '120+', label: 'عميل راضي', icon: Users },
              { number: '15+', label: 'سنة خبرة', icon: Calendar },
              { number: '35+', label: 'مهندس متخصص', icon: Briefcase }
            ].map((stat, index) => (
              <div key={index} className="text-center relative z-10">
                <div className="relative mx-auto mb-6 w-24 h-24 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl transform hover:scale-110 hover:rotate-6 transition-all duration-500 shadow-xl hover:shadow-2xl flex flex-col items-center justify-center text-white group animate-pulse-glow">
                  {/* Icon */}
                  <stat.icon className="h-6 w-6 mb-1 group-hover:scale-125 transition-transform duration-300 animate-icon-float group-hover:animate-spin" />
                  {/* Number */}
                  <span className="text-lg font-bold">{stat.number}</span>
                  
                  {/* Floating particles effect */}
                  <div className="absolute inset-0 overflow-hidden rounded-2xl">
                    <div className="absolute top-1 right-1 w-1 h-1 bg-white rounded-full opacity-60 animate-ping animation-delay-100"></div>
                    <div className="absolute bottom-1 left-1 w-1.5 h-1.5 bg-yellow-300 rounded-full opacity-80 animate-bounce animation-delay-300"></div>
                    <div className="absolute top-3 left-2 w-1 h-1 bg-yellow-200 rounded-full opacity-70 animate-pulse animation-delay-500"></div>
                    <div className="absolute bottom-3 right-2 w-0.5 h-0.5 bg-white rounded-full opacity-50 animate-ping animation-delay-700"></div>
                  </div>
                  
                  {/* Rotating ring effect */}
                  <div className="absolute inset-0 border-2 border-yellow-400 rounded-2xl opacity-0 group-hover:opacity-30 animate-spin transition-opacity duration-500"></div>
                  <div className="absolute inset-2 border border-white rounded-xl opacity-20 animate-pulse"></div>
                </div>
                <p className="text-gray-700 font-semibold hover:text-blue-600 transition-colors duration-300">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">هل أعجبك ما رأيت؟</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            تواصل معنا لمناقشة مشروعك القادم ولنجعله واقعاً مميزاً
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onNavigate('quote')}
              className="bg-yellow-500 hover:bg-yellow-600 text-black px-10 py-4 rounded-lg font-bold transition-colors duration-300"
            >
              احصل على تسعيرة مجانية
            </button>
            <button
              onClick={() => onNavigate('services')}
              className="border-2 border-white hover:bg-white hover:text-blue-900 px-10 py-4 rounded-lg font-bold transition-all duration-300"
            >
              تعرف على خدماتنا
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProjectsPage;