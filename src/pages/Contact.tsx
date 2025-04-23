import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, Clock, MapPin, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useLanguage } from '@/contexts/LanguageContext';

const Contact = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = t('contact.errors.nameRequired');
    }
    if (!formData.email.trim()) {
      newErrors.email = t('contact.errors.emailRequired');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t('contact.errors.invalidEmail');
    }
    if (!formData.phone.trim()) {
      newErrors.phone = t('contact.errors.phoneRequired');
    }
    if (!formData.subject.trim()) {
      newErrors.subject = t('contact.errors.subjectRequired');
    }
    if (!formData.message.trim()) {
      newErrors.message = t('contact.errors.messageRequired');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const mailtoLink = `mailto:support@exclusive.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\n\nMessage:\n${formData.message}`
    )}`;
    
    window.location.href = mailtoLink;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-24">
        {/* Hero Banner */}
        <section className="bg-muted py-16 md:py-24">
          <div className="container mx-auto text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading mb-4">{t('contact.title')}</h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              {t('contact.subtitle')}
            </p>
            <nav className="flex justify-center mt-6">
              <ol className="flex items-center space-x-2">
                <li><Link to="/" className="text-sm hover:text-primary transition-colors">{t('contact.home')}</Link></li>
                <li><span className="text-sm text-muted-foreground mx-2">/</span></li>
                <li><span className="text-sm text-muted-foreground">{t('contact.contact')}</span></li>
              </ol>
            </nav>
          </div>
        </section>

        {/* Contact Details and Form */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
              
              {/* Contact Information Card */}
              <div className="bg-primary text-primary-foreground rounded-lg p-8 lg:col-span-1">
                <div className="h-full flex flex-col">
                  <h2 className="text-2xl font-bold mb-6">{t('contact.info.title')}</h2>
                  <p className="mb-8 text-primary-foreground/90">
                    {t('contact.info.description')}
                  </p>
                  
                  <div className="space-y-6 flex-1">
                    <div className="flex items-start">
                      <Phone className="w-5 h-5 mr-3 flex-shrink-0" />
                      <span>
                        +84 987 654 321
                      </span>
                    </div>
                    <div className="flex items-start">
                      <Mail className="w-5 h-5 mr-3 flex-shrink-0" />
                      <span>support@novashop.com</span>
                    </div>
                    <div className="flex items-start">
                      <MapPin className="w-5 h-5 mr-3 flex-shrink-0" />
                      <span>{t('contact.info.address')}</span>
                    </div>
                    <div className="flex items-start">
                      <Clock className="w-5 h-5 mr-3 flex-shrink-0" />
                      <div>
                        <p>{t('contact.info.weekdays')}</p>
                        <p>{t('contact.info.weekends')}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8 flex space-x-4">
                    <a href="https://www.facebook.com/" target="_blank" className="bg-primary-foreground/20 p-2 rounded-full hover:bg-primary-foreground/30 transition-colors" aria-label="Twitter">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22 4.01C21 4.5 20.02 4.69 19 4.82C20.07 4.19 20.76 3.14 21.1 1.92C20.08 2.52 18.94 2.98 17.71 3.21C16.33 1.77 14.36 1.5 12.58 2.09C10.8 2.68 9.48 4.05 9 5.8C9.08 5.54 9 6.05 9 6.5C9 6.5 9 6.5 9 6.5C6.97 6.36 5.01 5.75 3.27 4.73C1.53 3.71 0.07 2.31 0 0.5C0 0.5 0 0.5 0 0.5C0 0.5 -1 4.5 3 6.5C1.791 6.526 0.61 6.21 -0.5 5.5C-0.5 5.5 -0.5 5.5 -0.5 5.5C-0.5 7.79 1.21 9.82 3.5 10.24C2.38 10.5 1.19 10.45 0 10.06C0.58 12.04 2.49 13.5 4.74 13.5H8C6.75 14.95 4.68 15.76 2 15.5C4.44 16.76 7.59 17.22 10.24 16.7C12.89 16.19 15.29 14.73 16.85 12.66C18.41 10.59 19.01 8.03 18.53 5.5C18.53 5.5 18.53 5.5 18.53 5.5C19.43 4.67 20 3.5 22 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </a>
                    <a href="https://www.instagram.com/" target="_blank" className="bg-primary-foreground/20 p-2 rounded-full hover:bg-primary-foreground/30 transition-colors" aria-label="Instagram">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17 2H7C4.23858 2 2 4.23858 2 7V17C2 19.7614 4.23858 22 7 22H17C19.7614 22 22 19.7614 22 17V7C22 4.23858 19.7614 2 17 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M16 11.37C16.1234 12.2022 15.9813 13.0522 15.5938 13.799C15.2063 14.5458 14.5931 15.1514 13.8416 15.5297C13.0901 15.9079 12.2384 16.0396 11.4078 15.9059C10.5771 15.7723 9.80976 15.3801 9.21484 14.7852C8.61991 14.1902 8.22773 13.4229 8.09406 12.5922C7.9604 11.7615 8.09206 10.9099 8.47032 10.1584C8.84858 9.40685 9.45418 8.79374 10.201 8.40624C10.9478 8.01874 11.7978 7.87659 12.63 8C13.4789 8.12588 14.2648 8.52146 14.8717 9.12831C15.4785 9.73515 15.8741 10.5211 16 11.37Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M17.5 6.5H17.51" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </a>
                    <a href="https://x.com/home?lang=vi" target="_blank" className="bg-primary-foreground/20 p-2 rounded-full hover:bg-primary-foreground/30 transition-colors" aria-label="Facebook">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 2H15C13.6739 2 12.4021 2.52678 11.4645 3.46447C10.5268 4.40215 10 5.67392 10 7V10H7V14H10V22H14V14H17L18 10H14V7C14 6.73478 14.1054 6.48043 14.2929 6.29289C14.4804 6.10536 14.7348 6 15 6H18V2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
              
              {/* Contact Form */}
              <div className="lg:col-span-2 bg-background rounded-lg p-8 shadow-sm">
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2">
                        {t('contact.form.name')}
                      </label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        placeholder={t('contact.form.namePlaceholder')}
                        className={`w-full ${errors.name ? 'border-red-500' : ''}`}
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                      {errors.name && (
                        <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">
                        {t('contact.form.email')}
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder={t('contact.form.emailPlaceholder')}
                        className={`w-full ${errors.email ? 'border-red-500' : ''}`}
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium mb-2">
                      {t('contact.form.phone')}
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder={t('contact.form.phonePlaceholder')}
                      className={`w-full ${errors.phone ? 'border-red-500' : ''}`}
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium mb-2">
                      {t('contact.form.subject')}
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      placeholder={t('contact.form.subjectPlaceholder')}
                      className={`w-full ${errors.subject ? 'border-red-500' : ''}`}
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    />
                    {errors.subject && (
                      <p className="text-red-500 text-sm mt-1">{errors.subject}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      {t('contact.form.message')}
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder={t('contact.form.messagePlaceholder')}
                      className={`w-full min-h-[120px] ${errors.message ? 'border-red-500' : ''}`}
                      value={formData.message}
                      onChange={handleChange}
                      required
                    />
                    {errors.message && (
                      <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                    )}
                  </div>
                  
                  <div className="text-right">
                    <Button 
                      type="submit" 
                      size="lg" 
                      className="gap-2"
                    >
                      {t('contact.form.submit')}
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
        
        {/* Map Section */}
        <section className="pb-16 md:pb-24">
          <div className="container mx-auto">
            <div className="rounded-lg overflow-hidden h-[400px] w-full">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d55416.30024268715!2d105.81704728634162!3d20.973966949133697!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ac398657c2ad%3A0xe0a5e23eaaed780!2zSG_DoG5nIE1haSwgSMOgIE7hu5lpLCBWaeG7h3QgTmFt!5e1!3m2!1svi!2s!4v1743344733225!5m2!1svi!2s"
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Location map"
              ></iframe>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;
  