import React, { useState, useEffect } from 'react';
import AddToCartButton from '../components/AddToCartButton';
import QuickViewModal from '../components/QuickViewModal';
import { getAllProducts } from '../services/productsService';

export default function RandomProducts() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortBy, setSortBy] = useState('newest');
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      const allProducts = await getAllProducts();
      setProducts(allProducts);
      setFilteredProducts(allProducts);
      setLoading(false);
    }
    fetchProducts();
  }, []);

  useEffect(() => {
    let sorted = [...products];
    
    switch(sortBy) {
      case 'price-low':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'newest':
      default:
        sorted.sort((a, b) => b.id.localeCompare(a.id));
    }
    
    setFilteredProducts(sorted);
  }, [sortBy, products]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8f7f4] via-white to-[#f8f7f4] py-12 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Title Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-light text-[#2c2c2c] mb-3 tracking-wide">
            Explore All Products
          </h1>
          <p className="text-[#666] font-light text-lg">
            Curated selections from our complete fashion collection
          </p>
        </div>

        {/* Filter Bar */}
        <div className="bg-white p-4 rounded-lg border border-[#e0d9cc] mb-8 flex flex-col md:flex-row gap-4 justify-between items-center">
          <span className="text-[#666] font-light text-sm">{filteredProducts.length} Products Available</span>
          <div className="flex gap-3 w-full md:w-auto">
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="input-field bg-white text-sm py-2 px-3 flex-1 md:flex-none appearance-none cursor-pointer">
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin inline-block w-12 h-12 border-4 border-[#b8860b] border-t-transparent rounded-full"></div>
            <p className="text-[#666] mt-4">Loading products...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-[#666] text-lg">No products available yet.</p>
            <p className="text-[#999] text-sm mt-2">Add products to your Supabase database.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {filteredProducts.map((product, idx) => (
              <div 
                key={product.id} 
                className="group card animate-slide-up"
                style={{ animationDelay: `${(idx % 4) * 0.1}s` }}
              >
                {/* Product Image */}
                <div className="relative overflow-hidden bg-gradient-to-br from-[#f0ebe0] to-[#e8dccf] h-80 rounded-lg mb-4 border border-[#e0d9cc] group-hover:border-[#b8860b]">
                  <span className="absolute top-3 right-3 bg-[#b8860b] text-white text-xs px-3 py-1 rounded-full z-10 font-light">
                    New
                  </span>
                  <img
                    src={product.image_url || product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/300x400?text=' + encodeURIComponent(product.name);
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <button 
                      onClick={() => setQuickViewProduct(product)}
                      className="w-full py-2 bg-white text-[#2c2c2c] rounded font-light hover:bg-[#b8860b] hover:text-white transition-all duration-300"
                    >
                      Quick View
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div>
                <h3 className="text-[#2c2c2c] font-light text-lg group-hover:text-[#b8860b] transition-colors duration-300 mb-2 line-clamp-2">
                  {product.name}
                </h3>
                
                {/* Rating */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex gap-1 text-[#b8860b] text-sm">
                    {'★'.repeat(Math.floor(product.rating || 4))}{'☆'.repeat(5 - Math.floor(product.rating || 4))}
                  </div>
                  <span className="text-[#999] font-light text-xs">({product.reviews || 100})</span>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-2 mb-4">
                  <p className="text-[#b8860b] font-light text-xl">
                    ₹{Number(product.price).toFixed(2)}
                  </p>
                  <p className="text-[#999] font-light text-sm line-through">
                    ₹{(Number(product.price) * 1.25).toFixed(2)}
                  </p>
                  <span className="text-[#4caf50] font-light text-xs">
                    -20%
                  </span>
                </div>

                {/* Add to Cart */}
                <AddToCartButton 
                  product={product} 
                  className="mt-2 w-full py-2 text-sm"
                />
              </div>
            </div>
          ))}
          </div>
        )}
      </div>

      {/* Quick View Modal */}
      <QuickViewModal 
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
}
