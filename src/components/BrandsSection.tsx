import React from 'react';
import { BRANDS_LIST } from '../data/initialProducts';

interface BrandsSectionProps {
  onBrandSelect: (brand: string) => void;
}

export const BrandsSection: React.FC<BrandsSectionProps> = ({ onBrandSelect }) => {
  return (
    <section className="py-14 bg-white border-b border-slate-200/80" id="brands">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <p className="text-xs font-bold uppercase tracking-wider text-orange-600 mb-1">
            AUTHORIZED DISTRIBUTION & PARTNERSHIPS
          </p>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-display">
            Global Tech Brands We Retail
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Official warranty, genuine boxed retail units, and full driver / firmware assistance.
          </p>
        </div>

        {/* Brands Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
          {BRANDS_LIST.map((brand, idx) => (
            <button
              key={idx}
              onClick={() => onBrandSelect(brand.name)}
              className="group p-4 bg-slate-50/70 hover:bg-white rounded-2xl border border-slate-200/70 hover:border-orange-500 hover:shadow-md transition-all duration-200 flex flex-col items-center justify-center text-center cursor-pointer active:scale-97"
              aria-label={`View ${brand.name} products`}
            >
              <span className="font-display font-black text-lg sm:text-xl text-slate-800 tracking-tighter group-hover:text-orange-600 transition-colors">
                {brand.logoText}
              </span>
              <span className="text-[10px] text-slate-500 mt-1 font-medium truncate max-w-full">
                {brand.category}
              </span>
            </button>
          ))}
        </div>

      </div>
    </section>
  );
};
