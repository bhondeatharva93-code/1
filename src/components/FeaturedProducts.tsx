import React, { useState } from 'react';
import {
  Star,
  Heart,
  ShoppingCart,
  Check,
  Eye,
  SlidersHorizontal,
  Flame,
  Sparkles,
} from 'lucide-react';
import { Product } from '../types/store';
import { formatINR } from '../utils/pricing';

interface FeaturedProductsProps {
  products: Product[];
  wishlistIds: string[];
  cartIds: string[];
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  onViewProduct: (product: Product) => void;
  activeCategory: string;
  onResetCategory: () => void;
  onOpenAdmin: () => void;
}

export const FeaturedProducts: React.FC<FeaturedProductsProps> = ({
  products,
  wishlistIds,
  cartIds,
  onAddToCart,
  onToggleWishlist,
  onViewProduct,
  activeCategory,
  onResetCategory,
  onOpenAdmin,
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'diwali' | 'laptops' | 'gaming' | 'parts'>('all');
  const [addedAnimationId, setAddedAnimationId] = useState<string | null>(null);

  // Filter products based on active tab and/or navbar active category
  const filteredProducts = products.filter((prod) => {
    // If activeCategory from navbar/category is set to something specific
    if (activeCategory !== 'all') {
      return prod.category === activeCategory;
    }
    // Else filter by internal tab
    if (activeTab === 'diwali') return prod.isDiwaliDeal;
    if (activeTab === 'laptops') return prod.category === 'Laptops';
    if (activeTab === 'gaming') return prod.category === 'Gaming PCs' || prod.category === 'Graphics Cards';
    if (activeTab === 'parts') return prod.category === 'Processors' || prod.category === 'Motherboards' || prod.category === 'Monitors';
    return true; // 'all'
  });

  const handleAddToCartClick = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    onAddToCart(product);
    setAddedAnimationId(product.id);
    setTimeout(() => setAddedAnimationId(null), 1200);
  };

  const handleWishlistClick = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    onToggleWishlist(product);
  };

  return (
    <section className="py-16 bg-white" id="products">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header & Tab Controls */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 gap-6 border-b border-slate-100 pb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-600 mb-1">
              <Sparkles className="w-4 h-4 text-orange-500" />
              <span>HANDPICKED HARDWARE & DEALS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-display">
              {activeCategory !== 'all' ? `${activeCategory} Collection` : 'Featured Products & Diwali Offers'}
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              {filteredProducts.length} verified authentic products with direct manufacturer warranty & Sirohi shop support.
            </p>
          </div>

          {/* Interactive Filter Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl overflow-x-auto max-w-full">
            {activeCategory !== 'all' ? (
              <div className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-orange-700 bg-orange-100/80 rounded-lg">
                <span>Filtering: {activeCategory}</span>
                <button
                  onClick={onResetCategory}
                  className="text-slate-600 hover:text-slate-900 font-bold ml-1 cursor-pointer"
                  aria-label="Clear active category filter"
                >
                  ✕ Clear
                </button>
              </div>
            ) : (
              <>
                <button
                  onClick={() => setActiveTab('all')}
                  className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                    activeTab === 'all'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  All Products
                </button>
                <button
                  onClick={() => setActiveTab('diwali')}
                  className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-colors whitespace-nowrap flex items-center gap-1 cursor-pointer ${
                    activeTab === 'diwali'
                      ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-xs'
                      : 'text-orange-700 hover:bg-orange-50'
                  }`}
                >
                  <Flame className="w-3.5 h-3.5" />
                  Diwali Dhamaka Deals
                </button>
                <button
                  onClick={() => setActiveTab('laptops')}
                  className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                    activeTab === 'laptops'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Laptops
                </button>
                <button
                  onClick={() => setActiveTab('gaming')}
                  className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                    activeTab === 'gaming'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Gaming PCs & GPUs
                </button>
                <button
                  onClick={() => setActiveTab('parts')}
                  className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                    activeTab === 'parts'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Components & Monitors
                </button>
              </>
            )}
          </div>
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-slate-50 rounded-2xl border border-slate-200">
            <p className="text-slate-500 text-base font-medium">No products found in this selection.</p>
            <button
              onClick={onResetCategory}
              className="mt-3 px-4 py-2 bg-orange-600 text-white text-xs font-bold rounded-lg hover:bg-orange-700 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => {
              const isWishlisted = wishlistIds.includes(product.id);
              const isInCart = cartIds.includes(product.id);
              const isJustAdded = addedAnimationId === product.id;

              return (
                <article
                  key={product.id}
                  onClick={() => onViewProduct(product)}
                  className="group relative bg-white border border-slate-200/90 rounded-2xl overflow-hidden hover:border-amber-400 hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer"
                >
                  {/* Top Image Canvas Container */}
                  <div className="relative aspect-[4/3] bg-slate-50 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Discount & Tag Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-1 items-start z-10">
                      {product.discountPercentage > 0 && (
                        <span className="bg-orange-600 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-md shadow-xs tracking-tight">
                          {product.discountPercentage}% OFF
                        </span>
                      )}
                      {product.isDiwaliDeal && (
                        <span className="bg-amber-100 text-amber-900 border border-amber-300 text-[10px] font-extrabold px-2 py-0.5 rounded-md flex items-center gap-1 shadow-xs">
                          <span>🪔</span>
                          <span>{product.tag || 'Diwali Offer'}</span>
                        </span>
                      )}
                    </div>

                    {/* Wishlist Button (Floating) */}
                    <button
                      onClick={(e) => handleWishlistClick(e, product)}
                      className={`absolute top-3 right-3 p-2 rounded-xl backdrop-blur-md transition-all duration-200 z-10 cursor-pointer ${
                        isWishlisted
                          ? 'bg-rose-50 text-rose-600 shadow-sm'
                          : 'bg-white/80 text-slate-500 hover:text-rose-600 hover:bg-white'
                      }`}
                      aria-label={isWishlisted ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
                    >
                      <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-600' : ''}`} />
                    </button>

                    {/* Hover Quick View Trigger */}
                    <div className="absolute inset-x-0 bottom-3 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10 px-4">
                      <span className="w-full py-2 bg-slate-900/90 hover:bg-slate-900 backdrop-blur-md text-white text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 shadow-md">
                        <Eye className="w-3.5 h-3.5" />
                        Quick View Specs
                      </span>
                    </div>
                  </div>

                  {/* Product Details Section */}
                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Brand & Category quiet metadata */}
                      <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
                        <span className="font-bold uppercase tracking-wider text-orange-600">
                          {product.brand}
                        </span>
                        <span>{product.category}</span>
                      </div>

                      {/* Product Title */}
                      <h3 className="font-bold text-slate-900 text-sm sm:text-base leading-snug line-clamp-2 group-hover:text-orange-600 transition-colors">
                        {product.name}
                      </h3>

                      {/* Star Rating & Review Count */}
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex items-center gap-0.5 text-amber-500">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          <span className="text-xs font-bold text-slate-800 ml-1 font-mono">
                            {product.rating.toFixed(1)}
                          </span>
                        </div>
                        <span className="text-slate-300 text-xs">·</span>
                        <span className="text-xs text-slate-500 font-mono">
                          ({product.reviewCount} reviews)
                        </span>
                      </div>

                      {/* Key Specs Pills / Points */}
                      <div className="mt-3 flex flex-wrap gap-1 text-[11px] text-slate-600">
                        {product.specs.slice(0, 2).map((spec, i) => (
                          <span key={i} className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[11px] truncate max-w-[200px]">
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Price and Cart Action */}
                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                      <div>
                        <div className="flex items-baseline gap-2">
                          <span className="text-lg font-black text-slate-900 font-mono tracking-tight">
                            {formatINR(product.price)}
                          </span>
                          {product.oldPrice > product.price && (
                            <span className="text-xs text-slate-400 line-through font-mono">
                              {formatINR(product.oldPrice)}
                            </span>
                          )}
                        </div>
                        <p className="text-[10px] text-emerald-600 font-semibold">
                          Free Express Shipping
                        </p>
                      </div>

                      {/* Add to Cart Button */}
                      <button
                        onClick={(e) => handleAddToCartClick(e, product)}
                        className={`px-3.5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all duration-200 cursor-pointer active:scale-95 ${
                          isJustAdded
                            ? 'bg-emerald-600 text-white'
                            : isInCart
                            ? 'bg-slate-900 text-white hover:bg-orange-600'
                            : 'bg-orange-600 hover:bg-orange-700 text-white shadow-xs'
                        }`}
                        aria-label={`Add ${product.name} to cart`}
                      >
                        {isJustAdded ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Added!</span>
                          </>
                        ) : isInCart ? (
                          <>
                            <ShoppingCart className="w-3.5 h-3.5" />
                            <span>In Cart</span>
                          </>
                        ) : (
                          <>
                            <ShoppingCart className="w-3.5 h-3.5" />
                            <span>Add</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* Admin Edit Prompt Bar */}
        <div className="mt-12 p-4 bg-slate-50 border border-slate-200/80 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
              <SlidersHorizontal className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900">Store Owner or Staff?</p>
              <p className="text-xs text-slate-500">Edit product prices, discounts, stock availability or add Diwali specials directly.</p>
            </div>
          </div>
          <button
            onClick={onOpenAdmin}
            className="px-4 py-2 bg-slate-900 hover:bg-orange-600 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer shrink-0"
          >
            Open Admin Dashboard
          </button>
        </div>

      </div>
    </section>
  );
};
