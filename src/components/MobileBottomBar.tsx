import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Heart, 
  ShoppingBag, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { STORE_INFO } from '../data/products';

export const MobileBottomBar: React.FC = () => {
  const { 
    totalItems, 
    subtotal, 
    cart,
    setIsCartOpen, 
    setIsSearchOpen, 
    setIsWishlistOpen,
    wishlist 
  } = useCart();

  // Handle WhatsApp Order Direct Action
  const handleWhatsAppOrder = () => {
    const cleanPhone = STORE_INFO.phone.replace(/[^0-9]/g, '');
    let message = '';

    if (cart.length > 0) {
      const itemsList = cart
        .map((item, idx) => `${idx + 1}. ${item.product.name} (${item.selectedWeight}) x ${item.quantity} = ₹${item.product.price * item.quantity}`)
        .join('\n');

      message = `*Namaste Shobharam's!* 🙏\nI would like to place an order:\n\n${itemsList}\n\n*Total Amount:* ₹${subtotal.toFixed(0)}\n\n*Delivery Address:* [Please write your address]\n*Area/Pincode:* \n\nPlease confirm availability and delivery time!`;
    } else {
      message = `*Namaste Shobharam's!* 🙏\nI want to inquire about your fresh sweets, pure cow ghee and packaged delicacies for home delivery.`;
    }

    const waUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden pointer-events-none">
      
      {/* Floating Animated Cart Banner (Above bottom bar when items > 0) */}
      <AnimatePresence>
        {totalItems > 0 && (
          <div className="px-3 pb-2 max-w-md mx-auto pointer-events-auto">
            <motion.div
              initial={{ y: 20, opacity: 0, scale: 0.96 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 20, opacity: 0, scale: 0.96 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              onClick={() => setIsCartOpen(true)}
              className="bg-gradient-to-r from-[#14351E] via-[#1E4D2B] to-[#14351E] text-white p-2.5 px-4 rounded-2xl shadow-xl border border-[#DFB76C]/60 flex items-center justify-between cursor-pointer active:scale-[0.98] transition-transform gpu"
            >
              <div className="flex items-center gap-2.5">
                <div className="relative w-8 h-8 rounded-xl bg-white/15 flex items-center justify-center border border-white/20">
                  <ShoppingBag className="w-4 h-4 text-[#DFB76C]" />
                  <span className="absolute -top-1 -right-1 min-w-[16px] h-[16px] px-1 bg-[#C59A45] text-[#14351E] text-[9px] font-black rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                </div>
                <div>
                  <p className="text-[10px] text-[#DFB76C] font-extrabold uppercase tracking-wider flex items-center gap-1">
                    <Sparkles className="w-2.5 h-2.5" /> Cart Active
                  </p>
                  <p className="text-sm font-black text-white leading-tight">
                    ₹{subtotal.toFixed(0)}{' '}
                    <span className="text-[10px] font-normal text-gray-300">({totalItems} {totalItems === 1 ? 'item' : 'items'})</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1 bg-[#DFB76C] text-[#14351E] px-3 py-1.5 rounded-xl font-extrabold text-[11px] tracking-wider uppercase shadow-xs">
                <span>View Cart</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Main Persistent Bottom Navigation Bar (Search, Wishlist, Cart, WhatsApp Order) */}
      <nav 
        aria-label="Mobile Navigation"
        className="pointer-events-auto bg-[#FAF7F2]/95 backdrop-blur-md border-t border-[#DFCDB7] shadow-[0_-8px_25px_rgba(0,0,0,0.08)] px-2 pt-1.5 pb-[max(env(safe-area-inset-bottom),10px)]"
      >
        <div className="max-w-md mx-auto grid grid-cols-4 items-center gap-1">
          
          {/* 1. SEARCH */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="flex flex-col items-center justify-center py-1 rounded-xl text-[#526355] hover:text-[#1E4D2B] active:scale-90 transition-transform group cursor-pointer"
          >
            <div className="relative p-1">
              <Search className="w-5 h-5 text-[#1E4D2B] group-hover:scale-110 transition-transform" />
            </div>
            <span className="text-[11px] font-bold text-[#1E4D2B] tracking-tight mt-0.5">
              Search
            </span>
          </button>

          {/* 2. WISHLIST */}
          <button
            onClick={() => setIsWishlistOpen(true)}
            className="flex flex-col items-center justify-center py-1 rounded-xl text-[#526355] hover:text-[#1E4D2B] active:scale-90 transition-transform group cursor-pointer"
          >
            <div className="relative p-1">
              <Heart 
                className={`w-5 h-5 transition-transform group-hover:scale-110 ${
                  wishlist.length > 0 
                    ? 'text-red-500 fill-red-500' 
                    : 'text-[#1E4D2B]'
                }`} 
              />
              {wishlist.length > 0 && (
                <span className="absolute -top-0.5 -right-1 min-w-[16px] h-[16px] px-1 bg-red-500 text-white text-[9px] font-black rounded-full flex items-center justify-center shadow-xs animate-pulse">
                  {wishlist.length}
                </span>
              )}
            </div>
            <span className="text-[11px] font-bold text-[#1E4D2B] tracking-tight mt-0.5">
              Wishlist
            </span>
          </button>

          {/* 3. CART */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="flex flex-col items-center justify-center py-1 rounded-xl text-[#526355] hover:text-[#1E4D2B] active:scale-90 transition-transform group cursor-pointer"
          >
            <div className="relative p-1">
              <ShoppingBag className="w-5 h-5 text-[#1E4D2B] group-hover:scale-110 transition-transform" />
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-1 min-w-[16px] h-[16px] px-1 bg-[#C59A45] text-[#14351E] text-[9px] font-black rounded-full flex items-center justify-center shadow-xs">
                  {totalItems}
                </span>
              )}
            </div>
            <span className="text-[11px] font-bold text-[#1E4D2B] tracking-tight mt-0.5">
              {totalItems > 0 ? `₹${subtotal.toFixed(0)}` : 'Cart'}
            </span>
          </button>

          {/* 4. WHATSAPP ORDER */}
          <button
            onClick={handleWhatsAppOrder}
            className="flex flex-col items-center justify-center py-1 rounded-xl active:scale-90 transition-transform group cursor-pointer"
          >
            <div className="relative p-1">
              <div className="w-6 h-6 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform">
                {/* Official WhatsApp Vector Icon */}
                <svg
                  className="w-3.5 h-3.5 fill-current"
                  viewBox="0 0 24 24"
                >
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                </svg>
              </div>
            </div>
            <span className="text-[11px] font-bold text-emerald-700 tracking-tight mt-0.5">
              WhatsApp
            </span>
          </button>

        </div>
      </nav>

    </div>
  );
};
