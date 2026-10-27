import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingBag, 
  Search, 
  Menu as MenuIcon, 
  X, 
  Heart, 
  Sparkles, 
  Phone, 
  MessageCircle,
  MapPin, 
  Mail,
  ArrowRight,
  Flame,
  CheckCircle2
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { CATEGORIES, STORE_INFO } from '../data/products';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const { 
    totalItems, 
    subtotal, 
    setIsCartOpen, 
    setIsSearchOpen, 
    setIsWishlistOpen,
    wishlist,
    selectedCategory,
    setSelectedCategory
  } = useCart();

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 15);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setMobileMenuOpen(false);
    const productsSection = document.getElementById('products-section');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Top Luxury Announcement Bar (Compact & Sleek) */}
      <div className="bg-[#112D19] text-[#F3ECE1] border-b border-[#C59A45]/30 relative z-50 text-[10px] sm:text-[11px] font-medium">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-1 flex items-center justify-between gap-3">
          
          {/* Announcement Ticker / Highlight */}
          <div className="flex items-center gap-2 overflow-hidden whitespace-nowrap flex-1 sm:flex-initial">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-extrabold tracking-wider bg-gradient-to-r from-[#DFB76C] to-[#C59A45] text-[#14351E] shrink-0 shadow-xs">
              <Sparkles className="w-2.5 h-2.5" /> OFFER
            </span>
            <span className="text-[#FAF7F2]/95 truncate tracking-wide">
              🚚 <strong>Free Delivery</strong> over ₹499 • Use coupon <span className="font-mono font-bold text-[#DFB76C] bg-white/10 px-1 py-0.2 rounded border border-white/20">SHOBHA10</span> for 10% OFF
            </span>
          </div>

          {/* Right Highlights: 8 KM Zone & Phone (Desktop only) */}
          <div className="hidden md:flex items-center space-x-3 text-[11px] text-[#E8D7BB] shrink-0">
            <a
              href="#delivery-zone"
              className="flex items-center gap-1.5 text-[#DFB76C] hover:text-white transition-colors cursor-pointer group"
              title="8 KM Fresh Delivery Zone"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
              </span>
              <MapPin className="w-3 h-3 text-[#DFB76C]" />
              <span>8 KM Fresh Delivery Zone</span>
            </a>

            <div className="h-2.5 w-px bg-white/20" />

            <a
              href={`tel:${STORE_INFO.phone.replace(/\s+/g, '')}`}
              className="flex items-center gap-1 text-white hover:text-[#DFB76C] transition-colors font-bold"
            >
              <Phone className="w-3 h-3 text-[#DFB76C]" />
              <span>{STORE_INFO.phone}</span>
            </a>
          </div>

          {/* Mobile Right Quick Call Icon */}
          <div className="flex md:hidden items-center gap-1.5 shrink-0">
            <a
              href={`tel:${STORE_INFO.phone.replace(/\s+/g, '')}`}
              className="flex items-center gap-1 text-[10px] font-bold text-[#DFB76C] bg-white/10 px-2 py-0.5 rounded-full border border-white/20"
            >
              <Phone className="w-2.5 h-2.5" />
              <span>Call</span>
            </a>
          </div>

        </div>
      </div>

      {/* Main Sticky Luxury Restaurant Navbar (Ultra Low Padding) */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 gpu ${
          isScrolled
            ? 'bg-[#FAF7F2]/95 backdrop-blur-md shadow-md shadow-[#1E4D2B]/8 py-1 sm:py-1.5 border-b border-[#E2D5C3]'
            : 'bg-[#FAF7F2] py-1.5 sm:py-2 border-b border-[#EFE7D8]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          
          <div className="flex items-center justify-between gap-3 sm:gap-6">
            
            {/* Clean Brand Logo Only (No extra text, No Chhapraula Hub, No boxes) */}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center shrink-0 select-none cursor-pointer"
            >
              <motion.img
                whileHover={{ scale: 1.03 }}
                transition={{ type: 'spring', stiffness: 300 }}
                src="/shobharam-removebg-preview.png"
                alt="Shobharam's"
                className="h-10 sm:h-12 lg:h-13 w-auto object-contain filter drop-shadow-xs"
              />
            </a>

            {/* Desktop Elevated Search Bar */}
            <div className="hidden md:flex flex-1 max-w-lg mx-2 lg:mx-4">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="w-full flex items-center justify-between px-4 py-2.5 bg-white hover:bg-[#FDFBF7] rounded-2xl border-2 border-[#DFCDB7]/80 text-sm text-[#768478] shadow-xs hover:border-[#1E4D2B] transition-all group cursor-pointer"
              >
                <span className="flex items-center gap-2.5">
                  <Search className="w-4 h-4 text-[#C59A45] group-hover:text-[#1E4D2B] transition-colors" />
                  <span className="text-gray-500 text-xs sm:text-sm font-medium">Search Kaju Katli, Bilona Ghee, Sev Bhujia...</span>
                </span>
                <span className="px-2.5 py-1 rounded-xl bg-[#F3ECE1] text-[#1E4D2B] font-extrabold text-[11px] uppercase tracking-wider group-hover:bg-[#1E4D2B] group-hover:text-white transition-colors">
                  Search
                </span>
              </button>
            </div>

            {/* Action Bar: Desktop (WhatsApp, Wishlist, Cart) & Mobile (Only Menu Button) */}
            <div className="flex items-center space-x-2 sm:space-x-3 shrink-0">
              
              {/* Direct WhatsApp Live Order Button (Desktop Only) */}
              <a
                href={`https://wa.me/${STORE_INFO.phone.replace(/[^0-9]/g, '')}?text=Hi,%20I%20want%20to%20order%20sweets%20and%20groceries`}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden lg:flex items-center gap-2 px-3.5 py-2.5 rounded-2xl text-xs font-extrabold text-emerald-900 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 shadow-xs transition-all hover:scale-[1.02] active:scale-95 cursor-pointer"
                title="Direct WhatsApp Order"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>WhatsApp Order</span>
              </a>

              {/* Wishlist Button (Desktop Only - Mobile has it in Bottom Dock) */}
              <button
                onClick={() => setIsWishlistOpen(true)}
                className="hidden md:flex relative p-2.5 rounded-2xl bg-white hover:bg-[#F3ECE1] text-[#1E4D2B] border border-[#DFCDB7] shadow-xs transition-colors items-center justify-center cursor-pointer active:scale-95"
                title="Saved Delicacies"
              >
                <Heart className={`w-5 h-5 ${wishlist.length > 0 ? 'text-red-500 fill-red-500' : 'text-[#1E4D2B]'}`} />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-red-600 text-white text-[10px] font-black flex items-center justify-center shadow-xs">
                    {wishlist.length}
                  </span>
                )}
              </button>

              {/* Animated Shopping Cart Button (Desktop Only - Mobile has it in Bottom Dock) */}
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsCartOpen(true)}
                className="hidden md:flex relative items-center gap-2.5 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-2xl bg-gradient-to-r from-[#14351E] via-[#1E4D2B] to-[#14351E] text-[#FAF7F2] shadow-lg shadow-[#1E4D2B]/20 transition-all border border-[#C59A45]/50 group cursor-pointer"
                aria-label="Open Cart"
              >
                <div className="relative">
                  <ShoppingBag className="w-5 h-5 text-[#DFB76C] group-hover:text-white transition-colors" />
                  {totalItems > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-2.5 -right-2.5 min-w-[20px] h-[20px] px-1 bg-[#C59A45] text-[#14351E] text-[10px] font-black rounded-full flex items-center justify-center border-2 border-[#1E4D2B] shadow-xs animate-bounce"
                    >
                      {totalItems}
                    </motion.span>
                  )}
                </div>

                <div className="flex flex-col text-left leading-tight">
                  <span className="text-[10px] text-[#DFB76C] font-bold uppercase tracking-wider hidden sm:inline">
                    Cart
                  </span>
                  <span className="text-xs sm:text-sm font-black text-white">
                    ₹{subtotal.toFixed(0)}
                  </span>
                </div>
              </motion.button>

              {/* Mobile Hamburger Menu Button (Kept Clean on Mobile) */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2.5 rounded-2xl bg-white hover:bg-[#F3ECE1] text-[#1E4D2B] border-2 border-[#DFCDB7] flex items-center justify-center shadow-xs active:scale-95 cursor-pointer"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
              </button>

            </div>

          </div>

          {/* Desktop Categories Pill Navigation Bar (Compact Restaurant Style) */}
          <nav className="hidden lg:flex items-center space-x-1.5 pt-1.5 mt-1 pb-0.5 border-t border-[#E8D7BB]/50 overflow-x-auto scrollbar-none text-xs">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategorySelect(cat.id)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-[#1E4D2B] text-white shadow-sm'
                      : 'text-[#2C3E2D] hover:bg-white hover:text-[#1E4D2B]'
                  }`}
                >
                  <span>{cat.name}</span>
                  {cat.count && (
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                        isActive ? 'bg-[#DFB76C] text-[#14351E]' : 'bg-[#EAE1D1] text-[#526355]'
                      }`}
                    >
                      {cat.count}
                    </span>
                  )}
                </button>
              );
            })}

            {/* Quick Dine-In & Party Booking Direct Link */}
            <a
              href="#dine-in"
              className="ml-auto px-4 py-1.5 rounded-full text-xs font-black transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 bg-gradient-to-r from-[#DFB76C] to-[#C59A45] text-[#14351E] shadow-xs hover:scale-105 active:scale-95"
            >
              <span>🍽️ Dine-In & Party Booking</span>
            </a>
          </nav>

        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 lg:hidden"
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-[#FAF7F2] z-50 shadow-2xl flex flex-col justify-between overflow-y-auto border-l border-[#E2D5C3]"
            >
              <div>
                {/* Header */}
                <div className="p-3.5 flex items-center justify-between border-b border-[#E8D7BB] bg-[#F3ECE1]">
                  <div className="flex items-center">
                    <img
                      src="/shobharam-removebg-preview.png"
                      alt="Shobharam's"
                      className="h-10 w-auto object-contain filter drop-shadow-xs"
                    />
                  </div>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-1.5 rounded-xl bg-white text-[#1E4D2B] shadow-xs border border-[#DFCDB7]"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Dine-In & Booking Action Banner in Mobile Menu */}
                <div className="p-4 pb-2">
                  <a
                    href="#dine-in"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full p-3 rounded-2xl bg-gradient-to-r from-[#DFB76C] to-[#C59A45] text-[#14351E] font-black text-xs flex items-center justify-between shadow-sm active:scale-98 transition-transform"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-base">🍽️</span>
                      <span>Dine-In, Birthday & Party Booking</span>
                    </div>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>

                {/* Mobile Categories */}
                <div className="p-4 space-y-1">
                  <p className="text-xs font-bold uppercase tracking-wider text-[#768478] mb-2">
                    Browse Categories
                  </p>
                  {CATEGORIES.map((cat) => {
                    const isActive = selectedCategory === cat.id;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => handleCategorySelect(cat.id)}
                        className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                          isActive
                            ? 'bg-[#1E4D2B] text-white shadow-sm'
                            : 'text-[#2C3E2D] hover:bg-[#F3ECE1]'
                        }`}
                      >
                        <span>{cat.name}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${isActive ? 'bg-[#C59A45] text-[#14351E] font-bold' : 'bg-gray-200 text-gray-700'}`}>
                          {cat.count} items
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Direct Calling & WhatsApp Support */}
                <div className="p-4 border-t border-[#E8D7BB] space-y-2">
                  <a
                    href={`tel:${STORE_INFO.phone.replace(/\s+/g, '')}`}
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-white border border-[#DFCDB7] text-xs font-bold text-[#1E4D2B] shadow-xs active:scale-95 transition-transform"
                  >
                    <Phone className="w-4 h-4 text-[#C59A45]" />
                    <span>Call Store: {STORE_INFO.phone}</span>
                  </a>

                  <a
                    href={`https://wa.me/${STORE_INFO.phone.replace(/[^0-9]/g, '')}?text=Hi,%20I%20want%20to%20order%20sweets%20from%20Shobharam's`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-emerald-800 text-white text-xs font-bold shadow-sm active:scale-95 transition-transform"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-300" />
                    <span>Order on WhatsApp: {STORE_INFO.phone}</span>
                  </a>

                  <a
                    href={`mailto:${STORE_INFO.email}`}
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-white border border-[#DFCDB7] text-xs font-bold text-[#1E4D2B] shadow-xs"
                  >
                    <Mail className="w-4 h-4 text-[#C59A45]" />
                    <span>{STORE_INFO.email}</span>
                  </a>
                </div>
              </div>

              {/* Bottom Support Badge */}
              <div className="p-4 border-t border-[#E8D7BB] bg-[#F3ECE1]/60 text-xs text-[#526355] text-center space-y-1">
                <p className="font-bold text-[#1E4D2B]">Store & Dispatch Hub:</p>
                <p className="text-[11px] text-gray-600 font-medium">
                  {STORE_INFO.address}, {STORE_INFO.landmark}, {STORE_INFO.area}, Gr. Noida - {STORE_INFO.pincode}
                </p>
                <p className="text-[10px] text-emerald-800 font-bold bg-emerald-100 py-0.5 rounded">
                  8 KM Fresh Delivery Zone Active
                </p>
              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
