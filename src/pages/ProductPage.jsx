import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import AddToCartButton from '../components/AddToCartButton';
import QuickViewModal from '../components/QuickViewModal';

export default function ProductPage() {
  const { category } = useParams();
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  const categoryNames = {
    dresses: 'Dresses',
    jackets: 'Jackets',
    jeans: 'Jeans',
    pants: 'Pants',
    partywear: 'Party Wear',
    shorts: 'Shorts',
    skirts: 'Skirts',
    sweaters: 'Sweaters',
    tanktops: 'Tank Tops',
    whitetshirt: 'T-Shirts',
    coats: 'Coats',
    black: 'Black Collection',
  };

  const categoryImages = {
    dresses: '/pics/review_image_dress.jpg',
    jackets: '/pics/review_image_jacket.jpg',
    jeans: '/pics/review_image_jeans.jpg',
    pants: '/pics/review_image_pants.jpg',
    partywear: '/pics/review_image_partywear.jpg',
    shorts: '/pics/review_image_shorts.jpg',
    skirts: '/pics/review_image_skirt.jpg',
    sweaters: '/pics/review_image_sweater.jpg',
    tanktops: '/pics/review_image_tanktop.jpg',
    whitetshirt: '/pics/review_image_whitetshirt.jpg',
    coats: '/pics/review_image_coat.jpg',
    black: '/pics/black_image1.jpeg',
  };

  const categoryName = categoryNames[category] || 'Products';
  const categoryImage = categoryImages[category] || '/pics/review_image_dress.jpg';

  // Mock products data
  const products = Array.from({ length: 8 }, (_, i) => ({
    id: `${category}-${i + 1}`,
    name: `${categoryName} Style ${i + 1}`,
    price: 2000 + i * 500,
    image: categoryImage,
  }));

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8f7f4] via-white to-[#f8f7f4] py-12 px-6 md:px-12">
      {/* Breadcrumb & Title Section */}
      <div className="max-w-7xl mx-auto mb-12">
        <div className="mb-6 flex items-center gap-2 text-sm font-light text-[#666]">
          <a href="/" className="hover:text-[#b8860b] transition-colors">Home</a>
          <span>/</span>
          <span className="text-[#2c2c2c]">{categoryName}</span>
        </div>
        
        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-light text-[#2c2c2c] mb-2 tracking-wide">
              {categoryName}
            </h1>
            <p className="text-[#666] font-light">Discover our exclusive {categoryName.toLowerCase()} collection</p>
          </div>
        </div>

        {/* Filter/Sort Bar */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white p-4 rounded-lg border border-[#e0d9cc]">
          <div className="text-[#666] font-light text-sm">
            Showing {products.length} items
          </div>
          <div className="flex gap-3">
            <select className="input-field bg-white text-sm py-2 px-3 appearance-none cursor-pointer">
              <option>Sort by</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Newest</option>
            </select>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {products.map((product, idx) => (
            <div 
              key={product.id} 
              className="group card animate-slide-up"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              {/* Product Image */}
              <div className="relative overflow-hidden bg-gradient-to-br from-[#f0ebe0] to-[#e8dccf] h-80 rounded-lg mb-4 border border-[#e0d9cc] group-hover:border-[#b8860b]">
                <span className="absolute top-3 right-3 bg-[#b8860b] text-white text-xs px-3 py-1 rounded-full z-10 font-light">
                  Sale
                </span>
                <img
                  src={product.image}
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
                  <div className="flex gap-1 text-[#b8860b] text-sm">★★★★★</div>
                  <span className="text-[#999] font-light text-xs">(128)</span>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-2 mb-4">
                  <p className="text-[#b8860b] font-light text-xl">
                    ₹{product.price.toFixed(2)}
                  </p>
                  <p className="text-[#999] font-light text-sm line-through">
                    ₹{(product.price * 1.2).toFixed(2)}
                  </p>
                  <span className="text-[#4caf50] font-light text-xs">
                    -15%
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
      </div>

      {/* Load More Section */}
      <div className="max-w-7xl mx-auto mt-12 text-center">
        <button className="btn btn-secondary btn-lg">
          Load More Products
        </button>
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
