export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'sender' | 'traveler';
  profileImage?: string;
  isVerified: boolean;
  rating: number;
  createdAt: Date;
}

export interface Location {
  id: string;
  name: string;
  county: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
}

export type ParcelType = 'documents' | 'small' | 'medium' | 'large';

export interface ParcelTypeOption {
  value: ParcelType;
  label: string;
  maxWeight: number;
  description: string;
}

export interface Parcel {
  id: string;
  senderId: string;
  travelerId?: string;
  type: ParcelType;
  weight: number;
  pickup: Location;
  dropoff: Location;
  price: number;
  description?: string;
  image?: string;
  status: 'pending' | 'accepted' | 'picked' | 'in_transit' | 'delivered' | 'cancelled';
  createdAt: Date;
  pickedAt?: Date;
  deliveredAt?: Date;
  paymentMethod: 'pay_on_delivery' | 'prepaid';
  distance: number;
}

export interface Trip {
  id: string;
  travelerId: string;
  from: Location;
  to: Location;
  departureDate: Date;
  availableSpace: number; // in kg
  pricePerKg: number;
  vehicle?: string;
  status: 'upcoming' | 'active' | 'completed' | 'cancelled';
  parcels: string[]; // parcel IDs
  createdAt: Date;
}

export interface DeliveryProof {
  id: string;
  parcelId: string;
  travelerId: string;
  photos: string[];
  signature?: string;
  recipientName: string;
  timestamp: Date;
  notes?: string;
}

export interface Earnings {
  travelerId: string;
  totalEarnings: number;
  monthlyEarnings: number;
  completedDeliveries: number;
  rating: number;
  pendingPayouts: number;
}