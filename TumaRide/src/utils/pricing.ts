import { ParcelType } from '../types';

export const PARCEL_TYPES = {
  documents: { maxWeight: 1, basePrice: 200, label: 'Documents', description: 'Papers, letters, small documents' },
  small: { maxWeight: 5, basePrice: 200, label: 'Small Box (<5kg)', description: 'Small packages, electronics' },
  medium: { maxWeight: 15, basePrice: 250, label: 'Medium Box (5-15kg)', description: 'Clothing, books, medium items' },
  large: { maxWeight: 30, basePrice: 350, label: 'Large Box (15-30kg)', description: 'Appliances, bulk items' },
};

export const DISTANCE_RATES = [
  { min: 0, max: 20, rate: 0 },      // Base price for 0-20km
  { min: 21, max: 50, rate: 10 },    // +10 KES per km for 21-50km
  { min: 51, max: 100, rate: 8 },    // +8 KES per km for 51-100km
  { min: 101, max: 200, rate: 6 },   // +6 KES per km for 101-200km
  { min: 201, max: 500, rate: 4 },   // +4 KES per km for 201-500km
  { min: 501, max: Infinity, rate: 3 }, // +3 KES per km for 500km+
];

export const WEIGHT_PENALTY = 40; // KES per kg above base weight

export function calculatePrice(
  parcelType: ParcelType,
  weight: number,
  distance: number
): number {
  const typeInfo = PARCEL_TYPES[parcelType];
  if (!typeInfo) throw new Error('Invalid parcel type');

  // Start with base price
  let totalPrice = typeInfo.basePrice;

  // Add weight penalty if over base weight
  const excessWeight = Math.max(0, weight - typeInfo.maxWeight);
  totalPrice += excessWeight * WEIGHT_PENALTY;

  // Add distance charges
  let remainingDistance = distance;
  for (const rate of DISTANCE_RATES) {
    if (remainingDistance <= 0) break;
    
    const distanceInRange = Math.min(
      remainingDistance,
      rate.max - rate.min + 1
    );
    
    if (distance > rate.min) {
      totalPrice += distanceInRange * rate.rate;
    }
    
    remainingDistance -= distanceInRange;
  }

  return Math.round(totalPrice);
}

export function getPriceBreakdown(
  parcelType: ParcelType,
  weight: number,
  distance: number
) {
  const typeInfo = PARCEL_TYPES[parcelType];
  const basePrice = typeInfo.basePrice;
  const excessWeight = Math.max(0, weight - typeInfo.maxWeight);
  const weightCharge = excessWeight * WEIGHT_PENALTY;
  
  let distanceCharge = 0;
  let remainingDistance = distance;
  
  for (const rate of DISTANCE_RATES) {
    if (remainingDistance <= 0) break;
    
    const distanceInRange = Math.min(
      remainingDistance,
      rate.max - rate.min + 1
    );
    
    if (distance > rate.min) {
      distanceCharge += distanceInRange * rate.rate;
    }
    
    remainingDistance -= distanceInRange;
  }

  const total = basePrice + weightCharge + distanceCharge;

  return {
    basePrice,
    weightCharge,
    distanceCharge,
    total: Math.round(total),
    breakdown: {
      base: `Base price (${typeInfo.label}): KES ${basePrice}`,
      weight: excessWeight > 0 ? `Weight excess (${excessWeight}kg): KES ${weightCharge}` : null,
      distance: distanceCharge > 0 ? `Distance (${distance}km): KES ${distanceCharge}` : null,
    },
  };
}

export function getEstimatedDistance(
  pickup: { latitude: number; longitude: number },
  dropoff: { latitude: number; longitude: number }
): number {
  // Haversine formula for calculating distance between two points
  const R = 6371; // Earth's radius in kilometers
  const dLat = ((dropoff.latitude - pickup.latitude) * Math.PI) / 180;
  const dLon = ((dropoff.longitude - pickup.longitude) * Math.PI) / 180;
  
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((pickup.latitude * Math.PI) / 180) *
    Math.cos((dropoff.latitude * Math.PI) / 180) *
    Math.sin(dLon / 2) *
    Math.sin(dLon / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  
  return Math.round(distance);
}