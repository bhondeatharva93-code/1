import React, { useState, useEffect } from 'react';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Navbar } from './components/Navbar';
import { DiwaliHeroBanner } from './components/DiwaliHeroBanner';
import { ShopByCategory } from './components/ShopByCategory';
import { FeaturedProducts } from './components/FeaturedProducts';
import { BuildDreamPC } from './components/BuildDreamPC';
import { WhyChooseUs } from './components/WhyChooseUs';
import { BrandsSection } from './components/BrandsSection';
import { AboutSection } from './components/AboutSection';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { ProductDetailModal } from './components/ProductDetailModal';
import { PCBuilderModal } from './components/PCBuilderModal';
import { AdminModal } from './components/AdminModal';
import { ContactModal } from './components/ContactModal';

import { Product, CartItem, CategoryType, CustomerOrder } from './types/store';
import { INITIAL_PRODUCTS } from './data/initialProducts';
import { MessageSquare, Phone } from 'lucide-react';

export default function App() {
  // Products state (persisted in localStorage for Admin edits)
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('cg_products_catalog');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return INITIAL_PRODUCTS;
  });

  // Cart state
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('cg_cart_items');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [];
  });

  // Wishlist state (array of product IDs)
  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('cg_wishlist_ids');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [];
  });

  // Filter & Search states
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');

  // Modal / Drawer visibility states
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isPCBuilderOpen, setIsPCBuilderOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [detailProduct, setDetailProduct] = useState<Product | null>(null);

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem('cg_products_catalog', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('cg_cart_items', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('cg_wishlist_ids', JSON.stringify(wishlistIds));
  }, [wishlistIds]);

  // Cart Actions
  const handleAddToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const handleUpdateCartQuantity = (productId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  // Wishlist Actions
  const handleToggleWishlist = (product: Product) => {
    setWishlistIds((prev) =>
      prev.includes(product.id)
        ? prev.filter((id) => id !== product.id)
        : [...prev, product.id]
    );
  };

  const handleAddAllWishlistToCart = () => {
    const wishlistedProducts = products.filter((p) => wishlistIds.includes(p.id));
    wishlistedProducts.forEach((p) => handleAddToCart(p));
    setWishlistIds([]);
    setIsWishlistOpen(false);
    setIsCartOpen(true);
  };

  // PC Builder Action
  const handleAddCustomBuildToCart = (customProduct: Product) => {
    setProducts((prev) => [customProduct, ...prev]);
    handleAddToCart(customProduct, 1);
    setIsCartOpen(true);
  };

  // Order Complete
  const handleOrderPlaced = (order: CustomerOrder) => {
    setCart([]);
  };

  // Admin Actions
  const handleUpdateProduct = (updated: Product) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === updated.id ? updated : p))
    );
  };

  const handleAddProduct = (newProduct: Product) => {
    setProducts((prev) => [newProduct, ...prev]);
  };

  const handleDeleteProduct = (productId: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
    setCart((prev) => prev.filter((it) => it.product.id !== productId));
    setWishlistIds((prev) => prev.filter((id) => id !== productId));
  };

  const handleResetDefaults = () => {
    setProducts(INITIAL_PRODUCTS);
    localStorage.removeItem('cg_products_catalog');
  };

  // Category & Navigation selection
  const handleCategorySelect = (cat: CategoryType | 'all') => {
    setActiveCategory(cat);
    const target = document.getElementById('products');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Filtered by Search Bar
  const displayProducts = products.filter((p) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.specs.some((s) => s.toLowerCase().includes(q))
    );
  });

  const scrollToProducts = () => {
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
  };

  const wishlistedProductsList = products.filter((p) => wishlistIds.includes(p.id));
  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans selection:bg-amber-100 selection:text-amber-900">
      
      {/* 1. Top Announcement Bar */}
      <AnnouncementBar onCallClick={() => setIsContactOpen(true)} />

      {/* 2. Sticky Navigation Bar */}
      <Navbar
        cartCount={totalCartCount}
        wishlistCount={wishlistIds.length}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onCartClick={() => setIsCartOpen(true)}
        onWishlistClick={() => setIsWishlistOpen(true)}
        onAdminClick={() => setIsAdminOpen(true)}
        onCategorySelect={handleCategorySelect}
        onOpenPCBuilder={() => setIsPCBuilderOpen(true)}
        onOpenContact={() => setIsContactOpen(true)}
        activeCategory={activeCategory}
      />

      <main className="flex-1">
        {/* 3. Hero Section – Diwali Sale Sweeping Banner */}
        <DiwaliHeroBanner
          onShopNowClick={scrollToProducts}
          onExploreDealsClick={() => {
            setActiveCategory('all');
            scrollToProducts();
          }}
        />

        {/* 4. Shop by Category */}
        <ShopByCategory
          activeCategory={activeCategory}
          onSelectCategory={(cat) => handleCategorySelect(cat)}
        />

        {/* 5. Featured Products Grid */}
        <FeaturedProducts
          products={displayProducts}
          wishlistIds={wishlistIds}
          cartIds={cart.map((it) => it.product.id)}
          onAddToCart={handleAddToCart}
          onToggleWishlist={handleToggleWishlist}
          onViewProduct={(prod) => setDetailProduct(prod)}
          activeCategory={activeCategory}
          onResetCategory={() => setActiveCategory('all')}
          onOpenAdmin={() => setIsAdminOpen(true)}
        />

        {/* 6. Special Section: Build Your Dream PC */}
        <BuildDreamPC onConfigureClick={() => setIsPCBuilderOpen(true)} />

        {/* 7. Why Choose Computer Galaxy */}
        <WhyChooseUs />

        {/* 8. Brands Section */}
        <BrandsSection
          onBrandSelect={(brand) => {
            setSearchQuery(brand);
            scrollToProducts();
          }}
        />

        {/* 9. About Us */}
        <AboutSection onContactClick={() => setIsContactOpen(true)} />
      </main>

      {/* 10. Footer */}
      <Footer
        onCategorySelect={(cat) => handleCategorySelect(cat)}
        onOpenPCBuilder={() => setIsPCBuilderOpen(true)}
        onOpenContact={() => setIsContactOpen(true)}
      />

      {/* Floating Action Button: WhatsApp Store Connect */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-2.5 items-end">
        <a
          href="https://wa.me/918852834882?text=Hello%20Computer%20Galaxy%20Sirohi!%20I%20have%20an%20enquiry%20regarding%20products."
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full shadow-xl flex items-center gap-2 text-xs font-bold transition-all hover:scale-105 active:scale-95 group"
          aria-label="Chat on WhatsApp with Computer Galaxy Sirohi"
        >
          <MessageSquare className="w-4 h-4 fill-white" />
          <span className="hidden sm:inline">WhatsApp Sirohi Store</span>
        </a>
      </div>

      {/* Modals & Slide-over Drawers */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveFromCart}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        products={wishlistedProductsList}
        onRemove={(id) => setWishlistIds((prev) => prev.filter((item) => item !== id))}
        onAddToCart={(p) => {
          handleAddToCart(p);
          setWishlistIds((prev) => prev.filter((item) => item !== p.id));
        }}
        onAddAllToCart={handleAddAllWishlistToCart}
      />

      <ProductDetailModal
        product={detailProduct}
        isOpen={Boolean(detailProduct)}
        onClose={() => setDetailProduct(null)}
        onAddToCart={handleAddToCart}
        onToggleWishlist={handleToggleWishlist}
        isWishlisted={Boolean(detailProduct && wishlistIds.includes(detailProduct.id))}
      />

      <PCBuilderModal
        isOpen={isPCBuilderOpen}
        onClose={() => setIsPCBuilderOpen(false)}
        onAddBuildToCart={handleAddCustomBuildToCart}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cart}
        onOrderPlaced={handleOrderPlaced}
      />

      <AdminModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        products={products}
        onUpdateProduct={handleUpdateProduct}
        onAddProduct={handleAddProduct}
        onDeleteProduct={handleDeleteProduct}
        onResetDefaults={handleResetDefaults}
      />

      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />

    </div>
  );
}
