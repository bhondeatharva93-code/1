import React from 'react';
import {
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Truck,
} from 'lucide-react';
import { CartItem } from '../types/store';
import { formatINR, calculateCartTotals } from '../utils/pricing';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
}) => {
  if (!isOpen) return null;

  const totals = calculateCartTotals(items);
  const freeShippingThreshold = 1000;
  const progressPercent = Math.min(100, (totals.subtotal / freeShippingThreshold) * 100);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/60 backdrop-blur-xs flex justify-end animate-fade-in">
      {/* Click outside to close */}
      <div className="flex-1 cursor-pointer" onClick={onClose} aria-hidden="true" />

      {/* Slide-over Container */}
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between border-l border-slate-200">
        
        {/* Drawer Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50/80">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-orange-600" />
            <h3 className="font-bold text-slate-900 text-base font-display">
              Shopping Cart ({totals.itemCount} {totals.itemCount === 1 ? 'item' : 'items'})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Close cart drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="px-5 py-3 bg-amber-50/60 border-b border-amber-200/50 text-xs">
          {totals.subtotal >= freeShippingThreshold ? (
            <div className="flex items-center gap-2 text-emerald-700 font-semibold">
              <Truck className="w-4 h-4 text-emerald-600" />
              <span>Congratulations! Your order qualifies for FREE Express Delivery!</span>
            </div>
          ) : (
            <div>
              <p className="text-amber-900 font-medium">
                Add <strong className="font-mono">{formatINR(freeShippingThreshold - totals.subtotal)}</strong> more for <strong>FREE Delivery</strong>
              </p>
              <div className="w-full bg-amber-200/70 h-1.5 rounded-full mt-2 overflow-hidden">
                <div
                  className="bg-orange-500 h-full rounded-full transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-5 divide-y divide-slate-100">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400">
              <ShoppingBag className="w-16 h-16 stroke-1 text-slate-300 mb-3" />
              <p className="text-base font-semibold text-slate-700">Your shopping bag is empty</p>
              <p className="text-xs text-slate-400 mt-1 max-w-xs">
                Explore our Diwali deals on laptops, graphic cards, monitors and accessories.
              </p>
              <button
                onClick={onClose}
                className="mt-5 px-5 py-2.5 bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
              >
                Browse Diwali Deals
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.product.id} className="py-4 flex gap-3.5 items-start">
                {/* Product Thumbnail */}
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-18 h-18 rounded-xl object-cover border border-slate-200 shrink-0 bg-slate-50"
                />

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-bold uppercase text-orange-600">
                        {item.product.brand}
                      </span>
                      <h4 className="text-xs font-bold text-slate-900 truncate leading-snug">
                        {item.product.name}
                      </h4>
                    </div>
                    <button
                      onClick={() => onRemoveItem(item.product.id)}
                      className="text-slate-400 hover:text-rose-500 p-1"
                      aria-label={`Remove ${item.product.name}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-sm font-black text-slate-900 font-mono">
                      {formatINR(item.product.price)}
                    </span>

                    {/* Quantity Stepper */}
                    <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-slate-50">
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, -1)}
                        className="p-1.5 hover:bg-slate-200 text-slate-600 transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2.5 text-xs font-bold font-mono text-slate-800">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, 1)}
                        className="p-1.5 hover:bg-slate-200 text-slate-600 transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer & Checkout Action */}
        {items.length > 0 && (
          <div className="p-5 border-t border-slate-200 bg-slate-50/80 space-y-3">
            <div className="space-y-1.5 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-mono font-bold text-slate-900">{formatINR(totals.subtotal)}</span>
              </div>
              {totals.savings > 0 && (
                <div className="flex justify-between text-emerald-600">
                  <span>Festive Discount Savings</span>
                  <span className="font-mono font-bold">- {formatINR(totals.savings)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Doorstep Delivery</span>
                <span>{totals.deliveryFee === 0 ? <strong className="text-emerald-600">FREE</strong> : formatINR(totals.deliveryFee)}</span>
              </div>
              <div className="pt-2 border-t border-slate-200 flex justify-between items-baseline text-sm font-bold text-slate-900">
                <span>Total Amount (incl. GST)</span>
                <span className="text-lg font-black text-orange-600 font-mono">
                  {formatINR(totals.total)}
                </span>
              </div>
            </div>

            <button
              onClick={onProceedToCheckout}
              className="w-full py-3.5 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <p className="text-[11px] text-center text-slate-400 flex items-center justify-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Safe Checkout · Cash on Delivery & UPI Supported</span>
            </p>
          </div>
        )}

      </div>
    </div>
  );
};
