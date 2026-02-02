import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Search, ShoppingCart, User, LogOut } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();
  const { getCartCount } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  const cartCount = getCartCount();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    setActiveDropdown(null);
  };

  const toggleDropdown = (name) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  const handleMenuItemClick = () => {
    setMenuOpen(false);
    setActiveDropdown(null);
  };

  const handleSearch = () => {
    navigate('/search');
    handleMenuItemClick();
  };

  const handleCartClick = () => {
    navigate('/cart');
    handleMenuItemClick();
  };

  const categories = [
    { name: 'Dresses', path: '/dresses' },
    { name: 'Jackets', path: '/jackets' },
    { name: 'Jeans', path: '/jeans' },
    { name: 'Pants', path: '/pants' },
    { name: 'Party Wear', path: '/partywear' },
    { name: 'Shorts', path: '/shorts' },
    { name: 'Skirts', path: '/skirts' },
    { name: 'Sweaters', path: '/sweaters' },
    { name: 'Tank Tops', path: '/tanktops' },
    { name: 'T-Shirts', path: '/whitetshirt' },
    { name: 'Coats', path: '/coats' },
    { name: 'Black', path: '/black' },
  ];

  return (
    <>
      <header className="flex justify-between items-center px-4 md:px-8 py-4 bg-gradient-to-r from-[#f8f7f4] to-[#faf9f6] border-b border-[#e0d9cc] shadow-sm relative z-50">
        {/* Left Section */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Menu Button */}
          <button
            onClick={toggleMenu}
            className="text-gray-800 p-2 hover:bg-gray-100 rounded transition-colors md:hidden"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Logo/Brand */}
          <Link
            to="/"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity duration-300"
          >
            <img
              src="/pics/logo.png"
              alt="ZYRAA Logo"
              className="h-10 md:h-12 w-auto object-contain"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
            <span className="text-xl md:text-2xl font-light text-[#2c2c2c] hover:text-[#b8860b] transition-colors duration-300">
              ZYRAA
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <div className="relative group">
            <button className="text-[#2c2c2c] hover:text-[#b8860b] transition-colors font-light text-sm md:text-base duration-300 py-2">
              Collections
            </button>
            <div className="invisible group-hover:visible opacity-0 group-hover:opacity-100 absolute left-0 top-full bg-white shadow-lg rounded-lg min-w-48 py-2 z-50 border border-[#e0d9cc] transition-all duration-200 max-h-80 overflow-y-auto">
              {categories.map((cat) => (
                <Link
                  key={cat.path}
                  to={cat.path}
                  className="block px-4 py-2 text-[#2c2c2c] hover:bg-[#f4e4c1] hover:text-[#b8860b] text-sm font-light transition-colors duration-200"
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>
        </nav>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          <button
            onClick={handleSearch}
            className="text-[#2c2c2c] hover:text-[#b8860b] p-2 transition-colors duration-300 hidden md:block"
            aria-label="Search"
          >
            <Search size={20} />
          </button>
          
          {/* Cart Icon */}
          <button
            onClick={handleCartClick}
            className="text-[#2c2c2c] hover:text-[#b8860b] p-2 transition-colors duration-300 relative"
            aria-label="Shopping cart"
          >
            <ShoppingCart size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#b8860b] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </button>

          {/* User Menu / Login Button */}
          {isAuthenticated ? (
            <div className="relative hidden md:block">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 text-[#2c2c2c] hover:text-[#b8860b] p-2 transition-colors duration-300"
              >
                <div className="w-8 h-8 rounded-full bg-[#b8860b] flex items-center justify-center text-white text-sm font-medium">
                  {user?.name?.charAt(0).toUpperCase() || 'U'}
                </div>
              </button>
              
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-[#e0d9cc] py-2 z-50">
                  <div className="px-4 py-2 border-b border-[#e0d9cc]">
                    <p className="text-sm font-medium text-[#2c2c2c]">{user?.name}</p>
                    <p className="text-xs text-[#999]">{user?.email}</p>
                  </div>
                  <Link
                    to="/history"
                    onClick={() => setShowUserMenu(false)}
                    className="block px-4 py-2 text-sm text-[#2c2c2c] hover:bg-[#f4e4c1] transition-colors"
                  >
                    Order History
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setShowUserMenu(false);
                      navigate('/');
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2"
                  >
                    <LogOut size={16} />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="hidden md:flex items-center gap-2 px-4 py-2 bg-[#b8860b] text-white rounded-lg hover:bg-[#9a7009] transition-colors duration-300 text-sm font-light"
            >
              <User size={18} />
              Sign In
            </Link>
          )}
        </div>
      </header>

      {/* Mobile Slide Menu */}
      {menuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" onClick={toggleMenu} />
      )}

      <nav
        className={`fixed left-0 top-0 h-full w-72 bg-gradient-to-b from-[#f8f7f4] to-[#faf9f6] shadow-lg transform transition-transform duration-300 ease-in-out z-50 overflow-y-auto md:hidden ${
          menuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6">
          <button
            onClick={toggleMenu}
            className="absolute top-4 right-4 text-gray-700 hover:text-gray-900"
          >
            <X size={24} />
          </button>

          <div className="mt-12 space-y-2">
            {/* Cart in Mobile Menu */}
            <button
              onClick={handleCartClick}
              className="w-full text-left px-4 py-3 text-[#2c2c2c] hover:bg-[#f4e4c1] rounded flex items-center gap-2 font-light text-sm relative transition-colors duration-200"
            >
              <ShoppingCart size={18} />
              Cart
              {cartCount > 0 && (
                <span className="ml-auto bg-[#b8860b] text-white text-xs rounded-full px-2 py-0.5">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Search in Mobile Menu */}
            <button
              onClick={handleSearch}
              className="w-full text-left px-4 py-3 text-[#2c2c2c] hover:bg-[#f4e4c1] rounded flex items-center gap-2 font-light text-sm transition-colors duration-200"
            >
              <Search size={18} />
              Search
            </button>

            <hr className="my-4" />

            {/* Collections Dropdown */}
            <div>
              <button
                onClick={() => toggleDropdown('collections')}
                className="w-full text-left px-4 py-3 text-[#2c2c2c] hover:bg-[#f4e4c1] rounded font-light flex justify-between items-center text-sm transition-colors duration-200"
              >
                Collections
                <span
                  className={`transform transition-transform ${
                    activeDropdown === 'collections' ? 'rotate-180' : ''
                  }`}
                >
                  ▼
                </span>
              </button>

              {activeDropdown === 'collections' && (
                <div className="bg-[#f4e4c1] border-l-4 border-[#b8860b]">
                  {categories.map((cat) => (
                    <Link
                      key={cat.path}
                      to={cat.path}
                      onClick={handleMenuItemClick}
                      className="block px-8 py-2 text-[#2c2c2c] hover:bg-[#e6d5aa] text-xs font-light transition-colors duration-200"
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <hr className="my-4" />

            {/* Other Links */}
            <Link
              to="/history"
              onClick={handleMenuItemClick}
              className="block px-4 py-3 text-[#2c2c2c] hover:bg-[#f4e4c1] rounded font-light text-sm transition-colors duration-200"
            >
              Order History
            </Link>
            <Link
              to="/online"
              onClick={handleMenuItemClick}
              className="block px-4 py-3 text-[#2c2c2c] hover:bg-[#f4e4c1] rounded font-light text-sm transition-colors duration-200"
            >
              Online Payments
            </Link>
            <Link
              to="/delivery"
              onClick={handleMenuItemClick}
              className="block px-4 py-3 text-[#2c2c2c] hover:bg-[#f4e4c1] rounded font-light text-sm transition-colors duration-200"
            >
              Delivery
            </Link>
            <Link
              to="/confirm"
              onClick={handleMenuItemClick}
              className="block px-4 py-3 text-[#2c2c2c] hover:bg-[#f4e4c1] rounded font-light text-sm transition-colors duration-200"
            >
              Confirm Order
            </Link>

            <hr className="my-4" />

            {/* Auth Links in Mobile */}
            {isAuthenticated ? (
              <>
                <div className="px-4 py-3 bg-[#f4e4c1] rounded mb-2">
                  <p className="text-sm font-medium text-[#2c2c2c]">{user?.name}</p>
                  <p className="text-xs text-[#999]">{user?.email}</p>
                </div>
                <button
                  onClick={() => {
                    logout();
                    handleMenuItemClick();
                    navigate('/');
                  }}
                  className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 rounded font-light text-sm transition-colors duration-200 flex items-center gap-2"
                >
                  <LogOut size={18} />
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={handleMenuItemClick}
                  className="block px-4 py-3 bg-[#b8860b] text-white text-center rounded font-light text-sm transition-colors duration-200 hover:bg-[#9a7009]"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  onClick={handleMenuItemClick}
                  className="block px-4 py-3 text-[#2c2c2c] text-center border border-[#e0d9cc] rounded font-light text-sm transition-colors duration-200 hover:bg-[#f4e4c1] mt-2"
                >
                  Create Account
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
