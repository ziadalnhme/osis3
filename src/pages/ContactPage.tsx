import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, User, MessageSquare, Building, CheckCircle, MessageCircle, QrCode } from 'lucide-react';

interface ContactPageProps {
  onNavigate: (page: string) => void;
}

const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    projectType: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // حفظ رسالة التواصل في localStorage
    const contactMessage = {
      id: Date.now(),
      type: 'contact',
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      subject: formData.subject,
      message: formData.message,
      date: new Date().toLocaleDateString('ar-SA'),
      status: 'new',
      projectType: formData.projectType
    };

    // حفظ في localStorage
    const existingMessages = JSON.parse(localStorage.getItem('adminMessages') || '[]');
    existingMessages.unshift(contactMessage);
    localStorage.setItem('adminMessages', JSON.stringify(existingMessages));

    console.log('تم حفظ رسالة التواصل:', contactMessage);
    
    // محاكاة إرسال الرسالة
    setIsSubmitted(true);
    
    // إعادة تعيين النموذج
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
      projectType: ''
    });
    
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'الهاتف',
      details: ['+966 55 929 9897', 'واتساب متاح'],
      color: 'text-blue-600'
    },
    {
      icon: Mail,
      title: 'البريد الإلكتروني',
      details: ['info@osos-imar.com', 'projects@osos-imar.com'],
      color: 'text-green-600'
    },
    {
      icon: MapPin,
      title: 'العنوان',
      details: ['حي المنار، شارع الملك فهد طريق المطار', 'جوار مطعم البيك، الدمام 32273'],
      color: 'text-red-600'
    },
    {
      icon: Clock,
      title: 'ساعات العمل',
      details: ['السبت - الخميس: 8:00 ص - 12:00 م', 'و 4:00 م - 8:00 م'],
      color: 'text-purple-600'
    }
  ];

  const projectTypes = [
    'مبنى سكني',
    'مبنى تجاري',
    'مبنى إداري',
    'مدرسة أو جامعة',
    'مستشفى أو عيادة',
    'مصنع أو مستودع',
    'فيلا خاصة',
    'استشارة عامة'
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">تواصل معنا</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              نحن هنا لمساعدتك في تحويل أفكارك إلى مشاريع واقعية ومميزة
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">أرسل لنا رسالة</h2>
              {isSubmitted ? (
                <div className="text-center py-12">
                  <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">تم إرسال رسالتك بنجاح!</h3>
                  <p className="text-gray-600">شكراً لتواصلك معنا، سنرد عليك قريباً</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        الاسم الكامل *
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10"
                          placeholder="أدخل اسمك الكامل"
                        />
                        <User className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        رقم الهاتف *
                      </label>
                      <div className="relative">
                        <input
                          type="tel"
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10"
                          placeholder="+966 5X XXX XXXX"
                        />
                        <Phone className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      البريد الإلكتروني *
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10"
                        placeholder="your-email@example.com"
                      />
                      <Mail className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      نوع المشروع
                    </label>
                    <div className="relative">
                      <select
                        name="projectType"
                        value={formData.projectType}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10"
                      >
                        <option value="">اختر نوع المشروع</option>
                        {projectTypes.map((type, index) => (
                          <option key={index} value={type}>{type}</option>
                        ))}
                      </select>
                      <Building className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      موضوع الرسالة *
                    </label>
                    <input
                      type="text"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="ما هو موضوع استفسارك؟"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      تفاصيل المشروع / الرسالة *
                    </label>
                    <div className="relative">
                      <textarea
                        name="message"
                        required
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={6}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10"
                        placeholder="اكتب تفاصيل مشروعك أو رسالتك هنا..."
                      />
                      <MessageSquare className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors duration-300"
                  >
                    إرسال الرسالة
                  </button>
                </form>
              )}
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">معلومات الاتصال</h2>
                <p className="text-gray-600 leading-relaxed mb-8">
                  نحن متاحون دائماً للرد على استفساراتكم وتقديم المساعدة اللازمة. 
                  لا تترددوا في التواصل معنا بأي طريقة تناسبكم.
                </p>
              </div>

              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="bg-white rounded-xl p-6 shadow-lg">
                    <div className="flex items-start space-x-4">
                      <div className={`${info.color} p-3 rounded-lg bg-gray-50`}>
                        <info.icon className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{info.title}</h3>
                        {info.title === 'الهاتف' ? (
                          <div className="space-y-2">
                            <div className="flex items-center space-x-3">
                              <span className="text-gray-600">{info.details[0]}</span>
                              <a 
                                href="https://wa.me/966559299897" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-green-600 hover:text-green-700 transition-colors"
                                title="تواصل عبر الواتساب"
                              >
                                <MessageCircle className="h-5 w-5" />
                              </a>
                            </div>
                            <p className="text-gray-500 text-sm">{info.details[1]}</p>
                          </div>
                        ) : (
                          info.details.map((detail, idx) => (
                            <p key={idx} className="text-gray-600 leading-relaxed">
                              {detail}
                            </p>
                          ))
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Actions */}
              <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white rounded-xl p-6">
                <h3 className="text-xl font-bold mb-4">استشارة مجانية</h3>
                <p className="text-blue-100 mb-6">
                  احصل على استشارة مجانية لمشروعك واكتشف كيف يمكننا مساعدتك
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => window.open('tel:+966559299897')}
                    className="bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-3 rounded-lg font-semibold transition-colors duration-300 flex items-center justify-center space-x-2"
                  >
                    <Phone className="h-5 w-5" />
                    <span>اتصل بنا الآن</span>
                  </button>
                  <button
                    onClick={() => window.open('https://wa.me/966559299897')}
                    className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300 flex items-center justify-center space-x-2"
                  >
                    <MessageCircle className="h-5 w-5" />
                    <span>واتساب</span>
                  </button>
                </div>
              </div>

              {/* QR Code */}
              <div className="bg-white rounded-xl p-6 shadow-lg text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center justify-center space-x-2">
                  <QrCode className="h-6 w-6 text-blue-600" />
                  <span>باركود الواتساب</span>
                </h3>
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <img 
                    src="/باركود copy.png" 
                    alt="باركود الواتساب" 
                    className="w-32 h-32 mx-auto object-contain"
                  />
                </div>
                <p className="text-gray-600 text-sm">
                  امسح الباركود للتواصل المباشر عبر الواتساب
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">موقعنا</h2>
            <p className="text-xl text-gray-600">تفضل بزيارتنا في مقرنا الرئيسي</p>
          </div>
          <div className="bg-gray-200 rounded-2xl h-96 flex items-center justify-center">
            <div className="text-center cursor-pointer" onClick={() => window.open('https://maps.app.goo.gl/q3E3nxtTZpsv82S5A', '_blank')}>
              <MapPin className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">خريطة الموقع</h3>
              <p className="text-gray-600 mb-2">حي المنار، شارع الملك فهد طريق المطار</p>
              <p className="text-gray-600 mb-4">جوار مطعم البيك، الدمام 32273</p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors duration-300">
                عرض على الخريطة
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">الأسئلة الشائعة</h2>
            <p className="text-xl text-gray-600">إجابات سريعة على أكثر الأسئلة شيوعاً</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                question: 'ما هي مدة تنفيذ المشروع؟',
                answer: 'تختلف مدة التنفيذ حسب نوع وحجم المشروع، لكن عادة ما تتراوح بين 3-12 شهر.'
              },
              {
                question: 'هل تقدمون استشارة مجانية؟',
                answer: 'نعم، نقدم استشارة مجانية أولية لمناقشة فكرة مشروعكم وتقديم النصائح الأساسية.'
              },
              {
                question: 'ما هي تكلفة الخدمات؟',
                answer: 'تحدد التكلفة حسب نوع المشروع ومتطلباته. نقدم عروض أسعار مفصلة بعد دراسة المشروع.'
              },
              {
                question: 'هل تعملون خارج الرياض؟',
                answer: 'نعم، نقدم خدماتنا في جميع أنحاء المملكة العربية السعودية.'
              }
            ].map((faq, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{faq.question}</h3>
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;