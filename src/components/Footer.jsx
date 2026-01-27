import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-[#2c2c2c] to-[#1a1a1a] text-white mt-16">
      {/* Main Footer Content */}
      <div className="px-6 md:px-12 py-16 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand Section */}
          <div>
            <h2 className="text-3xl font-light mb-4 text-[#b8860b]">
              ✨ ZYRAA
            </h2>
            <p className="text-[#ccc] font-light text-sm mb-6 leading-relaxed">
              Discover premium fashion that elevates your personal style. Quality, elegance, and timeless designs in every piece.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-[#b8860b] flex items-center justify-center hover:bg-[#d4af37] transition-colors duration-300 group">
                <Facebook size={18} className="text-white group-hover:scale-110 transition-transform" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-[#b8860b] flex items-center justify-center hover:bg-[#d4af37] transition-colors duration-300 group">
                <Instagram size={18} className="text-white group-hover:scale-110 transition-transform" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-[#b8860b] flex items-center justify-center hover:bg-[#d4af37] transition-colors duration-300 group">
                <Twitter size={18} className="text-white group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-light mb-6 text-white border-b border-[#b8860b] pb-3">
              Collections
            </h3>
            <ul className="space-y-3">
              {[
                { name: 'Dresses', path: '/dresses' },
                { name: 'Jackets', path: '/jackets' },
                { name: 'Jeans', path: '/jeans' },
                { name: 'Party Wear', path: '/partywear' },
                { name: 'All Products', path: '/random' },
              ].map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="text-[#ccc] font-light hover:text-[#b8860b] transition-colors duration-300"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-light mb-6 text-white border-b border-[#b8860b] pb-3">
              Customer Service
            </h3>
            <ul className="space-y-3">
              {[
                { name: 'Track Order', path: '/delivery' },
                { name: 'Order History', path: '/history' },
                { name: 'Returns & Refunds', path: '#' },
                { name: 'FAQ', path: '#' },
                { name: 'Contact Us', path: '#' },
              ].map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="text-[#ccc] font-light hover:text-[#b8860b] transition-colors duration-300"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-light mb-6 text-white border-b border-[#b8860b] pb-3">
              Get in Touch
            </h3>
            <div className="space-y-4">
              <div className="flex gap-3 items-start">
                <Mail size={20} className="text-[#b8860b] mt-1 flex-shrink-0" />
                <div>
                  <p className="text-[#ccc] font-light text-sm">
                    support@zyraa.com
                  </p>
                </div>
              </div>
              <div className="flex gap-3 items-start">
                <Phone size={20} className="text-[#b8860b] mt-1 flex-shrink-0" />
                <div>
                  <p className="text-[#ccc] font-light text-sm">
                    +91-XXXX-XXXX-XXX
                  </p>
                </div>
              </div>
              <div className="flex gap-3 items-start">
                <MapPin size={20} className="text-[#b8860b] mt-1 flex-shrink-0" />
                <div>
                  <p className="text-[#ccc] font-light text-sm">
                    123 Fashion Street<br/>
                    New Delhi, India
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="bg-gradient-to-r from-[#b8860b] to-[#d4af37] rounded-lg p-8 mb-12">
          <div className="max-w-2xl">
            <h3 className="text-2xl font-light text-[#2c2c2c] mb-2">
              Subscribe to Our Newsletter
            </h3>
            <p className="text-[#333] font-light mb-6">
              Get exclusive offers, new arrivals, and style tips delivered to your inbox.
            </p>
            <div className="flex flex-col md:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-3 rounded-lg bg-white text-[#2c2c2c] font-light focus:outline-none focus:ring-2 focus:ring-[#2c2c2c]"
              />
              <button className="px-8 py-3 bg-[#2c2c2c] text-white rounded-lg font-light hover:bg-[#1a1a1a] transition-colors duration-300">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-[#444] pt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Features */}
            <div className="flex items-center gap-4">
              <div className="text-3xl">🚚</div>
              <div>
                <p className="font-light text-[#b8860b]">Free Delivery</p>
                <p className="text-[#999] font-light text-sm">On orders above ₹500</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-3xl">↩️</div>
              <div>
                <p className="font-light text-[#b8860b]">Easy Returns</p>
                <p className="text-[#999] font-light text-sm">30-day return policy</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-3xl">🔒</div>
              <div>
                <p className="font-light text-[#b8860b]">Secure Payment</p>
                <p className="text-[#999] font-light text-sm">100% encrypted & safe</p>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center pt-8 border-t border-[#444]">
            <p className="text-[#999] font-light text-sm mb-4">
              © {currentYear} ZYRAA Fashion. All rights reserved.
            </p>
            <div className="flex justify-center gap-6 text-[#999] font-light text-xs">
              <a href="#" className="hover:text-[#b8860b] transition-colors">Privacy Policy</a>
              <span>•</span>
              <a href="#" className="hover:text-[#b8860b] transition-colors">Terms of Service</a>
              <span>•</span>
              <a href="#" className="hover:text-[#b8860b] transition-colors">Shipping Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
