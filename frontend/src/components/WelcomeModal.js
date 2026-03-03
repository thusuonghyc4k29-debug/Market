import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { Globe, Cookie } from 'lucide-react';

const WelcomeModal = () => {
  const { changeLanguage } = useLanguage();
  const { user, loading } = useAuth();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState('ua');

  useEffect(() => {
    // Check if already completed - FIRST priority
    const welcomeCompleted = localStorage.getItem('welcomeCompleted');
    if (welcomeCompleted === 'true') {
      setIsOpen(false);
      return;
    }
    
    // NEVER show modal on admin or login routes
    const pathname = location.pathname;
    if (pathname.startsWith('/admin') || pathname === '/login' || pathname === '/register') {
      setIsOpen(false);
      return;
    }
    
    // Wait for auth to load before deciding
    if (loading) {
      return;
    }
    
    // NEVER show modal for authenticated users
    if (user) {
      setIsOpen(false);
      return;
    }
    
    // For guests: show once per session (if not completed)
    const welcomeShownThisSession = sessionStorage.getItem('welcome_shown');
    
    if (!welcomeShownThisSession) {
      setIsOpen(true);
      sessionStorage.setItem('welcome_shown', '1');
      setSelectedLang('ua');
      changeLanguage('ua');
    }
  }, [user, loading, location.pathname, changeLanguage]);

  const handleLanguageSelect = (lang) => {
    setSelectedLang(lang);
    changeLanguage(lang);
  };

  const handleAccept = () => {
    localStorage.setItem('welcomeCompleted', 'true');
    localStorage.setItem('cookieConsent', 'accepted');
    localStorage.setItem('languageSelected', 'true');
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden animate-in zoom-in duration-500">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-5 text-center">
          <h2 className="text-2xl font-bold text-white flex items-center justify-center gap-2">
            <Globe className="w-6 h-6" />
            {selectedLang === 'ua' ? 'Ласкаво просимо!' : 'Добро пожаловать!'}
          </h2>
        </div>

        {/* Language Selection */}
        <div className="p-6 pb-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <Globe className="w-4 h-4 text-blue-600" />
            {selectedLang === 'ua' ? 'Оберіть мову' : 'Выберите язык'}
          </h3>
          <div className="flex gap-3">
            {/* Ukrainian Button */}
            <button
              onClick={() => handleLanguageSelect('ua')}
              className={`flex-1 relative overflow-hidden rounded-lg p-3 border-2 transition-all duration-300 hover:scale-105 ${
                selectedLang === 'ua'
                  ? 'border-blue-600 bg-blue-50 shadow-md'
                  : 'border-gray-200 bg-white hover:border-blue-300'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <span className="text-2xl">🇺🇦</span>
                <span className={`font-semibold ${selectedLang === 'ua' ? 'text-blue-700' : 'text-gray-700'}`}>
                  UA
                </span>
              </div>
              {selectedLang === 'ua' && (
                <div className="absolute top-1 right-1 w-2 h-2 bg-blue-600 rounded-full"></div>
              )}
            </button>

            {/* Russian Button */}
            <button
              onClick={() => handleLanguageSelect('ru')}
              className={`flex-1 relative overflow-hidden rounded-lg p-3 border-2 transition-all duration-300 hover:scale-105 ${
                selectedLang === 'ru'
                  ? 'border-blue-600 bg-blue-50 shadow-md'
                  : 'border-gray-200 bg-white hover:border-blue-300'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <span className="text-2xl">🇷🇺</span>
                <span className={`font-semibold ${selectedLang === 'ru' ? 'text-blue-700' : 'text-gray-700'}`}>
                  RU
                </span>
              </div>
              {selectedLang === 'ru' && (
                <div className="absolute top-1 right-1 w-2 h-2 bg-blue-600 rounded-full"></div>
              )}
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="px-6">
          <div className="border-t border-gray-200"></div>
        </div>

        {/* Cookie Consent */}
        <div className="px-6 py-4">
          <div className="flex items-start gap-3 mb-3">
            <div className="flex-shrink-0 w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
              <Cookie className="w-5 h-5 text-orange-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-gray-800 mb-1">
                {selectedLang === 'ua' ? 'Ми використовуємо файли cookie' : 'Мы используем файлы cookie'}
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                {selectedLang === 'ua' 
                  ? 'Для покращення вашого досвіду та персоналізації контенту'
                  : 'Для улучшения вашего опыта и персонализации контента'
                }
              </p>
            </div>
          </div>

          {/* Privacy Link */}
          <a
            href="/terms"
            className="text-xs text-blue-600 hover:text-blue-800 hover:underline inline-flex items-center gap-1"
          >
            {selectedLang === 'ua' ? 'Політика конфіденційності' : 'Политика конфиденциальности'}
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>

        {/* Accept Button */}
        <div className="px-6 pb-6">
          <button
            onClick={handleAccept}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2"
          >
            {selectedLang === 'ua' ? 'Прийняти та продовжити' : 'Принять и продолжить'}
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeModal;
