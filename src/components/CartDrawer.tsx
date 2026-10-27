import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Tag, 
  CheckCircle2,
  Truck,
  Package
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import confetti from 'canvas-confetti';

export const CartDrawer: React.FC = () => {
  const { cart, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart, clearCart, subtotal, totalItems } = useCart();
  const [coupon, setCoupon] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0);
  const [couponError, setCouponError] = useState('');
  const [isOrdered, setIsOrdered] = useState(false);
  const [shippingMethod, setShippingMethod] = useState<'standard' | 'express'>('standard');

  if (!isCartOpen) return null;

  const shippingFee = subtotal > 499 ? 0 : 50;
  const expressExtra = shippingMethod === 'express' ? 40 : 0;
  const finalTotal = Math.max(0, subtotal - appliedDiscount + shippingFee + expressExtra);

  const applyCouponCode = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    const code = coupon.trim().toUpperCase();
    if (code === 'SHOBHA10') {
      setAppliedDiscount(Math.round(subtotal * 0.10));
      setCoupon('');
    } else if (code === 'ROYAL50') {
      setAppliedDiscount(50);
      setCoupon('');
    } else {
      setCouponError('Invalid code. Try "SHOBHA10" or "ROYAL50"');
    }
  };

  const handleCheckout = () => {
    setIsOrdered(true);
    confetti({
      particleCount: 110,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#1E4D2B', '#DFB76C', '#C59A45', '#FAF7F2']
    });
    setTimeout(() => {
      clearCart();
      setIsOrdered(false);
      setIsCartOpen(false);
    }, 4500);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex justify-end">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsCartOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Drawer Window */}
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 28, stiffness: 320, mass: 0.8 }}
          className="relative w-full max-w-md bg-[#FAF7F2] h-full shadow-2xl flex flex-col justify-between overflow-hidden border-l border-[#DFCDB7] z-10 gpu"
        >
          {/* Header */}
          <div className="p-5 border-b border-[#E8D7BB] bg-[#1E4D2B] text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/10 rounded-xl">
                <ShoppingBag className="w-5 h-5 text-[#DFB76C]" />
              </div>
              <div>
                <h3 className="font-serif-heading text-lg font-bold">Your Royal Cart</h3>
                <p className="text-xs text-[#E8D7BB]">{totalItems} {totalItems === 1 ? 'delicacy' : 'delicacies'} selected</p>
              </div>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            
            {isOrdered ? (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="py-16 text-center space-y-4"
              >
                <div className="w-20 h-20 bg-[#1E4D2B] text-[#DFB76C] rounded-full mx-auto flex items-center justify-center shadow-xl">
                  <CheckCircle2 className="w-12 h-12" />
                </div>
                <h4 className="font-serif-heading text-2xl font-black text-[#1E4D2B]">
                  Royal Order Placed!
                </h4>
                <p className="text-sm text-[#526355] max-w-xs mx-auto">
                  Your delicacies are being freshly vacuum sealed at our confectionery hub. Your shipment will dispatch within <strong>24 hours</strong>!
                </p>
                <div className="p-4 rounded-2xl bg-white border border-[#E2D5C3] text-xs space-y-1 text-left inline-block">
                  <p className="font-bold text-[#1E4D2B]">Order ID: #SHB-{Math.floor(100000 + Math.random() * 900000)}</p>
                  <p className="text-gray-500">Live courier tracking link dispatched via SMS.</p>
                </div>
              </motion.div>
            ) : cart.length === 0 ? (
              <div className="py-20 text-center space-y-4">
                <div className="w-20 h-20 rounded-full bg-[#F3ECE1] text-[#A8B5AA] mx-auto flex items-center justify-center">
                  <ShoppingBag className="w-10 h-10" />
                </div>
                <h4 className="font-serif-heading text-xl font-bold text-[#1E4D2B]">Your Cart is Empty</h4>
                <p className="text-sm text-[#768478] max-w-xs mx-auto">
                  Explore our pure cow ghee mithai, royal hing sev, and authentic spices.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-6 py-2.5 rounded-xl bg-[#1E4D2B] hover:bg-[#163A20] text-white font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
                >
                  Shop Best Sellers
                </button>
              </div>
            ) : (
              <>
                {/* Shipping Type switcher */}
                <div className="flex p-1 bg-[#F3ECE1] rounded-2xl border border-[#DFCDB7]">
                  <button
                    onClick={() => setShippingMethod('standard')}
                    className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      shippingMethod === 'standard'
                        ? 'bg-[#1E4D2B] text-white shadow-sm'
                        : 'text-[#1E4D2B] hover:bg-white/40'
                    }`}
                  >
                    <Truck className="w-4 h-4" />
                    Standard Air (2-3 Days)
                  </button>
                  <button
                    onClick={() => setShippingMethod('express')}
                    className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      shippingMethod === 'express'
                        ? 'bg-[#1E4D2B] text-white shadow-sm'
                        : 'text-[#1E4D2B] hover:bg-white/40'
                    }`}
                  >
                    <Package className="w-4 h-4" />
                    Express Priority (+₹40)
                  </button>
                </div>

                {/* Free shipping notification */}
                <div className="p-3 bg-[#E8F4EC] rounded-2xl border border-[#BCE1C7] text-xs text-[#1E4D2B] flex items-center justify-between">
                  {subtotal > 499 ? (
                    <span className="font-bold flex items-center gap-1.5 text-emerald-800">
                      <Sparkles className="w-3.5 h-3.5 text-[#C59A45]" />
                      You unlocked FREE Shipping across India!
                    </span>
                  ) : (
                    <span>
                      Add <strong>₹{(500 - subtotal).toFixed(0)}</strong> more for <strong>FREE Shipping</strong>!
                    </span>
                  )}
                </div>

                {/* Cart Items list */}
                <div className="space-y-3">
                  {cart.map((item) => (
                    <div
                      key={item.product.id + (item.selectedWeight || '')}
                      className="p-3 rounded-2xl bg-white border border-[#E2D5C3] shadow-sm flex items-center gap-3.5"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-sm text-[#1E4D2B] truncate">
                          {item.product.name}
                        </h4>
                        <p className="text-xs text-[#768478] truncate font-medium">
                          Pack: {item.selectedWeight || item.product.weight}
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="font-black text-sm text-[#1E4D2B]">
                            ₹{item.product.price * item.quantity}
                          </span>

                          {/* Stepper buttons */}
                          <div className="flex items-center space-x-1.5 bg-[#FAF7F2] px-2 py-1 rounded-xl border border-[#DFCDB7]">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              className="p-1 hover:bg-[#E8DCCB] rounded-lg text-[#1E4D2B] transition-colors cursor-pointer"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-xs font-bold w-5 text-center text-[#1E4D2B]">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              className="p-1 hover:bg-[#E8DCCB] rounded-lg text-[#1E4D2B] transition-colors cursor-pointer"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="p-2 text-gray-400 hover:text-red-600 transition-colors cursor-pointer"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Coupon Code Input */}
                <div className="p-3 bg-white rounded-2xl border border-[#DFCDB7] space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-[#1E4D2B] flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5 text-[#C59A45]" /> Apply Promo Coupon
                    </span>
                    <span className="text-[11px] text-[#A8B5AA]">Code: SHOBHA10</span>
                  </div>
                  <form onSubmit={applyCouponCode} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="e.g. SHOBHA10 or ROYAL50"
                      value={coupon}
                      onChange={(e) => setCoupon(e.target.value)}
                      className="flex-1 px-3 py-1.5 rounded-xl border border-[#DFCDB7] text-xs font-medium uppercase text-[#1E4D2B] focus:outline-none focus:ring-1 focus:ring-[#1E4D2B]"
                    />
                    <button
                      type="submit"
                      className="px-3 py-1.5 rounded-xl bg-[#1E4D2B] text-white text-xs font-bold hover:bg-[#14351E] cursor-pointer"
                    >
                      Apply
                    </button>
                  </form>
                  {couponError && <p className="text-[11px] text-red-600">{couponError}</p>}
                  {appliedDiscount > 0 && (
                    <div className="flex items-center justify-between text-xs text-emerald-700 bg-emerald-50 p-1.5 rounded-lg">
                      <span>Promo Discount Applied</span>
                      <span className="font-bold">-₹{appliedDiscount}</span>
                    </div>
                  )}
                </div>

                {/* Bill Breakdown */}
                <div className="p-4 bg-white rounded-2xl border border-[#DFCDB7] space-y-2 text-xs text-[#526355]">
                  <div className="flex justify-between">
                    <span>Items Total</span>
                    <span className="font-bold text-[#1E4D2B]">₹{subtotal.toFixed(2)}</span>
                  </div>
                  {appliedDiscount > 0 && (
                    <div className="flex justify-between text-emerald-700">
                      <span>Coupon Discount</span>
                      <span>-₹{appliedDiscount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Shipping Charges</span>
                    <span>{shippingFee === 0 ? <strong className="text-emerald-700 font-bold">FREE</strong> : `₹${shippingFee.toFixed(2)}`}</span>
                  </div>
                  {expressExtra > 0 && (
                    <div className="flex justify-between">
                      <span>Express Priority Air</span>
                      <span>₹{expressExtra.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="pt-2 border-t border-[#DFCDB7] flex justify-between text-sm font-black text-[#1E4D2B]">
                    <span>Total Amount</span>
                    <span>₹{finalTotal.toFixed(2)}</span>
                  </div>
                </div>
              </>
            )}

          </div>

          {/* Drawer Footer Checkout CTA */}
          {cart.length > 0 && !isOrdered && (
            <div className="p-4 sm:p-5 border-t border-[#E8D7BB] bg-white space-y-3 pb-8 sm:pb-5">
              <div className="flex items-center justify-between text-xs text-[#768478]">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-700" />
                  100% Safe Packaging & Delivery
                </span>
                <span className="font-bold text-[#1E4D2B] text-sm">₹{finalTotal.toFixed(0)}</span>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleCheckout}
                className="w-full py-4 px-4 rounded-2xl bg-gradient-to-r from-[#1E4D2B] via-[#14351E] to-[#1E4D2B] text-white font-extrabold text-sm shadow-xl shadow-[#1E4D2B]/30 flex items-center justify-center gap-2 border border-[#2D6B3F] group cursor-pointer active:scale-95 transition-all"
              >
                <span>Proceed to Order (₹{finalTotal.toFixed(0)})</span>
                <ArrowRight className="w-4 h-4 text-[#DFB76C] group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </div>
          )}

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
