// Demo products data stored in localStorage
const DEMO_PRODUCTS = [
  // Dresses
  { id: 'p-1', name: 'Elegant Black Dress', price: 2500, category: 'dresses', image: '/pics/black_image1.jpeg', rating: 4.5, reviews: 128, description: 'Premium black dress perfect for any occasion' },
  { id: 'p-2', name: 'Floral Midi Dress', price: 2200, category: 'dresses', image: '/pics/review_image_dress.jpg', rating: 4.7, reviews: 89, description: 'Beautiful floral pattern midi dress' },
  { id: 'p-3', name: 'White Summer Dress', price: 1800, category: 'dresses', image: '/pics/review_image_whitetshirt.jpg', rating: 4.4, reviews: 156, description: 'Light and breezy white summer dress' },
  
  // Jackets
  { id: 'p-4', name: 'Leather Jacket', price: 3500, category: 'jackets', image: '/pics/review_image_jacket.jpg', rating: 4.8, reviews: 203, description: 'Classic leather jacket for all seasons' },
  { id: 'p-5', name: 'Denim Jacket', price: 2800, category: 'jackets', image: '/pics/review_image_jacket.jpg', rating: 4.6, reviews: 176, description: 'Timeless denim jacket' },
  
  // Jeans
  { id: 'p-6', name: 'Premium Blue Jeans', price: 1999, category: 'jeans', image: '/pics/review_image_jeans.jpg', rating: 4.5, reviews: 234, description: 'Comfortable premium blue jeans' },
  { id: 'p-7', name: 'Black Slim Fit Jeans', price: 2200, category: 'jeans', image: '/pics/review_image_jeans.jpg', rating: 4.6, reviews: 198, description: 'Stylish black slim fit jeans' },
  
  // Pants
  { id: 'p-8', name: 'Casual Chinos', price: 1800, category: 'pants', image: '/pics/review_image_pants.jpg', rating: 4.4, reviews: 145, description: 'Comfortable casual chino pants' },
  { id: 'p-9', name: 'Formal Trousers', price: 2500, category: 'pants', image: '/pics/review_image_pants.jpg', rating: 4.7, reviews: 167, description: 'Professional formal trousers' },
  
  // Party Wear
  { id: 'p-10', name: 'Gold Party Gown', price: 4500, category: 'partywear', image: '/pics/review_image_partywear.jpg', rating: 4.9, reviews: 87, description: 'Stunning gold party gown' },
  { id: 'p-11', name: 'Sequined Dress', price: 3800, category: 'partywear', image: '/pics/review_image_partywear.jpg', rating: 4.8, reviews: 112, description: 'Glamorous sequined party dress' },
  
  // Shorts
  { id: 'p-12', name: 'Summer Shorts', price: 1200, category: 'shorts', image: '/pics/review_image_shorts.jpg', rating: 4.5, reviews: 98, description: 'Perfect summer shorts' },
  { id: 'p-13', name: 'Denim Shorts', price: 1500, category: 'shorts', image: '/pics/review_image_shorts.jpg', rating: 4.6, reviews: 134, description: 'Stylish denim shorts' },
  
  // Skirts
  { id: 'p-14', name: 'Pleated Skirt', price: 1800, category: 'skirts', image: '/pics/review_image_skirt.jpg', rating: 4.4, reviews: 112, description: 'Elegant pleated skirt' },
  { id: 'p-15', name: 'A-Line Skirt', price: 2000, category: 'skirts', image: '/pics/review_image_skirt.jpg', rating: 4.7, reviews: 145, description: 'Flattering A-line skirt' },
  
  // Sweaters
  { id: 'p-16', name: 'Wool Sweater', price: 2200, category: 'sweaters', image: '/pics/review_image_sweater.jpg', rating: 4.6, reviews: 178, description: 'Cozy wool sweater' },
  { id: 'p-17', name: 'Cardigan Sweater', price: 2500, category: 'sweaters', image: '/pics/review_image_sweater.jpg', rating: 4.5, reviews: 156, description: 'Comfortable cardigan sweater' },
  
  // Coats
  { id: 'p-18', name: 'Winter Coat', price: 3500, category: 'coats', image: '/pics/review_image_coat.jpg', rating: 4.8, reviews: 201, description: 'Warm winter coat' },
  { id: 'p-19', name: 'Trench Coat', price: 4000, category: 'coats', image: '/pics/review_image_coat.jpg', rating: 4.7, reviews: 189, description: 'Classic trench coat' },
];

export const initializeProducts = () => {
  const existingProducts = localStorage.getItem('demoProducts');
  if (!existingProducts) {
    localStorage.setItem('demoProducts', JSON.stringify(DEMO_PRODUCTS));
  }
};

export const getAllProducts = () => {
  const products = localStorage.getItem('demoProducts');
  return products ? JSON.parse(products) : DEMO_PRODUCTS;
};

export const getProductsByCategory = (category) => {
  const products = getAllProducts();
  if (category === 'all') return products;
  return products.filter(p => p.category === category);
};

export const getProductById = (id) => {
  const products = getAllProducts();
  return products.find(p => p.id === id);
};

export const searchProducts = (query) => {
  const products = getAllProducts();
  const q = query.toLowerCase();
  return products.filter(p => 
    p.name.toLowerCase().includes(q) || 
    p.description.toLowerCase().includes(q) ||
    p.category.toLowerCase().includes(q)
  );
};

export const getNewArrivals = () => {
  const products = getAllProducts();
  return products.slice(0, 6);
};

export const getRandomProducts = (limit = 8) => {
  const products = getAllProducts();
  return products.sort(() => Math.random() - 0.5).slice(0, limit);
};
