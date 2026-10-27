import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  Send, 
  MapPin, 
  Phone, 
  Mail, 
  ShieldCheck, 
  ArrowUp,
  Award,
  CheckCircle2,
  Package,
  Truck,
  RotateCcw,
  Headphones,
  Lock
} from 'lucide-react';
import { useCart } from '../context/CartContext';

// Vector social icons
const InstagramIcon = () => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const FacebookIcon = () => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
    <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.688 5H18V0h-3.808C10.592 0 9 1.582 9 4.615V8z"/>
  </svg>
);

const YoutubeIcon = () => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

const WhatsAppIcon = () => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
  </svg>
);

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { setSelectedCategory } = useCart();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCategoryClick = (catId: string) => {
    setSelectedCategory(catId);
    const el = document.getElementById('products-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#14351E] text-[#F3ECE1] pt-12 sm:pt-16 pb-12 overflow-hidden border-t-2 border-[#C59A45]/50">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#DFB76C] blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-[#2D6B3F] blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* VIP Club Newsletter Banner (Clean, Balanced & Modern) */}
        <div className="mb-14 rounded-3xl bg-gradient-to-r from-[#FAF7F2] via-[#FFFDF9] to-[#F3ECE1] text-[#1E4D2B] p-6 sm:p-10 shadow-xl border border-[#DFCDB7]">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            
            <div className="space-y-2 text-center lg:text-left max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1E4D2B]/10 text-[#1E4D2B] text-xs font-bold tracking-wide uppercase">
                <Sparkles className="w-3.5 h-3.5 text-[#C59A45]" />
                <span>Royal Connoisseurs Club</span>
              </div>
              <h3 className="font-serif-heading text-2xl sm:text-3xl font-extrabold text-[#14351E] tracking-tight">
                Get 10% Off On Your First Package Order
              </h3>
              <p className="text-xs sm:text-sm text-[#526355]">
                Subscribe for private festive sweet launches, corporate bulk discounts, and member-only coupons.
              </p>
            </div>

            {/* Newsletter Subscription */}
            <div className="w-full lg:w-auto flex-1 max-w-md">
              {subscribed ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-4 rounded-2xl bg-[#1E4D2B] text-white flex items-center gap-3 shadow-md"
                >
                  <CheckCircle2 className="w-6 h-6 text-[#DFB76C] shrink-0" />
                  <div>
                    <h4 className="font-bold text-sm">Coupon Code: SHOBHA10</h4>
                    <p className="text-xs text-[#E8D7BB]">Your 10% discount coupon is active. Happy shopping!</p>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2.5">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email for 10% coupon..."
                    required
                    className="flex-1 px-4 py-3.5 rounded-xl bg-white text-[#1E4D2B] placeholder-[#8C988E] border border-[#DFCDB7] focus:outline-none focus:ring-2 focus:ring-[#1E4D2B] text-sm shadow-inner"
                  />
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="px-6 py-3.5 rounded-xl bg-[#1E4D2B] hover:bg-[#163A20] text-[#FAF7F2] font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#1E4D2B]/30 transition-all border border-[#2D6B3F] group whitespace-nowrap cursor-pointer"
                  >
                    <span>Get Coupon</span>
                    <Send className="w-4 h-4 text-[#DFB76C] group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </form>
              )}
              <p className="text-[11px] text-[#768478] mt-2 text-center lg:text-left">
                🔒 Safe shopping. No spam, only authentic royal flavours delivered to your door.
              </p>
            </div>

          </div>
        </div>

        {/* 4 Trust Value Pillars for Ecommerce */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-12 border-b border-[#2D6B3F]/40 text-xs text-[#E8D7BB]">
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#1B472E]/60 border border-[#2D6B3F]/40">
            <Truck className="w-6 h-6 text-[#DFB76C] shrink-0" />
            <div>
              <p className="font-bold text-white text-sm">Free Express Shipping</p>
              <p className="text-[#A8B5AA] text-[11px]">On all prepaid orders over ₹499</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#1B472E]/60 border border-[#2D6B3F]/40">
            <Package className="w-6 h-6 text-[#DFB76C] shrink-0" />
            <div>
              <p className="font-bold text-white text-sm">Insulated Vacuum Packing</p>
              <p className="text-[#A8B5AA] text-[11px]">Freshness locked until you unbox</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#1B472E]/60 border border-[#2D6B3F]/40">
            <Lock className="w-6 h-6 text-[#DFB76C] shrink-0" />
            <div>
              <p className="font-bold text-white text-sm">100% Secure Checkout</p>
              <p className="text-[#A8B5AA] text-[11px]">UPI, Cards, NetBanking & COD</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#1B472E]/60 border border-[#2D6B3F]/40">
            <Headphones className="w-6 h-6 text-[#DFB76C] shrink-0" />
            <div>
              <p className="font-bold text-white text-sm">WhatsApp Live Help</p>
              <p className="text-[#A8B5AA] text-[11px]">Direct store assistance 9AM-9PM</p>
            </div>
          </div>
        </div>

        {/* Main Footer Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 py-12 border-b border-[#2D6B3F]/40">
          
          {/* Column 1: Brand Info (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3.5">
              <img
                src="/shobharam-removebg-preview.png"
                alt="Shobharam's"
                className="h-16 w-auto object-contain filter brightness-110 drop-shadow-md"
              />
              <div>
                <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#DFB76C] text-[#14351E]">
                  Chhapraula Hub
                </span>
                <p className="text-xs text-[#E8D7BB] font-medium mt-1">
                  Greater Noida, UP - 201009
                </p>
              </div>
            </div>

            <p className="text-sm text-[#D7CEBE] leading-relaxed">
              Delivering royal Indian confectionery, pure A2 Vedic cow bilona ghee, signature spices, and retort ready-to-eat curries across India since 1984.
            </p>

            <div className="flex items-center gap-2 text-xs text-[#DFB76C]">
              <Award className="w-4 h-4" />
              <span>FSSAI Lic. No. 10024011000854 (Certified Pure)</span>
            </div>

            {/* Social Icons */}
            <div className="pt-2">
              <p className="text-xs uppercase font-bold text-[#C59A45] tracking-wider mb-2.5">
                Connect With Shobharam's
              </p>
              <div className="flex items-center space-x-3">
                {[
                  { icon: InstagramIcon, href: '#', label: 'Instagram' },
                  { icon: FacebookIcon, href: '#', label: 'Facebook' },
                  { icon: YoutubeIcon, href: '#', label: 'YouTube' },
                  { icon: WhatsAppIcon, href: 'https://wa.me/919068935364', label: 'WhatsApp' },
                ].map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <motion.a
                      key={index}
                      href={item.href}
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label={item.label}
                      className="w-10 h-10 rounded-xl bg-[#1B472E] hover:bg-[#C59A45] hover:text-[#14351E] text-[#F3ECE1] flex items-center justify-center transition-colors border border-[#2D6B3F]/50 shadow-sm"
                    >
                      <Icon />
                    </motion.a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Column 2: Product Categories (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-serif-heading text-lg font-bold text-[#FAF7F2] tracking-wide border-b border-[#2D6B3F] pb-2 flex items-center gap-2">
              <Package className="w-4 h-4 text-[#DFB76C]" />
              Shop Delicacies
            </h4>
            <ul className="space-y-2.5 text-sm text-[#D7CEBE]">
              {[
                { name: 'Pure Desi Ghee Mithai', id: 'mithai' },
                { name: 'Royal Hing Sev & Namkeen', id: 'namkeen' },
                { name: 'Ready-To-Eat Curries & Dal', id: 'ready-to-eat' },
                { name: 'A2 Vedic Cow Bilona Ghee', id: 'ghee-spices' },
                { name: 'Hand-Pounded Shahi Spices', id: 'ghee-spices' },
                { name: 'Festive Luxury Gift Hampers', id: 'hampers' },
                { name: 'All Products & Best Sellers', id: 'all' },
              ].map((item, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => handleCategoryClick(item.id)}
                    className="hover:text-[#DFB76C] transition-colors flex items-center gap-2 group text-left cursor-pointer"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C59A45] group-hover:w-3 transition-all" />
                    <span>{item.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Ecommerce Customer Service (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-serif-heading text-lg font-bold text-[#FAF7F2] tracking-wide border-b border-[#2D6B3F] pb-2">
              Customer Care
            </h4>
            <ul className="space-y-2.5 text-sm text-[#D7CEBE]">
              {[
                { name: '8 KM Fresh Delivery Zone', href: '#delivery-zone' },
                { name: 'Shipping & Delivery Policy', href: '#' },
                { name: 'Refund & Returns Policy', href: '#' },
                { name: 'Packaging Standards', href: '#' },
                { name: 'Bulk & Corporate Gifting', href: '#' },
                { name: 'Wholesale Inquiries', href: '#' },
                { name: 'Privacy & Terms', href: '#' },
              ].map((link, idx) => (
                <li key={idx}>
                  <a href={link.href} className="hover:text-[#DFB76C] transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & Dispatch Centre (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-serif-heading text-lg font-bold text-[#FAF7F2] tracking-wide border-b border-[#2D6B3F] pb-2 flex items-center gap-2">
              <Headphones className="w-4 h-4 text-[#DFB76C]" />
              Store Helpline
            </h4>
            
            <div className="space-y-3 text-sm text-[#D7CEBE]">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#DFB76C] shrink-0 mt-0.5" />
                <span className="leading-snug">
                  <strong className="text-white block font-medium">Main Store & Dispatch Hub:</strong>
                  G101, Shri Sai Heritage, Near Tyagi Petrol Pump, Chhapraula, Gr. Noida, Gautam Buddh Nagar, UP - 201009
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#DFB76C] shrink-0" />
                <div>
                  <a href="tel:+919068935364" className="hover:text-white font-bold block text-white text-base">
                    +91 90689 35364
                  </a>
                  <p className="text-xs text-[#A8B5AA]">Store & Order Desk (9:00 AM - 9:30 PM)</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#DFB76C] shrink-0" />
                <a href="mailto:info@shobharams.com" className="hover:text-white font-medium text-white">
                  info@shobharams.com
                </a>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#1B472E] border border-[#2D6B3F]/50 mt-2 space-y-1 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[#DFB76C] font-bold">8 KM Fresh Delivery Zone</span>
                  <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                    Active
                  </span>
                </div>
                <p className="text-white font-medium">Fresh Sweets within 8 KM of Chhapraula.</p>
                <p className="text-[11px] text-[#A8B5AA]">Packaged Groceries & Ghee delivered All-India!</p>
              </div>

            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Payment partners */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#A8B5AA]">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
            <span>© {new Date().getFullYear()} Shobharam's Delicacies Private Limited. All rights reserved.</span>
            <span className="hidden sm:inline text-[#2D6B3F]">•</span>
            <span>100% Pure & Authentic Indian Flavours</span>
          </div>

          {/* Payment Accepted Badges */}
          <div className="flex items-center gap-1.5 flex-wrap justify-center">
            <span className="text-[#DFB76C] font-medium mr-1">Guaranteed Safe:</span>
            {['UPI', 'Google Pay', 'PhonePe', 'Paytm', 'Visa', 'Mastercard', 'Cash on Delivery'].map((pay, i) => (
              <span
                key={i}
                className="px-2 py-0.5 rounded bg-[#1B472E] text-[#D7CEBE] text-[10px] font-semibold border border-[#2D6B3F]/40"
              >
                {pay}
              </span>
            ))}
          </div>

          {/* Back to Top */}
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToTop}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#1B472E] hover:bg-[#C59A45] hover:text-[#14351E] text-[#F3ECE1] font-semibold transition-all border border-[#2D6B3F] shadow-sm cursor-pointer"
            aria-label="Back to Top"
          >
            <span>Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </motion.button>
        </div>

      </div>
    </footer>
  );
};
