import React, { useState } from 'react';
import { CheckCircle } from 'lucide-react';

export default function Delivery() {
  const [trackingCode, setTrackingCode] = useState('');
  const [trackingStatus, setTrackingStatus] = useState(null);

  const handleTrack = (e) => {
    e.preventDefault();
    if (trackingCode.trim()) {
      // Mock tracking response
      setTrackingStatus({
        order: trackingCode,
        status: 'In Transit',
        estimatedDelivery: '2-3 business days',
        location: 'Distribution Center',
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8f7f4] via-white to-[#f8f7f4] py-12 px-6 md:px-12">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-light text-[#2c2c2c] mb-3 tracking-wide">
            Track Your Delivery
          </h1>
          <p className="text-[#666] font-light">Monitor your order status in real-time</p>
        </div>

        {/* Tracking Form */}
        <div className="bg-white rounded-lg border border-[#e0d9cc] p-8 md:p-10 shadow-md mb-12 animate-slide-up">
          <h2 className="text-2xl font-light text-[#2c2c2c] mb-6">Enter Tracking Information</h2>
          
          <form onSubmit={handleTrack} className="space-y-6">
            <div>
              <label className="block text-[#2c2c2c] font-light mb-3">
                Order/Tracking Code
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={trackingCode}
                  onChange={(e) => setTrackingCode(e.target.value)}
                  placeholder="e.g., ZYRAA123456789"
                  className="input-field pl-12"
                />
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#b8860b] text-xl">📦</span>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-lg w-full"
            >
              Track Order Now
            </button>
          </form>
        </div>

        {/* Tracking Status */}
        {trackingStatus && (
          <div className="bg-gradient-to-br from-[#e8f5e9] to-[#f1f8e9] border-l-4 border-[#4caf50] rounded-lg p-8 mb-12 animate-slide-up">
            <div className="flex items-center gap-3 mb-6">
              <CheckCircle className="text-[#4caf50]" size={32} />
              <div>
                <h2 className="text-2xl font-light text-[#2c2c2c]">Order Found!</h2>
                <p className="text-[#666] font-light text-sm">Your package is on its way</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white bg-opacity-60 p-4 rounded-lg">
                <p className="text-[#999] text-xs font-light uppercase tracking-wider">Order Number</p>
                <p className="text-lg text-[#2c2c2c] font-light mt-2">{trackingStatus.order}</p>
              </div>
              <div className="bg-white bg-opacity-60 p-4 rounded-lg">
                <p className="text-[#999] text-xs font-light uppercase tracking-wider">Status</p>
                <p className="text-lg text-[#4caf50] font-light mt-2">⭐ {trackingStatus.status}</p>
              </div>
              <div className="bg-white bg-opacity-60 p-4 rounded-lg">
                <p className="text-[#999] text-xs font-light uppercase tracking-wider">Current Location</p>
                <p className="text-lg text-[#2c2c2c] font-light mt-2">📍 {trackingStatus.location}</p>
              </div>
              <div className="bg-white bg-opacity-60 p-4 rounded-lg">
                <p className="text-[#999] text-xs font-light uppercase tracking-wider">Estimated Delivery</p>
                <p className="text-lg text-[#2c2c2c] font-light mt-2">📅 {trackingStatus.estimatedDelivery}</p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="bg-white bg-opacity-80 p-4 rounded-lg">
              <div className="flex justify-between text-xs font-light text-[#999] mb-3">
                <span>Order Placed</span>
                <span>Processing</span>
                <span>Shipped</span>
                <span>Delivered</span>
              </div>
              <div className="w-full bg-[#e0d9cc] h-2 rounded-full overflow-hidden">
                <div className="w-2/3 h-full bg-gradient-accent rounded-full"></div>
              </div>
            </div>
          </div>
        )}

        {/* Info Cards */}
        <div className="mt-12">
          <h2 className="text-2xl font-light text-[#2c2c2c] mb-8 text-center">Why Choose ZYRAA Delivery?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card text-center hover-lift">
              <div className="text-4xl mb-4">🚚</div>
              <h3 className="text-lg font-light text-[#2c2c2c] mb-2">Free Delivery</h3>
              <p className="text-[#666] text-sm font-light">On all orders over ₹500</p>
            </div>

            <div className="card text-center hover-lift">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-lg font-light text-[#2c2c2c] mb-2">Fast Shipping</h3>
              <p className="text-[#666] text-sm font-light">2-3 business days delivery</p>
            </div>

            <div className="card text-center hover-lift">
              <div className="text-4xl mb-4">↩️</div>
              <h3 className="text-lg font-light text-[#2c2c2c] mb-2">Easy Returns</h3>
              <p className="text-[#666] text-sm font-light">30-day hassle-free returns</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
