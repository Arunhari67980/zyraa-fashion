import { useState } from 'react';
import { useCart } from '../context/CartContext';

export default function AddToCartButton({ product, className = '' }) {
  const { addToCart } = useCart();
  const [showSuccess, setShowSuccess] = useState(false);

  const handleAddToCart = () => {
    addToCart({
      id: product.id || Math.random(),
      name: product.name,
      price: product.price,
      image: product.image,
    });
    
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  return (
    <div className="relative">
      <button
        onClick={handleAddToCart}
        className={`px-6 py-2 bg-[#b8860b] text-white rounded hover:bg-[#9a7009] transition-all duration-300 font-light shadow-md hover:shadow-lg transform hover:scale-105 ${className}`}
      >
        Add to Cart
      </button>
      
      {showSuccess && (
        <div className="absolute top-0 left-0 right-0 mt-2 bg-[#4caf50] text-white px-4 py-2 rounded text-sm animate-bounce shadow-lg font-light">
          ✓ Added to cart!
        </div>
      )}
    </div>
  );
}
