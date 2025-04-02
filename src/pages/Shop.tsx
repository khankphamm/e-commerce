import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useLocation, Link } from 'react-router-dom';
import { fetchProducts, fetchCategories } from '@/services/api';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/ui/ProductCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { Filter, Search, SlidersHorizontal, ChevronDown, X } from 'lucide-react';
import AnimateInView from '@/components/ui/AnimateInView';

const Shop = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [filterOpen, setFilterOpen] = useState(false);

  const location = useLocation();
  
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const category = params.get('category');
    const search = params.get('search');
    
    if (category) {
      setSelectedCategory(category);
    }
    
    if (search) {
      setSearchQuery(search);
    }
  }, [location]);

  const { data: products = [], isLoading: productsLoading } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  const { data: categories = [], isLoading: categoriesLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });

  const filterProducts = () => {
    if (!products) return [];
    
    return products.filter((product) => {
      const matchesSearch = 
        searchQuery === '' || 
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = 
        !selectedCategory || 
        product.category === selectedCategory;
      
      const matchesPrice = 
        product.price >= priceRange[0] && 
        product.price <= priceRange[1];
      
      return matchesSearch && matchesCategory && matchesPrice;
    });
  };

  const filteredProducts = filterProducts();

  const formatCategoryName = (category: string) => {
    if (typeof category !== 'string' || !category) return '';
    return category
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-20">
        <AnimateInView animation="fade-up">
          <section className="bg-muted py-12 md:py-16">
            <div className="container mx-auto px-4">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Shop</h1>
              <div className="flex items-center text-sm">
                <Link to="/" className="hover:text-primary transition-colors">Home</Link>
                <span className="mx-2">/</span>
                <span className="text-muted-foreground">Shop</span>
              </div>
            </div>
          </section>
        </AnimateInView>
        
        <section className="py-8 md:py-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-8">
              <AnimateInView animation="fade-right" className="hidden lg:block w-full lg:w-1/4 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Categories</h3>
                  {categoriesLoading ? (
                    <div className="space-y-2">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Skeleton key={i} className="h-8 w-full" />
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <button
                        className={`w-full text-left py-2 hover:text-primary transition-colors ${
                          selectedCategory === null ? 'font-semibold text-primary' : ''
                        }`}
                        onClick={() => setSelectedCategory(null)}
                      >
                        All Categories
                      </button>
                      
                      {categories?.map((category) => (
                        <button
                          key={category}
                          className={`w-full text-left py-2 hover:text-primary transition-colors ${
                            selectedCategory === category ? 'font-semibold text-primary' : ''
                          }`}
                          onClick={() => setSelectedCategory(category)}
                        >
                          {formatCategoryName(category)}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-4">Price Range</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        min="0"
                        value={priceRange[0]}
                        onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                        className="w-24"
                      />
                      <span>to</span>
                      <Input
                        type="number"
                        min="0"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 0])}
                        className="w-24"
                      />
                    </div>
                    
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => setPriceRange([0, 1000])}
                    >
                      Reset
                    </Button>
                  </div>
                </div>
              </AnimateInView>
              
              <div className="w-full lg:w-3/4">
                <AnimateInView animation="fade-up" className="flex flex-wrap gap-4 mb-8 items-center justify-between">
                  <div className="relative w-full md:w-auto flex-grow md:max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      type="text"
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      className="lg:hidden flex items-center gap-2"
                      onClick={() => setFilterOpen(true)}
                    >
                      <Filter className="h-4 w-4" />
                      Filters
                    </Button>
                    
                    <Button variant="outline" className="hidden md:flex items-center gap-2">
                      <SlidersHorizontal className="h-4 w-4" />
                      Sort by
                      <ChevronDown className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </AnimateInView>
                
                <AnimateInView animation="fade-up" delay={100} className="flex flex-wrap gap-2 mb-6">
                  {selectedCategory && (
                    <div className="bg-secondary text-foreground py-1 px-3 rounded-full text-sm flex items-center">
                      Category: {formatCategoryName(selectedCategory)}
                      <button 
                        onClick={() => setSelectedCategory(null)}
                        className="ml-2 hover:text-primary"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  )}
                </AnimateInView>
                
                {productsLoading ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                      <div key={i} className="animate-pulse">
                        <Skeleton className="h-64 w-full mb-3" />
                        <Skeleton className="h-5 w-2/3 mb-2" />
                        <Skeleton className="h-4 w-1/2 mb-3" />
                        <Skeleton className="h-5 w-1/4" />
                      </div>
                    ))}
                  </div>
                ) : filteredProducts.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProducts.map((product, index) => (
                      <AnimateInView 
                        key={product.id}
                        animation="fade-up" 
                        delay={index % 6 * 80}
                        threshold={0.1}
                      >
                        <ProductCard
                          id={product.id.toString()}
                          name={product.title}
                          price={product.price}
                          image={product.image}
                          category={product.category}
                        />
                      </AnimateInView>
                    ))}
                  </div>
                ) : (
                  <AnimateInView animation="fade-up" className="text-center py-12">
                    <h3 className="text-lg font-medium mb-2">No products found</h3>
                    <p className="text-muted-foreground">
                      Try adjusting your search or filter criteria
                    </p>
                    <Button 
                      variant="outline" 
                      className="mt-4"
                      onClick={() => {
                        setSearchQuery('');
                        setSelectedCategory(null);
                        setPriceRange([0, 1000]);
                      }}
                    >
                      Reset All Filters
                    </Button>
                  </AnimateInView>
                )}
              </div>
            </div>
          </div>
        </section>
        
        {filterOpen && (
          <div className="fixed inset-0 bg-background z-50 lg:hidden overflow-y-auto">
            <div className="p-4">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Filters</h2>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => setFilterOpen(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Categories</h3>
                  {categoriesLoading ? (
                    <div className="space-y-2">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Skeleton key={i} className="h-8 w-full" />
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <button
                        className={`w-full text-left py-2 hover:text-primary transition-colors ${
                          selectedCategory === null ? 'font-semibold text-primary' : ''
                        }`}
                        onClick={() => {
                          setSelectedCategory(null);
                          setFilterOpen(false);
                        }}
                      >
                        All Categories
                      </button>
                      
                      {categories?.map((category) => (
                        <button
                          key={category}
                          className={`w-full text-left py-2 hover:text-primary transition-colors ${
                            selectedCategory === category ? 'font-semibold text-primary' : ''
                          }`}
                          onClick={() => {
                            setSelectedCategory(category);
                            setFilterOpen(false);
                          }}
                        >
                          {formatCategoryName(category)}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-4">Price Range</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        min="0"
                        value={priceRange[0]}
                        onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                        className="w-24"
                      />
                      <span>to</span>
                      <Input
                        type="number"
                        min="0"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 0])}
                        className="w-24"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2 pt-4">
                  <Button
                    variant="outline"
                    className="w-1/2"
                    onClick={() => {
                      setPriceRange([0, 1000]);
                      setSelectedCategory(null);
                      setSearchQuery('');
                    }}
                  >
                    Reset All
                  </Button>
                  
                  <Button
                    className="w-1/2"
                    onClick={() => setFilterOpen(false)}
                  >
                    Apply Filters
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Shop;
