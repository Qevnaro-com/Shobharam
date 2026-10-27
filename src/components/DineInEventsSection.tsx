import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  UtensilsCrossed, 
  MapPin, 
  Clock, 
  Phone, 
  Calendar, 
  Users, 
  PartyPopper, 
  Cake, 
  CheckCircle2, 
  ExternalLink,
  MessageCircle,
  Sparkles,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { STORE_INFO } from '../data/products';
import { useCart } from '../context/CartContext';

export const DineInEventsSection: React.FC = () => {
  const { showToast } = useCart();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    eventType: 'Birthday Celebration 🎂',
    guests: '10 to 20 Guests',
    date: '',
    time: '07:30 PM',
    notes: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      showToast('Please enter your full name');
      return;
    }
    if (!formData.phone.trim() || formData.phone.length < 10) {
      showToast('Please enter a valid 10-digit phone number');
      return;
    }

    const cleanPhone = STORE_INFO.phone.replace(/[^0-9]/g, '');

    const message = 
`*🎉 DINE-IN / EVENT CELEBRATION BOOKING*
*Shobharam's Delicacies & Restaurant*
━━━━━━━━━━━━━━━━━━━━
👤 *Customer Name:* ${formData.name.trim()}
📱 *Phone Number:* ${formData.phone.trim()}
🎈 *Occasion / Event:* ${formData.eventType}
👥 *Expected Guests:* ${formData.guests}
📅 *Preferred Date:* ${formData.date || 'To be discussed'}
⏰ *Preferred Time:* ${formData.time}
📝 *Special Requests:* ${formData.notes.trim() || 'Standard dine-in & fresh sweet menu'}
━━━━━━━━━━━━━━━━━━━━
📍 *Store Address:* ${STORE_INFO.address}, ${STORE_INFO.landmark}, ${STORE_INFO.area}, Greater Noida
━━━━━━━━━━━━━━━━━━━━
*Please confirm table/hall availability and special celebration arrangements!* 🙏`;

    const waUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
    
    showToast('Redirecting to WhatsApp to send booking details... 💬');
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="dine-in" className="py-14 sm:py-20 bg-[#FAF7F2] relative overflow-hidden border-t border-[#E8D7BB]">
      {/* Ambient background glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-[#DFB76C]/10 via-[#1E4D2B]/5 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-[#1E4D2B]/8 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1E4D2B]/10 border border-[#1E4D2B]/20 text-[#1E4D2B] text-xs font-bold uppercase tracking-wider">
            <UtensilsCrossed className="w-3.5 h-3.5 text-[#C59A45]" />
            <span>Dine-In • Live Sweets Counter • Celebrations</span>
          </div>

          <h2 className="font-serif-heading text-3xl sm:text-4xl lg:text-5xl font-black text-[#14351E] tracking-tight">
            Visit Our Store & Dine-In <br className="hidden sm:inline" />
            <span className="text-[#C59A45] italic">or Host Your Special Celebrations</span>
          </h2>

          <p className="text-sm sm:text-base text-[#526355] leading-relaxed">
            Come with your family to relish freshly prepared pure desi ghee breakfast, hot morning jalebis, artisanal snacks, and live sweet delicacies. Or celebrate birthdays and intimate gatherings with customized sweet platters!
          </p>
        </div>

        {/* 2-Column Grid: Store Details & Timings (Left) + WhatsApp Booking Form (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Store Ambience, Exact Address & Operating Hours */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Store Experience Card with Real Ambience Photo */}
            <div className="relative rounded-3xl overflow-hidden shadow-xl border-2 border-[#DFCDB7] aspect-[16/10] bg-stone-900 group">
              <img
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=80"
                alt="Shobharam's Dine-in Ambience"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
              
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#DFB76C] text-[#14351E] text-[10px] font-black uppercase tracking-wider mb-1.5">
                  ✨ Family Dine-In Experience
                </span>
                <h3 className="font-serif-heading text-xl sm:text-2xl font-bold">
                  Shobharam's Delicacies & Restaurant Hub
                </h3>
                <p className="text-xs text-white/90 mt-1 line-clamp-2">
                  Air-conditioned hygienic family dining, live sweet crafting counter, warm morning breakfast & pure vegetarian delicacies.
                </p>
              </div>
            </div>

            {/* Address & Direction Card */}
            <div className="p-5 sm:p-6 rounded-3xl bg-white border border-[#E2D5C3] shadow-sm space-y-4">
              <div className="flex items-start gap-3.5">
                <div className="w-11 h-11 rounded-2xl bg-[#1E4D2B] text-[#DFB76C] flex items-center justify-center shrink-0 shadow-sm">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h4 className="font-serif-heading text-base font-bold text-[#14351E]">
                    Exact Store Location
                  </h4>
                  <p className="text-xs sm:text-sm text-[#526355] mt-0.5 font-medium leading-relaxed">
                    <strong>{STORE_INFO.address}</strong>, {STORE_INFO.landmark}, <br />
                    {STORE_INFO.area}, {STORE_INFO.city}, {STORE_INFO.district}, Uttar Pradesh - {STORE_INFO.pincode}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-[#F3ECE1]">
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("Shri Sai Heritage Chhapraula Greater Noida UP 201009")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#1E4D2B] hover:bg-[#14351E] text-white font-bold text-xs shadow-xs transition-colors cursor-pointer"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-[#DFB76C]" />
                  <span>Open on Google Maps</span>
                </a>

                <a
                  href={`tel:${STORE_INFO.phone.replace(/\s+/g, '')}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#FAF7F2] hover:bg-[#F3ECE1] text-[#1E4D2B] border border-[#DFCDB7] font-bold text-xs transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[#C59A45]" />
                  <span>Call Store: {STORE_INFO.phone}</span>
                </a>
              </div>
            </div>

            {/* Timings & Service Breakdown */}
            <div className="p-5 sm:p-6 rounded-3xl bg-white border border-[#E2D5C3] shadow-sm space-y-3.5">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#DFB76C]/20 text-[#14351E] flex items-center justify-center">
                  <Clock className="w-4 h-4 text-[#C59A45]" />
                </div>
                <h4 className="font-serif-heading text-base font-bold text-[#14351E]">
                  Operating Hours (Open 7 Days a Week)
                </h4>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-xs">
                <div className="p-3 rounded-2xl bg-[#FAF7F2] border border-[#EFE7D8]">
                  <p className="font-bold text-[#1E4D2B] flex items-center justify-between">
                    <span>Morning Delicacies</span>
                    <span className="text-[10px] text-[#C59A45]">Breakfast</span>
                  </p>
                  <p className="text-gray-600 mt-0.5">8:00 AM – 12:00 PM</p>
                  <p className="text-[11px] text-emerald-700 mt-1 font-semibold">Hot Bedmi Puri, Jalebi & Kachori</p>
                </div>

                <div className="p-3 rounded-2xl bg-[#FAF7F2] border border-[#EFE7D8]">
                  <p className="font-bold text-[#1E4D2B] flex items-center justify-between">
                    <span>Evening & Dinner</span>
                    <span className="text-[10px] text-[#C59A45]">Dine-In</span>
                  </p>
                  <p className="text-gray-600 mt-0.5">12:00 PM – 10:30 PM</p>
                  <p className="text-[11px] text-emerald-700 mt-1 font-semibold">Live Sweets, Chaats & Family Meals</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Birthday, Kitty Party & Function WhatsApp Booking Form */}
          <div className="lg:col-span-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-white border-2 border-[#DFB76C]/50 shadow-xl relative">
              
              {/* Header Badge */}
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-gradient-to-r from-[#DFB76C] to-[#C59A45] text-[#14351E] uppercase tracking-wider shadow-xs">
                  <PartyPopper className="w-3.5 h-3.5" /> Book Celebration
                </span>
                <span className="text-[11px] text-[#1E4D2B] font-bold bg-[#1E4D2B]/10 px-2.5 py-0.5 rounded-full">
                  Direct WhatsApp Dispatch
                </span>
              </div>

              <h3 className="font-serif-heading text-2xl font-black text-[#14351E]">
                Host Your Birthday & Celebrations
              </h3>
              <p className="text-xs sm:text-sm text-[#526355] mt-1 leading-relaxed">
                Whether it's a kid's birthday, anniversary, kitty party, or family function, reserve seating and get special customized pure ghee sweet platters!
              </p>

              {/* Form */}
              <form onSubmit={handleWhatsAppSubmit} className="mt-6 space-y-4">
                
                {/* Name & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#1E4D2B] mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="e.g. Vikas Sharma"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#DFCDB7] bg-[#FAF7F2] text-sm text-[#14351E] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1E4D2B]/30 transition-all font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1E4D2B] mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="e.g. 9876543210"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#DFCDB7] bg-[#FAF7F2] text-sm text-[#14351E] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1E4D2B]/30 transition-all font-medium"
                    />
                  </div>
                </div>

                {/* Event Type & Expected Guests */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#1E4D2B] mb-1">
                      Occasion / Celebration Type
                    </label>
                    <select
                      name="eventType"
                      value={formData.eventType}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#DFCDB7] bg-[#FAF7F2] text-sm text-[#14351E] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1E4D2B]/30 transition-all font-medium cursor-pointer"
                    >
                      <option value="Birthday Celebration 🎂">Birthday Celebration 🎂</option>
                      <option value="Small Family Function 👨‍👩‍👧‍👦">Small Family Function 👨‍👩‍👧‍👦</option>
                      <option value="Kitty Party / Friends Gathering ☕">Kitty Party / Friends Gathering ☕</option>
                      <option value="Anniversary Party 💍">Anniversary Party 💍</option>
                      <option value="Family Dine-In Table Reservation 🍽️">Family Dine-In Table Reservation 🍽️</option>
                      <option value="Corporate Sweet Catering 🏢">Corporate Sweet Catering 🏢</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1E4D2B] mb-1">
                      Expected Guests
                    </label>
                    <select
                      name="guests"
                      value={formData.guests}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#DFCDB7] bg-[#FAF7F2] text-sm text-[#14351E] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1E4D2B]/30 transition-all font-medium cursor-pointer"
                    >
                      <option value="4 to 8 Guests">4 to 8 Guests (Family Table)</option>
                      <option value="10 to 20 Guests">10 to 20 Guests (Party Seating)</option>
                      <option value="20 to 35 Guests">20 to 35 Guests (Small Function)</option>
                      <option value="35 to 50+ Guests">35 to 50+ Guests (Large Gathering)</option>
                    </select>
                  </div>
                </div>

                {/* Date & Time */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#1E4D2B] mb-1">
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#DFCDB7] bg-[#FAF7F2] text-sm text-[#14351E] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1E4D2B]/30 transition-all font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1E4D2B] mb-1">
                      Preferred Time
                    </label>
                    <select
                      name="time"
                      value={formData.time}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#DFCDB7] bg-[#FAF7F2] text-sm text-[#14351E] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1E4D2B]/30 transition-all font-medium cursor-pointer"
                    >
                      <option value="09:00 AM">09:00 AM (Morning Breakfast)</option>
                      <option value="11:30 AM">11:30 AM (Brunch)</option>
                      <option value="01:30 PM">01:30 PM (Lunch)</option>
                      <option value="05:00 PM">05:00 PM (Evening Snacks & Tea)</option>
                      <option value="07:30 PM">07:30 PM (Dinner Celebration)</option>
                      <option value="08:30 PM">08:30 PM (Late Dinner)</option>
                    </select>
                  </div>
                </div>

                {/* Notes / Special Requests */}
                <div>
                  <label className="block text-xs font-bold text-[#1E4D2B] mb-1">
                    Special Menu or Celebration Requests
                  </label>
                  <textarea
                    name="notes"
                    rows={2}
                    placeholder="e.g. Need customized pure ghee sweet boxes for guests, balloon decoration, specific mithai platter..."
                    value={formData.notes}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#DFCDB7] bg-[#FAF7F2] text-sm text-[#14351E] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1E4D2B]/30 transition-all font-medium resize-none"
                  />
                </div>

                {/* Direct WhatsApp Action Submit Button */}
                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-2xl bg-[#25D366] hover:bg-[#20BA59] text-white font-extrabold text-sm sm:text-base tracking-wide flex items-center justify-center gap-2.5 shadow-lg shadow-[#25D366]/25 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                >
                  {/* WhatsApp Vector Icon */}
                  <svg className="w-5 h-5 fill-current shrink-0" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                  </svg>
                  <span>Send Booking Request on WhatsApp</span>
                </button>

                <p className="text-[11px] text-center text-gray-500 font-medium">
                  🔒 Instant response directly on WhatsApp from Shobharam's store team ({STORE_INFO.phone}).
                </p>

              </form>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
