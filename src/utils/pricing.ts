import { CartItem, CustomPCBuild } from '../types/store';

/**
 * Format a number into Indian Rupee format (₹xx,xxx)
 */
export function formatINR(amount: number): string {
  if (isNaN(amount) || amount === null || amount === undefined) return '₹0';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Calculate percentage discount from old price and current price
 */
export function calculateDiscount(oldPrice: number, currentPrice: number): number {
  if (!oldPrice || oldPrice <= currentPrice) return 0;
  const discount = Math.round(((oldPrice - currentPrice) / oldPrice) * 100);
  return Math.max(0, Math.min(99, discount));
}

/**
 * Calculate cart subtotal, total savings, and delivery fee
 */
export function calculateCartTotals(items: CartItem[]) {
  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const totalOldPrice = items.reduce((acc, item) => acc + (item.product.oldPrice || item.product.price) * item.quantity, 0);
  const savings = Math.max(0, totalOldPrice - subtotal);
  // Free delivery for orders >= ₹1,000, otherwise ₹99 delivery
  const deliveryFee = subtotal > 0 && subtotal < 1000 ? 99 : 0;
  const total = subtotal + deliveryFee;

  return {
    subtotal,
    savings,
    deliveryFee,
    total,
    itemCount: items.reduce((acc, item) => acc + item.quantity, 0),
  };
}

/**
 * Calculate PC build total cost, wattage, and readiness
 */
export function calculatePCBuildStats(build: CustomPCBuild) {
  const parts = Object.values(build).filter(Boolean);
  const totalPrice = parts.reduce((sum, part) => sum + (part?.price || 0), 0);
  const totalRawWattage = parts.reduce((sum, part) => sum + (part?.wattage || 0), 0);
  
  // Baseline system draw (motherboard chipsets, fans, LED, cooling pump: ~60W)
  const estimatedWattage = totalRawWattage > 0 ? totalRawWattage + 60 : 0;
  
  // Recommended PSU buffer: 1.3x overhead for power spikes
  const recommendedPsuWattage = estimatedWattage > 0 ? Math.ceil((estimatedWattage * 1.3) / 50) * 50 : 450;
  
  const hasCore = Boolean(build.cpu && build.motherboard && build.ram && build.storage);
  const isComplete = Boolean(hasCore && build.gpu && build.psu && build.case);

  return {
    totalPrice,
    estimatedWattage,
    recommendedPsuWattage,
    partsCount: parts.length,
    isComplete,
  };
}

/**
 * Validate standard Indian 6-digit PIN code
 */
export function isValidPincode(pincode: string): boolean {
  return /^[1-9][0-9]{5}$/.test(pincode.trim());
}

/**
 * Check if a PIN code belongs to Sirohi or Rajasthan (starts with 307xxx for Sirohi)
 */
export function checkDeliveryTimeline(pincode: string): { days: string; isSirohiLocal: boolean; description: string } {
  const cleanPin = pincode.trim();
  if (!isValidPincode(cleanPin)) {
    return { days: '3-5 Days', isSirohiLocal: false, description: 'Enter valid 6-digit PIN code' };
  }

  if (cleanPin.startsWith('307')) {
    return {
      days: 'Same Day / 24 Hours',
      isSirohiLocal: true,
      description: 'Superfast Local Delivery in Sirohi & nearby towns from our Main Market hub.',
    };
  }

  if (cleanPin.startsWith('30') || cleanPin.startsWith('31') || cleanPin.startsWith('32') || cleanPin.startsWith('33') || cleanPin.startsWith('34')) {
    return {
      days: '1-2 Days',
      isSirohiLocal: false,
      description: 'Express Delivery across Rajasthan (Jodhpur, Udaipur, Jaipur, Pali, etc.)',
    };
  }

  return {
    days: '3-4 Days',
    isSirohiLocal: false,
    description: 'Safe Doorstep Insured Express Delivery across India.',
  };
}
