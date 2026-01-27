import React, { useState } from 'react';
import { Search as SearchIcon } from 'lucide-react';

export default function Search() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  const allProducts = [
    { id: 1, name: 'Classic Dress', category: 'dresses' },
    { id: 2, name: 'Leather Jacket', category: 'jackets' },
    { id: 3, name: 'Blue Jeans', category: 'jeans' },
    { id: 4, name: 'Black Pants', category: 'pants' },
    { id: 5, name: 'Party Dress', category: 'partywear' },
    { id: 6, name: 'Cotton Shorts', category: 'shorts' },
    { id: 7, name: 'Denim Skirt', category: 'skirts' },
    { id: 8, name: 'Wool Sweater', category: 'sweaters' },
    { id: 9, name: 'Tank Top', category: 'tanktops' },
    { id: 10, name: 'White T-Shirt', category: 'whitetshirt' },
    { id: 11, name: 'Winter Coat', category: 'coats' },
    { id: 12, name: 'Black Dress', category: 'black' },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    setHasSearched(true);

    if (searchQuery.trim() === '') {
      setSearchResults([]);
      return;
    }

    const results = allProducts.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(results);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8f7f4] via-white to-[#f8f7f4] py-12 px-6 md:px-12">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-light text-[#2c2c2c] mb-3 tracking-wide">
            Find Your Perfect Style
          </h1>
          <p className="text-[#666] font-light">Search through our complete collection</p>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="mb-12">
          <div className="relative flex items-center bg-white rounded-lg border-2 border-[#e0d9cc] shadow-md hover:border-[#b8860b] transition-colors duration-300 overflow-hidden">
            <input
              type="text"
              placeholder="Search products, styles, brands..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-6 py-4 outline-none font-light text-[#2c2c2c] placeholder-[#999] bg-transparent"
            />
            <button
              type="submit"
              className="px-6 py-4 text-[#b8860b] hover:text-white hover:bg-[#b8860b] transition-all duration-300"
              aria-label="Search"
            >
              <SearchIcon size={24} />
            </button>
          </div>
        </form>

        {/* Results */}
        {hasSearched && (
          <div className="animate-slide-up">
            {searchResults.length > 0 ? (
              <div>
                <div className="flex items-center gap-3 mb-8">
                  <h2 className="text-2xl font-light text-[#2c2c2c]">
                    Search Results
                  </h2>
                  <span className="bg-[#b8860b] text-white px-3 py-1 rounded-full text-sm font-light">
                    {searchResults.length}
                  </span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {searchResults.map((product) => (
                    <div
                      key={product.id}
                      className="card group hover-lift"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-light text-[#2c2c2c] group-hover:text-[#b8860b] transition-colors duration-300">
                            {product.name}
                          </h3>
                          <p className="text-[#999] text-sm font-light capitalize mt-1">
                            <span className="text-[#b8860b] font-normal">Category:</span> {product.category}
                          </p>
                        </div>
                        <span className="text-3xl text-[#b8860b] opacity-20">✓</span>
                      </div>
                      
                      <button className="btn btn-primary w-full mt-4">
                        View Product →
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-lg border border-[#e0d9cc]">
                <div className="text-6xl mb-4 opacity-30">🔍</div>
                <p className="text-[#2c2c2c] font-light text-xl mb-2">
                  No products found for "<span className="text-[#b8860b]">{searchQuery}</span>"
                </p>
                <p className="text-[#999] text-sm font-light">
                  Try searching for different keywords or browse our collections
                </p>
              </div>
            )}
          </div>
        )}

        {!hasSearched && (
          <div className="text-center py-16 bg-white rounded-lg border border-[#e0d9cc]">
            <div className="text-6xl mb-4 opacity-30">👗</div>
            <p className="text-[#2c2c2c] font-light text-lg">
              Start searching to discover amazing products
            </p>
            <p className="text-[#999] font-light text-sm mt-2">
              Search by product name, category, or style
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
