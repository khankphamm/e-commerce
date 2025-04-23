import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Hero = () => {
  const { t } = useLanguage();

  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Left Content - Text */}
          <div className="flex-1 max-w-2xl">
            <div className="flex items-center space-x-3 mb-4 animate-fade-in">
              <div className="w-10 h-0.5 bg-accent"></div>
              <span className="text-accent font-medium text-center">{t('home.hero.title')}</span>
              <div className="w-10 h-0.5 bg-accent"></div>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-5xl font-bold leading-tight mb-6 animate-slide-up" style={{ animationDelay: '100ms' }}>
              {t('home.hero.title')}
            </h1>
            
            <p className="text-muted-foreground text-lg mb-8 animate-slide-up" style={{ animationDelay: '200ms' }}>
              {t('home.hero.description')}
            </p>
            
            <Button variant="default" size="lg" className="group animate-slide-up" style={{ animationDelay: '300ms' }}>
              {t('home.hero.shopNow')}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
          
          {/* Right Content - Image */}
          <div className="flex-1 relative">
            <div className="relative z-10 animate-scale">
              <img 
                src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3"
                alt={t('home.hero.title')}
                className="w-full h-auto rounded-2xl shadow-xl"
              />
            </div>
            
            {/* Background Elements */}
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-secondary rounded-full opacity-50 animate-float"></div>
            <div className="absolute top-1/4 -left-10 w-20 h-20 bg-accent rounded-full opacity-20 animate-float" style={{ animationDelay: '1s' }}></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;