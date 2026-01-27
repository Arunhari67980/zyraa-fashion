import React from 'react';
import { CheckCircle as CheckCircleIcon } from 'lucide-react';

export default function OnlinePayment() {
  const [selectedBank, setSelectedBank] = React.useState('');
  const [confirmed, setConfirmed] = React.useState(false);

  const banks = [
    'HDFC Bank',
    'ICICI Bank',
    'State Bank of India',
    'Axis Bank',
    'Kotak Mahindra Bank',
  ];

  const handlePayment = (e) => {
    e.preventDefault();
    if (selectedBank) {
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
            Payment Initiated!
          </h1>
          <p className="text-[#666] font-light mb-4 text-lg">
            You will be redirected to <strong>{selectedBank}</strong> for authentication.
          </p>
          <p className="text-sm text-[#999] font-light mb-6">
            Please complete the OTP verification to confirm your payment.
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
            Online Payment
          </h1>
          <p className="text-[#666] font-light">Select your bank for secure payment</p>
        </div>

        <form onSubmit={handlePayment}>
          {/* Bank Selection */}
          <div className="card mb-8">
            <h2 className="text-2xl font-light text-[#2c2c2c] mb-6 pb-4 border-b border-[#e0d9cc]">
              Select Your Bank
            </h2>
            <div className="space-y-3">
              {banks.map((bank) => (
                <label
                  key={bank}
                  className="flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all hover:shadow-md"
                  style={{
                    borderColor: selectedBank === bank ? '#b8860b' : '#e0d9cc',
                    backgroundColor: selectedBank === bank ? '#f4e4c1' : 'transparent',
                  }}
                >
                  <input
                    type="radio"
                    name="bank"
                    value={bank}
                    checked={selectedBank === bank}
                    onChange={(e) => setSelectedBank(e.target.value)}
                    className="w-5 h-5 accent-[#b8860b] flex-shrink-0"
                  />
                  <span className="ml-4 text-lg font-light text-[#2c2c2c]">
                    🏦 {bank}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Security Info */}
          <div className="bg-[#e8f5e9] border border-[#4caf50] rounded-lg p-6 mb-8">
            <div className="flex gap-3">
              <span className="text-2xl flex-shrink-0">🔒</span>
              <div>
                <h3 className="text-[#2c2c2c] font-light text-lg mb-2">Secure Payment</h3>
                <p className="text-sm text-[#666] font-light">
                  Your payment is protected with industry-standard SSL encryption. Your banking details are never shared with us.
                </p>
              </div>
            </div>
          </div>

          {/* Payment Button */}
          <button
            type="submit"
            disabled={!selectedBank}
            className="btn btn-primary btn-lg w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Proceed to Payment →
          </button>
        </form>
      </div>
    </div>
  );
}
