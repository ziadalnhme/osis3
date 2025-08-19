import React, { useState } from 'react';
import { Shield, User, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { login } from '../utils/adminAuth';

interface AdminLoginProps {
  onNavigate: (page: string) => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onNavigate }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError(''); // مسح الخطأ عند الكتابة
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // محاكاة تأخير الشبكة
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const success = login(formData.username, formData.password);
      
      if (success) {
        onNavigate('admin');
      } else {
        setError('اسم المستخدم أو كلمة المرور غير صحيحة');
      }
    } catch (err) {
      setError('حدث خطأ أثناء تسجيل الدخول');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="bg-white p-4 rounded-full inline-block mb-4 shadow-lg">
            <Shield className="h-12 w-12 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">تسجيل الدخول</h1>
          <p className="text-blue-100">أسس الأعمار للاستشارات الهندسية</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center space-x-3">
                <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                <span className="text-red-700 text-sm">{error}</span>
              </div>
            )}

            {/* Username Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                اسم المستخدم
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="username"
                  required
                  value={formData.username}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-12"
                  placeholder="أدخل اسم المستخدم"
                />
                <User className="absolute right-4 top-3.5 h-5 w-5 text-gray-400" />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                كلمة المرور
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-12 pl-12"
                  placeholder="أدخل كلمة المرور"
                />
                <Lock className="absolute right-4 top-3.5 h-5 w-5 text-gray-400" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-4 top-3.5 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-3 px-4 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>جاري تسجيل الدخول...</span>
                </>
              ) : (
                <>
                  <Shield className="h-5 w-5" />
                  <span>تسجيل الدخول</span>
                </>
              )}
            </button>
          </form>


          {/* Back to Site */}
          <div className="mt-6 text-center">
            <button
              onClick={() => onNavigate('home')}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
            >
              العودة إلى الموقع
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-blue-100 text-sm">
            © 2024 أسس الأعمار للاستشارات الهندسية
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
