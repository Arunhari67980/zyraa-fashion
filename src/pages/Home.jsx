import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AddToCartButton from '../components/AddToCartButton';
import { getNewArrivals } from '../services/productsService';

export default function Home() {
  const [newArrivals, setNewArrivals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNewArrivals() {
      setLoading(true);
      const products = await getNewArrivals();
      setNewArrivals(products);
      setLoading(false);
    }
    fetchNewArrivals();
  }, []);

  const categories = [
    { name: 'Dresses', image: '/pics/review_image_dress.jpg', path: '/dresses' },
    { name: 'Jackets', image: '/pics/review_image_jacket.jpg', path: '/jackets' },
    { name: 'Jeans', image: '/pics/review_image_jeans.jpg', path: '/jeans' },
    { name: 'Pants', image: '/pics/review_image_pants.jpg', path: '/pants' },
    { name: 'Party Wear', image: '/pics/review_image_partywear.jpg', path: '/partywear' },
    { name: 'Shorts', image: '/pics/review_image_shorts.jpg', path: '/shorts' },
    { name: 'Skirts', image: '/pics/review_image_skirt.jpg', path: '/skirts' },
    { name: 'Sweaters', image: '/pics/review_image_sweater.jpg', path: '/sweaters' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8f7f4] via-white to-[#f8f7f4]">
      {/* Hero/Welcome Section */}
      <section className="py-12 md:py-20 px-6 md:px-12 text-center">
        <h1 className="text-4xl md:text-6xl font-light text-[#2c2c2c] mb-6 tracking-wide">
          Welcome to <span className="text-[#b8860b]">ZYRAA</span> Fashion
        </h1>
        <p className="text-lg text-[#555] font-light max-w-3xl mx-auto leading-relaxed">
          Discover our exclusive collection of stylish apparel for every occasion. Elevate your wardrobe with timeless elegance.
        </p>
      </section>

      {/* Featured Categories */}
      <section className="px-6 md:px-12 py-16 bg-gradient-to-r from-[#faf9f6] to-[#f8f7f4]">
        <h2 className="text-3xl md:text-4xl font-light text-[#2c2c2c] mb-12 text-center tracking-wide">
          ✨ Combo Offers
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
          {categories.map((category) => (
            <Link key={category.path} to={category.path} className="group block">
              <div className="relative overflow-hidden bg-gradient-to-br from-[#f0ebe0] to-[#e8dccf] shadow-md hover:shadow-2xl transition-all duration-500 transform hover:scale-105 cursor-pointer h-56 md:h-64 w-full rounded-lg border border-[#e0d9cc] group-hover:border-[#b8860b]">
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:brightness-110 transition-all duration-300"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/300x250?text=' + encodeURIComponent(category.name);
                  }}
                />
              </div>
              <h3 className="text-center text-[#2c2c2c] font-light text-lg mt-4 group-hover:text-[#b8860b] transition-colors duration-300">
                {category.name}
              </h3>
            </Link>
          ))}
        </div>
      </section>

      {/* New Arrivals Section */}
      <section className="px-6 md:px-12 py-16">
        <h2 className="text-3xl md:text-4xl font-light text-[#2c2c2c] mb-12 text-center tracking-wide">
          🆕 New Arrivals
        </h2>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin inline-block w-12 h-12 border-4 border-[#b8860b] border-t-transparent rounded-full"></div>
            <p className="text-[#666] mt-4">Loading new arrivals...</p>
          </div>
        ) : newArrivals.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-[#666] text-lg">No products available yet. Add some products in Supabase!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {newArrivals.map((product) => (
              <div key={product.id} className="group">
                <div className="relative overflow-hidden bg-gradient-to-br from-[#f0ebe0] to-[#e8dccf] shadow-md hover:shadow-xl transition-all duration-500 h-80 rounded-lg border border-[#e0d9cc] overflow-hidden">
                  <div className="absolute top-4 right-4 bg-[#b8860b] text-white px-4 py-2 rounded text-sm font-light z-20">New</div>
                  <img
                    src={product.image_url || product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 brightness-100 group-hover:brightness-90"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/400x500?text=' + encodeURIComponent(product.name);
                    }}
                  />
                </div>
                <h3 className="text-[#2c2c2c] font-light text-lg mt-5 group-hover:text-[#b8860b] transition-colors duration-300">
                  {product.name}
                </h3>
                <p className="text-[#b8860b] font-light text-xl mt-2">₹{Number(product.price).toFixed(2)}</p>
                <AddToCartButton 
                  product={product} 
                  className="mt-4 w-full py-2 text-sm rounded"
                />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="px-6 md:px-12 py-16 bg-gradient-to-r from-[#2c2c2c] via-[#3a3a3a] to-[#2c2c2c] text-center">
        <div>
          <h2 className="text-3xl md:text-4xl font-light text-white mb-4 tracking-wide">
            Explore More Products
          </h2>
          <p className="text-[#ccc] font-light text-lg mb-8">Find your perfect style with our curated collections</p>
          <Link
            to="/random"
            className="inline-block px-8 py-3 bg-[#b8860b] text-white rounded hover:bg-[#9a7009] transition-colors duration-300 font-light text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Shop Now →
          </Link>
        </div>
      </section>
    </div>
  );
}
