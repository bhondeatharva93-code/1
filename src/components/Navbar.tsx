import React, { useState } from 'react';
import {
  Search,
  Heart,
  ShoppingCart,
  User,
  Menu,
  X,
  Cpu,
  SlidersHorizontal,
  ChevronRight,
  PhoneCall,
} from 'lucide-react';
import { CategoryType } from '../types/store';

interface NavbarProps {
  cartCount: number;
  wishlistCount: number;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onCartClick: () => void;
  onWishlistClick: () => void;
  onAdminClick: () => void;
  onCategorySelect: (category: CategoryType | 'all') => void;
  onOpenPCBuilder: () => void;
  onOpenContact: () => void;
  activeCategory: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  wishlistCount,
  searchQuery,
  onSearchChange,
  onCartClick,
  onWishlistClick,
  onAdminClick,
  onCategorySelect,
  onOpenPCBuilder,
  onOpenContact,
  activeCategory,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSearchMobile, setShowSearchMobile] = useState(false);

  const navLinks = [
    { label: 'Home', action: () => { onCategorySelect('all'); window.scrollTo({ top: 0, behavior: 'smooth' }); } },
    { label: 'All Products', action: () => onCategorySelect('all') },
    { label: 'Laptops', action: () => onCategorySelect('Laptops') },
    { label: 'Desktop PCs', action: () => onCategorySelect('Desktop Computers') },
    { label: 'Computer Accessories', action: () => onCategorySelect('Computer Accessories') },
    { label: 'Printers', action: () => onCategorySelect('Printers') },
    { label: 'Custom PC Build', action: onOpenPCBuilder, highlight: true },
    { label: 'Contact Us', action: onOpenContact },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      {/* Main Top Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4 sm:gap-8">
          
          {/* Brand Logo Zone */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => { onCategorySelect('all'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="flex items-center gap-2.5 text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-lg p-1"
              aria-label="COMPUTER GALAXY Home"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-orange-600 via-amber-500 to-amber-400 flex items-center justify-center text-white shadow-md shadow-orange-500/20 group-hover:scale-105 transition-transform duration-200">
                <Cpu className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center tracking-tight font-black text-xl text-slate-900 font-display">
                  <span>COMPUTER</span>
                  <span className="text-orange-600 ml-1.5">GALAXY</span>
                </div>
                <span className="text-[10px] uppercase font-semibold tracking-wider text-slate-400">
                  Sirohi Hardware Hub
                </span>
              </div>
            </button>
          </div>

          {/* Search Bar Zone (Desktop) */}
          <div className="hidden md:flex flex-1 max-w-lg relative">
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search laptops, RTX cards, i7 CPU, HP printers, accessories..."
                className="w-full pl-10 pr-10 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all duration-200"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                  aria-label="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Actions & Icon Zone */}
          <div className="flex items-center gap-1 sm:gap-3 shrink-0">
            {/* Search Trigger for Mobile */}
            <button
              onClick={() => setShowSearchMobile(!showSearchMobile)}
              className="md:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors"
              aria-label="Toggle search bar"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist Button */}
            <button
              onClick={onWishlistClick}
              className="relative p-2 text-slate-700 hover:text-orange-600 rounded-xl hover:bg-orange-50/60 transition-colors flex items-center justify-center"
              aria-label={`Wishlist (${wishlistCount} items)`}
              title="Saved Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white font-mono text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Shopping Cart Button */}
            <button
              onClick={onCartClick}
              className="relative p-2.5 bg-slate-900 hover:bg-orange-600 text-white rounded-xl shadow-xs transition-colors flex items-center gap-2 group"
              aria-label={`Shopping cart (${cartCount} items)`}
              title="View Cart"
            >
              <ShoppingCart className="w-5 h-5 transition-transform group-hover:scale-105" />
              <span className="hidden sm:inline-block text-xs font-semibold">Cart</span>
              {cartCount > 0 && (
                <span className="bg-orange-500 group-hover:bg-white group-hover:text-orange-600 text-white font-mono text-[11px] font-bold px-1.5 py-0.2 rounded-full min-w-4 text-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Admin Dashboard / Account Button */}
            <button
              onClick={onAdminClick}
              className="p-2 text-slate-600 hover:text-slate-900 rounded-xl hover:bg-slate-100 transition-colors flex items-center gap-1.5 text-xs font-medium"
              aria-label="Store Admin & Product Manager"
              title="Manage Products & Store"
            >
              <User className="w-5 h-5 text-slate-700" />
              <span className="hidden xl:inline text-slate-700 font-medium">Store Admin</span>
            </button>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-700 hover:text-slate-900 rounded-lg hover:bg-slate-100"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search input expander */}
        {showSearchMobile && (
          <div className="md:hidden pb-3 pt-1">
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search laptops, RTX, printers, accessories..."
                className="w-full pl-10 pr-10 py-2.5 text-sm bg-slate-100 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                autoFocus
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 p-1"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Secondary Navigation Row (Desktop) */}
      <nav className="hidden lg:block border-t border-slate-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-2 text-xs font-semibold tracking-wide uppercase text-slate-600">
            <div className="flex items-center gap-6">
              {navLinks.map((link, idx) => (
                <button
                  key={idx}
                  onClick={link.action}
                  className={`py-1.5 transition-colors whitespace-nowrap shrink-0 hover:text-orange-600 cursor-pointer ${
                    link.highlight
                      ? 'text-orange-600 font-bold flex items-center gap-1.5 bg-orange-50/70 px-3 rounded-lg border border-orange-200/60'
                      : activeCategory === link.label
                      ? 'text-orange-600 font-bold border-b-2 border-orange-500'
                      : 'text-slate-700'
                  }`}
                >
                  {link.highlight && <SlidersHorizontal className="w-3.5 h-3.5 text-orange-600" />}
                  {link.label}
                </button>
              ))}
            </div>

            {/* Quick Fast-Dial / Sirohi Local Helpline */}
            <div className="flex items-center gap-2 text-[11px] font-medium text-slate-500 capitalize">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>Shop Open (10:00 AM - 8:30 PM)</span>
              <span className="text-slate-300">|</span>
              <a
                href="tel:08852834882"
                className="text-slate-700 hover:text-orange-600 flex items-center gap-1 font-semibold"
              >
                <PhoneCall className="w-3 h-3 text-orange-500" />
                088528 34882
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[114px] bg-white border-b border-slate-200 shadow-xl max-h-[calc(100vh-120px)] overflow-y-auto z-50 p-4">
          <div className="flex flex-col gap-1 pb-4">
            {navLinks.map((link, idx) => (
              <button
                key={idx}
                onClick={() => {
                  link.action();
                  setMobileMenuOpen(false);
                }}
                className={`flex items-center justify-between p-3 rounded-xl text-left text-sm font-semibold transition-colors ${
                  link.highlight
                    ? 'bg-orange-50 text-orange-600 border border-orange-200'
                    : 'text-slate-800 hover:bg-slate-50'
                }`}
              >
                <span className="flex items-center gap-2">
                  {link.highlight && <SlidersHorizontal className="w-4 h-4 text-orange-600" />}
                  {link.label}
                </span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2.5 text-xs text-slate-600">
            <div className="p-3 bg-amber-50/60 rounded-xl border border-amber-200/50">
              <p className="font-bold text-amber-900 text-sm">COMPUTER GALAXY</p>
              <p className="text-amber-800 text-xs mt-0.5">Station Road, Main Market, Sirohi (Raj.) - 307001</p>
              <p className="text-orange-700 font-semibold mt-1">Helpline: 088528 34882</p>
            </div>
            <button
              onClick={() => {
                onAdminClick();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-900 font-semibold rounded-xl text-center flex items-center justify-center gap-2"
            >
              <User className="w-4 h-4" />
              Store Admin Dashboard
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
