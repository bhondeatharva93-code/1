import React from 'react';
import {
  Laptop,
  Monitor,
  Cpu,
  Zap,
  CircuitBoard,
  Tv,
  Keyboard,
  Printer,
  HardDrive,
  Gamepad2,
  ArrowRight,
} from 'lucide-react';
import { CategoryType } from '../types/store';
import { CATEGORIES_LIST } from '../data/initialProducts';

interface ShopByCategoryProps {
  activeCategory: string;
  onSelectCategory: (category: CategoryType) => void;
}

export const ShopByCategory: React.FC<ShopByCategoryProps> = ({
  activeCategory,
  onSelectCategory,
}) => {
  const getIcon = (id: string) => {
    switch (id) {
      case 'Laptops':
        return <Laptop className="w-6 h-6" />;
      case 'Desktop Computers':
        return <Monitor className="w-6 h-6" />;
      case 'Gaming PCs':
        return <Gamepad2 className="w-6 h-6" />;
      case 'Processors':
        return <Cpu className="w-6 h-6" />;
      case 'Graphics Cards':
        return <Zap className="w-6 h-6" />;
      case 'Motherboards':
        return <CircuitBoard className="w-6 h-6" />;
      case 'Monitors':
        return <Tv className="w-6 h-6" />;
      case 'Keyboards & Mouse':
        return <Keyboard className="w-6 h-6" />;
      case 'Printers':
        return <Printer className="w-6 h-6" />;
      case 'Computer Accessories':
      default:
        return <HardDrive className="w-6 h-6" />;
    }
  };

  return (
    <section className="py-14 bg-slate-50 border-b border-slate-200/80" id="categories">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-orange-600 mb-1">
              <span>EXPLORE HARDWARE CATEGORIES</span>
              <span aria-hidden="true">·</span>
              <span>100% Genuine Inventory</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-display">
              Shop by Category
            </h2>
            <p className="text-sm text-slate-500 mt-1 max-w-xl">
              Browse branded parts, complete PC configurations, accessories and enterprise solutions available at our Sirohi store.
            </p>
          </div>

          <div className="text-xs font-semibold text-slate-500 flex items-center gap-1.5 self-start md:self-auto">
            <span>Wholesale & Retail pricing in INR (₹)</span>
          </div>
        </div>

        {/* 10 Category Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-5">
          {CATEGORIES_LIST.map((cat) => {
            const isSelected = activeCategory === cat.name;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.name as CategoryType)}
                className={`group relative text-left p-4 sm:p-5 rounded-2xl transition-all duration-200 bg-white border cursor-pointer flex flex-col justify-between h-40 ${
                  isSelected
                    ? 'border-orange-500 ring-2 ring-orange-500/20 shadow-md'
                    : 'border-slate-200/80 hover:border-amber-400 hover:shadow-lg hover:-translate-y-1'
                }`}
                aria-label={`Filter by ${cat.name}`}
              >
                {/* Icon Badge */}
                <div className="flex items-center justify-between w-full">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                      isSelected
                        ? 'bg-orange-600 text-white shadow-sm'
                        : 'bg-slate-50 text-slate-700 group-hover:bg-orange-50 group-hover:text-orange-600'
                    }`}
                  >
                    {getIcon(cat.id)}
                  </div>
                  <span className="text-[11px] font-mono font-medium text-slate-400 group-hover:text-slate-600">
                    {cat.count}+ Items
                  </span>
                </div>

                {/* Text Labels */}
                <div>
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-orange-600 transition-colors leading-snug">
                    {cat.name}
                  </h3>
                  <p className="text-[11px] text-slate-500 truncate mt-0.5">
                    {cat.desc}
                  </p>
                </div>

                {/* Subtle Hover Indicator */}
                <div className="flex items-center gap-1 text-[11px] font-semibold text-orange-600 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>Browse</span>
                  <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
                </div>
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
};
