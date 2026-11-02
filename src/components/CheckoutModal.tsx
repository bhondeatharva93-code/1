import React, { useState } from 'react';
import {
  X,
  ShieldCheck,
  CheckCircle,
  Truck,
  CreditCard,
  Building2,
  PhoneCall,
  Send,
  AlertCircle,
} from 'lucide-react';
import { CartItem, CustomerOrder } from '../types/store';
import { formatINR, calculateCartTotals, checkDeliveryTimeline, isValidPincode } from '../utils/pricing';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onOrderPlaced: (order: CustomerOrder) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  onOrderPlaced,
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('Sirohi');
  const [pincode, setPincode] = useState('307001');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'upi' | 'store_pickup'>('cod');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [confirmedOrderId, setConfirmedOrderId] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const totals = calculateCartTotals(items);
  const deliveryInfo = checkDeliveryTimeline(pincode);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMsg('Please enter your full name');
      return;
    }
    if (!phone.trim() || phone.trim().length < 10) {
      setErrorMsg('Please enter a valid 10-digit phone number');
      return;
    }
    if (paymentMethod !== 'store_pickup' && !address.trim()) {
      setErrorMsg('Please enter your delivery street address');
      return;
    }
    if (paymentMethod !== 'store_pickup' && !isValidPincode(pincode)) {
      setErrorMsg('Please enter a valid 6-digit Indian PIN code');
      return;
    }

    const newOrderId = `CG-${Math.floor(100000 + Math.random() * 900000)}`;
    const newOrder: CustomerOrder = {
      orderId: newOrderId,
      customerName: name.trim(),
      phone: phone.trim(),
      address: address.trim() || 'Store Pickup',
      city: city.trim(),
      pincode: pincode.trim(),
      paymentMethod,
      items: [...items],
      subtotal: totals.subtotal,
      deliveryFee: totals.deliveryFee,
      total: totals.total,
      timestamp: new Date().toLocaleString(),
    };

    setConfirmedOrderId(newOrderId);
    setIsSubmitted(true);
    onOrderPlaced(newOrder);
  };

  const handleWhatsAppConfirmation = () => {
    const itemsSummary = items
      .map((it) => `- ${it.quantity}x ${it.product.name} (${formatINR(it.product.price)})`)
      .join('%0A');

    const msg = `Hello Computer Galaxy Sirohi!%0A%0A*Order Confirmed:* ${confirmedOrderId}%0A*Customer:* ${name}%0A*Phone:* ${phone}%0A*Address:* ${address}, ${city} - ${pincode}%0A*Payment Method:* ${paymentMethod.toUpperCase()}%0A%0A*Items:*%0A${itemsSummary}%0A%0A*Total Amount:* ${formatINR(totals.total)}%0A%0APlease prepare my order invoice.`;
    window.open(`https://wa.me/918852834882?text=${msg}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
        
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-slate-900 to-slate-950 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-amber-400" />
            <h3 className="font-bold text-base sm:text-lg font-display text-white">
              {isSubmitted ? 'Order Confirmed!' : 'Secure Checkout & Delivery Details'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
            aria-label="Close checkout modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {isSubmitted ? (
          <div className="p-6 sm:p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle className="w-8 h-8" />
            </div>

            <h4 className="text-xl sm:text-2xl font-black text-slate-900 font-display">
              Thank You, {name}!
            </h4>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl max-w-md mx-auto text-left space-y-2 text-xs">
              <div className="flex justify-between font-bold text-slate-900">
                <span>Order Reference:</span>
                <span className="font-mono text-orange-600">{confirmedOrderId}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Payment Mode:</span>
                <span className="uppercase font-semibold">{paymentMethod.replace('_', ' ')}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Expected Delivery:</span>
                <span className="font-semibold text-emerald-700">{deliveryInfo.days}</span>
              </div>
              <div className="flex justify-between font-bold text-slate-900 pt-2 border-t border-slate-200">
                <span>Total Amount to Pay:</span>
                <span className="text-sm font-mono">{formatINR(totals.total)}</span>
              </div>
            </div>

            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Our store staff at Station Road, Sirohi is packing your order. You can also send this confirmation directly to our store WhatsApp:
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={handleWhatsAppConfirmation}
                className="w-full sm:w-auto px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Send to Store WhatsApp (088528 34882)</span>
              </button>
              <button
                onClick={onClose}
                className="w-full sm:w-auto px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl transition-colors cursor-pointer"
              >
                Back to Shopping
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 sm:p-7 space-y-5">
            {errorMsg && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Customer Contact */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Ramesh Kumar"
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Mobile Number (for Order & Delivery OTP) *
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. 9829012345"
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>

            {/* Address & Pincode (if not store pickup) */}
            {paymentMethod !== 'store_pickup' && (
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Street Address / Colony / Landmark *
                  </label>
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="House / Office / Shop number, Street name, Near Landmark"
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">City / Town</label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">6-Digit PIN Code *</label>
                    <input
                      type="text"
                      maxLength={6}
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      placeholder="307001"
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 font-mono"
                    />
                  </div>
                </div>

                {/* Live Delivery Timeline Badge */}
                <div className="p-3 bg-amber-50/70 border border-amber-200/60 rounded-xl text-xs flex items-start gap-2.5">
                  <Truck className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-amber-900">
                      Estimated Delivery: {deliveryInfo.days}
                    </p>
                    <p className="text-amber-800 text-[11px] mt-0.5">
                      {deliveryInfo.description}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Payment Method Selector */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">
                Choose Payment Option
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    paymentMethod === 'cod'
                      ? 'border-orange-500 bg-orange-50/60 ring-2 ring-orange-500/20 font-bold text-slate-900'
                      : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Truck className="w-4 h-4 text-orange-600" />
                    <span className="font-bold">Cash on Delivery</span>
                  </div>
                  <p className="text-[10px] text-slate-500 font-normal">Pay cash or UPI at doorstep</p>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    paymentMethod === 'upi'
                      ? 'border-orange-500 bg-orange-50/60 ring-2 ring-orange-500/20 font-bold text-slate-900'
                      : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <CreditCard className="w-4 h-4 text-orange-600" />
                    <span className="font-bold">UPI / QR Code</span>
                  </div>
                  <p className="text-[10px] text-slate-500 font-normal">Google Pay, PhonePe, Paytm</p>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('store_pickup')}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    paymentMethod === 'store_pickup'
                      ? 'border-orange-500 bg-orange-50/60 ring-2 ring-orange-500/20 font-bold text-slate-900'
                      : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Building2 className="w-4 h-4 text-orange-600" />
                    <span className="font-bold">Store Pickup</span>
                  </div>
                  <p className="text-[10px] text-slate-500 font-normal">Collect at Sirohi Shop</p>
                </button>
              </div>
            </div>

            {/* Total and Submit */}
            <div className="pt-3 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-left w-full sm:w-auto">
                <span className="text-xs text-slate-500 block">Total Payable (incl. GST):</span>
                <span className="text-xl font-black text-slate-900 font-mono">
                  {formatINR(totals.total)}
                </span>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-7 py-3.5 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-bold text-sm rounded-xl shadow-md transition-all cursor-pointer active:scale-98"
              >
                Confirm Order
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
