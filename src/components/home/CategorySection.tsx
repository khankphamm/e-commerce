import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { fetchFormattedCategories } from '@/services/api';
import { Skeleton } from '@/components/ui/skeleton';
import AnimateInView from '@/components/ui/AnimateInView';
import { useLanguage } from '@/contexts/LanguageContext';

const CategorySection = () => {
  const { t } = useLanguage();
  const { data: categories = [], isLoading, error } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchFormattedCategories,
  });

  if (isLoading) {
    return (
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-10 h-0.5 bg-accent"></div>
              <span className="text-accent font-medium">{t('home.categories.title')}</span>
              <div className="w-10 h-0.5 bg-accent"></div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('home.categories.subtitle')}</h2>
            <p className="text-muted-foreground">
              {t('home.categories.description')}
            </p>
          </div>
          
          {/* Loading Category Skeletons */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="rounded-lg overflow-hidden h-80">
                <Skeleton className="h-full w-full" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto text-center">
          <p className="text-red-500">{t('shop.noProducts')}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto">
        <AnimateInView animation="fade-up" className="text-center max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-10 h-0.5 bg-accent"></div>
            <span className="text-accent font-medium">{t('home.categories.title')}</span>
            <div className="w-10 h-0.5 bg-accent"></div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('home.categories.subtitle')}</h2>
          <p className="text-muted-foreground">
            {t('home.categories.description')}
          </p>
        </AnimateInView>
        
        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <AnimateInView
              key={category.id}
              animation="fade-up"
              delay={index * 100}
              threshold={0.1}
            >
              <Link
                to={`/shop?category=${encodeURIComponent(category.name ? category.name.toLowerCase() : '')}`}
                className={`group relative overflow-hidden rounded-xl ${category.color || 'bg-gray-100'} h-80 transition-all duration-300 hover:shadow-lg`}
              >
                {/* Category Image */}
                <div className="absolute inset-0 z-0 opacity-20 overflow-hidden">
                  <img
                    src={category.image || '/placeholder.svg'}
                    alt={category.name || 'Category'}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                
                {/* Content Overlay */}
                <div className="relative z-10 h-full flex flex-col justify-end p-6">
                  <h3 className="text-xl font-bold mb-2">{category.name || 'Category'}</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {category.description || 'Browse this category'}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{category.itemCount || 0} Items</span>
                    <span className="w-8 h-8 rounded-full bg-white flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-colors">
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </Link>
            </AnimateInView>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;