import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, ShoppingBag, ArrowRight, Trash2, Sparkles, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';

export const WishlistDrawer: React.FC = () => {
  const { 
    wishlist, 
    toggleWishlist, 
    addToCart, 
    isWishlistOpen, 
    setIsWishlistOpen,
    setIsCartOpen 
  } = useCart();

  const wishlistedProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  const handleAddAllToCart = () => {
    wishlistedProducts.forEach((prod) => {
      addToCart(prod, 1);
    });
    setIsWishlistOpen(false);
    setIsCartOpen(true);
  };

  return (
    <AnimatePresence>
      {isWishlistOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsWishlistOpen(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="w-screen max-w-md bg-[#FAF7F2] shadow-2xl flex flex-col border-l border-[#E2D5C3] gpu"
            >
              {/* Header */}
              <div className="p-4 sm:p-5 bg-gradient-to-r from-[#14351E] to-[#1E4D2B] text-white flex items-center justify-between border-b border-[#C59A45]/30">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
                    <Heart className="w-5 h-5 text-red-400 fill-red-400" />
                  </div>
                  <div>
                    <h2 className="font-serif-heading text-lg font-bold tracking-tight">
                      My Wishlist
                    </h2>
                    <p className="text-xs text-[#E8D7BB]">
                      {wishlistedProducts.length} {wishlistedProducts.length === 1 ? 'item saved' : 'items saved'}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsWishlistOpen(false)}
                  className="p-2 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  aria-label="Close Wishlist"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Body */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3.5">
                {wishlistedProducts.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                    <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center border border-red-100 shadow-inner">
                      <Heart className="w-10 h-10 text-red-300" />
                    </div>
                    <div>
                      <h3 className="font-serif-heading text-xl font-bold text-[#14351E]">
                        Your Wishlist is Empty
                      </h3>
                      <p className="text-xs sm:text-sm text-[#526355] mt-1 max-w-xs">
                        Save your favorite pure ghee sweets and delicacies by tapping the heart icon on any product!
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setIsWishlistOpen(false);
                        const el = document.getElementById('products-section');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="px-6 py-2.5 rounded-xl bg-[#1E4D2B] text-white font-bold text-xs uppercase tracking-wider shadow-md hover:bg-[#14351E] transition-all cursor-pointer"
                    >
                      Explore Sweets & Delicacies
                    </button>
                  </div>
                ) : (
                  wishlistedProducts.map((product) => (
                    <motion.div
                      key={product.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="p-3 bg-white rounded-2xl border border-[#E2D5C3] shadow-xs flex items-center gap-3 group hover:border-[#C59A45]/50 transition-colors"
                    >
                      {/* Product Image */}
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-18 h-18 rounded-xl object-cover border border-[#EFE7D8] shrink-0"
                      />

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1">
                          <h4 className="font-bold text-xs sm:text-sm text-[#14351E] truncate">
                            {product.name}
                          </h4>
                          <button
                            onClick={() => toggleWishlist(product.id)}
                            className="text-gray-400 hover:text-red-500 transition-colors p-1"
                            title="Remove from wishlist"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <p className="text-[11px] text-[#768478] truncate">
                          Pack: {product.weight} • {product.deliveryZone === 'local_8km' ? '⚡ 8 KM Fresh' : '🚚 Pan-India'}
                        </p>

                        <div className="mt-2 flex items-center justify-between">
                          <span className="text-sm font-black text-[#1E4D2B]">
                            ₹{product.price}
                          </span>

                          <button
                            onClick={() => {
                              addToCart(product, 1);
                            }}
                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[#1E4D2B] hover:bg-[#14351E] text-white text-xs font-bold transition-all active:scale-95 shadow-xs cursor-pointer"
                          >
                            <ShoppingBag className="w-3.5 h-3.5 text-[#DFB76C]" />
                            <span>Add</span>
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>

              {/* Footer */}
              {wishlistedProducts.length > 0 && (
                <div className="p-4 bg-white border-t border-[#E2D5C3] space-y-2">
                  <button
                    onClick={handleAddAllToCart}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-[#14351E] to-[#1E4D2B] text-white font-bold text-sm tracking-wide shadow-lg hover:shadow-xl flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-[1.01] active:scale-[0.98]"
                  >
                    <ShoppingBag className="w-4 h-4 text-[#DFB76C]" />
                    <span>Add All Items to Cart</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
