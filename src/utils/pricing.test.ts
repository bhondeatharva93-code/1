import test from 'node:test';
import assert from 'node:assert/strict';
import {
  formatINR,
  calculateDiscount,
  calculateCartTotals,
  calculatePCBuildStats,
  isValidPincode,
  checkDeliveryTimeline,
} from './pricing';
import { CartItem, Product, CustomPCBuild } from '../types/store';

const sampleProduct: Product = {
  id: 'prod-1',
  name: 'Test Gaming Laptop',
  brand: 'Asus',
  category: 'Laptops',
  price: 75000,
  oldPrice: 95000,
  discountPercentage: 21,
  rating: 4.8,
  reviewCount: 42,
  image: '/test.jpg',
  inStock: true,
  specs: ['16GB RAM', 'RTX 4060'],
  description: 'Test laptop',
  warranty: '2 Years',
};

test('formatINR formats currency properly with rupee sign', () => {
  const formatted = formatINR(75000);
  assert.ok(formatted.includes('75,000') || formatted.includes('75000'));
  assert.equal(formatINR(0), '₹0');
});

test('calculateDiscount calculates proper percentage', () => {
  assert.equal(calculateDiscount(100000, 80000), 20);
  assert.equal(calculateDiscount(50000, 50000), 0);
  assert.equal(calculateDiscount(0, 100), 0);
});

test('calculateCartTotals computes subtotal, savings, and free delivery threshold', () => {
  const items: CartItem[] = [
    { product: sampleProduct, quantity: 2 },
  ];
  const totals = calculateCartTotals(items);
  assert.equal(totals.subtotal, 150000);
  assert.equal(totals.savings, 40000);
  assert.equal(totals.deliveryFee, 0); // >= 1000 free delivery
  assert.equal(totals.total, 150000);
  assert.equal(totals.itemCount, 2);

  const smallCart: CartItem[] = [
    {
      product: { ...sampleProduct, price: 500, oldPrice: 600 },
      quantity: 1,
    },
  ];
  const smallTotals = calculateCartTotals(smallCart);
  assert.equal(smallTotals.subtotal, 500);
  assert.equal(smallTotals.deliveryFee, 99);
  assert.equal(smallTotals.total, 599);
});

test('calculatePCBuildStats accurately sums parts, wattage, and recommended PSU', () => {
  const build: CustomPCBuild = {
    cpu: { id: 'cpu-1', type: 'cpu', name: 'Intel i7', brand: 'Intel', price: 32000, wattage: 125, performanceTier: 'High-End', keySpec: '16 Cores' },
    gpu: { id: 'gpu-1', type: 'gpu', name: 'Nvidia RTX 4070', brand: 'Asus', price: 58000, wattage: 200, performanceTier: 'High-End', keySpec: '12GB VRAM' },
    ram: { id: 'ram-1', type: 'ram', name: 'Corsair 32GB', brand: 'Corsair', price: 9500, wattage: 15, performanceTier: 'Mid', keySpec: 'DDR5 6000MHz' },
    motherboard: { id: 'mb-1', type: 'motherboard', name: 'B760-Plus', brand: 'Asus', price: 16000, wattage: 35, performanceTier: 'Mid', keySpec: 'LGA1700' },
    storage: { id: 'ssd-1', type: 'storage', name: '1TB NVMe', brand: 'Samsung', price: 8000, wattage: 10, performanceTier: 'High-End', keySpec: 'PCIe 4.0' },
    psu: { id: 'psu-1', type: 'psu', name: '750W Gold', brand: 'Gigabyte', price: 7500, wattage: 0, performanceTier: 'High-End', keySpec: '80+ Gold' },
    case: { id: 'case-1', type: 'case', name: 'Glass Cabinet', brand: 'Zebronics', price: 4500, wattage: 0, performanceTier: 'Mid', keySpec: 'ARGB Tempered' },
  };

  const stats = calculatePCBuildStats(build);
  assert.equal(stats.totalPrice, 135500);
  assert.equal(stats.partsCount, 7);
  assert.ok(stats.estimatedWattage > 385);
  assert.ok(stats.recommendedPsuWattage >= 600);
  assert.equal(stats.isComplete, true);
});

test('isValidPincode validates 6-digit Indian PIN codes', () => {
  assert.equal(isValidPincode('307001'), true); // Sirohi
  assert.equal(isValidPincode('302001'), true); // Jaipur
  assert.equal(isValidPincode('110001'), true); // Delhi
  assert.equal(isValidPincode('3070'), false);
  assert.equal(isValidPincode('012345'), false);
  assert.equal(isValidPincode('abc123'), false);
});

test('checkDeliveryTimeline identifies Sirohi local vs national shipping', () => {
  const sirohi = checkDeliveryTimeline('307001');
  assert.equal(sirohi.isSirohiLocal, true);
  assert.ok(sirohi.days.includes('Same Day') || sirohi.days.includes('24 Hours'));

  const jaipur = checkDeliveryTimeline('302020');
  assert.equal(jaipur.isSirohiLocal, false);
  assert.equal(jaipur.days, '1-2 Days');

  const mumbai = checkDeliveryTimeline('400001');
  assert.equal(mumbai.isSirohiLocal, false);
  assert.equal(mumbai.days, '3-4 Days');
});
