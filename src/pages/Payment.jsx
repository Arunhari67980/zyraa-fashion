import React, { useState } from 'react';
import { CreditCard, DollarSign, CheckCircle as CheckCircleIcon } from 'lucide-react';

export default function Payment() {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  const handlePayment = (e) => {
    e.preventDefault();
    setTimeout(() => {
      setOrderConfirmed(true);
    }, 1000);
  };

  if (orderConfirmed) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#f8f7f4] via-white to-[#f8f7f4] py-12 px-6 md:px-12 flex items-center justify-center">
        <div className="text-center max-w-md card animate-scale">
          <div className="mb-6 mx-auto">
            <CheckCircleIcon size={80} className="text-[#4caf50] mx-auto" />
          </div>
          <h1 className="text-4xl font-light text-[#2c2c2c] mb-4 tracking-wide">
            Payment Successful! ✓
          </h1>
          <p className="text-[#666] font-light mb-8 text-lg">
            Your order has been confirmed. You will receive a confirmation email shortly.
          </p>
          <div className="bg-[#f4e4c1] p-4 rounded-lg mb-6">
            <p className="text-sm text-[#999] font-light">Order Number</p>
            <p className="text-2xl text-[#b8860b] font-light">ZYRAA{Math.random().toString().slice(2, 10)}</p>
          </div>
          <a href="/" className="btn btn-primary btn-lg inline-block">
            Return to Home
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8f7f4] via-white to-[#f8f7f4] py-12 px-6 md:px-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-light text-[#2c2c2c] mb-3 tracking-wide">
            Select Payment Method
          </h1>
          <p className="text-[#666] font-light">Choose your preferred way to pay</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Payment Methods */}
          <div className="lg:col-span-2">
            <form onSubmit={handlePayment} className="space-y-4 mb-8">
              {/* Card Payment */}
              <label className="card cursor-pointer group transition-all duration-300" style={{ borderColor: paymentMethod === 'card' ? '#b8860b' : '#e0d9cc', backgroundColor: paymentMethod === 'card' ? '#f4e4c1' : 'white' }}>
                <div className="flex items-center">
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={paymentMethod === 'card'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-5 h-5 accent-[#b8860b]"
                  />
                  <CreditCard className="ml-4 text-[#b8860b]" size={28} />
                  <div className="ml-4">
                    <h3 className="text-lg font-light text-[#2c2c2c]">
                      Credit/Debit Card
                    </h3>
                    <p className="text-sm text-[#999] font-light">
                      Visa, Mastercard, American Express
                    </p>
                  </div>
                </div>
              </label>

              {/* Online Banking */}
              <label className="card cursor-pointer group transition-all duration-300" style={{ borderColor: paymentMethod === 'online' ? '#b8860b' : '#e0d9cc', backgroundColor: paymentMethod === 'online' ? '#f4e4c1' : 'white' }}>
                <div className="flex items-center">
                  <input
                    type="radio"
                    name="payment"
                    value="online"
                    checked={paymentMethod === 'online'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-5 h-5 accent-[#b8860b]"
                  />
                  <DollarSign className="ml-4 text-[#b8860b]" size={28} />
                  <div className="ml-4">
                    <h3 className="text-lg font-light text-[#2c2c2c]">
                      Online Banking
                    </h3>
                    <p className="text-sm text-[#999] font-light">
                      Direct bank transfer
                    </p>
                  </div>
                </div>
              </label>

              {/* Cash on Delivery */}
              <label className="card cursor-pointer group transition-all duration-300" style={{ borderColor: paymentMethod === 'cash' ? '#b8860b' : '#e0d9cc', backgroundColor: paymentMethod === 'cash' ? '#f4e4c1' : 'white' }}>
                <div className="flex items-center">
                  <input
                    type="radio"
                    name="payment"
                    value="cash"
                    checked={paymentMethod === 'cash'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-5 h-5 accent-[#b8860b]"
                  />
                  <DollarSign className="ml-4 text-[#b8860b]" size={28} />
                  <div className="ml-4">
                    <h3 className="text-lg font-light text-[#2c2c2c]">
                      Cash on Delivery
                    </h3>
                    <p className="text-sm text-[#999] font-light">
                      Pay when you receive your order
                    </p>
                  </div>
                </div>
              </label>

              {/* Payment Details Form */}
              {paymentMethod === 'card' && (
                <div className="bg-white p-6 rounded-lg border border-[#e0d9cc] mt-6 animate-slide-up">
                  <h3 className="text-lg font-light text-[#2c2c2c] mb-4">Card Details</h3>
                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="Full Name on Card"
                      className="input-field"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Card Number (16 digits)"
                      className="input-field"
                      required
                    />
                    <div className="grid grid-cols-3 gap-4">
                      <input
                        type="text"
                        placeholder="MM/YY"
                        className="input-field"
                        required
                      />
                      <input
                        type="text"
                        placeholder="CVV"
                        className="input-field"
                        required
                      />
                      <input
                        type="text"
                        placeholder="Postal Code"
                        className="input-field"
                        required
                      />
                    </div>
                  </div>
                </div>
              )}

              <button
                type="submit"
                className="btn btn-primary btn-lg w-full mt-6"
              >
                Complete Payment
              </button>
            </form>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="card sticky top-24">
              <h3 className="text-xl font-light text-[#2c2c2c] mb-6 pb-4 border-b border-[#e0d9cc]">
                Order Summary
              </h3>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-[#666] font-light">
                  <span>Subtotal</span>
                  <span className="text-[#2c2c2c]">₹5,000</span>
                </div>
                <div className="flex justify-between text-[#666] font-light">
                  <span>Shipping</span>
                  <span className="text-[#2c2c2c]">₹100</span>
                </div>
                <div className="flex justify-between text-[#666] font-light">
                  <span>Tax (18%)</span>
                  <span className="text-[#2c2c2c]">₹918</span>
                </div>
              </div>

              <div className="border-t-2 border-[#e0d9cc] pt-4 flex justify-between mb-6">
                <span className="text-[#2c2c2c] font-light">Total</span>
                <span className="text-2xl text-[#b8860b] font-light">₹6,018</span>
              </div>

              {/* Security Info */}
              <div className="bg-[#f4e4c1] p-4 rounded-lg text-center">
                <p className="text-xs text-[#999] font-light">🔒 Your payment is secure</p>
                <p className="text-xs text-[#666] font-light mt-1">SSL encrypted connection</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
