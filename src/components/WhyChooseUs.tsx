import React from 'react';
import {
  ShieldCheck,
  BadgePercent,
  Headphones,
  Truck,
  CheckCircle,
} from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const features = [
    {
      icon: <ShieldCheck className="w-8 h-8 text-orange-600" />,
      title: 'Genuine Products',
      subtitle: '100% Authentic with Manufacturer Warranty',
      description:
        'Every laptop, motherboard, graphics card, and component comes brand new in factory-sealed boxes with legitimate GST tax invoice and manufacturer warranty claimable across India.',
      highlights: ['Direct Brand Sourcing', 'Verified Serial Numbers'],
    },
    {
      icon: <BadgePercent className="w-8 h-8 text-amber-600" />,
      title: 'Best Competitive Prices',
      subtitle: 'Wholesale & Retail Rates in Sirohi',
      description:
        'Direct partnerships with major tech distributors allow us to match or beat metropolitan price quotes right here in Sirohi, Rajasthan. No hidden markups or grey market products.',
      highlights: ['Bulk / Institutional Rates', 'Festive Dhamaka Discounts'],
    },
    {
      icon: <Headphones className="w-8 h-8 text-orange-600" />,
      title: 'Expert Technical Support',
      subtitle: 'Experienced Hardware Engineers Onsite',
      description:
        'Have a PC issue, upgrade dilemma, or BIOS compatibility question? Our experienced in-house technicians provide live testing, thermal optimization, chip-level troubleshooting, and repair support.',
      highlights: ['Free System Diagnostics', 'Local Sirohi Service Bench'],
    },
    {
      icon: <Truck className="w-8 h-8 text-amber-600" />,
      title: 'All India Delivery',
      subtitle: 'Fast Doorstep Shipping with Secure Packaging',
      description:
        'Same-day and 24-hour express doorstep delivery in Sirohi and surrounding Rajasthan districts (Pali, Jalore, Abu Road, Udaipur). Insured express courier shipping across all Indian pincodes.',
      highlights: ['Transit Insurance Included', 'Real-time Tracking'],
    },
  ];

  return (
    <section className="py-16 bg-slate-50 border-b border-slate-200/80" id="why-choose-us">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-orange-600 mb-2">
            <span>THE COMPUTER GALAXY ADVANTAGE</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight font-display">
            Why Choose COMPUTER GALAXY?
          </h2>
          <p className="text-sm sm:text-base text-slate-500 mt-2">
            Providing reliable hardware, honest consultation, and prompt local after-sales service since our inception in Sirohi.
          </p>
        </div>

        {/* 4 Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feat, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 border border-slate-200/80 hover:border-amber-400 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-orange-50 group-hover:bg-orange-100/80 flex items-center justify-center mb-5 transition-colors">
                  {feat.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-orange-600 transition-colors">
                  {feat.title}
                </h3>
                <p className="text-xs font-semibold text-amber-700 mt-0.5 mb-3">
                  {feat.subtitle}
                </p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {feat.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col gap-1.5">
                {feat.highlights.map((h, i) => (
                  <div key={i} className="flex items-center gap-1.5 text-[11px] font-medium text-slate-700">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
