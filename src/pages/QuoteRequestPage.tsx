import React, { useState } from 'react';
import { Calculator, FileText, Building, MapPin, Phone, Mail, User, Upload, CheckCircle } from 'lucide-react';

interface QuoteRequestPageProps {
  onNavigate: (page: string) => void;
}

const QuoteRequestPage: React.FC<QuoteRequestPageProps> = ({ onNavigate }) => {
  const [formData, setFormData] = useState({
    // بيانات العميل
    clientName: '',
    email: '',
    phone: '',
    city: '',
    
    // بيانات المشروع
    projectType: '',
    projectLocation: '',
    plotArea: '',
    buildingArea: '',
    floors: '',
    rooms: '',
    bathrooms: '',
    majlis: '',
    kitchen: '',
    livingRoom: '',
    diningRoom: '',
    maidRoom: '',
    driverRoom: '',
    garage: '',
    garden: '',
    pool: '',
    basement: '',
    elevator: '',
    
    // الخدمات المطلوبة
    architecturalDesign: false,
    structuralDesign: false,
    mepDesign: false,
    interiorDesign: false,
    landscapeDesign: false,
    projectManagement: false,
    
    // معلومات إضافية
    budget: '',
    timeline: '',
    additionalNotes: '',
    
    // الملفات
    hasFiles: false
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // حفظ طلب التسعيرة في localStorage
    const quoteRequest = {
      id: Date.now(),
      type: 'quote',
      name: formData.clientName,
      email: formData.email,
      phone: formData.phone,
      subject: `طلب تسعيرة - ${formData.projectType}`,
      message: `تفاصيل المشروع:
نوع المشروع: ${formData.projectType}
موقع المشروع: ${formData.projectLocation}
مساحة الأرض: ${formData.plotArea} م²
مساحة البناء: ${formData.buildingArea} م²
عدد الأدوار: ${formData.floors}
عدد الغرف: ${formData.rooms}
عدد دورات المياه: ${formData.bathrooms}
المجلس: ${formData.majlis}
المطبخ: ${formData.kitchen}
غرفة المعيشة: ${formData.livingRoom}
غرفة الطعام: ${formData.diningRoom}
غرفة الخادمة: ${formData.maidRoom}
غرفة السائق: ${formData.driverRoom}
الجراج: ${formData.garage}
الحديقة: ${formData.garden}
المسبح: ${formData.pool}
البدروم: ${formData.basement}
المصعد: ${formData.elevator}

الخدمات المطلوبة:
${formData.architecturalDesign ? '✓ التصميم المعماري' : ''}
${formData.structuralDesign ? '✓ التصميم الإنشائي' : ''}
${formData.mepDesign ? '✓ أنظمة الكهروميكانيك' : ''}
${formData.interiorDesign ? '✓ التصميم الداخلي' : ''}
${formData.landscapeDesign ? '✓ تنسيق الحدائق' : ''}
${formData.projectManagement ? '✓ إدارة المشروع' : ''}

الميزانية المتوقعة: ${formData.budget}
الإطار الزمني: ${formData.timeline}
ملاحظات إضافية: ${formData.additionalNotes}
لديه ملفات: ${formData.hasFiles ? 'نعم' : 'لا'}`,
      date: new Date().toLocaleDateString('ar-SA'),
      status: 'new',
      city: formData.city,
      projectDetails: {
        projectType: formData.projectType,
        projectLocation: formData.projectLocation,
        plotArea: formData.plotArea,
        buildingArea: formData.buildingArea,
        floors: formData.floors,
        rooms: formData.rooms,
        bathrooms: formData.bathrooms,
        services: {
          architecturalDesign: formData.architecturalDesign,
          structuralDesign: formData.structuralDesign,
          mepDesign: formData.mepDesign,
          interiorDesign: formData.interiorDesign,
          landscapeDesign: formData.landscapeDesign,
          projectManagement: formData.projectManagement
        },
        budget: formData.budget,
        timeline: formData.timeline,
        hasFiles: formData.hasFiles
      }
    };

    // حفظ في localStorage
    const existingMessages = JSON.parse(localStorage.getItem('adminMessages') || '[]');
    existingMessages.unshift(quoteRequest);
    localStorage.setItem('adminMessages', JSON.stringify(existingMessages));

    console.log('تم حفظ طلب التسعيرة:', quoteRequest);
    
    // محاكاة إرسال البيانات
    setIsSubmitted(true);
    
    // إعادة تعيين النموذج
    setFormData({
      clientName: '',
      email: '',
      phone: '',
      city: '',
      projectType: '',
      projectLocation: '',
      plotArea: '',
      buildingArea: '',
      floors: '',
      rooms: '',
      bathrooms: '',
      majlis: '',
      kitchen: '',
      livingRoom: '',
      diningRoom: '',
      maidRoom: '',
      driverRoom: '',
      garage: '',
      garden: '',
      pool: '',
      basement: '',
      elevator: '',
      architecturalDesign: false,
      structuralDesign: false,
      mepDesign: false,
      interiorDesign: false,
      landscapeDesign: false,
      projectManagement: false,
      budget: '',
      timeline: '',
      additionalNotes: '',
      hasFiles: false
    });
    
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const projectTypes = [
    'فيلا سكنية',
    'عمارة سكنية',
    'مبنى تجاري',
    'مبنى إداري',
    'مدرسة',
    'مستشفى أو عيادة',
    'مسجد',
    'مصنع أو مستودع',
    'استراحة',
    'مزرعة',
    'أخرى'
  ];

  const cities = [
    'الرياض',
    'جدة',
    'مكة المكرمة',
    'المدينة المنورة',
    'الدمام',
    'الخبر',
    'الظهران',
    'الطائف',
    'بريدة',
    'تبوك',
    'خميس مشيط',
    'حائل',
    'الجبيل',
    'ينبع',
    'نجران',
    'الباحة',
    'عرعر',
    'سكاكا',
    'جازان',
    'أبها',
    'أخرى'
  ];

  const budgetRanges = [
    'أقل من 100,000 ريال',
    '100,000 - 250,000 ريال',
    '250,000 - 500,000 ريال',
    '500,000 - 1,000,000 ريال',
    '1,000,000 - 2,000,000 ريال',
    'أكثر من 2,000,000 ريال',
    'غير محدد'
  ];

  const timelineOptions = [
    'أقل من 3 أشهر',
    '3 - 6 أشهر',
    '6 - 12 شهر',
    'أكثر من سنة',
    'غير محدد'
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Calculator className="h-16 w-16 text-yellow-400 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">طلب تسعيرة</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              املأ النموذج وسيتم حفظ بياناتك بأمان لمراجعتها وإرسال التسعيرة
            </p>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {isSubmitted ? (
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
              <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-gray-900 mb-4">تم حفظ طلبك بنجاح!</h2>
              <p className="text-xl text-gray-600 mb-8">
                تم حفظ بياناتك بأمان وسنقوم بمراجعة طلبك وإرسال التسعيرة المفصلة خلال 24 ساعة
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => onNavigate('home')}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-300"
                >
                  العودة للرئيسية
                </button>
                <button
                  onClick={() => onNavigate('contact')}
                  className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300"
                >
                  تواصل معنا
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-8">
                <h2 className="text-2xl font-bold mb-4">نموذج طلب التسعيرة</h2>
                <p className="text-blue-100">
                  يرجى ملء جميع البيانات المطلوبة وسنتواصل معك قريباً
                </p>
              </div>

              <form onSubmit={handleSubmit} className="p-8 space-y-8">
                {/* بيانات العميل */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                    <User className="h-6 w-6 text-blue-600 ml-2" />
                    بيانات العميل
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        الاسم الكامل *
                      </label>
                      <input
                        type="text"
                        name="clientName"
                        required
                        value={formData.clientName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="أدخل اسمك الكامل"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        البريد الإلكتروني *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="your-email@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        رقم الهاتف *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="+966 5X XXX XXXX"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        المدينة *
                      </label>
                      <select
                        name="city"
                        required
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">اختر المدينة</option>
                        {cities.map((city, index) => (
                          <option key={index} value={city}>{city}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* بيانات المشروع */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                    <Building className="h-6 w-6 text-blue-600 ml-2" />
                    بيانات المشروع
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        نوع المشروع *
                      </label>
                      <select
                        name="projectType"
                        required
                        value={formData.projectType}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">اختر نوع المشروع</option>
                        {projectTypes.map((type, index) => (
                          <option key={index} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        موقع المشروع
                      </label>
                      <input
                        type="text"
                        name="projectLocation"
                        value={formData.projectLocation}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="الحي أو المنطقة"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        مساحة الأرض (م²) *
                      </label>
                      <input
                        type="number"
                        name="plotArea"
                        required
                        value={formData.plotArea}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="مثال: 600"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        مساحة البناء المطلوبة (م²)
                      </label>
                      <input
                        type="number"
                        name="buildingArea"
                        value={formData.buildingArea}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="مثال: 400"
                      />
                    </div>
                  </div>
                </div>

                {/* تفاصيل المبنى */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-6">تفاصيل المبنى</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        عدد الأدوار
                      </label>
                      <select
                        name="floors"
                        value={formData.floors}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">اختر</option>
                        <option value="1">دور واحد</option>
                        <option value="2">دورين</option>
                        <option value="3">ثلاثة أدوار</option>
                        <option value="4+">أكثر من 3 أدوار</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        عدد الغرف
                      </label>
                      <select
                        name="rooms"
                        value={formData.rooms}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">اختر</option>
                        <option value="2">2 غرف</option>
                        <option value="3">3 غرف</option>
                        <option value="4">4 غرف</option>
                        <option value="5">5 غرف</option>
                        <option value="6+">أكثر من 5 غرف</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        عدد دورات المياه
                      </label>
                      <select
                        name="bathrooms"
                        value={formData.bathrooms}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">اختر</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6+">أكثر من 5</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        المجلس
                      </label>
                      <select
                        name="majlis"
                        value={formData.majlis}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">اختر</option>
                        <option value="رجال">مجلس رجال</option>
                        <option value="نساء">مجلس نساء</option>
                        <option value="مشترك">مجلس مشترك</option>
                        <option value="اثنين">مجلسين منفصلين</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
                    {[
                      { name: 'kitchen', label: 'المطبخ' },
                      { name: 'livingRoom', label: 'غرفة المعيشة' },
                      { name: 'diningRoom', label: 'غرفة الطعام' },
                      { name: 'maidRoom', label: 'غرفة الخادمة' },
                      { name: 'driverRoom', label: 'غرفة السائق' },
                      { name: 'garage', label: 'الجراج' },
                      { name: 'garden', label: 'الحديقة' },
                      { name: 'pool', label: 'المسبح' },
                      { name: 'basement', label: 'البدروم' },
                      { name: 'elevator', label: 'المصعد' }
                    ].map((item) => (
                      <div key={item.name}>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {item.label}
                        </label>
                        <select
                          name={item.name}
                          value={formData[item.name as keyof typeof formData] as string}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="">اختر</option>
                          <option value="نعم">نعم</option>
                          <option value="لا">لا</option>
                        </select>
                      </div>
                    ))}
                  </div>
                </div>

                {/* الخدمات المطلوبة */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                    <FileText className="h-6 w-6 text-blue-600 ml-2" />
                    الخدمات المطلوبة
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { name: 'architecturalDesign', label: 'التصميم المعماري' },
                      { name: 'structuralDesign', label: 'التصميم الإنشائي' },
                      { name: 'mepDesign', label: 'أنظمة الكهروميكانيك' },
                      { name: 'interiorDesign', label: 'التصميم الداخلي' },
                      { name: 'landscapeDesign', label: 'تنسيق الحدائق' },
                      { name: 'projectManagement', label: 'إدارة المشروع' }
                    ].map((service) => (
                      <label key={service.name} className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                        <input
                          type="checkbox"
                          name={service.name}
                          checked={formData[service.name as keyof typeof formData] as boolean}
                          onChange={handleInputChange}
                          className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <span className="text-gray-700 font-medium">{service.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* معلومات إضافية */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-6">معلومات إضافية</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        الميزانية المتوقعة
                      </label>
                      <select
                        name="budget"
                        value={formData.budget}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">اختر الميزانية</option>
                        {budgetRanges.map((range, index) => (
                          <option key={index} value={range}>{range}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        الإطار الزمني المطلوب
                      </label>
                      <select
                        name="timeline"
                        value={formData.timeline}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">اختر الإطار الزمني</option>
                        {timelineOptions.map((option, index) => (
                          <option key={index} value={option}>{option}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      ملاحظات إضافية أو متطلبات خاصة
                    </label>
                    <textarea
                      name="additionalNotes"
                      value={formData.additionalNotes}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="اكتب أي متطلبات خاصة أو ملاحظات إضافية..."
                    />
                  </div>

                  <div className="mt-6">
                    <label className="flex items-center space-x-3 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 cursor-pointer">
                      <input
                        type="checkbox"
                        name="hasFiles"
                        checked={formData.hasFiles}
                        onChange={handleInputChange}
                        className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <Upload className="h-6 w-6 text-gray-400" />
                      <div>
                        <span className="text-gray-700 font-medium">لدي ملفات أو مخططات أريد إرفاقها</span>
                        <p className="text-sm text-gray-500">سنتواصل معك لاستلام الملفات</p>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-6 border-t border-gray-200">
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300"
                  >
                    إرسال طلب التسعيرة
                  </button>
                  <p className="text-center text-sm text-gray-500 mt-4">
                    سنتواصل معك خلال 24 ساعة لإرسال التسعيرة المفصلة
                  </p>
                </div>
              </form>
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">لماذا تختار تسعيرتنا؟</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              نقدم تسعيرة شفافة ومفصلة تساعدك في اتخاذ القرار الصحيح
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: CheckCircle,
                title: 'استجابة سريعة',
                description: 'نتواصل معك خلال 24 ساعة من إرسال الطلب'
              },
              {
                icon: FileText,
                title: 'تفاصيل شاملة',
                description: 'تسعيرة مفصلة تشمل جميع بنود المشروع'
              },
              {
                icon: User,
                title: 'خدمة شخصية',
                description: 'فريق متخصص لمتابعة طلبك والرد على استفساراتك'
              }
            ].map((feature, index) => (
              <div key={index} className="text-center p-6">
                <div className="bg-blue-100 text-blue-600 p-4 rounded-full inline-block mb-6">
                  <feature.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default QuoteRequestPage;