import React from 'react';
import {
  Cpu,
  MapPin,
  Phone,
  Clock,
  ExternalLink,
  Youtube,
  Instagram,
  Facebook,
  ShieldCheck,
  Send,
  Navigation,
} from 'lucide-react';
import { CategoryType } from '../types/store';

interface FooterProps {
  onCategorySelect: (category: CategoryType) => void;
  onOpenPCBuilder: () => void;
  onOpenContact: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onCategorySelect,
  onOpenPCBuilder,
  onOpenContact,
}) => {
  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t-2 border-amber-500/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand & Store Bio (Col 1 & 2) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-orange-600 to-amber-400 flex items-center justify-center text-white shadow-md">
                <Cpu className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center tracking-tight font-black text-xl text-white font-display">
                  <span>COMPUTER</span>
                  <span className="text-orange-500 ml-1.5">GALAXY</span>
                </div>
                <span className="text-[10px] uppercase font-semibold tracking-wider text-amber-400/80">
                  Sirohi, Rajasthan · Since 2014
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              Sirohi's trusted hub for genuine computer hardware, custom liquid-cooled gaming PCs, branded laptops, printers, accessories, and component repairs.
            </p>

            {/* Social Media Links from prompt */}
            <div className="pt-2">
              <p className="text-xs font-bold uppercase tracking-wider text-amber-300 mb-2.5">
                Follow Us Online
              </p>
              <div className="flex items-center gap-3">
                <a
                  href="https://www.youtube.com/@weblinkitgyan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 bg-slate-900 hover:bg-red-600 text-white rounded-xl transition-colors flex items-center gap-2 text-xs font-semibold"
                  title="YouTube: weblinkitgyan"
                >
                  <Youtube className="w-4 h-4 text-red-500 hover:text-white" />
                  <span>weblinkitgyan</span>
                </a>

                <a
                  href="https://www.instagram.com/weblinkittech"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 bg-slate-900 hover:bg-gradient-to-tr hover:from-amber-600 hover:to-pink-600 text-white rounded-xl transition-all flex items-center gap-2 text-xs font-semibold"
                  title="Instagram: weblinkittech"
                >
                  <Instagram className="w-4 h-4 text-pink-400 hover:text-white" />
                  <span>weblinkittech</span>
                </a>

                <a
                  href="https://www.facebook.com/weblinkittech"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 bg-slate-900 hover:bg-blue-600 text-white rounded-xl transition-colors flex items-center gap-2 text-xs font-semibold"
                  title="Facebook: weblinkittech"
                >
                  <Facebook className="w-4 h-4 text-blue-400 hover:text-white" />
                </a>
              </div>
            </div>
          </div>

          {/* Quick Hardware Links (Col 3) */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Top Categories
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => onCategorySelect('Laptops')}
                  className="hover:text-orange-400 transition-colors cursor-pointer"
                >
                  Laptops & Notebooks
                </button>
              </li>
              <li>
                <button
                  onClick={() => onCategorySelect('Gaming PCs')}
                  className="hover:text-orange-400 transition-colors cursor-pointer"
                >
                  Custom Gaming PCs
                </button>
              </li>
              <li>
                <button
                  onClick={() => onCategorySelect('Graphics Cards')}
                  className="hover:text-orange-400 transition-colors cursor-pointer"
                >
                  Graphics Cards (RTX & Radeon)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onCategorySelect('Processors')}
                  className="hover:text-orange-400 transition-colors cursor-pointer"
                >
                  Intel & AMD Processors
                </button>
              </li>
              <li>
                <button
                  onClick={() => onCategorySelect('Printers')}
                  className="hover:text-orange-400 transition-colors cursor-pointer"
                >
                  Laser & Inkjet Printers
                </button>
              </li>
              <li>
                <button
                  onClick={() => onCategorySelect('Computer Accessories')}
                  className="hover:text-orange-400 transition-colors cursor-pointer"
                >
                  Computer Accessories & UPS
                </button>
              </li>
            </ul>
          </div>

          {/* Custom Services & Store (Col 4) */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Services & Build
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  onClick={onOpenPCBuilder}
                  className="text-amber-400 font-semibold hover:text-amber-300 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Build Your Dream PC</span>
                  <span className="text-[10px] bg-amber-400/20 px-1 rounded text-amber-300">Free Assembly</span>
                </button>
              </li>
              <li>
                <button onClick={onOpenContact} className="hover:text-orange-400 transition-colors cursor-pointer">
                  Hardware Repair & Diagnostics
                </button>
              </li>
              <li>
                <button onClick={onOpenContact} className="hover:text-orange-400 transition-colors cursor-pointer">
                  Wholesale & School Quotations
                </button>
              </li>
              <li>
                <button onClick={onOpenContact} className="hover:text-orange-400 transition-colors cursor-pointer">
                  GST Invoicing & Input Credit
                </button>
              </li>
              <li>
                <button onClick={onOpenContact} className="hover:text-orange-400 transition-colors cursor-pointer">
                  Track Delivery Order
                </button>
              </li>
            </ul>
          </div>

          {/* Shop Address & Directions (Col 5) */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Store Contact & Hours
            </h4>

            <div className="flex items-start gap-2.5 text-xs text-slate-400">
              <MapPin className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
              <span>
                COMPUTER GALAXY, Near Main Market / Station Road, Sirohi, Rajasthan – 307001
              </span>
            </div>

            <div className="flex items-center gap-2.5 text-xs text-slate-300 font-semibold">
              <Phone className="w-4 h-4 text-orange-500 shrink-0" />
              <a href="tel:08852834882" className="hover:text-orange-400">
                088528 34882
              </a>
            </div>

            <div className="flex items-start gap-2.5 text-xs text-slate-400">
              <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <p>Mon - Sat: 10:00 AM – 8:30 PM</p>
                <p className="text-slate-500 text-[11px]">Sunday: 11:00 AM – 5:00 PM</p>
              </div>
            </div>

            {/* Google Maps Directions Button */}
            <div className="pt-2">
              <a
                href="https://maps.google.com/?q=Computer+Galaxy+Sirohi+Rajasthan"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 bg-slate-900 hover:bg-orange-600 text-white rounded-xl text-xs font-bold transition-colors border border-slate-800"
              >
                <Navigation className="w-3.5 h-3.5 text-amber-400" />
                <span>Google Maps Directions</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Strip: Payments & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            <p>
              © {new Date().getFullYear()} COMPUTER GALAXY, Sirohi, Rajasthan. All Rights Reserved.
            </p>
            <p className="text-[11px] text-slate-600 mt-0.5">
              Authorized computer retail & wholesale showroom. Prices inclusive of GST.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] text-slate-400">Accepted:</span>
            <span className="bg-slate-900 px-2 py-1 rounded text-[10px] font-mono text-slate-300">UPI / QR Code</span>
            <span className="bg-slate-900 px-2 py-1 rounded text-[10px] font-mono text-slate-300">Cash on Delivery</span>
            <span className="bg-slate-900 px-2 py-1 rounded text-[10px] font-mono text-slate-300">Credit / Debit Cards</span>
            <span className="bg-slate-900 px-2 py-1 rounded text-[10px] font-mono text-slate-300">Net Banking</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
