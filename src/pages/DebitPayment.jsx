import React, { useState } from 'react';
import { CheckCircle as CheckCircleIcon } from 'lucide-react';

export default function DebitPayment() {
  const [formData, setFormData] = useState({
    accountNumber: '',
    ifscCode: '',
    accountHolder: '',
  });
  const [confirmed, setConfirmed] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      formData.accountNumber &&
      formData.ifscCode &&
      formData.accountHolder
    ) {
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
          <p className="text-[#666] font-light mb-6 text-lg">
            Your debit payment has been processed successfully.
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
            Debit Payment
          </h1>
          <p className="text-[#666] font-light">Enter your bank details securely</p>
        </div>

        <form onSubmit={handleSubmit} className="card">
          <h2 className="text-2xl font-light text-[#2c2c2c] mb-6 pb-4 border-b border-[#e0d9cc]">
            Bank Account Details
          </h2>

          {/* Account Number */}
          <div className="mb-6">
            <label className="block text-[#2c2c2c] font-light mb-2 text-sm">
              Account Number
            </label>
            <input
              type="text"
              name="accountNumber"
              value={formData.accountNumber}
              onChange={handleChange}
              placeholder="Enter your account number"
              className="input-field"
              required
            />
          </div>

          {/* IFSC Code */}
          <div className="mb-6">
            <label className="block text-[#2c2c2c] font-light mb-2 text-sm">
              IFSC Code
            </label>
            <input
              type="text"
              name="ifscCode"
              value={formData.ifscCode}
              onChange={handleChange}
              placeholder="e.g., HDFC0001234"
              className="input-field"
              required
            />
          </div>

          {/* Account Holder Name */}
          <div className="mb-8">
            <label className="block text-[#2c2c2c] font-light mb-2 text-sm">
              Account Holder Name
            </label>
            <input
              type="text"
              name="accountHolder"
              value={formData.accountHolder}
              onChange={handleChange}
              placeholder="As per bank records"
              className="input-field"
              required
            />
          </div>

          {/* Security Notice */}
          <div className="bg-[#e8f5e9] border border-[#4caf50] rounded-lg p-6 mb-8">
            <div className="flex gap-3">
              <span className="text-2xl flex-shrink-0">🔒</span>
              <div>
                <h3 className="text-[#2c2c2c] font-light text-lg mb-2">Secure & Safe</h3>
                <p className="text-sm text-[#666] font-light">
                  Your banking details are encrypted and will never be stored. We use industry-standard security protocols.
                </p>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn btn-primary btn-lg w-full"
          >
            Process Payment →
          </button>
        </form>
      </div>
    </div>
  );
}
