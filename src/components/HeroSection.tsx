import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight, 
  ShoppingBag, 
  ShieldCheck, 
  Clock, 
  Award, 
  Star,
  MapPin,
  Flame,
  Truck
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { PRODUCTS, STORE_INFO } from '../data/products';

interface HeroSlide {
  id: string;
  productId: string;
  title: string;
  subtitle: string;
  badge: string;
  badgeColor: string;
  deliveryType: '8km' | 'all-india';
  deliveryText: string;
  price: number;
  originalPrice: number;
  weight: string;
  bgImage: string;
  accentColor: string;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'slide-1',
    productId: 'shb-01',
    title: "Royal Kesar Kaju Katli",
    subtitle: "Prepared daily with premium Goan cashews, organic Kashmiri saffron threads and genuine pure silver vark.",
    badge: "👑 Royal Bestseller Sweet",
    badgeColor: "bg-[#DFB76C] text-[#14351E]",
    deliveryType: '8km',
    deliveryText: "8 KM Fresh Delivery • 45 Mins Express",
    price: 520,
    originalPrice: 620,
    weight: "500g Luxury Box",
    bgImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4DKXAtqFqVZB1P_sW1gYW7KYPi3QMs7yZAAkJzEfJNA&s=10",
    accentColor: "#DFB76C"
  },
  {
    id: 'slide-2',
    productId: 'shb-02',
    title: "Pure Desi Cow Ghee Motichoor Ladoo",
    subtitle: "Melt-in-mouth golden micro-pearl boondi cooked in 100% pure cow ghee with fragrant cardamom & saffron.",
    badge: "✨ Fresh Morning Batch",
    badgeColor: "bg-amber-400 text-[#14351E]",
    deliveryType: '8km',
    deliveryText: "8 KM Fresh Delivery • Dispatched Fresh",
    price: 360,
    originalPrice: 420,
    weight: "500g Pure Box",
    bgImage: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1600&q=85",
    accentColor: "#F59E0B"
  },
  {
    id: 'slide-3',
    productId: 'shb-08',
    title: "Maharaja Festive Velvet Gift Hamper",
    subtitle: "Royal bespoke gift box containing assorted vacuum-sealed delicacies, roasted dry fruits & pure bilona ghee.",
    badge: "🎁 Luxury Festive Gifting",
    badgeColor: "bg-rose-500 text-white",
    deliveryType: 'all-india',
    deliveryText: "Pan-India Courier • Shockproof Packing",
    price: 1499,
    originalPrice: 1899,
    weight: "1.8 Kg Velvet Box",
    bgImage: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=1600&q=85",
    accentColor: "#E11D48"
  },
  {
    id: 'slide-4',
    productId: 'shb-03',
    title: "A2 Vedic Cultured Cow Bilona Ghee",
    subtitle: "Handcrafted using traditional wooden bilona churning of curd from grass-fed cows. Non-perishable golden goodness.",
    badge: "🌿 100% Pure A2 Vedic",
    badgeColor: "bg-emerald-500 text-white",
    deliveryType: 'all-india',
    deliveryText: "All-India Delivery • Break-proof Glass Jar",
    price: 890,
    originalPrice: 1050,
    weight: "500ml Glass Jar",
    bgImage: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=1600&q=85",
    accentColor: "#10B981"
  },
  {
    id: 'slide-5',
    productId: 'shb-10',
    title: "Fresh Handi Kesar Rasgulla",
    subtitle: "Spongy, delicate cow milk chhena soaked in cold rose and saffron scented syrup. Delivered cold in earthen pots.",
    badge: "🍯 Traditional Clay Pot",
    badgeColor: "bg-[#C59A45] text-white",
    deliveryType: '8km',
    deliveryText: "8 KM Fresh Delivery • Temperature Controlled",
    price: 290,
    originalPrice: 350,
    weight: "1 Kg Clay Handi",
    bgImage: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=1600&q=85",
    accentColor: "#C59A45"
  }
];

