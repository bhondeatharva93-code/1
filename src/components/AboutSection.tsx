import React from 'react';
import {
  MapPin,
  Clock,
  Award,
  CheckCircle2,
  Users,
  Store,
  ArrowRight,
} from 'lucide-react';

interface AboutSectionProps {
  onContactClick: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onContactClick }) => {
  return (
    <section className="py-16 bg-slate-50 border-b border-slate-200/80" id="about">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-orange-600 mb-2">
              <Store className="w-4 h-4" />
              <span>SIROHI’S PREMIER HARDWARE SHOWROOM & SERVICE BENCH</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight font-display text-balance mb-4">
              COMPUTER GALAXY – Sirohi's Trusted Computer Hub
            </h2>

            <blockquote className="text-base sm:text-lg font-medium text-amber-900 bg-amber-50/80 p-4 rounded-xl border border-amber-200/60 mb-6 leading-relaxed">
              "We are a trusted wholesaler and retailer providing branded computer parts, laptops, printers, accessories and complete PC solutions."
            </blockquote>

            <p className="text-sm text-slate-600 leading-relaxed mb-4">
              Conveniently located at Station Road in Sirohi, Rajasthan, Computer Galaxy serves retail buyers, educational institutions, government offices, gaming enthusiasts, and wholesale resellers across Sirohi district and neighboring regions.
            </p>

            <p className="text-sm text-slate-600 leading-relaxed mb-6">
              From budget student laptops to bleeding-edge liquid-cooled 4K gaming workstations, laser printers for commercial offices, and certified repair diagnostics — we bridge metropolitan pricing and authentic brand support with genuine local hospitality.
            </p>

            {/* Quick stats / metrics strip */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-200 mb-6">
              <div className="p-3 bg-white rounded-xl border border-slate-200/70">
                <p className="text-2xl font-black text-slate-900 font-mono">10,000+</p>
                <p className="text-xs text-slate-500 font-medium">Satisfied Customers</p>
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200/70">
                <p className="text-2xl font-black text-slate-900 font-mono">12+ Years</p>
                <p className="text-xs text-slate-500 font-medium">Trusted Presence in Sirohi</p>
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200/70 col-span-2 sm:col-span-1">
                <p className="text-2xl font-black text-orange-600 font-mono">100%</p>
                <p className="text-xs text-slate-500 font-medium">Genuine Boxed Stock</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={onContactClick}
                className="px-6 py-3 bg-slate-900 hover:bg-orange-600 text-white font-bold text-xs sm:text-sm rounded-xl transition-colors flex items-center gap-2 cursor-pointer"
              >
                <span>Visit Our Sirohi Store</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Visual / Store Information Card */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-lg relative">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                    Walk-in Store Details
                  </span>
                </div>
                <span className="text-xs font-semibold text-orange-600 bg-orange-50 px-2 py-0.5 rounded">
                  Wholesale & Retail
                </span>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-slate-700">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-slate-900">Physical Address</p>
                    <p className="text-slate-600">
                      COMPUTER GALAXY, Near Main Market / Station Road,
                      Sirohi, Rajasthan – 307001, India.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-slate-900">Working Hours</p>
                    <p className="text-slate-600">Monday to Saturday: 10:00 AM – 8:30 PM</p>
                    <p className="text-slate-500 text-xs">Sunday: 11:00 AM – 5:00 PM (Festive Season)</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Award className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-slate-900">Specializations</p>
                    <p className="text-slate-600">
                      Gaming PC Assembly, Laptop Display & Motherboard Replacement, Toner Refilling, SSD Upgrades, Bulk Institutional IT Sales.
                    </p>
                  </div>
                </div>
              </div>

              {/* Direct Call / Direction Button */}
              <div className="mt-6 pt-4 border-t border-slate-100 grid grid-cols-2 gap-3">
                <a
                  href="tel:08852834882"
                  className="py-2.5 text-center bg-orange-50 hover:bg-orange-100 text-orange-700 font-bold text-xs rounded-xl transition-colors border border-orange-200/80"
                >
                  Call Store: 088528 34882
                </a>
                <a
                  href="https://maps.google.com/?q=Computer+Galaxy+Sirohi+Rajasthan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 text-center bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl transition-colors"
                >
                  Get Directions
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
