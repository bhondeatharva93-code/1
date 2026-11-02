import React, { useState } from 'react';
import {
  X,
  Star,
  ShieldCheck,
  Truck,
  Heart,
  ShoppingCart,
  Check,
  Send,
  Sparkles,
  RotateCcw,
  BadgeCheck,
} from 'lucide-react';
import { Product } from '../types/store';
import { formatINR, checkDeliveryTimeline } from '../utils/pricing';

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: boolean;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  isOpen,
  onClose,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [testPincode, setTestPincode] = useState('307001');
  const [justAdded, setJustAdded] = useState(false);

  if (!isOpen || !product) return null;

  const deliveryResult = checkDeliveryTimeline(testPincode);

  const handleAdd = () => {
    onAddToCart(product, quantity);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  };

  const handleWhatsAppInquiry = () => {
    const msg = `Hello Computer Galaxy Sirohi!%0A%0AI am interested in purchasing:* ${product.name}* (${formatINR(product.price)}).%0AIs this currently available in your Sirohi store?`;
    window.open(`https://wa.me/918852834882?text=${msg}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50 shrink-0">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <span>{product.category}</span>
            <span>/</span>
            <span className="font-bold text-orange-600 uppercase">{product.brand}</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200"
            aria-label="Close product view"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            
            {/* Left: Product Image with Zoom/Hover */}
            <div className="relative rounded-2xl overflow-hidden bg-slate-50 border border-slate-200 aspect-[4/3] group">
              <img
                src={product.image}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
              {product.discountPercentage > 0 && (
                <div className="absolute top-3 left-3 bg-orange-600 text-white font-bold text-xs px-2.5 py-1 rounded-md shadow-xs">
                  {product.discountPercentage}% OFF
                </div>
              )}
              {product.isDiwaliDeal && (
                <div className="absolute top-3 right-3 bg-amber-100 border border-amber-300 text-amber-900 font-extrabold text-[11px] px-2.5 py-1 rounded-md flex items-center gap-1 shadow-xs">
                  <span>🪔</span>
                  <span>Diwali Offer</span>
                </div>
              )}
            </div>

            {/* Right: Product Spec & Buy Module */}
            <div className="flex flex-col">
              
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-extrabold uppercase tracking-wider text-orange-600">
                  {product.brand}
                </span>
                <button
                  onClick={() => onToggleWishlist(product)}
                  className={`p-2 rounded-xl transition-colors cursor-pointer ${
                    isWishlisted ? 'text-rose-600 bg-rose-50' : 'text-slate-400 hover:text-rose-600 hover:bg-slate-100'
                  }`}
                  aria-label="Toggle wishlist"
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-rose-600' : ''}`} />
                </button>
              </div>

              <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug font-display">
                {product.name}
              </h2>

              {/* Star Rating */}
              <div className="flex items-center gap-2 mt-2">
                <div className="flex items-center gap-1 text-amber-500">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="text-xs font-bold text-slate-900 font-mono">
                    {product.rating.toFixed(1)}
                  </span>
                </div>
                <span className="text-slate-300 text-xs">·</span>
                <span className="text-xs text-slate-500 font-mono">
                  {product.reviewCount} customer ratings
                </span>
                <span className="text-slate-300 text-xs">·</span>
                <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
                  <BadgeCheck className="w-3.5 h-3.5" />
                  In Stock
                </span>
              </div>

              {/* Price Block */}
              <div className="mt-4 p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <div className="flex items-baseline gap-3">
                  <span className="text-2xl sm:text-3xl font-black text-slate-900 font-mono">
                    {formatINR(product.price)}
                  </span>
                  {product.oldPrice > product.price && (
                    <span className="text-sm text-slate-400 line-through font-mono">
                      {formatINR(product.oldPrice)}
                    </span>
                  )}
                  {product.discountPercentage > 0 && (
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                      Save {formatINR(product.oldPrice - product.price)}
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  Price includes GST. Invoicing available with business GSTIN.
                </p>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-4">
                {product.description}
              </p>

              {/* Specifications List */}
              <div className="mt-4 pt-4 border-t border-slate-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2">
                  Technical Specifications:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                  {product.specs.map((spec, i) => (
                    <div key={i} className="flex items-start gap-1.5 bg-slate-50 p-2 rounded-lg border border-slate-100">
                      <Check className="w-3.5 h-3.5 text-orange-600 shrink-0 mt-0.5" />
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Warranty Badge */}
              <div className="mt-4 flex items-center gap-2 text-xs text-slate-600 bg-amber-50/70 p-3 rounded-xl border border-amber-200/60">
                <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0" />
                <span>
                  <strong>Warranty:</strong> {product.warranty}
                </span>
              </div>

              {/* Pincode Delivery Estimator */}
              <div className="mt-4 pt-4 border-t border-slate-100">
                <div className="flex items-center gap-2 mb-1.5">
                  <Truck className="w-4 h-4 text-slate-600" />
                  <span className="text-xs font-bold text-slate-700">Check Delivery to Your PIN Code:</span>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    maxLength={6}
                    value={testPincode}
                    onChange={(e) => setTestPincode(e.target.value)}
                    placeholder="Enter 6-digit PIN"
                    className="w-36 px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-mono focus:bg-white focus:outline-none focus:ring-1 focus:ring-orange-500"
                  />
                  <span className="text-xs font-semibold text-emerald-700">
                    {deliveryResult.days} ({deliveryResult.isSirohiLocal ? 'Sirohi Local Hub' : 'Express Courier'})
                  </span>
                </div>
              </div>

              {/* Quantity & Buy Module */}
              <div className="mt-6 pt-4 border-t border-slate-200 flex flex-wrap items-center gap-3">
                <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden bg-slate-50">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-3 py-2.5 text-slate-600 hover:bg-slate-200 text-sm font-bold"
                  >
                    -
                  </button>
                  <span className="px-4 text-xs font-mono font-bold text-slate-900">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="px-3 py-2.5 text-slate-600 hover:bg-slate-200 text-sm font-bold"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAdd}
                  className={`flex-1 py-3 px-6 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-98 ${
                    justAdded
                      ? 'bg-emerald-600 text-white'
                      : 'bg-orange-600 hover:bg-orange-700 text-white shadow-md'
                  }`}
                >
                  {justAdded ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Cart!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-4 h-4" />
                      <span>Add to Cart ({formatINR(product.price * quantity)})</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleWhatsAppInquiry}
                  className="p-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl transition-colors cursor-pointer"
                  title="Direct WhatsApp Chat with Sirohi Store"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
