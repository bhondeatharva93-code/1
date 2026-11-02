import React from 'react';
import {
  Wrench,
  Cpu,
  Zap,
  ShieldCheck,
  ArrowRight,
  Flame,
  CheckCircle2,
} from 'lucide-react';

interface BuildDreamPCProps {
  onConfigureClick: () => void;
}

export const BuildDreamPC: React.FC<BuildDreamPCProps> = ({ onConfigureClick }) => {
  return (
    <section className="py-16 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 text-white relative overflow-hidden" id="custom-pc">
      {/* Decorative Golden Ambient Bokeh */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Visual Column: Custom Rig Masterpiece */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden border-2 border-amber-400/30 shadow-2xl bg-slate-950 group">
              <img
                src="/src/assets/images/custom_pc_builder_rig_1793631814259.jpg"
                alt="Custom built gaming PC rig at Computer Galaxy Sirohi"
                className="w-full h-auto aspect-[4/3] object-cover group-hover:scale-103 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
              
              {/* Floating Badge */}
              <div className="absolute bottom-4 left-4 right-4 bg-slate-900/90 backdrop-blur-md p-3.5 rounded-xl border border-amber-400/40 flex items-center justify-between">
                <div>
                  <p className="text-amber-400 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
                    <Flame className="w-3.5 h-3.5 animate-diya" />
                    Custom Liquid & Air Tuned Rigs
                  </p>
                  <p className="text-white text-sm font-semibold">
                    Built by certified hardware engineers in Sirohi
                  </p>
                </div>
                <span className="text-xs bg-amber-500/20 text-amber-300 font-mono font-bold px-2.5 py-1 rounded-md border border-amber-400/30">
                  ₹0 Assembly
                </span>
              </div>
            </div>
          </div>

          {/* Right Text Column: Title, Subtitle, Highlights & Action */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-300 text-xs font-bold uppercase tracking-wider mb-3 self-start">
              <Wrench className="w-3.5 h-3.5 text-amber-400" />
              <span>Tailored Hardware Architecture</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-display tracking-tight text-balance">
              BUILD YOUR DREAM PC
            </h2>

            <p className="text-base sm:text-lg text-amber-200/90 font-medium mt-2 mb-4">
              Gaming, Editing or Office – We Build Your Perfect PC.
            </p>

            <p className="text-sm text-slate-300 leading-relaxed mb-6">
              Don’t settle for generic pre-builts. Select your favorite processor, GPU, high-speed RAM and panoramic glass cabinet. Our technical team configures, optimizes thermal airflow, tests for stability, and ships right to your doorstep with full GST bill.
            </p>

            {/* Feature Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 text-xs sm:text-sm text-slate-200">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Zero Assembly Charges this Diwali</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>72-Hour Rigorous Benchmark Test</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Custom Clean Cable Management</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Instant Quotation & Local Support</span>
              </div>
            </div>

            {/* Action Trigger */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={onConfigureClick}
                className="px-8 py-4 bg-gradient-to-r from-orange-500 via-amber-500 to-amber-400 hover:from-orange-600 hover:to-amber-500 text-slate-950 font-black text-sm sm:text-base rounded-xl shadow-lg shadow-orange-500/25 hover:shadow-xl hover:shadow-orange-500/35 transition-all duration-200 flex items-center gap-3 cursor-pointer group active:scale-98"
                aria-label="Configure Your PC"
              >
                <span>CONFIGURE YOUR PC</span>
                <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" />
              </button>

              <div className="text-xs text-slate-400">
                <span className="block text-slate-300 font-semibold">Starting from ₹24,999</span>
                <span>Custom budget options for any requirement</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
