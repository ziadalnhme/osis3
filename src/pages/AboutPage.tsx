import React from 'react';
import { Target, Eye, Award, Users, Calendar, CheckCircle, Building } from 'lucide-react';
import { loadPublicContent } from '../utils/contentManager';

interface AboutPageProps {
  onNavigate: (page: string) => void;
}

const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  // بيانات فريق العمل الافتراضية
  const defaultTeamMembers = [
    {
      id: '1',
      name: 'م. حمزه الحميري',
      position: 'المدير العام',
      experience: '19 سنة خبرة',
 specialization: 'الهندسة المعمارية',
image: 'https://i.postimg.cc/cL7jFsrz/1447-02-24-23-36-51-71b10d02.jpg', // Add a comma here
     },
    {
      id: '2',
      name: 'م. جمال الزوم',
      position: 'مدير التصميم',
      experience: '7 سنة خبرة',
      specialization: 'مهندس معماري',
        image: 'https://i.postimg.cc/X7dxHYXb/1447-02-26-23-07-33-4c24f95f.jpg'
    }, 
    {
      id: '3',
      name: 'م. عبدالفتاح',
      position: 'نزول ميداني',
      experience: '4 سنة خبرة',
      specialization: 'شراف هندسي',
        image: 'https://i.postimg.cc/9M0qvJp9/418931780-2284735175058956-1577529066247557379-n.jpg'
    }, 
    {
      id: '4',
      name: 'م. رشاد الجعفري',
      position: 'مهندس معماري',
      experience: '4 سنة خبرة',
      specialization: 'التصميم الإنشائي',
    image: 'https://i.postimg.cc/x1VMcGfr/1447-02-26-23-07-33-38cfa1ed.jpg'
    }, 
  ];

  // حالة فريق العمل
  const [teamMembers, setTeamMembers] = React.useState(defaultTeamMembers);

  // تحميل بيانات فريق العمل من localStorage
  React.useEffect(() => {
    // تحميل بيانات فريق العمل من localStorage
    const loadTeamData = () => {
      const teamData = localStorage.getItem('content_teamMembers');
      if (teamData) {
        try {
          const parsedData = JSON.parse(teamData);
          if (Array.isArray(parsedData)) {
            setTeamMembers(parsedData);
            console.log('تم تحميل بيانات الفريق من localStorage');
          }
        } catch (error) {
          console.error('خطأ في تحليل بيانات الفريق:', error);
        }
      }
    };

    loadTeamData();

    // مراقبة تحديثات المحتوى
    const handleContentUpdate = (e: CustomEvent) => {
      const { section, data } = e.detail;
      if (section === 'teamMembers') {
        setTeamMembers(data);
        console.log('تم تحديث بيانات الفريق في صفحة حول الشركة');
      }
    };

    const handleAdminContentUpdate = (e: CustomEvent) => {
      handleContentUpdate(e);
    };

    window.addEventListener('contentUpdated', handleContentUpdate as EventListener);
    window.addEventListener('adminContentUpdated', handleContentUpdate as EventListener);

    return () => {
      window.removeEventListener('contentUpdated', handleContentUpdate as EventListener);
      window.removeEventListener('adminContentUpdated', handleContentUpdate as EventListener);
    };
  }, []);

  const values = [
    {
      icon: CheckCircle,
      title: 'الجودة والتميز',
      description: 'نلتزم بأعلى معايير الجودة في جميع مراحل العمل'
    },
    {
      icon: Users,
      title: 'العمل الجماعي',
      description: 'نؤمن بقوة الفريق المتخصص والتعاون البناء'
    },
    {
      icon: Award,
      title: 'الابتكار والإبداع',
      description: 'نسعى دائماً لتقديم حلول مبتكرة ومتطورة'
    },
    {
      icon: Calendar,
      title: 'الالتزام بالمواعيد',
      description: 'نحترم أوقات عملائنا ونلتزم بالجداول الزمنية المحددة'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">حول شركة أسس الأعمار</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              شركة رائدة في مجال الاستشارات الهندسية مع خبرة تزيد عن 15 عاماً في تقديم أفضل الحلول الهندسية المبتكرة
            </p>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">قصتنا</h2>
              <p className="text-gray-700 mb-6 leading-relaxed text-lg">
                تأسست شركة أسس الأعمار للاستشارات الهندسية في عام 2008 بهدف تقديم خدمات هندسية متميزة ومبتكرة. 
                بدأت رحلتنا بفريق صغير من المهندسين المتخصصين، ونمونا لنصبح واحدة من الشركات الرائدة في المملكة.
              </p>
              <p className="text-gray-700 mb-6 leading-relaxed text-lg">
                على مدار السنوات، نجحنا في تنفيذ أكثر من 150 مشروعاً متنوعاً، من المباني السكنية والتجارية إلى 
                المرافق الصناعية والتعليمية، مما جعلنا شريكاً موثوقاً لعملائنا.
              </p>
              <button
                onClick={() => onNavigate('services')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-300"
              >
                اطلع على خدماتنا
              </button>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl">
              <div className="grid grid-cols-2 gap-6">
                {[
                  { number: '2008', label: 'سنة التأسيس', icon: Calendar },
                  { number: '250+', label: 'مشروع مكتمل', icon: Building },
                  { number: '35+', label: 'مهندس متخصص', icon: Users },
                  { number: '120+', label: 'عميل راضي', icon: Award }
                ].map((stat, index) => (
                <div key={index} className="text-center relative z-10">
                  <div className="relative mx-auto mb-4 w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl transform hover:scale-110 hover:rotate-6 transition-all duration-500 shadow-xl hover:shadow-2xl flex flex-col items-center justify-center text-white group animate-pulse-glow">
                    {/* Icon */}
                    <stat.icon className="h-4 w-4 mb-1 group-hover:scale-125 transition-transform duration-300 animate-icon-float" />
                    {/* Number */}
                    <span className="text-sm font-bold">{stat.number}</span>
                    
                    {/* Floating particles effect */}
                    <div className="absolute inset-0 overflow-hidden rounded-2xl">
                      <div className="absolute top-1 right-1 w-0.5 h-0.5 bg-white rounded-full opacity-60 animate-ping animation-delay-100"></div>
                      <div className="absolute bottom-1 left-1 w-1 h-1 bg-yellow-300 rounded-full opacity-80 animate-bounce animation-delay-300"></div>
                      <div className="absolute top-2 left-1 w-0.5 h-0.5 bg-yellow-200 rounded-full opacity-70 animate-pulse animation-delay-500"></div>
                    </div>
                    
                    {/* Rotating ring effect */}
                    <div className="absolute inset-0 border border-yellow-400 rounded-2xl opacity-0 group-hover:opacity-30 animate-spin transition-opacity duration-500"></div>
                  </div>
                  <div className="text-gray-700 text-sm font-semibold hover:text-blue-600 transition-colors duration-300">{stat.label}</div>
                </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">رؤيتنا ورسالتنا وأهدافنا</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              القيم والمبادئ التي توجه مسيرتنا نحو التميز والريادة
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Vision */}
            <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
              <div className="bg-blue-600 text-white p-4 rounded-full inline-block mb-6">
                <Eye className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">رؤيتنا</h3>
              <p className="text-gray-700 leading-relaxed">
                أن نكون الشركة الرائدة في مجال الاستشارات الهندسية في المملكة العربية السعودية، 
                ونساهم في تشييد مستقبل مستدام ومبتكر للأجيال القادمة.
              </p>
            </div>

            {/* Mission */}
            <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
              <div className="bg-yellow-500 text-white p-4 rounded-full inline-block mb-6">
                <Target className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">رسالتنا</h3>
              <p className="text-gray-700 leading-relaxed">
                تقديم استشارات هندسية متميزة وحلول مبتكرة تلبي احتياجات عملائنا، 
                مع الالتزام بأعلى معايير الجودة والاستدامة والأمان في جميع مشاريعنا.
              </p>
            </div>

            {/* Goals */}
            <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
              <div className="bg-purple-600 text-white p-4 rounded-full inline-block mb-6">
                <Award className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">أهدافنا</h3>
              <p className="text-gray-700 leading-relaxed">
                تحقيق الريادة في السوق السعودي، وتطوير قدرات فريق العمل باستمرار، 
                وتقديم حلول مبتكرة تواكب التطورات العالمية، والمساهمة في رؤية المملكة 2030.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">قيمنا</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              القيم التي توجه عملنا وتحدد هويتنا المؤسسية
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div 
                key={index}
                className="text-center group hover:transform hover:-translate-y-2 transition-all duration-300"
              >
                <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white p-4 rounded-full inline-block mb-6 group-hover:scale-110 transition-transform duration-300">
                  <value.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">فريق العمل</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              مجموعة من أفضل المهندسين المتخصصين ذوي الخبرة والكفاءة العالية
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div 
                key={index}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="bg-gradient-to-br from-blue-600 to-blue-800 h-32 relative overflow-hidden">
                  {member.image ? (
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-600 to-blue-800"></div>
                  )}
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                  <p className="text-blue-600 font-semibold mb-1">{member.position}</p>
                  <p className="text-gray-600 text-sm mb-2">{member.experience}</p>
                  <p className="text-gray-700 text-sm">{member.specialization}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">هل تريد معرفة المزيد؟</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            تواصل معنا للحصول على مزيد من المعلومات حول خدماتنا ومشاريعنا
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onNavigate('quote')}
              className="bg-yellow-500 hover:bg-yellow-600 text-black px-8 py-3 rounded-lg font-semibold transition-colors duration-300"
            >
              احصل على تسعيرة مجانية
            </button>
            <button
              onClick={() => onNavigate('services')}
              className="border-2 border-white hover:bg-white hover:text-blue-900 px-8 py-3 rounded-lg font-semibold transition-all duration-300"
            >
              اطلع على خدماتنا
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
