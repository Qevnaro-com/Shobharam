import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingBag, 
  Heart, 
  Star, 
  Sparkles, 
  Plus, 
  Minus, 
  Eye, 
  X, 
  ShieldCheck, 
  Package, 
  Clock,
  ChevronDown
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { PRODUCTS, CATEGORIES } from '../data/products';
import { Product } from '../types';

export const ProductSection: React.FC = () => {
  const { 
    cart,
    addToCart, 
    updateQuantity,
    toggleWishlist, 
    isWishlisted, 
    selectedCategory, 
    setSelectedCategory,
    setIsCartOpen 
  } = useCart();

  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [selectedPackSize, setSelectedPackSize] = useState<{ [productId: string]: string }>({});

  const filteredProducts = PRODUCTS.filter((item) => {
    if (selectedCategory === 'all') return true;
    return item.category === selectedCategory;
  });

  const getWeightForProduct = (product: Product) => {
    return selectedPackSize[product.id] || (product.options ? product.options[0] : product.weight);
  };

  const handleSelectWeight = (productId: string, weight: string) => {
    setSelectedPackSize((prev) => ({ ...prev, [productId]: weight }));
  };

  return (
    <section id="products-section" className="py-12 sm:py-16 bg-[#FAF7F2] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1E4D2B]/10 border border-[#1E4D2B]/20 text-[#1E4D2B] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#C59A45]" />
            <span>Artisanal Sweets & Grocery Pantry</span>
          </div>

          <h2 className="font-serif-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#14351E] tracking-tight">
            Order Shobharam's Delicacies
          </h2>

          <p className="text-xs sm:text-sm text-[#526355]">
            Fresh Pure Ghee Sweets (8 KM Express) • Sealed Groceries & Bilona Ghee (Pan-India)
          </p>

          {/* Category Filter Pills (Horizontal Swipe on Mobile) */}
          <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-2 pt-3 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-none">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer border whitespace-nowrap shrink-0 active:scale-95 ${
                    isActive
                      ? 'bg-[#1E4D2B] text-white border-[#1E4D2B] shadow-sm'
                      : 'bg-white text-[#2C3E2D] border-[#DFCDB7] hover:border-[#1E4D2B] hover:bg-[#F3ECE1]'
                  }`}
                >
                  <span>{cat.name}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                      isActive ? 'bg-[#C59A45] text-[#14351E]' : 'bg-[#EAE1D1] text-[#526355]'
                    }`}
                  >
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Compact, Sleek Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => {
              const isFav = isWishlisted(product.id);
              const currentWeight = getWeightForProduct(product);
              
              // Check if item is already in cart with this pack size
              const cartItem = cart.find(
                (item) => item.product.id === product.id && (item.selectedWeight === currentWeight || !item.selectedWeight)
              );

              const discountPercent = product.originalPrice
                ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
                : null;

              return (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                  className="bg-white rounded-2xl border border-[#DFCDB7]/90 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group smooth-card gpu"
                >
                {/* Compact Product Image Banner (Reduced height aspect) */}
                <div className="relative h-40 sm:h-46 w-full overflow-hidden bg-stone-100">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-500"
                    loading="lazy"
                  />

                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/20 pointer-events-none" />

                  {/* Top-Left: Delivery Zone Tag or Discount */}
                  <div className="absolute top-2 left-2 flex flex-col gap-1">
                    {product.deliveryZone === 'fresh-8km' ? (
                      <span className="px-2 py-0.5 rounded-md bg-[#1E4D2B] text-white text-[9px] sm:text-[10px] font-bold uppercase tracking-wider shadow-xs flex items-center gap-1 border border-emerald-500/30">
                        <Clock className="w-2.5 h-2.5 text-[#DFB76C]" />
                        <span>8 KM Fresh</span>
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-md bg-stone-900/90 text-white text-[9px] sm:text-[10px] font-bold uppercase tracking-wider shadow-xs flex items-center gap-1 border border-stone-700">
                        <Package className="w-2.5 h-2.5 text-[#DFB76C]" />
                        <span>All-India</span>
                      </span>
                    )}

                    {discountPercent && (
                      <span className="px-1.5 py-0.2 rounded-md bg-[#C59A45] text-[#14351E] text-[9px] font-black uppercase tracking-wider shadow-xs w-fit">
                        {discountPercent}% OFF
                      </span>
                    )}
                  </div>

                  {/* Top-Right: Wishlist Heart & Quick View buttons */}
                  <div className="absolute top-2 right-2 flex items-center gap-1.5">
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/90 backdrop-blur-xs hover:bg-white text-gray-700 shadow-sm flex items-center justify-center transition-transform active:scale-90 cursor-pointer"
                      title={isFav ? 'Remove from wishlist' : 'Save to wishlist'}
                    >
                      <Heart
                        className={`w-3.5 h-3.5 ${isFav ? 'text-red-500 fill-red-500' : 'text-gray-600'}`}
                      />
                    </button>

                    <button
                      onClick={() => setQuickViewProduct(product)}
                      className="hidden sm:flex w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs hover:bg-white text-gray-700 shadow-sm items-center justify-center transition-transform active:scale-90 cursor-pointer"
                      title="Quick details"
                    >
                      <Eye className="w-3.5 h-3.5 text-gray-700" />
                    </button>
                  </div>

                  {/* Bottom-Left: Veg Dot Badge */}
                  <div className="absolute bottom-2 left-2 bg-white/95 px-1.5 py-0.5 rounded-md flex items-center gap-1 text-[9px] font-bold text-emerald-800 shadow-xs">
                    <span className="w-2 h-2 border border-emerald-600 flex items-center justify-center rounded-xs">
                      <span className="w-1 h-1 bg-emerald-600 rounded-full"></span>
                    </span>
                    <span className="hidden sm:inline">100% Veg</span>
                  </div>

                  {/* Bottom-Right: Star Rating Pill */}
                  <div className="absolute bottom-2 right-2 bg-white/95 px-1.5 py-0.5 rounded-md flex items-center gap-0.5 text-[10px] font-extrabold text-[#1E4D2B] shadow-xs">
                    <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                    <span>{product.rating}</span>
                  </div>
                </div>

                {/* Compact Card Content Body */}
                <div className="p-3 sm:p-3.5 flex-1 flex flex-col justify-between space-y-2">
                  
                  <div>
                    {/* Category & Weight Pill Row */}
                    <div className="flex items-center justify-between text-[10px] text-[#768478] mb-1">
                      <span className="font-semibold uppercase tracking-wider text-[#C59A45] truncate max-w-[110px]">
                        {product.categoryLabel.replace('Fresh ', '').replace('Royal ', '')}
                      </span>

                      {/* Compact Pack Size Dropdown/Pill */}
                      {product.options && product.options.length > 1 ? (
                        <div className="relative">
                          <select
                            value={currentWeight}
                            onChange={(e) => handleSelectWeight(product.id, e.target.value)}
                            className="bg-[#FAF7F2] text-[#1E4D2B] font-bold text-[10px] py-0.5 px-1.5 rounded-md border border-[#DFCDB7] cursor-pointer focus:outline-none"
                          >
                            {product.options.map((opt) => (
                              <option key={opt} value={opt}>
                                {opt}
                              </option>
                            ))}
                          </select>
                        </div>
                      ) : (
                        <span className="bg-[#FAF7F2] text-[#526355] font-medium text-[10px] px-1.5 py-0.5 rounded border border-[#DFCDB7]">
                          {currentWeight}
                        </span>
                      )}
                    </div>

                    {/* Product Name (Clean 2 lines max) */}
                    <h3 
                      onClick={() => setQuickViewProduct(product)}
                      className="font-serif-heading text-sm sm:text-base font-bold text-[#1E4D2B] group-hover:text-[#14351E] transition-colors leading-tight line-clamp-1 cursor-pointer"
                      title={product.name}
                    >
                      {product.name}
                    </h3>
                  </div>

                  {/* Compact Pricing & Add-To-Cart Action Row */}
                  <div className="pt-2 border-t border-[#F3ECE1] flex items-center justify-between gap-2">
                    
                    {/* Price */}
                    <div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-base sm:text-lg font-black text-[#1E4D2B]">
                          ₹{product.price}
                        </span>
                        {product.originalPrice && (
                          <span className="text-[10px] sm:text-xs text-gray-400 line-through">
                            ₹{product.originalPrice}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Interactive Add or Stepper CTA */}
                    <div>
                      {cartItem ? (
                        <div className="flex items-center space-x-1 bg-[#1E4D2B] text-white px-2 py-1 rounded-xl shadow-xs">
                          <button
                            onClick={() => updateQuantity(product.id, cartItem.quantity - 1)}
                            className="p-0.5 hover:bg-white/20 rounded text-white cursor-pointer"
                            title="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-bold w-4 text-center">
                            {cartItem.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(product.id, cartItem.quantity + 1)}
                            className="p-0.5 hover:bg-white/20 rounded text-white cursor-pointer"
                            title="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      ) : (
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => addToCart(product, 1, currentWeight)}
                          className="px-3 py-1.5 sm:px-3.5 sm:py-1.5 rounded-xl bg-[#1E4D2B] hover:bg-[#163A20] text-white font-bold text-xs flex items-center gap-1 shadow-xs transition-all border border-[#2D6B3F] cursor-pointer"
                        >
                          <Plus className="w-3 h-3 text-[#DFB76C]" />
                          <span>ADD</span>
                        </motion.button>
                      )}
                    </div>

                  </div>

                </div>
              </motion.div>
            );
          })}
          </AnimatePresence>
        </div>

      </div>

      {/* Quick View Product Details Modal */}
      <AnimatePresence>
        {quickViewProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setQuickViewProduct(null)}
              className="fixed inset-0 bg-black/65 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-[#FAF7F2] rounded-3xl shadow-2xl border border-[#DFCDB7] overflow-hidden z-10"
            >
              <div className="relative">
                <button
                  onClick={() => setQuickViewProduct(null)}
                  className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/90 text-gray-700 hover:bg-white shadow-md cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className="relative aspect-square md:aspect-auto h-full min-h-[280px]">
                    <img
                      src={quickViewProduct.image}
                      alt={quickViewProduct.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-3 left-3 bg-[#1E4D2B] text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase">
                      {quickViewProduct.deliveryZone === 'fresh-8km' ? '⚡ 8 KM Fresh Express' : '📦 All-India Delivery'}
                    </div>
                  </div>

                  <div className="p-6 flex flex-col justify-between space-y-4">
                    <div>
                      <span className="text-xs uppercase font-extrabold tracking-wider text-[#C59A45]">
                        {quickViewProduct.categoryLabel}
                      </span>
                      <h3 className="font-serif-heading text-2xl font-bold text-[#1E4D2B] mt-1">
                        {quickViewProduct.name}
                      </h3>

                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex items-center gap-1 font-bold text-xs text-[#1E4D2B]">
                          <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                          <span>{quickViewProduct.rating}</span>
                        </div>
                        <span className="text-gray-300">•</span>
                        <span className="text-xs text-gray-500">{quickViewProduct.reviewCount} Reviews</span>
                      </div>

                      <p className="text-xs text-[#526355] mt-3 leading-relaxed">
                        {quickViewProduct.description}
                      </p>

                      {/* Ingredients & Shelf Life */}
                      <div className="mt-3 p-3 bg-white rounded-xl border border-[#DFCDB7] space-y-1 text-xs">
                        {quickViewProduct.ingredients && (
                          <p>
                            <strong className="text-[#1E4D2B]">Ingredients:</strong> {quickViewProduct.ingredients}
                          </p>
                        )}
                        {quickViewProduct.shelfLife && (
                          <p>
                            <strong className="text-[#1E4D2B]">Shelf Life:</strong> {quickViewProduct.shelfLife}
                          </p>
                        )}
                        <p>
                          <strong className="text-[#1E4D2B]">Delivery Policy:</strong>{' '}
                          {quickViewProduct.deliveryZone === 'fresh-8km'
                            ? 'Delivered fresh within 8 KM of Chhapraula store.'
                            : 'All-India grocery delivery available in sealed packaging.'}
                        </p>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-[#DFCDB7]">
                      <div className="flex items-baseline gap-2 mb-3">
                        <span className="text-2xl font-black text-[#1E4D2B]">
                          ₹{quickViewProduct.price}
                        </span>
                        {quickViewProduct.originalPrice && (
                          <span className="text-sm text-gray-400 line-through">
                            ₹{quickViewProduct.originalPrice}
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() => {
                          addToCart(quickViewProduct, 1, getWeightForProduct(quickViewProduct));
                          setQuickViewProduct(null);
                          setIsCartOpen(true);
                        }}
                        className="w-full py-3.5 rounded-xl bg-[#1E4D2B] hover:bg-[#163A20] text-white font-bold text-sm shadow-xl shadow-[#1E4D2B]/30 flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <ShoppingBag className="w-4 h-4 text-[#DFB76C]" />
                        <span>Add to Royal Cart</span>
                      </button>
                    </div>

                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
