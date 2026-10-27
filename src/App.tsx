import React, { useEffect, useState } from 'react';
import { CartProvider, useCart } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { Footer } from './components/Footer';
import { SearchModal } from './components/SearchModal';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { MobileBottomBar } from './components/MobileBottomBar';
import { ProductSection } from './components/ProductSection';
import { DeliveryZoneBanner } from './components/DeliveryZoneBanner';
import { DineInEventsSection } from './components/DineInEventsSection';
import { 
  Sparkles, 
  ArrowRight, 
  Flame, 
  ShieldCheck, 
  Clock, 
  Award, 
  Package, 
  Truck, 
  CheckCircle2,
  Gift,
  Heart
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Toast component
const ToastNotification: React.FC = () => {
  const { toastMessage } = useCart();
  return (
    <AnimatePresence>
      {toastMessage && (
        <motion.div
          initial={{ opacity: 0, y: 35, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 15, scale: 0.95 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-6 right-6 z-50 bg-[#14351E] text-white px-5 py-3 rounded-2xl shadow-2xl border border-[#DFB76C]/60 flex items-center gap-3 gpu"
        >
          <div className="w-8 h-8 rounded-full bg-[#C59A45] text-[#14351E] flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <span className="text-sm font-semibold text-[#FAF7F2]">{toastMessage}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const PageLoader: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isLoading) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const timer = window.setTimeout(() => setIsLoading(false), 1700);
    return () => {
      window.clearTimeout(timer);
      document.body.style.overflow = previousOverflow;
    };
  }, [isLoading]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-[#FAF7F2]"
          role="status"
          aria-live="polite"
          aria-label="Shobharam's is getting ready"
        >
          <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[#DFB76C]/15 blur-3xl" aria-hidden="true" />
          <div className="absolute -bottom-28 -right-20 h-80 w-80 rounded-full bg-[#1E4D2B]/10 blur-3xl" aria-hidden="true" />

          <div className="relative flex flex-col items-center px-6 text-center">
            <img
              src="/shobharam-removebg-preview.png"
              alt="Shobharam's"
              className="mb-7 h-auto w-52 object-contain sm:w-60"
            />

            <div className="relative mb-6 flex h-20 w-20 items-center justify-center" aria-hidden="true">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 rounded-full border-[3px] border-[#DFB76C]/25 border-t-[#C59A45]"
              />
              <motion.div
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#1E4D2B] to-[#14351E] text-[#DFB76C] shadow-lg shadow-[#1E4D2B]/20"
              >
                <Sparkles className="h-5 w-5" />
              </motion.div>
              <span className="absolute -right-0.5 top-2 h-2.5 w-2.5 rounded-full bg-[#DFB76C] shadow-sm" />
              <span className="absolute -bottom-0.5 left-2 h-2 w-2 rounded-full bg-[#C59A45]" />
            </div>

            <p className="font-serif-heading text-xl font-bold text-[#14351E] sm:text-2xl">
              Thoda sa intezaar...
            </p>
            <p className="mt-1.5 text-sm text-[#526355]">
              Aapke liye kuch meetha taiyaar ho raha hai
            </p>

            <div className="mt-6 h-1 w-36 overflow-hidden rounded-full bg-[#E2D5C3]">
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.5, ease: 'easeInOut' }}
                className="h-full origin-left rounded-full bg-gradient-to-r from-[#1E4D2B] to-[#DFB76C]"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

function MainContent() {
  const { setSelectedCategory } = useCart();

  const scrollToProducts = (catId = 'all') => {
    setSelectedCategory(catId);
    const el = document.getElementById('products-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#1A261E] selection:bg-[#1E4D2B] selection:text-[#FAF7F2]">
      {/* Navbar */}
      <Navbar />

      {/* Modals & Panels */}
      <SearchModal />
      <CartDrawer />
      <WishlistDrawer />
      <ToastNotification />
      <MobileBottomBar />

      <main className="flex-1 pb-28 lg:pb-0">
        
        {/* Dynamic Swiping Modern Sweets Hero Section */}
        <HeroSection />

        {/* 4 Value Highlights for Ecommerce */}
        <section className="py-8 bg-[#F3ECE1]/80 border-y border-[#E2D5C3]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {[
                {
                  icon: Award,
                  title: '100% Desi Cow Ghee',
                  desc: 'Zero palm oil, zero chemical preservatives.'
                },
                {
                  icon: Package,
                  title: 'Vacuum Sealed Pack',
                  desc: 'Insulated packaging preserves crispness & aroma.'
                },
                {
                  icon: Truck,
                  title: 'Free Shipping Over ₹499',
                  desc: 'Delivered anywhere across India in 2-4 days.'
                },
                {
                  icon: ShieldCheck,
                  title: 'FSSAI Certified Fresh',
                  desc: 'Strict hygiene protocols & authentic taste.'
                }
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-white border border-[#DFCDB7] shadow-sm flex items-start gap-3.5"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#1E4D2B]/10 text-[#1E4D2B] flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs sm:text-sm text-[#1E4D2B]">{item.title}</h4>
                      <p className="text-[11px] text-[#526355] mt-0.5 leading-snug">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 8 KM Fresh Delivery Zone & All-India Grocery Banner */}
        <div id="delivery-zone">
          <DeliveryZoneBanner />
        </div>

        {/* E-Commerce Products Grid Section */}
        <ProductSection />

        {/* Dine-In Restaurant Experience & Celebration Bookings (WhatsApp Dispatch) */}
        <DineInEventsSection />

      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <>
        <MainContent />
        <PageLoader />
      </>
    </CartProvider>
  );
}
