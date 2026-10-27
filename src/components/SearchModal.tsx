import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Sparkles, Plus, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, searchQuery, setSearchQuery, addToCart, setIsCartOpen } = useCart();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isSearchOpen]);

  const filteredProducts = PRODUCTS.filter((item) => {
    if (!searchQuery.trim()) return false;
    const query = searchQuery.toLowerCase();
    return (
      item.name.toLowerCase().includes(query) ||
      (item.hindiName && item.hindiName.includes(query)) ||
      item.category.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query)
    );
  });

  const popularTags = ['Kaju Katli', 'Bilona Ghee', 'Hing Bhujia', 'Dal Makhani', 'Motichoor Ladoo', 'Gift Hamper'];

  if (!isSearchOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsSearchOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: -12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: -12 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-2xl bg-[#FAF7F2] rounded-3xl shadow-2xl border border-[#DFCDB7] overflow-hidden z-10 gpu"
        >
          {/* Header & Input */}
          <div className="p-4 sm:p-6 border-b border-[#E8D7BB] bg-white flex items-center gap-3">
            <Search className="w-6 h-6 text-[#1E4D2B]" />
            <input
              ref={inputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search royal dishes, thalis, desserts, breads..."
              className="w-full text-base sm:text-lg bg-transparent text-[#1E4D2B] placeholder-[#8C988E] focus:outline-none font-medium"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="p-1.5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={() => setIsSearchOpen(false)}
              className="p-2 rounded-xl bg-[#F3ECE1] text-[#1E4D2B] hover:bg-[#E2D5C3] transition-colors ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Popular Tag Pills */}
          <div className="px-6 py-3 bg-[#F8F4EC] border-b border-[#E8D7BB] flex items-center gap-2 overflow-x-auto text-xs">
            <span className="text-[#768478] font-bold flex items-center gap-1 whitespace-nowrap">
              <Sparkles className="w-3.5 h-3.5 text-[#C59A45]" /> Trending:
            </span>
            {popularTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSearchQuery(tag)}
                className="px-3 py-1 rounded-full bg-white hover:bg-[#1E4D2B] hover:text-white text-[#1E4D2B] border border-[#DFCDB7] font-medium transition-colors whitespace-nowrap cursor-pointer"
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Search Results List */}
          <div className="max-h-96 overflow-y-auto p-4 sm:p-6">
            {searchQuery.trim() === '' ? (
              <div className="py-8 text-center text-[#768478] space-y-2">
                <p className="text-sm">Type any dish name, category, or ingredient to explore our royal menu.</p>
                <p className="text-xs text-[#A8B5AA]">Try searching for "Thali", "Makhani", or "Sweets"</p>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="py-8 text-center text-[#768478] space-y-2">
                <p className="text-base font-semibold text-[#1E4D2B]">No dishes found matching "{searchQuery}"</p>
                <p className="text-xs">Browse our complete menu below or ask our kitchen chef!</p>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-xs font-bold uppercase tracking-wider text-[#768478]">
                  Found {filteredProducts.length} Royal Dishes
                </p>
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="p-3 rounded-2xl bg-white hover:bg-[#FDFBF7] border border-[#DFCDB7] flex items-center justify-between gap-4 transition-all hover:shadow-md group"
                  >
                    <div className="flex items-center gap-3.5">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-16 h-16 rounded-xl object-cover"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="w-3 h-3 border border-emerald-600 flex items-center justify-center p-0.5 rounded-sm">
                            <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full"></span>
                          </span>
                          <h4 className="font-bold text-sm text-[#1E4D2B] group-hover:text-[#14351E]">
                            {product.name}
                          </h4>
                        </div>
                        {product.hindiName && (
                          <p className="text-xs text-[#768478]">{product.hindiName}</p>
                        )}
                        <p className="text-xs font-bold text-[#1E4D2B] mt-1">
                          ₹{product.price}{' '}
                          <span className="text-gray-400 font-normal text-[11px]">({product.weight})</span>
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        addToCart(product);
                        setIsSearchOpen(false);
                        setIsCartOpen(true);
                      }}
                      className="px-3.5 py-2 rounded-xl bg-[#1E4D2B] hover:bg-[#163A20] text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-transform active:scale-95"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add</span>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-3 bg-[#F3ECE1] border-t border-[#E8D7BB] text-center text-xs text-[#6B786D]">
            <span>Press <kbd className="px-1.5 py-0.5 rounded bg-white border border-gray-300 font-mono text-[10px]">Esc</kbd> to close</span>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
