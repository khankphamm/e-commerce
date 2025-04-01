
// API endpoints
const BASE_URL = 'https://fakestoreapi.com';

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  itemCount: number;
  color: string;
}

// Transform API products to our application format
export const transformProduct = (product: any): Product => ({
  ...product,
  name: product.title, // Map title to name for our component
});

// Fetch all products
export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await fetch(`${BASE_URL}/products`);
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    const data = await response.json();
    return data.map(transformProduct);
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

// Fetch a single product by ID
export const fetchProductById = async (id: string): Promise<Product> => {
  try {
    const response = await fetch(`${BASE_URL}/products/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch product with ID: ${id}`);
    }
    const data = await response.json();
    return transformProduct(data);
  } catch (error) {
    console.error(`Error fetching product with ID ${id}:`, error);
    throw error;
  }
};

// Fetch all categories
export const fetchCategories = async (): Promise<string[]> => {
  try {
    const response = await fetch(`${BASE_URL}/products/categories`);
    if (!response.ok) {
      throw new Error('Failed to fetch categories');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

// Transform API categories to our application format with images and descriptions
export const fetchFormattedCategories = async (): Promise<Category[]> => {
  const categories = await fetchCategories();
  
  // Category images and descriptions (hardcoded since the API doesn't provide these)
  const categoryDetails: Record<string, Partial<Category>> = {
    "electronics": {
      image: "https://images.unsplash.com/photo-1608042314453-ae338d80c427?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3",
      description: "Latest tech gadgets and electronic devices",
      color: "bg-blue-50",
      itemCount: 6
    },
    "jewelery": {
      image: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3",
      description: "Timeless pieces to treasure for years to come",
      color: "bg-purple-50",
      itemCount: 4
    },
    "men's clothing": {
      image: "https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.0.3",
      description: "Contemporary styles for the modern gentleman",
      color: "bg-amber-50",
      itemCount: 4
    },
    "women's clothing": {
      image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3",
      description: "Elegant and stylish clothing for every occasion",
      color: "bg-pink-50",
      itemCount: 6
    }
  };
  
  return categories.map(cat => ({
    id: cat.replace(/\s+/g, '-').toLowerCase(),
    name: cat.charAt(0).toUpperCase() + cat.slice(1),
    description: categoryDetails[cat]?.description || "Explore our collection",
    image: categoryDetails[cat]?.image || "https://images.unsplash.com/photo-1472851294608-062f824d29cc",
    itemCount: categoryDetails[cat]?.itemCount || 10,
    color: categoryDetails[cat]?.color || "bg-gray-50",
  }));
};

// Fetch products by category
export const fetchProductsByCategory = async (category: string): Promise<Product[]> => {
  try {
    const response = await fetch(`${BASE_URL}/products/category/${category}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch products in category: ${category}`);
    }
    const data = await response.json();
    return data.map(transformProduct);
  } catch (error) {
    console.error(`Error fetching products in category ${category}:`, error);
    throw error;
  }
};
