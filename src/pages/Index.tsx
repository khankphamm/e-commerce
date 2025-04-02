
import React, { useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import CategorySection from '@/components/home/CategorySection';
import Newsletter from '@/components/home/Newsletter';
import AnimateInView from '@/components/ui/AnimateInView';

const Index = () => {
  // Smooth scroll to top on page load
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        <AnimateInView animation="fade-up">
          <Hero />
        </AnimateInView>
        
        <AnimateInView animation="fade-up" delay={100}>
          <FeaturedProducts />
        </AnimateInView>
        
        <AnimateInView animation="fade-up" delay={200}>
          <CategorySection />
        </AnimateInView>
        
        <AnimateInView animation="fade-up" delay={300}>
          <Newsletter />
        </AnimateInView>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