export const HeroSection: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const { addToCart, setSelectedCategory, setIsCartOpen } = useCart();

  // Auto-slide every 5.5 seconds
  useEffect(() => {
    if (!isPaused) {
      timerRef.current = setInterval(() => {
        setDirection(1);
        setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
      }, 5500);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, currentSlide]);

  const nextSlide = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const goToSlide = (idx: number) => {
    setDirection(idx > currentSlide ? 1 : -1);
    setCurrentSlide(idx);
  };

  const activeSlide = HERO_SLIDES[currentSlide];
  const matchedProduct = PRODUCTS.find((p) => p.id === activeSlide.productId) || PRODUCTS[0];

  const handleOrderSlide = () => {
    addToCart(matchedProduct, 1);
    setIsCartOpen(true);
  };

  const handleExploreCategory = () => {
    setSelectedCategory(matchedProduct.category);
    const el = document.getElementById('products-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      className="relative overflow-hidden bg-[#0D2314] text-white min-h-[580px] sm:min-h-[620px] lg:min-h-[680px] flex items-center select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      {/* 1. Dynamic Background Crossfading / Zooming Showcase */}
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={activeSlide.id}
          custom={direction}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.85, ease: [0.25, 1, 0.5, 1] }}
          className="absolute inset-0 pointer-events-none"
        >
          <img
            src={activeSlide.bgImage}
            alt={activeSlide.title}
            className="w-full h-full object-cover object-center filter brightness-[0.50] sm:brightness-[0.45]"
          />
        </motion.div>
      </AnimatePresence>

      {/* 2. Luxury Gradient Overlay Masks (for Maximum Text Contrast & Elegance) */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0C1E11] via-[#0C1E11]/85 to-[#0C1E11]/45 sm:to-transparent z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0C1E11] via-transparent to-[#0C1E11]/60 z-10" />
      
      {/* Subtle Royal Saffron Glow Accent */}
      <div 
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-[120px] opacity-25 pointer-events-none transition-colors duration-1000 z-10"
        style={{ backgroundColor: activeSlide.accentColor }}
      />

      {/* 3. Hero Interactive Content Container */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Brand Story & Slide Delicacy Details */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-6 text-left">
            
            {/* Top Brand Heritage Badge */}
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-[#DFB76C]/40 text-xs font-bold text-[#E8D7BB] shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#DFB76C] animate-ping" />
              <Sparkles className="w-3.5 h-3.5 text-[#DFB76C]" />
              <span>Royal Indian Delicacies • Chhapraula Hub</span>
            </div>

            {/* Slide Title & Hindi Callout */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSlide.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="space-y-2 sm:space-y-3"
              >
                {/* Specific Category / Sweet Tag */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-extrabold uppercase tracking-wider shadow-sm ${activeSlide.badgeColor}`}>
                    {activeSlide.badge}
                  </span>
                </div>

                {/* Big Royal Heading */}
                <h1 className="font-serif-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#FAF7F2] leading-[1.12] tracking-tight drop-shadow-md">
                  {activeSlide.title}
                </h1>

                {/* Subtitle / Description */}
                <p className="text-sm sm:text-base lg:text-lg text-[#D5E0D7] max-w-xl leading-relaxed font-normal drop-shadow-xs">
                  {activeSlide.subtitle}
                </p>

                {/* Fresh Delivery Guarantee Pill */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/40 backdrop-blur-md border border-white/15 text-xs text-white/90">
                  {activeSlide.deliveryType === '8km' ? (
                    <>
                      <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span className="font-semibold text-emerald-300">
                        8 KM Fresh Zone:
                      </span>
                      <span>Delivered fresh in under 45 mins</span>
                    </>
                  ) : (
                    <>
                      <Truck className="w-3.5 h-3.5 text-[#DFB76C] shrink-0" />
                      <span className="font-semibold text-[#DFB76C]">
                        All-India Dispatch:
                      </span>
                      <span>Safe courier packaging in 2-4 days</span>
                    </>
                  )}
                </div>

                {/* Price Display */}
                <div className="flex items-baseline gap-3 pt-1">
                  <span className="text-2xl sm:text-3xl font-black text-[#DFB76C] tracking-tight">
                    ₹{activeSlide.price}
                  </span>
                  <span className="text-sm sm:text-base text-gray-400 line-through">
                    ₹{activeSlide.originalPrice}
                  </span>
                  <span className="text-xs font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                    Save ₹{activeSlide.originalPrice - activeSlide.price}
                  </span>
                  <span className="text-xs text-gray-300">
                    ({activeSlide.weight})
                  </span>
                </div>

              </motion.div>
            </AnimatePresence>

            {/* Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <button
                onClick={handleOrderSlide}
                className="px-7 py-3.5 rounded-2xl bg-gradient-to-r from-[#DFB76C] via-[#C59A45] to-[#DFB76C] text-[#14351E] font-black text-sm tracking-wide uppercase shadow-lg shadow-[#DFB76C]/20 hover:shadow-[#DFB76C]/40 flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4 text-[#14351E]" />
                <span>Order Now (₹{activeSlide.price})</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={handleExploreCategory}
                className="px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-[#FAF7F2] font-bold text-sm border border-white/20 backdrop-blur-md transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>View Full Menu</span>
              </button>
            </div>

            {/* Mini Trust Highlights */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-4 border-t border-white/15 max-w-lg">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-[#DFB76C] shrink-0" />
                <span className="text-[11px] sm:text-xs text-gray-300 font-medium">100% Pure Cow Ghee</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#DFB76C] shrink-0" />
                <span className="text-[11px] sm:text-xs text-gray-300 font-medium">Daily Fresh Batches</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#DFB76C] shrink-0" />
                <span className="text-[11px] sm:text-xs text-gray-300 font-medium">FSSAI Certified</span>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Mobile & Desktop Swiping Card */}
          <div className="lg:col-span-5 relative">
            <motion.div
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.25}
              onDragEnd={(_e, { offset }) => {
                if (offset.x > 50) {
                  prevSlide();
                } else if (offset.x < -50) {
                  nextSlide();
                }
              }}
              className="relative mx-auto max-w-sm sm:max-w-md lg:max-w-none cursor-grab active:cursor-grabbing group"
            >
              {/* Luxury Frame Container */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-[#DFB76C]/60 aspect-[4/3] bg-stone-900">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeSlide.id}
                    src={activeSlide.bgImage}
                    alt={activeSlide.title}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    className="w-full h-full object-cover"
                  />
                </AnimatePresence>

                {/* Card Gradient Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                {/* Floating Top Badge */}
                <div className="absolute top-3.5 left-3.5 z-10 flex items-center gap-2">
                  <span className={`px-2.5 py-1 rounded-xl text-[10px] font-black uppercase tracking-wider shadow-md ${activeSlide.badgeColor}`}>
                    {activeSlide.badge}
                  </span>
                  <div className="bg-black/50 backdrop-blur-md px-2 py-1 rounded-xl text-[10px] text-white/90 font-bold border border-white/20 flex items-center gap-1">
                    <Star className="w-3 h-3 text-[#DFB76C] fill-[#DFB76C]" />
                    <span>4.9 (500+ reviews)</span>
                  </div>
                </div>

                {/* Bottom Overlay Info on Card */}
                <div className="absolute bottom-3 left-3 right-3 text-white z-10">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-serif-heading text-lg font-bold truncate">
                        {activeSlide.title}
                      </p>
                      <p className="text-[11px] text-[#DFB76C] font-semibold">
                        Fresh Batch • {activeSlide.weight}
                      </p>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOrderSlide();
                      }}
                      className="px-3.5 py-2 rounded-xl bg-[#DFB76C] hover:bg-white text-[#14351E] font-black text-xs uppercase tracking-wider transition-colors shadow-md flex items-center gap-1 active:scale-95 cursor-pointer"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>+ Add</span>
                    </button>
                  </div>
                </div>

                {/* Swipe Left/Right Hint on Mobile */}
                <div className="sm:hidden absolute top-3.5 right-3.5 bg-black/60 backdrop-blur-xs px-2 py-0.5 rounded-full text-[9px] text-[#E8D7BB] border border-white/20 pointer-events-none">
                  👈 Swipe 👉
                </div>
              </div>

              {/* Prev / Next Circular Arrows */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prevSlide();
                }}
                className="absolute -left-3 sm:-left-5 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black/70 hover:bg-[#1E4D2B] text-white border border-[#DFB76C]/60 backdrop-blur-md flex items-center justify-center shadow-lg transition-transform hover:scale-110 active:scale-95 cursor-pointer z-30"
                aria-label="Previous Slide"
              >
                <ChevronLeft className="w-5 h-5 text-[#DFB76C]" />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextSlide();
                }}
                className="absolute -right-3 sm:-right-5 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black/70 hover:bg-[#1E4D2B] text-white border border-[#DFB76C]/60 backdrop-blur-md flex items-center justify-center shadow-lg transition-transform hover:scale-110 active:scale-95 cursor-pointer z-30"
                aria-label="Next Slide"
              >
                <ChevronRight className="w-5 h-5 text-[#DFB76C]" />
              </button>

            </motion.div>

            {/* Thumbnail Mini Selector Strip */}
            <div className="mt-4 flex items-center justify-center gap-2 overflow-x-auto py-1">
              {HERO_SLIDES.map((slide, idx) => {
                const isActive = idx === currentSlide;
                return (
                  <button
                    key={slide.id}
                    onClick={() => goToSlide(idx)}
                    className={`relative rounded-xl overflow-hidden transition-all duration-300 cursor-pointer ${
                      isActive 
                        ? 'ring-2 ring-[#DFB76C] scale-105 shadow-md w-14 h-11' 
                        : 'opacity-50 hover:opacity-80 w-11 h-9'
                    }`}
                  >
                    <img
                      src={slide.bgImage}
                      alt={slide.title}
                      className="w-full h-full object-cover"
                    />
                    {isActive && (
                      <div className="absolute inset-0 bg-[#DFB76C]/20 border border-[#DFB76C]" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Slide Pagination Progress Dots */}
            <div className="mt-2.5 flex items-center justify-center gap-1.5">
              {HERO_SLIDES.map((slide, idx) => {
                const isActive = idx === currentSlide;
                return (
                  <button
                    key={slide.id}
                    onClick={() => goToSlide(idx)}
                    aria-label={`Go to slide ${idx + 1}`}
                    className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${
                      isActive 
                        ? 'w-7 bg-[#DFB76C]' 
                        : 'w-2 bg-white/30 hover:bg-white/60'
                    }`}
                  />
                );
              })}
            </div>

          </div>

        </div>
      </div>

    </section>
  );
};
