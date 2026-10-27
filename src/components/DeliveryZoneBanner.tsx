import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Truck, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  Package, 
  Phone, 
  Mail,
  ShieldCheck
} from 'lucide-react';
import { STORE_INFO, LOCAL_COVERAGE_AREAS } from '../data/products';

export const DeliveryZoneBanner: React.FC = () => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<{
    status: 'fresh-eligible' | 'grocery-eligible' | null;
    message: string;
    details: string;
  }>({ status: null, message: '', details: '' });

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = query.trim().toLowerCase();
    if (!clean) return;

    // Check if in 8 km local area
    const localKeywords = [
      '201009', 'chhapraula', 'sai heritage', 'tyagi', 'dhoom manikpur', 
      'bisrakh', 'gaur city', 'crossings republik', 'lal kuan', 'chipiyana', 
      'maripat', 'dadri', 'gautam buddh', 'gr noida', 'greater noida'
    ];

    const isLocal = localKeywords.some((k) => clean.includes(k));

    if (isLocal) {
      setResult({
        status: 'fresh-eligible',
        message: '🎉 Congratulations! You are in our 8 KM Fresh Express Zone!',
        details: 'You can order Fresh Pure Ghee Mithai & hot delicacies (under 45 mins), as well as packaged groceries & ghee!'
      });
    } else {
      setResult({
        status: 'grocery-eligible',
        message: '📦 All-India & City Grocery Delivery Available!',
        details: 'You can order all packaged Groceries, Namkeen, Vedic Bilona Ghee, Retort Curries & Hampers. (Fresh perishable sweets are restricted within 8 KM to preserve quality).'
      });
    }
  };

  return (
    <section className="bg-gradient-to-b from-[#FAF7F2] to-[#F3ECE1] py-10 sm:py-14 border-y border-[#DFCDB7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Alert Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#C59A45]/30 shadow-lg relative overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Info: Store Hub & 8 KM Policy */}
            <div className="lg:col-span-7 space-y-4">
              
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1E4D2B] text-[#FAF7F2] text-xs font-bold uppercase tracking-wider">
                <Truck className="w-3.5 h-3.5 text-[#DFB76C]" />
                <span>Our Freshness & Delivery Radius Policy</span>
              </div>

              <h3 className="font-serif-heading text-2xl sm:text-3xl font-extrabold text-[#14351E]">
                8 KM Fresh Express Zone <span className="text-[#C59A45]">&</span> All-India Grocery
              </h3>

              <p className="text-sm text-[#526355] leading-relaxed">
                Hamare products kabhi kharab na hon, isliye <strong className="text-[#1E4D2B]">Fresh Pure Ghee Mithai</strong> hum sirf hamare store ke <strong className="text-[#1E4D2B]">8 KM ke daayre (radius)</strong> mein 45 minutes mein deliver karte hain.
                Jabki <strong className="text-[#1E4D2B]">Packaged Groceries, Namkeen, Bilona Ghee, Spices aur Sealed Retort Meals</strong> pure sheher aur All-India safe packaging ke saath deliver hote hain!
              </p>

              {/* Exact Store Location Card */}
              <div className="p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#DFCDB7] text-xs text-[#2C3E2D] space-y-1.5">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#1E4D2B] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-[#1E4D2B] text-xs block">Dispatch & Store Hub:</span>
                    <span className="font-medium text-[#4A5568]">
                      {STORE_INFO.address}, {STORE_INFO.landmark}, {STORE_INFO.area}, {STORE_INFO.city}, {STORE_INFO.district}, {STORE_INFO.state} - {STORE_INFO.pincode}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 pt-1 text-[11px] text-[#526355]">
                  <a href={`tel:${STORE_INFO.phone}`} className="flex items-center gap-1 font-bold text-[#1E4D2B] hover:underline">
                    <Phone className="w-3 h-3 text-[#C59A45]" />
                    {STORE_INFO.phone}
                  </a>
                  <a href={`mailto:${STORE_INFO.email}`} className="flex items-center gap-1 font-bold text-[#1E4D2B] hover:underline">
                    <Mail className="w-3 h-3 text-[#C59A45]" />
                    {STORE_INFO.email}
                  </a>
                  <span className="bg-[#1E4D2B]/10 text-[#1E4D2B] px-2 py-0.5 rounded-full font-bold">
                    Radius: {STORE_INFO.radiusKm} KM Fresh Express
                  </span>
                </div>
              </div>

            </div>

            {/* Right: Interactive Pincode / Area Checker */}
            <div className="lg:col-span-5 bg-[#FAF7F2] p-5 sm:p-6 rounded-2xl border border-[#DFCDB7] space-y-3">
              <h4 className="font-serif-heading text-base font-bold text-[#1E4D2B] flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#C59A45]" />
                Check Your Delivery Zone
              </h4>
              <p className="text-xs text-[#768478]">
                Apna Pincode (e.g. <strong>201009</strong>) ya Area (Chhapraula, Gaur City, etc.) daal kar check karein:
              </p>

              <form onSubmit={handleCheck} className="flex gap-2">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Enter Pincode (201009) or Area..."
                  required
                  className="flex-1 px-3.5 py-2.5 rounded-xl bg-white border border-[#DFCDB7] text-xs text-[#1E4D2B] focus:outline-none focus:ring-2 focus:ring-[#1E4D2B] font-medium"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-xl bg-[#1E4D2B] hover:bg-[#163A20] text-white text-xs font-bold uppercase transition-all shadow-md cursor-pointer whitespace-nowrap"
                >
                  Check
                </button>
              </form>

              {/* Check Result Pill */}
              {result.status && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`p-3.5 rounded-xl text-xs space-y-1 border ${
                    result.status === 'fresh-eligible'
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                      : 'bg-amber-50 border-amber-300 text-amber-900'
                  }`}
                >
                  <p className="font-bold flex items-center gap-1.5">
                    {result.status === 'fresh-eligible' ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    ) : (
                      <Package className="w-4 h-4 text-amber-600 shrink-0" />
                    )}
                    {result.message}
                  </p>
                  <p className="text-[11px] leading-relaxed text-gray-700">{result.details}</p>
                </motion.div>
              )}

              {/* Nearby covered spots */}
              <div className="pt-2">
                <span className="text-[10px] uppercase font-bold text-gray-400 block mb-1">
                  8 KM Fresh Zone Covered Areas:
                </span>
                <div className="flex flex-wrap gap-1">
                  {LOCAL_COVERAGE_AREAS.slice(0, 5).map((area, i) => (
                    <span
                      key={i}
                      onClick={() => setQuery(area)}
                      className="px-2 py-0.5 rounded-md bg-white border border-[#E2D5C3] text-[10px] text-gray-600 hover:border-[#1E4D2B] cursor-pointer"
                    >
                      {area}
                    </span>
                  ))}
                  <span className="text-[10px] text-gray-400 px-1 py-0.5">+ more</span>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
