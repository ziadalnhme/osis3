import React, { useState } from 'react';
import { LanguageProvider } from './contexts/LanguageContext';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import ProjectsPage from './pages/ProjectsPage';
import ContactPage from './pages/ContactPage';
import QuoteRequestPage from './pages/QuoteRequestPage';
import AdminDashboard from './pages/AdminDashboard';
import AdminLogin from './pages/AdminLogin';
import { isLoggedIn } from './utils/adminAuth';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={setCurrentPage} />;
      case 'about':
        return <AboutPage onNavigate={setCurrentPage} />;
      case 'services':
        return <ServicesPage onNavigate={setCurrentPage} />;
      case 'projects':
        return <ProjectsPage onNavigate={setCurrentPage} />;
      case 'contact':
        return <ContactPage onNavigate={setCurrentPage} />;
      case 'quote':
        return <QuoteRequestPage onNavigate={setCurrentPage} />;
      case 'admin':
        return isLoggedIn() ? <AdminDashboard onNavigate={setCurrentPage} /> : <AdminLogin onNavigate={setCurrentPage} />;
      default:
        return <HomePage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-white font-arabic text-sm" style={{ fontFamily: 'Noor, Arial, sans-serif', fontWeight: 400 }}>
        <Header currentPage={currentPage} onNavigate={setCurrentPage} />
        <main>
          {renderPage()}
        </main>
        <Footer onNavigate={setCurrentPage} />
      </div>
    </LanguageProvider>
  );
}

export default App;