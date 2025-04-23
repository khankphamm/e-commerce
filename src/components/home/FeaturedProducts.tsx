import React from 'react';
import ProductCard from '../ui/ProductCard';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '@/services/api';
import { Skeleton } from '@/components/ui/skeleton';
import AnimateInView from '@/components/ui/AnimateInView';
import { useLanguage } from '@/contexts/LanguageContext';

const FeaturedProducts = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = React.useState('all');
  const { data: products = [], isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  const tabs = [
    { id: 'all', label: t('home.products.allProducts') },
    { id: 'electronics', label: t('home.products.electronics') },
    { id: 'jewelery', label: t('home.products.jewelry') },
    { id: 'men', label: t('home.products.menClothing') },
    { id: 'women', label: t('home.products.womenClothing') },
  ];

  const filteredProducts = React.useMemo(() => {
    if (!products || products.length === 0) {
      return [];
    }
    
    if (activeTab === 'all') {
      return products.slice(0, 8);
    } else if (activeTab === 'men') {
      return products.filter(product => product.category && product.category === "men's clothing").slice(0, 8);
    } else if (activeTab === 'women') {
      return products.filter(product => product.category && product.category === "women's clothing").slice(0, 8);
    } else {
      return products.filter(product => product.category && product.category === activeTab).slice(0, 8);
    }
  }, [activeTab, products]);

  if (isLoading) {
    return (
      <section className="py-20">
        <div className="container mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12 animate-slide-up">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-10 h-0.5 bg-accent"></div>
              <span className="text-accent font-medium">{t('home.products.title')}</span>
              <div className="w-10 h-0.5 bg-accent"></div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('home.products.subtitle')}</h2>
            <p className="text-muted-foreground">
              {t('home.products.description')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="rounded-lg overflow-hidden">
                <Skeleton className="h-64 w-full" />
                <div className="p-4 space-y-2">
                  <Skeleton className="h-4 w-2/3" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-4 w-1/3" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20">
        <div className="container mx-auto text-center">
          <p className="text-red-500">{t('shop.noProducts')}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20">
      <div className="container mx-auto">
        <AnimateInView animation="fade-up" className="text-center max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-10 h-0.5 bg-accent"></div>
            <span className="text-accent font-medium">{t('home.products.title')}</span>
            <div className="w-10 h-0.5 bg-accent"></div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('home.products.subtitle')}</h2>
          <p className="text-muted-foreground">
            {t('home.products.description')}
          </p>
        </AnimateInView>
        
        <AnimateInView animation="fade-up" delay={100} className="flex flex-wrap justify-center gap-4 mb-10">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-primary text-white shadow-md'
                  : 'bg-secondary hover:bg-secondary/80'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </AnimateInView>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
          {filteredProducts.map((product, index) => (
            <AnimateInView 
              key={product.id}
              animation="fade-up" 
              delay={index * 80}
              threshold={0.1}
            >
              <ProductCard
                id={String(product.id)}
                name={product.title || ''}
                price={product.price}
                image={product.image}
                category={product.category || ''}
                className="h-full"
              />
            </AnimateInView>
          ))}
        </div>
        
        <AnimateInView animation="fade-up" delay={300} className="text-center">
          <Link to="/shop">
            <Button variant="outline" size="lg">
              {t('home.products.viewAll')}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </AnimateInView>
      </div>
    </section>
  );
};

export default FeaturedProducts;