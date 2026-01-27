import React, { useState } from 'react';
import { CheckCircle as CheckCircleIcon } from 'lucide-react';

export default function CashPayment() {
  const [agreed, setAgreed] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const handleConfirm = (e) => {
    e.preventDefault();
    if (agreed) {
      setConfirmed(true);
    }
  };

  if (confirmed) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#f8f7f4] via-white to-[#f8f7f4] py-12 px-6 md:px-12 flex items-center justify-center">
        <div className="text-center max-w-md card animate-scale">
          <div className="mb-6 mx-auto">
            <CheckCircleIcon size={80} className="text-[#4caf50] mx-auto" />
          </div>
          <h1 className="text-4xl font-light text-[#2c2c2c] mb-4 tracking-wide">
            Order Confirmed!
          </h1>
          <p className="text-[#666] font-light mb-6 text-lg">
            Your order has been placed. Please keep ₹XXXX.XX ready in cash at the time of delivery.
          </p>
          <div className="bg-[#fff3e0] p-4 rounded-lg mb-6 border border-[#ffb74d]">
            <p className="text-sm text-[#ff9800] font-light">📍 Order #: ZYRAA{Math.random().toString().slice(2, 10)}</p>
          </div>
          <p className="text-sm text-[#999] font-light mb-6">
            Expected Delivery: 2-3 business days
          </p>
          <a href="/" className="btn btn-primary inline-block">
            Return Home
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8f7f4] via-white to-[#f8f7f4] py-12 px-6 md:px-12">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-light text-[#2c2c2c] mb-3 tracking-wide">
            Cash on Delivery
          </h1>
          <p className="text-[#666] font-light">Pay safely when your order arrives</p>
        </div>

        {/* Info Card */}
        <div className="card mb-8 animate-slide-up">
          <h2 className="text-2xl font-light text-[#2c2c2c] mb-6 pb-4 border-b border-[#e0d9cc]">
            How Cash on Delivery Works
          </h2>
          <div className="space-y-4">
            <div className="flex gap-4 items-start">
              <span className="text-3xl text-[#b8860b] font-light flex-shrink-0 w-10 h-10 flex items-center justify-center bg-[#f4e4c1] rounded-lg">1</span>
              <div>
                <h3 className="text-[#2c2c2c] font-light text-lg mb-1">Place Your Order</h3>
                <p className="text-[#666] font-light text-sm">Complete your purchase without making any advance payment</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <span className="text-3xl text-[#b8860b] font-light flex-shrink-0 w-10 h-10 flex items-center justify-center bg-[#f4e4c1] rounded-lg">2</span>
              <div>
                <h3 className="text-[#2c2c2c] font-light text-lg mb-1">Receive Your Package</h3>
                <p className="text-[#666] font-light text-sm">Our delivery partner will bring your order to your address</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <span className="text-3xl text-[#b8860b] font-light flex-shrink-0 w-10 h-10 flex items-center justify-center bg-[#f4e4c1] rounded-lg">3</span>
              <div>
                <h3 className="text-[#2c2c2c] font-light text-lg mb-1">Pay in Cash</h3>
                <p className="text-[#666] font-light text-sm">Pay the exact amount when you receive your order</p>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="card text-center">
            <div className="text-3xl mb-2">✓</div>
            <p className="text-[#2c2c2c] font-light">No Advance Payment</p>
          </div>
          <div className="card text-center">
            <div className="text-3xl mb-2">🛡️</div>
            <p className="text-[#2c2c2c] font-light">Safe & Secure</p>
          </div>
        </div>

        {/* Confirmation Form */}
        <form onSubmit={handleConfirm} className="card">
          <h2 className="text-2xl font-light text-[#2c2c2c] mb-6">Confirm Your Order</h2>
          
          <div className="bg-[#e8f5e9] border border-[#4caf50] rounded-lg p-6 mb-6">
            <p className="text-[#2c2c2c] font-light">
              <strong>Order Amount:</strong> ₹XXXX.XX (including tax & shipping)
            </p>
          </div>

          <div className="mb-6">
            <label className="flex items-start gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="w-5 h-5 accent-[#b8860b] mt-1 flex-shrink-0"
                required
              />
              <span className="text-[#666] font-light group-hover:text-[#2c2c2c] transition-colors">
                I agree to place this order using Cash on Delivery. I understand that I need to pay the exact amount when the package arrives.
              </span>
            </label>
          </div>

          <button
            type="submit"
            disabled={!agreed}
            className="btn btn-primary btn-lg w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Confirm Order
          </button>
        </form>
      </div>
    </div>
  );
}
