import React from 'react';
import {
  X,
  Heart,
  Trash2,
  ShoppingCart,
  ArrowRight,
} from 'lucide-react';
import { Product } from '../types/store';
import { formatINR } from '../utils/pricing';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onRemove: (productId: string) => void;
  onAddToCart: (product: Product) => void;
  onAddAllToCart: () => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  products,
  onRemove,
  onAddToCart,
  onAddAllToCart,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/60 backdrop-blur-xs flex justify-end animate-fade-in">
      <div className="flex-1 cursor-pointer" onClick={onClose} aria-hidden="true" />

      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between border-l border-slate-200">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50/80">
          <div className="flex items-center gap-2.5">
            <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
            <h3 className="font-bold text-slate-900 text-base font-display">
              Saved Wishlist ({products.length})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
            aria-label="Close wishlist"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 divide-y divide-slate-100">
          {products.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400">
              <Heart className="w-16 h-16 stroke-1 text-slate-300 mb-3" />
              <p className="text-base font-semibold text-slate-700">Your wishlist is empty</p>
              <p className="text-xs text-slate-400 mt-1 max-w-xs">
                Click the heart icon on any product to save it for later comparison.
              </p>
            </div>
          ) : (
            products.map((product) => (
              <div key={product.id} className="py-4 flex gap-3.5 items-start">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-16 h-16 rounded-xl object-cover border border-slate-200 shrink-0 bg-slate-50"
                />

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-1">
                    <div>
                      <span className="text-[10px] font-bold uppercase text-orange-600">
                        {product.brand}
                      </span>
                      <h4 className="text-xs font-bold text-slate-900 truncate">
                        {product.name}
                      </h4>
                    </div>
                    <button
                      onClick={() => onRemove(product.id)}
                      className="text-slate-400 hover:text-rose-500 p-1"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900 font-mono">
                      {formatINR(product.price)}
                    </span>
                    <button
                      onClick={() => onAddToCart(product)}
                      className="px-3 py-1 bg-orange-600 hover:bg-orange-700 text-white rounded-lg text-xs font-bold flex items-center gap-1 transition-colors"
                    >
                      <ShoppingCart className="w-3 h-3" />
                      <span>Move to Cart</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Actions */}
        {products.length > 0 && (
          <div className="p-5 border-t border-slate-200 bg-slate-50/80">
            <button
              onClick={onAddAllToCart}
              className="w-full py-3 bg-slate-900 hover:bg-orange-600 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Add All Wishlist Items to Cart</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
