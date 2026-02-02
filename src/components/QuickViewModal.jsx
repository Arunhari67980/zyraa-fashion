import React, { useState, useEffect } from 'react';
import AddToCartButton from './AddToCartButton';
import { useWishlist } from '../context/WishlistContext';

export default function QuickViewModal({ product, isOpen, onClose }) {
  const [selectedSize, setSelectedSize] = useState('M');
  const [quantity, setQuantity] = useState(1);
  const [wishlistAdded, setWishlistAdded] = useState(false);
  const { isInWishlist, toggleWishlist } = useWishlist();

  // Close on escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !product) return null;

  const sizes = ['XS', 'S', 'M', 'L', 'XL'];
  const inWishlist = isInWishlist(product.id);

  const handleWishlistClick = () => {
    const added = toggleWishlist(product);
    if (added) {
      setWishlistAdded(true);
      setTimeout(() => setWishlistAdded(false), 2000);
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
      onClick={handleBackdropClick}
    >
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden animate-slide-up">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/90 hover:bg-[#b8860b] hover:text-white transition-all duration-300 shadow-lg"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="grid md:grid-cols-2 gap-0">
          {/* Product Image */}
          <div className="relative bg-gradient-to-br from-[#f0ebe0] to-[#e8dccf] h-64 md:h-[500px]">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/400x500?text=' + encodeURIComponent(product.name);
              }}
            />
            {/* Sale Badge */}
            <span className="absolute top-4 left-4 bg-[#b8860b] text-white text-sm px-4 py-1.5 rounded-full font-light">
              Sale
            </span>
          </div>

          {/* Product Details */}
          <div className="p-6 md:p-8 flex flex-col overflow-y-auto max-h-64 md:max-h-[500px]">
            {/* Category */}
            <p className="text-[#b8860b] text-sm font-medium tracking-wide uppercase mb-2">
              {product.category || 'Fashion'}
            </p>

            {/* Product Name */}
            <h2 className="text-2xl md:text-3xl font-light text-[#2c2c2c] mb-3 leading-tight">
              {product.name}
            </h2>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-4">
              <div className="flex gap-0.5 text-[#b8860b]">
                {'★'.repeat(Math.floor(product.rating || 4))}
                {'☆'.repeat(5 - Math.floor(product.rating || 4))}
              </div>
              <span className="text-[#666] text-sm font-light">
                ({product.reviews || 128} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-3xl font-light text-[#b8860b]">
                ₹{product.price?.toFixed(2) || '0.00'}
              </span>
              <span className="text-lg text-[#999] line-through font-light">
                ₹{((product.price || 0) * 1.25).toFixed(2)}
              </span>
              <span className="bg-[#4caf50]/10 text-[#4caf50] text-sm px-2 py-0.5 rounded font-medium">
                -20% OFF
              </span>
            </div>

            {/* Description */}
            <p className="text-[#666] font-light leading-relaxed mb-6">
              {product.description || 'Experience premium quality and exceptional style with this stunning piece from our exclusive collection. Perfect for any occasion, crafted with attention to detail.'}
            </p>

            {/* Size Selection */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[#2c2c2c] font-medium">Select Size</span>
                <button className="text-[#b8860b] text-sm hover:underline">Size Guide</button>
              </div>
              <div className="flex gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 rounded-lg border-2 font-light transition-all duration-200 ${
                      selectedSize === size
                        ? 'border-[#b8860b] bg-[#b8860b] text-white'
                        : 'border-[#e0d9cc] hover:border-[#b8860b] text-[#2c2c2c]'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-6">
              <span className="text-[#2c2c2c] font-medium block mb-3">Quantity</span>
              <div className="flex items-center gap-4">
                <div className="flex items-center border-2 border-[#e0d9cc] rounded-lg overflow-hidden">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 flex items-center justify-center hover:bg-[#f8f7f4] transition-colors text-lg"
                  >
                    −
                  </button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 flex items-center justify-center hover:bg-[#f8f7f4] transition-colors text-lg"
                  >
                    +
                  </button>
                </div>
                <span className="text-[#666] text-sm font-light">In Stock</span>
              </div>
            </div>

            {/* Add to Cart Button */}
            <div className="mt-auto space-y-3">
              <AddToCartButton 
                product={{...product, quantity, size: selectedSize}} 
                className="w-full py-3.5 text-base"
                onAdd={onClose}
              />
              <button 
                onClick={handleWishlistClick}
                className={`w-full py-3 border-2 rounded-lg font-light transition-all duration-300 flex items-center justify-center gap-2 ${
                  inWishlist || wishlistAdded
                    ? 'border-[#e91e63] bg-[#e91e63]/10 text-[#e91e63]'
                    : 'border-[#e0d9cc] text-[#2c2c2c] hover:border-[#e91e63] hover:text-[#e91e63]'
                }`}
              >
                <svg className="w-5 h-5" fill={inWishlist ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                {wishlistAdded ? '✓ Added to Wishlist!' : inWishlist ? 'In Wishlist' : 'Add to Wishlist'}
              </button>
            </div>

            {/* Features */}
            <div className="mt-6 pt-6 border-t border-[#e0d9cc] grid grid-cols-3 gap-4 text-center">
              <div>
                <svg className="w-6 h-6 mx-auto mb-2 text-[#b8860b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
                <span className="text-xs text-[#666] font-light">Free Shipping</span>
              </div>
              <div>
                <svg className="w-6 h-6 mx-auto mb-2 text-[#b8860b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span className="text-xs text-[#666] font-light">Easy Returns</span>
              </div>
              <div>
                <svg className="w-6 h-6 mx-auto mb-2 text-[#b8860b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span className="text-xs text-[#666] font-light">Secure Payment</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
