import React, { useState } from 'react';
import {
  X,
  Cpu,
  Zap,
  HardDrive,
  ShieldCheck,
  Check,
  Plus,
  Send,
  ShoppingCart,
  Sparkles,
} from 'lucide-react';
import { CustomPCBuild, PCPart, Product } from '../types/store';
import { PC_BUILDER_PARTS } from '../data/initialProducts';
import { formatINR, calculatePCBuildStats } from '../utils/pricing';

interface PCBuilderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddBuildToCart: (customProduct: Product) => void;
}

export const PCBuilderModal: React.FC<PCBuilderModalProps> = ({
  isOpen,
  onClose,
  onAddBuildToCart,
}) => {
  // Pre-select a balanced gaming configuration initially
  const [build, setBuild] = useState<CustomPCBuild>({
    cpu: PC_BUILDER_PARTS.find((p) => p.id === 'part-cpu-1'),
    gpu: PC_BUILDER_PARTS.find((p) => p.id === 'part-gpu-2'),
    motherboard: PC_BUILDER_PARTS.find((p) => p.id === 'part-mb-1'),
    ram: PC_BUILDER_PARTS.find((p) => p.id === 'part-ram-1'),
    storage: PC_BUILDER_PARTS.find((p) => p.id === 'part-ssd-1'),
    psu: PC_BUILDER_PARTS.find((p) => p.id === 'part-psu-2'),
    case: PC_BUILDER_PARTS.find((p) => p.id === 'part-case-2'),
    cooler: PC_BUILDER_PARTS.find((p) => p.id === 'part-cooler-2'),
  });

  const [activeSlot, setActiveSlot] = useState<keyof CustomPCBuild>('cpu');
  const [copiedNotification, setCopiedNotification] = useState(false);

  if (!isOpen) return null;

  const stats = calculatePCBuildStats(build);

  const partCategories: { key: keyof CustomPCBuild; label: string; icon: string; count: number }[] = [
    { key: 'cpu', label: 'Processor (CPU)', icon: 'cpu', count: 4 },
    { key: 'gpu', label: 'Graphics Card (GPU)', icon: 'zap', count: 4 },
    { key: 'motherboard', label: 'Motherboard', icon: 'circuit-board', count: 3 },
    { key: 'ram', label: 'Memory (RAM)', icon: 'memory', count: 3 },
    { key: 'storage', label: 'Storage (SSD)', icon: 'hard-drive', count: 3 },
    { key: 'psu', label: 'Power Supply (PSU)', icon: 'power', count: 3 },
    { key: 'case', label: 'Cabinet / Case', icon: 'box', count: 3 },
    { key: 'cooler', label: 'CPU Cooling', icon: 'fan', count: 3 },
  ];

  const currentAvailableParts = PC_BUILDER_PARTS.filter((p) => p.type === activeSlot);

  const handleSelectPart = (part: PCPart) => {
    setBuild((prev) => ({
      ...prev,
      [activeSlot]: part,
    }));
  };

  const handleAddToCart = () => {
    const summarySpecs = [
      `CPU: ${build.cpu?.name || 'Selected'}`,
      `GPU: ${build.gpu?.name || 'Integrated'}`,
      `RAM: ${build.ram?.name || 'Selected'}`,
      `Motherboard: ${build.motherboard?.name || 'Selected'}`,
      `SSD: ${build.storage?.name || 'Selected'}`,
      `Cabinet: ${build.case?.name || 'Selected'}`,
      `PSU: ${build.psu?.name || 'Selected'}`,
    ];

    const customProduct: Product = {
      id: `custom-build-${Date.now()}`,
      name: `Custom PC Rig (${build.cpu?.name.split(' ')[0]} + ${build.gpu?.name.split(' ')[0]})`,
      brand: 'COMPUTER GALAXY Custom',
      category: 'Gaming PCs',
      price: stats.totalPrice,
      oldPrice: Math.round(stats.totalPrice * 1.15),
      discountPercentage: 13,
      rating: 5.0,
      reviewCount: 1,
      image: '/src/assets/images/custom_pc_builder_rig_1793631814259.jpg',
      inStock: true,
      specs: summarySpecs,
      description: `Custom configured workstation built by Computer Galaxy Sirohi. Estimated peak power draw: ${stats.estimatedWattage}W.`,
      warranty: '3 Years Full Hardware Warranty with Local Sirohi Testing Bench Guarantee',
    };

    onAddBuildToCart(customProduct);
    onClose();
  };

  const handleWhatsAppQuote = () => {
    const partsList = [
      `CPU: ${build.cpu?.name || 'None'}`,
      `GPU: ${build.gpu?.name || 'None'}`,
      `Motherboard: ${build.motherboard?.name || 'None'}`,
      `RAM: ${build.ram?.name || 'None'}`,
      `Storage: ${build.storage?.name || 'None'}`,
      `PSU: ${build.psu?.name || 'None'}`,
      `Cabinet: ${build.case?.name || 'None'}`,
      `Cooler: ${build.cooler?.name || 'None'}`,
    ].join('%0A');

    const message = `Hello Computer Galaxy Sirohi!%0A%0AI want to get a quote for a Custom PC Build:%0A${partsList}%0A%0AEstimated Total: ${formatINR(stats.totalPrice)}%0APlease let me know availability and best Diwali discounts!`;
    const whatsappUrl = `https://wa.me/918852834882?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div className="bg-white w-full max-w-5xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Modal Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-slate-900 to-slate-950 text-white flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-500/20 text-orange-400 border border-orange-500/30 flex items-center justify-center">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold font-display text-white">
                Interactive PC Builder Configurator
              </h3>
              <p className="text-xs text-amber-300 font-medium">
                Assemble custom components with live wattage estimation & Sirohi bench support
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
            aria-label="Close builder modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: Split view (Left: Category selector, Middle: Part selection, Right: Rig Summary) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 flex-1 overflow-y-auto divide-y lg:divide-y-0 lg:divide-x divide-slate-200">
          
          {/* Column 1: Slot Navigator */}
          <div className="lg:col-span-3 p-4 bg-slate-50 flex flex-col gap-1.5 overflow-y-auto">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-2 mb-1">
              Select Component Slot
            </p>
            {partCategories.map((slot) => {
              const selectedPart = build[slot.key];
              const isCurrent = activeSlot === slot.key;
              return (
                <button
                  key={slot.key}
                  onClick={() => setActiveSlot(slot.key)}
                  className={`w-full text-left p-3 rounded-xl transition-all flex items-center justify-between cursor-pointer ${
                    isCurrent
                      ? 'bg-orange-600 text-white shadow-sm font-bold'
                      : 'bg-white hover:bg-slate-100 text-slate-800 border border-slate-200/80 font-medium'
                  }`}
                >
                  <div className="overflow-hidden pr-2">
                    <p className={`text-xs ${isCurrent ? 'text-white' : 'text-slate-500'}`}>
                      {slot.label}
                    </p>
                    <p className={`text-xs truncate ${isCurrent ? 'text-amber-100 font-semibold' : 'text-slate-900 font-bold'}`}>
                      {selectedPart ? selectedPart.name : 'Select part'}
                    </p>
                  </div>
                  {selectedPart && (
                    <span className={`text-[11px] font-mono shrink-0 ${isCurrent ? 'text-amber-200' : 'text-slate-500'}`}>
                      {formatINR(selectedPart.price)}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Column 2: Available Options for Active Slot */}
          <div className="lg:col-span-5 p-5 overflow-y-auto flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                Choose {partCategories.find((c) => c.key === activeSlot)?.label}
              </h4>
              <span className="text-xs text-slate-400">
                {currentAvailableParts.length} models available
              </span>
            </div>

            <div className="space-y-2.5">
              {currentAvailableParts.map((part) => {
                const isSelected = build[activeSlot]?.id === part.id;
                return (
                  <div
                    key={part.id}
                    onClick={() => handleSelectPart(part)}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                      isSelected
                        ? 'border-orange-500 bg-orange-50/60 ring-2 ring-orange-500/20'
                        : 'border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-orange-600">
                          {part.brand}
                        </span>
                        <span className="text-slate-300 text-xs">·</span>
                        <span className="text-[10px] font-medium text-slate-500">
                          {part.performanceTier}
                        </span>
                        {part.wattage > 0 && (
                          <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.2 rounded font-mono">
                            {part.wattage}W
                          </span>
                        )}
                      </div>
                      <p className="text-sm font-bold text-slate-900 mt-0.5">{part.name}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{part.keySpec}</p>
                    </div>

                    <div className="text-right shrink-0">
                      <p className="text-sm font-black text-slate-900 font-mono">
                        {formatINR(part.price)}
                      </p>
                      <button
                        className={`mt-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                          isSelected
                            ? 'bg-orange-600 text-white'
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                        }`}
                      >
                        {isSelected ? 'Selected' : 'Pick'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Column 3: Live Rig Architecture & Wattage Specs */}
          <div className="lg:col-span-4 p-5 bg-slate-50/80 flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-200">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-900">
                  Build Summary
                </span>
                <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                  {stats.partsCount} Components Chosen
                </span>
              </div>

              {/* Technical Power & Wattage Meter */}
              <div className="p-3.5 bg-white rounded-xl border border-slate-200 mb-4 shadow-xs">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="text-slate-600 flex items-center gap-1 font-medium">
                    <Zap className="w-3.5 h-3.5 text-amber-500" />
                    Estimated Peak Power
                  </span>
                  <span className="font-mono font-bold text-slate-900">
                    ~{stats.estimatedWattage} Watts
                  </span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-emerald-500 to-amber-500 h-full rounded-full transition-all duration-300"
                    style={{ width: `${Math.min(100, (stats.estimatedWattage / 750) * 100)}%` }}
                  />
                </div>
                <p className="text-[11px] text-slate-400 mt-2">
                  Recommended PSU: <strong className="text-slate-700">{stats.recommendedPsuWattage}W or higher</strong>
                </p>
              </div>

              {/* Price Calculation Breakdown */}
              <div className="space-y-2 text-xs text-slate-600 bg-white p-3.5 rounded-xl border border-slate-200 mb-4">
                <div className="flex justify-between">
                  <span>Hardware Subtotal</span>
                  <span className="font-mono font-bold text-slate-900">{formatINR(stats.totalPrice)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Professional Assembly & Wiring</span>
                  <span className="font-bold text-emerald-600">FREE (Diwali Offer)</span>
                </div>
                <div className="flex justify-between">
                  <span>72-Hour Bench Stress Testing</span>
                  <span className="font-bold text-emerald-600">FREE</span>
                </div>
                <div className="flex justify-between">
                  <span>Doorstep Insured Delivery</span>
                  <span className="font-bold text-emerald-600">FREE</span>
                </div>
                <div className="pt-2 border-t border-slate-100 flex justify-between items-baseline">
                  <span className="font-bold text-slate-900 text-sm">Estimated Total</span>
                  <span className="font-black text-slate-900 text-lg font-mono text-orange-600">
                    {formatINR(stats.totalPrice)}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-2">
              <button
                onClick={handleAddToCart}
                className="w-full py-3.5 bg-orange-600 hover:bg-orange-700 text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Add Custom Rig to Cart</span>
              </button>

              <button
                onClick={handleWhatsAppQuote}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
              >
                <Send className="w-4 h-4" />
                <span>WhatsApp Quote to Store (088528 34882)</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
