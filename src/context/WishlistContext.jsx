import React, { createContext, useContext, useState, useEffect } from 'react';

const WishlistContext = createContext();

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('game_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch (err) {
      console.error('Failed to load wishlist:', err);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('game_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const addToWishlist = (game) => {
    if (!wishlist.find(item => item.id === game.id)) {
      setWishlist(prev => [...prev, game]);
    }
  };

  const removeFromWishlist = (gameId) => {
    setWishlist(prev => prev.filter(item => item.id !== gameId));
  };

  const isInWishlist = (gameId) => {
    return wishlist.some(item => item.id === gameId);
  };

  const toggleWishlist = (game) => {
    if (isInWishlist(game.id)) {
      removeFromWishlist(game.id);
      return false;
    } else {
      addToWishlist(game);
      return true;
    }
  };

  return (
    <WishlistContext.Provider value={{ 
      wishlist, 
      addToWishlist, 
      removeFromWishlist, 
      isInWishlist, 
      toggleWishlist 
    }}>
      {children}
    </WishlistContext.Provider>
  );
};
