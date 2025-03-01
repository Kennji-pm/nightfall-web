import { useState, useEffect } from 'react';
import { X, Send, MessageCircle, Check } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

export const ContactPopup = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (typeof localStorage !== "undefined") {
      const savedEmail = localStorage.getItem("contact_email") as "" | null;
      if (savedEmail) {
        setFormData({ name: '', email: savedEmail, message: '' });
      }
    }
  }, []);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Reset after showing success message
      setTimeout(() => {
        setIsOpen(false);
        // Reset form after closing
        setTimeout(() => {
            localStorage.setItem("contact_email", formData.email);
            setFormData({ name: '', email: '', message: '' });
          setIsSubmitted(false);
        }, 1000);
      }, 2000);
    }, 1500);
  };
  
  return (
    <>
      {/* Floating button */}
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed z-50 bottom-6 right-6 bg-primary text-white p-3 rounded-full shadow-lg hover:shadow-primary/30 hover:scale-110 transition-all duration-300"
        aria-label="Contact Support"
      >
        <MessageCircle size={24} />
      </button>
      
      {/* Popup overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div 
            className="bg-background rounded-xl shadow-2xl w-full max-w-md relative overflow-hidden animate-in fade-in zoom-in duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground p-1 rounded-full hover:bg-muted transition-colors duration-200"
              aria-label="Close"
            >
              <X size={20} />
            </button>
            
            {/* Popup header */}
            <div className="bg-gradient-to-r from-primary/80 to-primary p-6 text-white">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                {t.contact.title}
              </h2>
              <p className="mt-1 text-sm opacity-90">
                {t.contact.subtitle}
              </p>
            </div>
            
            {/* Popup content */}
            <div className="p-6">
              {!isSubmitted ? (
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-1">
                        {t.contact.name}
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 bg-muted/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder={t.contact.namePlaceholder}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-1">
                        {t.contact.email}
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 bg-muted/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="email@example.com"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium mb-1">
                        {t.contact.message}
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={4}
                        className="w-full px-3 py-2 bg-muted/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                        placeholder={t.contact.messagePlaceholder}
                      />
                    </div>
                    
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-2 bg-primary text-white rounded-lg transition-all duration-200 hover:shadow-md flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin"></div>
                          <span>{t.contact.sending}</span>
                        </>
                      ) : (
                        <>
                          <Send size={16} />
                          <span>{t.contact.send}</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              ) : (
                <div className="text-center py-6">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-green-600">{t.contact.sent}</h3>
                  <p className="mt-2 text-muted-foreground">
                    {t.contact.submitted}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}