import { useState, useEffect } from 'react';

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
 
  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent'); 
    if (!consent) { 
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setIsVisible(false); 
  };

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="cookie-banner">
      <div className="cookie-banner__content">
        <p className="cookie-banner__text">
          Мы используем файлы cookie, чтобы сайт работал корректно и улучшался. 
          Продолжая использовать сайт, вы соглашаетесь с этим.
        </p>
        <div className="cookie-banner__actions">
          <button className="cookie-btn cookie-btn--decline" onClick={handleDecline}>
            Только необходимые
          </button>
          <button className="cookie-btn cookie-btn--accept" onClick={handleAccept}>
            Принять
          </button>
        </div>
      </div>
    </div>
  );
}