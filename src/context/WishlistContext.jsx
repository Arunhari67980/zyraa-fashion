import { createContext, useContext, useState, useCallback, useEffect } from 'react';

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState(() => {
    // Initialize from localStorage
    const saved = localStorage.getItem('wishlistItems');
    return saved ? JSON.parse(saved) : [];
  });

  // Save wishlistItems to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('wishlistItems', JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  const addToWishlist = useCallback((product) => {
    setWishlistItems(prevItems => {
      // Check if product already exists in wishlist
      const existingItem = prevItems.find(item => item.id === product.id);
      
      if (existingItem) {
        // If exists, don't add again
        return prevItems;
      } else {
        // Add new item
        return [...prevItems, { 
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          category: product.category,
          addedAt: new Date().toISOString()
        }];
      }
    });
  }, []);

  const removeFromWishlist = useCallback((productId) => {
    setWishlistItems(prevItems => prevItems.filter(item => item.id !== productId));
  }, []);

  const isInWishlist = useCallback((productId) => {
    return wishlistItems.some(item => item.id === productId);
  }, [wishlistItems]);

  const toggleWishlist = useCallback((product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      return false;
    } else {
      addToWishlist(product);
      return true;
    }
  }, [isInWishlist, removeFromWishlist, addToWishlist]);

  const clearWishlist = useCallback(() => {
    setWishlistItems([]);
  }, []);

  const wishlistCount = wishlistItems.length;

  return (
    <WishlistContext.Provider value={{
      wishlistItems,
      addToWishlist,
      removeFromWishlist,
      isInWishlist,
      toggleWishlist,
      clearWishlist,
      wishlistCount
    }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
