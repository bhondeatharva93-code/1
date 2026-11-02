import React, { useState } from 'react';
import {
  X,
  Edit,
  Plus,
  Trash2,
  Save,
  RotateCcw,
  CheckCircle,
  Package,
  Sparkles,
} from 'lucide-react';
import { Product, CategoryType } from '../types/store';
import { CATEGORIES_LIST } from '../data/initialProducts';
import { formatINR, calculateDiscount } from '../utils/pricing';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onUpdateProduct: (product: Product) => void;
  onAddProduct: (product: Product) => void;
  onDeleteProduct: (productId: string) => void;
  onResetDefaults: () => void;
}

export const AdminModal: React.FC<AdminModalProps> = ({
  isOpen,
  onClose,
  products,
  onUpdateProduct,
  onAddProduct,
  onDeleteProduct,
  onResetDefaults,
}) => {
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [notification, setNotification] = useState('');

  if (!isOpen) return null;

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 2500);
  };

  const handleStartCreate = () => {
    setEditingProduct({
      id: `cg-${Date.now()}`,
      name: '',
      brand: 'HP',
      category: 'Laptops',
      price: 25000,
      oldPrice: 30000,
      discountPercentage: 17,
      rating: 4.8,
      reviewCount: 10,
      image: '/src/assets/images/hero_laptops_collection_1793631814390.jpg',
      inStock: true,
      featured: true,
      isDiwaliDeal: true,
      tag: 'New Arrival',
      specs: ['Standard Configuration', 'High-speed Performance'],
      description: 'Official genuine product available at Computer Galaxy Sirohi showroom.',
      warranty: '1 Year Brand Warranty',
    });
    setIsCreating(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    // Recalculate discount
    const calculatedDiscount = calculateDiscount(editingProduct.oldPrice, editingProduct.price);
    const updated = {
      ...editingProduct,
      discountPercentage: calculatedDiscount,
    };

    if (isCreating) {
      onAddProduct(updated);
      showNotification('New product added to catalog successfully!');
    } else {
      onUpdateProduct(updated);
      showNotification('Product details updated successfully!');
    }

    setEditingProduct(null);
    setIsCreating(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-slate-900 to-slate-950 text-white flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-500/20 text-orange-400 border border-orange-500/30 flex items-center justify-center">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold font-display text-white">
                COMPUTER GALAXY – Store Inventory & Price Admin
              </h3>
              <p className="text-xs text-amber-300">
                Directly manage prices, Diwali offers, stock status, and add new products
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Notification Toast */}
        {notification && (
          <div className="bg-emerald-600 text-white text-xs font-bold py-2 px-4 text-center flex items-center justify-center gap-2">
            <CheckCircle className="w-4 h-4" />
            <span>{notification}</span>
          </div>
        )}

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6">
          {editingProduct ? (
            /* Product Edit / Create Form */
            <form onSubmit={handleSave} className="space-y-4 max-w-2xl mx-auto bg-slate-50 p-6 rounded-2xl border border-slate-200">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <h4 className="text-sm font-bold text-slate-900">
                  {isCreating ? 'Add New Product to Store' : `Editing: ${editingProduct.name}`}
                </h4>
                <button
                  type="button"
                  onClick={() => { setEditingProduct(null); setIsCreating(false); }}
                  className="text-xs text-slate-500 hover:text-slate-800 font-bold"
                >
                  Cancel
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Product Title *</label>
                  <input
                    type="text"
                    required
                    value={editingProduct.name}
                    onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                    className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-slate-900"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Brand Name *</label>
                  <input
                    type="text"
                    required
                    value={editingProduct.brand}
                    onChange={(e) => setEditingProduct({ ...editingProduct, brand: e.target.value })}
                    className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-slate-900"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Category *</label>
                  <select
                    value={editingProduct.category}
                    onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value as CategoryType })}
                    className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-slate-900"
                  >
                    {CATEGORIES_LIST.map((c) => (
                      <option key={c.id} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Offer Tag</label>
                  <input
                    type="text"
                    value={editingProduct.tag || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, tag: e.target.value })}
                    placeholder="e.g. Diwali Bestseller"
                    className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-slate-900"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Selling Price (INR ₹) *</label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={editingProduct.price}
                    onChange={(e) => setEditingProduct({ ...editingProduct, price: Number(e.target.value) })}
                    className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-slate-900 font-mono"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">MRP / Old Price (INR ₹) *</label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={editingProduct.oldPrice}
                    onChange={(e) => setEditingProduct({ ...editingProduct, oldPrice: Number(e.target.value) })}
                    className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-slate-900 font-mono"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Warranty Details</label>
                  <input
                    type="text"
                    value={editingProduct.warranty}
                    onChange={(e) => setEditingProduct({ ...editingProduct, warranty: e.target.value })}
                    className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-slate-900"
                  />
                </div>

                <div className="flex items-center gap-4 pt-4">
                  <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-700">
                    <input
                      type="checkbox"
                      checked={editingProduct.inStock}
                      onChange={(e) => setEditingProduct({ ...editingProduct, inStock: e.target.checked })}
                      className="w-4 h-4 text-orange-600 rounded"
                    />
                    <span>In Stock</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer font-bold text-orange-700">
                    <input
                      type="checkbox"
                      checked={editingProduct.isDiwaliDeal || false}
                      onChange={(e) => setEditingProduct({ ...editingProduct, isDiwaliDeal: e.target.checked })}
                      className="w-4 h-4 text-orange-600 rounded"
                    />
                    <span>Diwali Mega Deal</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1 text-xs">Product Description</label>
                <textarea
                  rows={2}
                  value={editingProduct.description}
                  onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                  className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-slate-900 text-xs"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => { setEditingProduct(null); setIsCreating(false); }}
                  className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-lg text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Changes</span>
                </button>
              </div>
            </form>
          ) : (
            /* Products List Table */
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="text-xs text-slate-500">
                  Total Products: <strong>{products.length}</strong>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={onResetDefaults}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                    title="Restore default catalog data"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset Defaults</span>
                  </button>
                  <button
                    onClick={handleStartCreate}
                    className="px-4 py-1.5 bg-orange-600 hover:bg-orange-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add New Product</span>
                  </button>
                </div>
              </div>

              <div className="border border-slate-200 rounded-2xl overflow-hidden overflow-x-auto">
                <table className="w-full text-left text-xs divide-y divide-slate-200">
                  <thead className="bg-slate-50 font-bold text-slate-700 uppercase tracking-wider text-[11px]">
                    <tr>
                      <th className="py-3 px-4">Item</th>
                      <th className="py-3 px-4">Category</th>
                      <th className="py-3 px-4">Price</th>
                      <th className="py-3 px-4">Diwali Deal</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white">
                    {products.map((p) => (
                      <tr key={p.id} className="hover:bg-slate-50/70">
                        <td className="py-3 px-4 font-bold text-slate-900 max-w-[220px] truncate">
                          <div className="flex items-center gap-2">
                            <img src={p.image} alt={p.name} className="w-8 h-8 rounded-md object-cover" />
                            <span className="truncate">{p.name}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-slate-600">{p.category}</td>
                        <td className="py-3 px-4 font-mono font-bold text-slate-900">
                          {formatINR(p.price)}
                          {p.discountPercentage > 0 && (
                            <span className="text-[10px] text-orange-600 block">
                              {p.discountPercentage}% off
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-4">
                          {p.isDiwaliDeal ? (
                            <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">
                              🪔 Active
                            </span>
                          ) : (
                            <span className="text-[10px] text-slate-400">Regular</span>
                          )}
                        </td>
                        <td className="py-3 px-4">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${p.inStock ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                            {p.inStock ? 'In Stock' : 'Out of Stock'}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              onClick={() => { setEditingProduct(p); setIsCreating(false); }}
                              className="p-1.5 text-slate-600 hover:text-orange-600 rounded hover:bg-slate-100"
                              title="Edit product"
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => onDeleteProduct(p.id)}
                              className="p-1.5 text-slate-400 hover:text-rose-600 rounded hover:bg-slate-100"
                              title="Delete product"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
