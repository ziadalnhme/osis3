import React, { useState } from 'react';
import { Building, Hammer, Zap, Settings, Users, FileText, CheckCircle, ArrowLeft } from 'lucide-react';

interface ServicesPageProps {
  onNavigate: (page: string) => void;
}

const ServicesPage: React.FC<ServicesPageProps> = ({ onNavigate }) => {
  const [activeService, setActiveService] = useState(0);

  const services = [
    {
      id: 'architectural',
      icon: Building,
      title: 'التصميم المعماري',
      description: 'تصميم معماري مبتكر يجمع بين الجمالية والوظيفية مع مراعاة البيئة المحلية',
      features: [
        'تصميم المباني السكنية والتجارية',
        'التصميم الداخلي والديكور',
        'تصميم المساجد والمرافق الدينية',
        'تصميم المباني التعليمية والصحية',
        'التصميم البيئي المستدام',
        'إعداد المخططات التنفيذية'
      ],
      details: 'نقدم خدمات التصميم المعماري الشاملة من المفهوم الأولي وحتى المخططات التنفيذية النهائية، مع مراعاة الطابع المعماري المحلي والمتطلبات البيئية والوظيفية للمشروع.'
    },
    {
      id: 'structural',
      icon: Hammer,
      title: 'التصميم الإنشائي',
      description: 'حلول إنشائية متطورة وآمنة لجميع أنواع المباني مع ضمان الجودة والأمان',
      features: [
        'تصميم الهياكل الخرسانية',
        'تصميم الهياكل المعدنية',
        'تحليل الأحمال والإجهادات',
        'مراجعة وتقييم المباني القائمة',
        'تصميم الأساسات العميقة والسطحية',
        'استشارات السلامة الإنشائية'
      ],
      details: 'فريقنا من المهندسين الإنشائيين يستخدم أحدث البرامج والمعايير الدولية لضمان تصميم هياكل آمنة وقوية تتحمل جميع الظروف البيئية والتشغيلية.'
    },
    {
      id: 'mep',
      icon: Zap,
      title: 'أنظمة الكهروميكانيك',
      description: 'تصميم وتنفيذ أنظمة متكاملة للكهرباء والميكانيك وتكييف الهواء',
      features: [
        'أنظمة التكييف والتهوية',
        'الأنظمة الكهربائية والإضاءة',
        'أنظمة السباكة والصرف الصحي',
        'أنظمة الحريق والأمان',
        'أنظمة المصاعد والنقل',
        'أنظمة الطاقة المتجددة'
      ],
      details: 'نصمم أنظمة كهروميكانيكية حديثة وموفرة للطاقة، مع التركيز على الاستدامة البيئية والكفاءة التشغيلية والالتزام بأفضل المعايير الدولية.'
    },
    {
      id: 'project-management',
      icon: Settings,
      title: 'إدارة المشاريع',
      description: 'إدارة احترافية للمشاريع من البداية حتى التسليم مع ضمان الجودة والمواعيد',
      features: [
        'تخطيط وجدولة المشاريع',
        'إدارة المقاولين والموردين',
        'مراقبة الجودة والمواصفات',
        'إدارة الميزانية والتكاليف',
        'تنسيق بين التخصصات المختلفة',
        'إعداد التقارير الدورية'
      ],
      details: 'نوفر خدمات إدارة المشاريع الشاملة باستخدام أحدث الأساليب وأدوات إدارة المشاريع، مما يضمن تنفيذ المشروع في الوقت المحدد وضمن الميزانية المعتمدة.'
    },
    {
      id: 'consulting',
      icon: Users,
      title: 'الاستشارات الفنية',
      description: 'استشارات متخصصة في جميع جوانب المشاريع الهندسية والتطوير العقاري',
      features: [
        'دراسات الجدوى الهندسية',
        'تقييم المشاريع القائمة',
        'استشارات التطوير العقاري',
        'مراجعة المخططات والتصاميم',
        'استشارات الاستدامة البيئية',
        'خدمات التحكيم الهندسي'
      ],
      details: 'نقدم استشارات فنية متخصصة لمساعدة عملائنا في اتخاذ القرارات الصحيحة، من خلال فريق من الخبراء والمتخصصين في مختلف المجالات الهندسية.'
    },
    {
      id: 'documentation',
      icon: FileText,
      title: 'إعداد المستندات',
      description: 'إعداد جميع المستندات والتقارير الفنية المطلوبة للمشاريع',
      features: [
        'إعداد المواصفات الفنية',
        'جداول الكميات والتكاليف',
        'تقارير فحص التربة والمواد',
        'مستندات المناقصات',
        'تقارير التقييم والفحص',
        'شهادات المطابقة والجودة'
      ],
      details: 'نعد جميع المستندات الفنية والإدارية المطلوبة للمشاريع وفقاً للمعايير المحلية والدولية، مما يسهل عمليات الحصول على التراخيص والموافقات.'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">خدماتنا المتميزة</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              نقدم مجموعة شاملة من الخدمات الهندسية المتخصصة لتلبية جميع احتياجات مشاريعكم
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {services.map((service, index) => (
              <div 
                key={service.id}
                className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group ${
                  activeService === index ? 'ring-2 ring-blue-500' : ''
                }`}
                onClick={() => setActiveService(index)}
              >
                <div className="p-8">
                  <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white p-4 rounded-xl inline-block mb-6 group-hover:scale-110 transition-transform duration-300">
                    <service.icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{service.title}</h3>
                  <p className="text-gray-600 leading-relaxed mb-6">{service.description}</p>
                  <div className="flex items-center text-blue-600 font-semibold group-hover:text-blue-800 transition-colors">
                    <span>اقرأ المزيد</span>
                    <ArrowLeft className="h-4 w-4 ml-2 group-hover:-translate-x-1 transition-transform rotate-180" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Details */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-12">
                <div className="flex items-center mb-6">
                  <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white p-4 rounded-xl">
                    {React.createElement(services[activeService].icon, { className: "h-8 w-8" })}
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mr-4">{services[activeService].title}</h2>
                </div>
                <p className="text-gray-700 text-lg leading-relaxed mb-8">
                  {services[activeService].details}
                </p>
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">ما نقدمه:</h3>
                  {services[activeService].features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-12 text-white flex items-center">
                <div>
                  <h3 className="text-2xl font-bold mb-6">هل تحتاج هذه الخدمة؟</h3>
                  <p className="text-blue-100 mb-8 leading-relaxed">
                    تواصل معنا للحصول على استشارة مجانية ومناقشة متطلبات مشروعك
                  </p>
                  <button
                    onClick={() => onNavigate('quote')}
                    className="bg-yellow-500 hover:bg-yellow-600 text-black px-8 py-3 rounded-lg font-semibold transition-colors duration-300"
                  >
                    احصل على تسعيرة مجانية
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">كيف نعمل</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              منهجية عمل متطورة تضمن تقديم أفضل النتائج
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'التحليل والدراسة', description: 'دراسة المشروع وتحليل المتطلبات' },
              { step: '02', title: 'التصميم والتطوير', description: 'إعداد التصاميم والمخططات' },
              { step: '03', title: 'المراجعة والتطوير', description: 'مراجعة التصاميم وتطويرها' },
              { step: '04', title: 'التسليم والمتابعة', description: 'تسليم المشروع والمتابعة' }
            ].map((process, index) => (
              <div key={index} className="text-center">
                <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6 text-xl font-bold">
                  {process.step}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{process.title}</h3>
                <p className="text-gray-600 leading-relaxed">{process.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">جاهز لبدء مشروعك؟</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            تواصل معنا اليوم للحصول على استشارة مجانية ومناقشة تفاصيل مشروعك
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onNavigate('quote')}
              className="bg-yellow-500 hover:bg-yellow-600 text-black px-10 py-4 rounded-lg font-bold transition-colors duration-300"
            >
              احصل على تسعيرة مجانية
            </button>
            <button
              onClick={() => onNavigate('projects')}
              className="border-2 border-white hover:bg-white hover:text-blue-900 px-10 py-4 rounded-lg font-bold transition-all duration-300"
            >
              شاهد أعمالنا
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;