// إعدادات EmailJS
import emailjs from '@emailjs/browser';

// تهيئة EmailJS
export const initializeEmailJS = () => {
  emailjs.init('J4MJpzcj1e8et712A');
};

// إعدادات الخدمة
export const EMAIL_CONFIG = {
  SERVICE_ID: 'osis2030',
  QUOTE_TEMPLATE_ID: 'template_925igx6',
  CONTACT_TEMPLATE_ID: 'template_contact_form',
  PUBLIC_KEY: 'J4MJpzcj1e8et712A'
};

// دالة إرسال طلب التسعيرة
export const sendQuoteRequest = async (formData: any) => {
  const templateParams = {
    to_email: 'dara2030.sa@gmail.com',
    client_name: formData.clientName,
    client_email: formData.email,
    client_phone: formData.phone,
    client_city: formData.city,
    project_type: formData.projectType,
    project_location: formData.projectLocation,
    plot_area: formData.plotArea,
    building_area: formData.buildingArea,
    floors: formData.floors,
    rooms: formData.rooms,
    bathrooms: formData.bathrooms,
    majlis: formData.majlis,
    kitchen: formData.kitchen,
    living_room: formData.livingRoom,
    dining_room: formData.diningRoom,
    maid_room: formData.maidRoom,
    driver_room: formData.driverRoom,
    garage: formData.garage,
    garden: formData.garden,
    pool: formData.pool,
    basement: formData.basement,
    elevator: formData.elevator,
    architectural_design: formData.architecturalDesign ? 'نعم' : 'لا',
    structural_design: formData.structuralDesign ? 'نعم' : 'لا',
    mep_design: formData.mepDesign ? 'نعم' : 'لا',
    interior_design: formData.interiorDesign ? 'نعم' : 'لا',
    landscape_design: formData.landscapeDesign ? 'نعم' : 'لا',
    project_management: formData.projectManagement ? 'نعم' : 'لا',
    budget: formData.budget,
    timeline: formData.timeline,
    additional_notes: formData.additionalNotes,
    has_files: formData.hasFiles ? 'نعم' : 'لا',
    submission_date: new Date().toLocaleDateString('ar-SA'),
    submission_time: new Date().toLocaleTimeString('ar-SA')
  };

  return emailjs.send(
    EMAIL_CONFIG.SERVICE_ID,
    EMAIL_CONFIG.QUOTE_TEMPLATE_ID,
    templateParams,
    EMAIL_CONFIG.PUBLIC_KEY
  );
};

// دالة إرسال رسالة التواصل
export const sendContactMessage = async (formData: any) => {
  const templateParams = {
    to_email: 'dara2030.sa@gmail.com',
    client_name: formData.name,
    client_email: formData.email,
    client_phone: formData.phone,
    project_type: formData.projectType,
    subject: formData.subject,
    message: formData.message,
    submission_date: new Date().toLocaleDateString('ar-SA'),
    submission_time: new Date().toLocaleTimeString('ar-SA')
  };

  return emailjs.send(
    EMAIL_CONFIG.SERVICE_ID,
    EMAIL_CONFIG.CONTACT_TEMPLATE_ID,
    templateParams,
    EMAIL_CONFIG.PUBLIC_KEY
  );
};