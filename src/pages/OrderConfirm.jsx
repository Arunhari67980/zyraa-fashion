import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

export default function OrderConfirm() {
  const navigate = useNavigate();
  const { cartItems, placeOrder } = useContext(CartContext);
  
  const [orderForm, setOrderForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
  });

  const [confirmed, setConfirmed] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      orderForm.fullName &&
      orderForm.email &&
      orderForm.phone &&
      orderForm.address &&
      cartItems.length > 0
    ) {
      // Create order with local storage
      const order = placeOrder({
        customerName: orderForm.fullName,
        email: orderForm.email,
        phone: orderForm.phone,
        address: orderForm.address,
        city: orderForm.city,
        zipCode: orderForm.zipCode,
      });
      setOrderDetails(order);
      setConfirmed(true);
    }
  };

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#f8f7f4] via-white to-[#f8f7f4] py-12 px-6 md:px-12 flex items-center justify-center">
        <div className="text-center max-w-md card">
          <div className="text-6xl mb-4 opacity-30">🛒</div>
          <p className="text-[#2c2c2c] font-light text-2xl mb-2">Cart is Empty</p>
          <p className="text-[#666] text-sm font-light mb-8">Please add items to your cart before checkout</p>
          <button onClick={() => navigate('/')} className="btn btn-primary">
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  if (confirmed) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#f8f7f4] via-white to-[#f8f7f4] py-12 px-6 md:px-12 flex items-center justify-center">
        <div className="text-center max-w-md card animate-scale">
          <div className="mb-6">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-[#4caf50] to-[#45a049] rounded-full">
              <span className="text-5xl">✓</span>
            </div>
          </div>
          <h1 className="text-4xl font-light text-[#2c2c2c] mb-4 tracking-wide">
            Order Confirmed! 🎉
          </h1>
          <p className="text-[#666] font-light mb-6 text-lg">
            Thank you for your purchase. A confirmation email has been sent to:
          </p>
          <div className="bg-[#f4e4c1] px-4 py-3 rounded-lg mb-6">
            <p className="text-[#b8860b] font-light">{orderForm.email}</p>
          </div>
          <div className="space-y-3 mb-8 text-left bg-[#fafaf8] p-4 rounded">
            <p className="text-[#666] font-light text-sm"><strong className="text-[#2c2c2c]">Order #:</strong> {orderDetails?.id}</p>
            <p className="text-[#666] font-light text-sm"><strong className="text-[#2c2c2c]">Items:</strong> {orderDetails?.items.length}</p>
            <p className="text-[#666] font-light text-sm"><strong className="text-[#2c2c2c]">Total:</strong> ₹{orderDetails?.total.toFixed(2)}</p>
            <p className="text-[#666] font-light text-sm"><strong className="text-[#2c2c2c]">Delivery to:</strong> {orderForm.address}, {orderForm.city}</p>
            <p className="text-[#666] font-light text-sm"><strong className="text-[#2c2c2c]">Estimated:</strong> 2-3 business days</p>
          </div>
          <div className="space-y-3">
            <button onClick={() => navigate('/orders')} className="btn btn-primary btn-lg block w-full">
              View Order History
            </button>
            <button onClick={() => navigate('/')} className="btn btn-secondary btn-lg block w-full">
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  const cartTotal = cartItems.reduce((total, item) => {
    const price = typeof item.price === 'string' 
      ? parseFloat(item.price.replace('₹', '').replace(',', ''))
      : item.price;
    return total + (price * (item.quantity || 1));
  }, 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8f7f4] via-white to-[#f8f7f4] py-12 px-6 md:px-12">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-light text-[#2c2c2c] mb-3 tracking-wide">
            Complete Order Details
          </h1>
          <p className="text-[#666] font-light">Please provide your delivery information</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8 card">
          {/* Personal Information */}
          <div>
            <h2 className="text-2xl font-light text-[#2c2c2c] mb-6 pb-4 border-b border-[#e0d9cc]">
              Personal Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[#2c2c2c] font-light mb-3">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={orderForm.fullName}
                  onChange={handleChange}
                  className="input-field"
                  required
                />
              </div>
              <div>
                <label className="block text-[#2c2c2c] font-light mb-3">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={orderForm.email}
                  onChange={handleChange}
                  className="input-field"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div>
                <label className="block text-[#2c2c2c] font-light mb-3">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={orderForm.phone}
                  onChange={handleChange}
                  className="input-field"
                  required
                />
              </div>
              <div>
                <label className="block text-[#2c2c2c] font-light mb-3">
                  Zip Code
                </label>
                <input
                  type="text"
                  name="zipCode"
                  value={orderForm.zipCode}
                  onChange={handleChange}
                  className="input-field"
                />
              </div>
            </div>
          </div>

          {/* Delivery Address */}
          <div>
            <h2 className="text-2xl font-light text-[#2c2c2c] mb-6 pb-4 border-b border-[#e0d9cc]">
              Delivery Address
            </h2>
            
            <div>
              <label className="block text-[#2c2c2c] font-light mb-3">
                Street Address *
              </label>
              <textarea
                name="address"
                value={orderForm.address}
                onChange={handleChange}
                rows="3"
                placeholder="Enter your complete delivery address"
                className="input-field resize-none"
                required
              ></textarea>
            </div>

            <div className="mt-6">
              <label className="block text-[#2c2c2c] font-light mb-3">
                City/Town *
              </label>
              <input
                type="text"
                name="city"
                value={orderForm.city}
                onChange={handleChange}
                className="input-field"
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn btn-primary btn-lg w-full mt-8"
          >
            Confirm Order & Proceed to Payment
          </button>
        </form>

        {/* Order Summary Sidebar */}
        <div className="mt-8 card bg-gradient-to-br from-[#f9f8f5] to-[#f4e4c1] border border-[#e0d9cc]">
          <h3 className="text-xl font-light text-[#2c2c2c] mb-6 pb-4 border-b border-[#e0d9cc]">
            Order Summary
          </h3>
          <div className="space-y-3 mb-6">
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span className="text-[#666] font-light">{item.name} × {item.quantity}</span>
                <span className="text-[#2c2c2c] font-light">
                  ₹{(item.price * (item.quantity || 1)).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
          <div className="border-t border-[#e0d9cc] pt-4">
            <div className="flex justify-between text-lg">
              <span className="text-[#2c2c2c] font-light">Total</span>
              <span className="text-[#b8860b] font-light">₹{cartTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Info Box */}
        <div className="mt-8 bg-[#f4e4c1] p-6 rounded-lg border border-[#e0d9cc]">
          <p className="text-[#666] font-light text-sm">
            <strong className="text-[#b8860b]">💡 Note:</strong> Please ensure all information is correct before confirming. You'll proceed to payment after this step.
          </p>
        </div>
      </div>
    </div>
  );
}
