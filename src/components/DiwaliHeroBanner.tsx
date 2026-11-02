import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkles,
  ArrowRight,
  Flame,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Truck,
  Percent,
} from 'lucide-react';

interface DiwaliHeroBannerProps {
  onShopNowClick: () => void;
  onExploreDealsClick: () => void;
}

interface SlideData {
  badge: string;
  titleTop: string;
  titleMain: string;
  subtitle: string;
  tagline: string;
  highlightOffer: string;
  image: string;
  imageAlt: string;
  accentColor: string;
  features: string[];
}

export const DiwaliHeroBanner: React.FC<DiwaliHeroBannerProps> = ({
  onShopNowClick,
  onExploreDealsClick,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const slides: SlideData[] = [
    {
      badge: '🪔 DIWALI MEGA SALE 2026',
      titleTop: 'Upgrade Your Technology This Diwali!',
      titleMain: 'Unbeatable Deals on Laptops, Computers & Accessories',
      subtitle: 'Experience cosmic performance at Sirohi\'s premier hardware showroom. Genuine warranties, instant GST invoicing, and custom PC builds.',
      tagline: 'FLAT OFFERS ON SELECTED PRODUCTS',
      highlightOffer: 'Up to ₹25,000 Off + Free Accessories Bundle',
      image: '/src/assets/images/hero_diwali_tech_1793631813521.jpg',
      imageAlt: 'Diwali Computer Galaxy Tech Setup with Gaming PC, curved monitor, keyboard and laptop',
      accentColor: 'from-amber-500 to-orange-600',
      features: ['Genuine Brand Warranty', 'Zero Cost EMI Available', 'Free Doorstep Delivery'],
    },
    {
      badge: '⚡ FESTIVE GAMING EXTRAVAGANZA',
      titleTop: 'Power Up Your Esports Arena',
      titleMain: 'Custom Liquid Cooled Gaming Rigs with RTX 40 Series',
      subtitle: 'Hand-assembled in Sirohi with 72-hr stress testing. Customized saffron/gold RGB illumination, tempered glass cases, and extreme frame rates.',
      tagline: 'FESTIVE CASHBACK & FREE ARGB GAMING KEYBOARD',
      highlightOffer: 'Save up to 35% on Custom Built Gaming PCs',
      image: '/src/assets/images/hero_custom_gaming_pc_1793631814465.jpg',
      imageAlt: 'Custom Liquid Cooled Gaming PC Rig with gold cables and tempered glass',
      accentColor: 'from-orange-600 to-amber-600',
      features: ['Rigorous 72-Hr Stress Test', '3 Years Onsite Service', 'Custom ARGB Lighting'],
    },
    {
      badge: '💼 WORK, STUDY & CREATIVITY DEALS',
      titleTop: 'Next-Gen Performance for Everyone',
      titleMain: 'Top Branded Laptops from HP, Dell, Lenovo & Asus',
      subtitle: 'Lightweight ultrabooks, student laptops, and high-performance workstations at wholesale competitive prices with authentic bill & local support.',
      tagline: 'SPECIAL STUDENT & BUSINESS INVOICE OFFERS',
      highlightOffer: 'Exchange Bonus up to ₹8,000 + Free Laptop Bag',
      image: '/src/assets/images/hero_laptops_collection_1793631814390.jpg',
      imageAlt: 'Collection of premium student and business laptops',
      accentColor: 'from-amber-600 to-orange-500',
      features: ['Free Microsoft Office Preloaded', 'Same Day Delivery in Sirohi', 'Exchange Bonus'],
    },
  ];

  // Auto-advance slides every 6 seconds if not paused by user
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused, slides.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  const activeSlide = slides[currentSlide];

  return (
    <section
      className="relative overflow-hidden bg-gradient-to-br from-amber-50/70 via-orange-50/40 to-slate-50 border-b border-amber-200/60"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={(e) => (touchStartX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchStartX.current === null) return;
        const diff = touchStartX.current - e.changedTouches[0].clientX;
        if (diff > 50) nextSlide();
        if (diff < -50) prevSlide();
        touchStartX.current = null;
      }}
      aria-label="Diwali Mega Sale Hero Carousel"
    >
      {/* Golden Festive Decorative Top & Bottom Border */}
      <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 shadow-xs z-30" />
      <div className="absolute bottom-0 inset-x-0 h-1 bg-gradient-to-r from-amber-300 via-orange-400 to-amber-400 z-30" />

      {/* Sweeping Light Animation Overlay */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
        <div className="absolute -inset-full w-[200%] h-full bg-gradient-to-r from-transparent via-amber-200/25 to-transparent animate-sweep-light transform-gpu" />
      </div>

      {/* Subtle Floating Golden Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
        <div className="absolute top-8 left-[10%] w-2 h-2 rounded-full bg-amber-400/60 animate-float-slow" />
        <div className="absolute top-24 left-[25%] w-3 h-3 rounded-full bg-orange-400/40 animate-float-slow [animation-delay:1.2s]" />
        <div className="absolute top-16 right-[15%] w-2.5 h-2.5 rounded-full bg-amber-300/50 animate-float-slow [animation-delay:2s]" />
        <div className="absolute bottom-12 left-[35%] w-2 h-2 rounded-full bg-yellow-400/50 animate-float-slow [animation-delay:0.7s]" />
        <div className="absolute bottom-20 right-[30%] w-3 h-3 rounded-full bg-amber-500/40 animate-float-slow [animation-delay:1.7s]" />
        
        {/* Festive Golden Rangoli / Mandala Geometry Silhouette in background */}
        <svg className="absolute -right-20 -top-20 w-96 h-96 text-amber-200/25 pointer-events-none" viewBox="0 0 200 200" fill="currentColor">
          <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
          <circle cx="100" cy="100" r="60" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <path d="M100 0 L120 70 L195 100 L120 130 L100 200 L80 130 L5 100 L80 70 Z" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.6" />
        </svg>
      </div>

      {/* Main Banner Content Container */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Festive Typography & Action CTAs */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left">
            
            {/* Top Festive Ribbon with Glowing Traditional Diya */}
            <div className="flex items-center gap-3 mb-4 flex-wrap">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100/90 border border-amber-300/80 text-amber-900 text-xs sm:text-sm font-bold shadow-xs">
                {/* Glowing Diya SVG with animation */}
                <span className="relative flex items-center justify-center w-5 h-5">
                  <Flame className="w-5 h-5 text-orange-500 animate-diya" />
                  <span className="absolute -top-0.5 w-2 h-2 rounded-full bg-amber-300 blur-[2px] animate-ping opacity-75" />
                </span>
                <span className="tracking-wide uppercase">{activeSlide.badge}</span>
              </div>

              <div className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-orange-700 bg-orange-100/60 px-3 py-1 rounded-md border border-orange-200/50">
                <Sparkles className="w-3.5 h-3.5 text-orange-600" />
                <span>Sirohi Special Festive Discounts</span>
              </div>
            </div>

            {/* Sub-headline Kicker */}
            <h2 className="text-sm sm:text-base font-bold uppercase tracking-wider text-orange-600 mb-1.5">
              {activeSlide.titleTop}
            </h2>

            {/* Display Hero Title with smooth fade */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-[1.15] font-display tracking-tight text-balance mb-4">
              {activeSlide.titleMain}
            </h1>

            {/* Tagline Box with Golden Gradient Accent */}
            <div className="inline-block mb-4">
              <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-amber-900 bg-gradient-to-r from-amber-200 via-orange-200 to-amber-200 px-3.5 py-1.5 rounded-lg border border-amber-300/80 shadow-xs inline-flex items-center gap-2">
                <Percent className="w-4 h-4 text-orange-600" />
                {activeSlide.tagline}
              </span>
            </div>

            {/* Subtitle Prose */}
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mb-6">
              {activeSlide.subtitle}
            </p>

            {/* Key Value Propositions */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mb-8 text-xs sm:text-sm text-slate-700 font-medium">
              {activeSlide.features.map((feat, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            {/* Call To Action Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={onShopNowClick}
                className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-orange-600 via-orange-500 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-bold text-sm sm:text-base shadow-lg shadow-orange-600/25 hover:shadow-xl hover:shadow-orange-600/35 transition-all duration-200 flex items-center gap-2.5 group cursor-pointer active:scale-98"
                aria-label="Shop Now for Diwali Deals"
              >
                <span>SHOP NOW</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </button>

              <button
                onClick={onExploreDealsClick}
                className="px-6 py-3.5 rounded-xl bg-white/90 hover:bg-white text-slate-900 border-2 border-amber-400 hover:border-orange-500 font-bold text-sm sm:text-base shadow-xs hover:shadow-md transition-all duration-200 flex items-center gap-2 cursor-pointer active:scale-98"
                aria-label="Explore All Diwali Deals"
              >
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>EXPLORE DEALS</span>
              </button>
            </div>

            {/* Trust Markers Strip */}
            <div className="mt-8 pt-6 border-t border-amber-200/50 flex items-center gap-6 text-xs text-slate-500">
              <div className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-orange-600" />
                <span>Free Delivery in Sirohi</span>
              </div>
              <span className="text-slate-300">·</span>
              <div>
                <span className="font-semibold text-slate-700">100% Genuine</span> Hardware
              </div>
              <span className="text-slate-300">·</span>
              <div>
                <span className="font-semibold text-slate-700">GST Input</span> Invoicing
              </div>
            </div>
          </div>

          {/* Right Column: 3D High Quality Hardware Showcase with Golden Glow Frame */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              
              {/* Outer Golden Glow Aura */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-amber-400/30 via-orange-400/20 to-amber-200/40 rounded-3xl blur-xl" />

              {/* Product Visual Card with Golden Border */}
              <div className="relative rounded-2xl overflow-hidden bg-white/95 border-2 border-amber-300/80 shadow-2xl transition-all duration-500 group">
                
                {/* Diwali Festive Header Tag on Card */}
                <div className="absolute top-3 left-3 z-20 bg-slate-900/90 backdrop-blur-md text-amber-300 text-xs font-bold px-3 py-1 rounded-lg flex items-center gap-1.5 shadow-md">
                  <Flame className="w-3.5 h-3.5 text-amber-400 animate-diya" />
                  <span>{activeSlide.highlightOffer}</span>
                </div>

                <div className="relative aspect-[16/10] sm:aspect-[16/11] overflow-hidden bg-slate-100">
                  <img
                    key={activeSlide.image}
                    src={activeSlide.image}
                    alt={activeSlide.imageAlt}
                    className="w-full h-full object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="eager"
                  />
                  {/* Subtle Gradient Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Card Footer Info Strip */}
                <div className="p-4 sm:p-5 bg-gradient-to-r from-slate-900 to-slate-950 text-white flex items-center justify-between gap-3">
                  <div className="min-w-0 pr-2">
                    <p className="text-[11px] text-amber-300 font-bold uppercase tracking-wider">
                      Showcase Featured Rig
                    </p>
                    <p className="text-xs sm:text-sm font-bold text-white truncate">
                      {currentSlide === 0
                        ? 'Liquid-Cooled Gaming Setup & Curved Display'
                        : currentSlide === 1
                        ? 'Custom Amber RGB Rig with RTX 4070'
                        : 'Premium Work & Student Laptop Fleet'}
                    </p>
                  </div>
                  <button
                    onClick={onShopNowClick}
                    className="px-3.5 py-1.5 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-lg text-xs font-bold hover:brightness-110 shrink-0 transition-all cursor-pointer"
                  >
                    View Specs
                  </button>
                </div>
              </div>

              {/* Decorative Diya Accent at bottom corner of the image card */}
              <div className="absolute -bottom-4 right-4 z-30 bg-white/95 backdrop-blur-md rounded-2xl px-3 py-1.5 shadow-lg border border-amber-300/80 flex items-center gap-2">
                <span className="text-lg">🪔</span>
                <div className="text-[10px] leading-tight">
                  <span className="block font-bold text-amber-900">Shubh Labh Offers</span>
                  <span className="text-orange-600 font-semibold">Festive Season 2026</span>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Carousel Navigation Arrows & Slide Indicators */}
        <div className="mt-8 pt-4 flex items-center justify-between">
          
          {/* Slide Indicator Dots */}
          <div className="flex items-center gap-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`transition-all duration-300 rounded-full cursor-pointer h-2.5 ${
                  currentSlide === idx
                    ? 'w-8 bg-orange-600 shadow-xs'
                    : 'w-2.5 bg-amber-300 hover:bg-amber-400'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
            <span className="text-xs font-mono font-medium text-slate-500 ml-2">
              0{currentSlide + 1} / 0{slides.length}
            </span>
          </div>

          {/* Previous / Next Arrows */}
          <div className="flex items-center gap-2">
            <button
              onClick={prevSlide}
              className="p-2.5 rounded-xl bg-white/90 hover:bg-white border border-slate-200 hover:border-orange-500 text-slate-700 hover:text-orange-600 shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer active:scale-95"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              className="p-2.5 rounded-xl bg-white/90 hover:bg-white border border-slate-200 hover:border-orange-500 text-slate-700 hover:text-orange-600 shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer active:scale-95"
              aria-label="Next Slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
