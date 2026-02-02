import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Trash2 } from 'lucide-react';

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
  const total = getCartTotal();

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#f8f7f4] to-[#faf9f6] pt-20">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <h1 className="text-4xl font-light text-[#2c2c2c] mb-8">Shopping Cart</h1>
          
          <div className="bg-white rounded-lg p-12 text-center border border-[#e0d9cc]">
            <p className="text-xl text-[#555] mb-8 font-light">Your cart is empty</p>
            <Link
              to="/"
              className="inline-block px-8 py-3 bg-[#b8860b] text-white rounded hover:bg-[#9a7009] transition-colors font-light"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8f7f4] to-[#faf9f6] pt-20">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-light text-[#2c2c2c] mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {cartItems.map((item) => {
                const price = typeof item.price === 'string'
                  ? parseFloat(item.price.replace('₹', '').replace(',', ''))
                  : item.price;
                const itemTotal = price * (item.quantity || 1);

                return (
                  <div
                    key={item.id}
                    className="flex gap-4 bg-white p-4 rounded-lg hover:shadow-md transition-shadow border border-[#e0d9cc]"
                  >
                    {/* Product Image */}
                    <div className="w-24 h-24 flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover rounded"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/100?text=No+Image';
                        }}
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1">
                      <h3 className="text-lg font-light text-[#2c2c2c]">{item.name}</h3>
                      <p className="text-[#b8860b] font-light text-lg">₹{price.toFixed(2)}</p>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2 mt-3">
                        <button
                          onClick={() => updateQuantity(item.id, (item.quantity || 1) - 1)}
                          className="px-3 py-1 border border-[#e0d9cc] rounded hover:bg-[#f4e4c1] transition duration-300 text-[#2c2c2c]"
                        >
                          −
                        </button>
                        <span className="px-4 py-1 border border-[#e0d9cc] rounded text-[#2c2c2c]">
                          {item.quantity || 1}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}
                          className="px-3 py-1 border border-[#e0d9cc] rounded hover:bg-[#f4e4c1] transition duration-300 text-[#2c2c2c]"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Price and Remove */}
                    <div className="text-right flex flex-col justify-between">
                      <p className="text-lg font-light text-[#2c2c2c]">₹{itemTotal.toFixed(2)}</p>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-[#d32f2f] hover:text-[#c62828] transition duration-300"
                        title="Remove from cart"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Clear Cart Button */}
            <button
              onClick={clearCart}
              className="mt-6 w-full py-2 border border-[#d32f2f] text-[#d32f2f] rounded hover:bg-[#ffebee] transition duration-300 font-light"
            >
              Clear Cart
            </button>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 sticky top-24 border border-[#e0d9cc]">
              <h2 className="text-2xl font-light text-[#2c2c2c] mb-6">Order Summary</h2>

              <div className="space-y-3 mb-6 border-b border-[#e0d9cc] pb-6">
                <div className="flex justify-between text-[#555]">
                  <span>Subtotal</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[#555]">
                  <span>Shipping</span>
                  <span>₹100.00</span>
                </div>
                <div className="flex justify-between text-[#555]">
                  <span>Tax</span>
                  <span>₹{(total * 0.18).toFixed(2)}</span>
                </div>
              </div>

              <div className="flex justify-between text-xl font-light text-[#2c2c2c] mb-6">
                <span>Total</span>
                <span className="text-[#b8860b]">₹{(total + 100 + (total * 0.18)).toFixed(2)}</span>
              </div>

              <Link
                to="/payment"
                className="block w-full text-center px-6 py-3 bg-[#b8860b] text-white rounded hover:bg-[#9a7009] transition-colors duration-300 mb-3 font-light"
              >
                Checkout
              </Link>

              <Link
                to="/"
                className="block w-full text-center px-6 py-3 border border-[#e0d9cc] text-[#2c2c2c] rounded hover:bg-[#f4e4c1] transition duration-300 font-light"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
