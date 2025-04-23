import React from 'react';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';
import AnimateInView from '@/components/ui/AnimateInView';
import { useLanguage } from '@/contexts/LanguageContext';

const Newsletter = () => {
  const { t } = useLanguage();

  return (
    <section className="py-20">
      <div className="container mx-auto">
        <div className="relative bg-secondary rounded-2xl overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-50">
            <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-accent/10"></div>
            <div className="absolute bottom-10 left-10 w-20 h-20 rounded-full bg-primary/10"></div>
          </div>
          
          <div className="relative z-10 py-16 px-6 md:px-16 flex flex-col items-center text-center max-w-2xl mx-auto">
            <AnimateInView animation="fade-up">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {t('home.newsletter.title')}
              </h2>
            </AnimateInView>
            
            <AnimateInView animation="fade-up" delay={100}>
              <p className="text-muted-foreground mb-8">
                {t('home.newsletter.description')}
              </p>
            </AnimateInView>
            
            <AnimateInView animation="fade-up" delay={200} className="w-full max-w-md">
              <div className="w-full flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder={t('home.newsletter.placeholder')}
                  className="flex-1 px-4 py-3 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                />
                <Button variant="default" size="lg">
                  {t('home.newsletter.subscribe')}
                  <Send className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </AnimateInView>
            
            <AnimateInView animation="fade-up" delay={300}>
              <p className="text-xs text-muted-foreground mt-4">
                {t('home.newsletter.agreement')}
              </p>
            </AnimateInView>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;