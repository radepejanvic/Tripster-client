export interface Accommodation {
  id?: number;
  ownerId?: number;
  status: string;
  name: string;
  shortDescription: string;
  minCap: number;
  maxCap: number;
  type: string;
  automaticReservation: boolean;
  country: string;
  city: string;
  zipCode: string;
  street: string;
  number: string;
  // latitude: number,
  // longitude: number,
  description: string;
  amenities: number[];
  cancelDuration: number;
  pricePerNight: boolean;
  calendar?: any;
  rating: number;
  numOfReviews: number;
}

export interface PriceList {
  accommodationId?: number;
  start: Date;
  end: Date;
  price: number;
  weekend?: number;
  holiday?: number;
}

export interface PriceListAdapter {
  accommodationId?: number;
  start: number[];
  end: number[];
  price: number;
  weekend?: number;
  holiday?: number;
}

export interface Review {
  id?: number;
  title: string;
  rate: number;
  comment: string;
  status?: string;
  timeStamp?: string;
  reviewerId: number;
  reviewerName?: string;
  reviewerSurname?: string;
  reviewedId: number;
  reviewedName?: string;
  reviewedPhoto?: string;
  reviewUrl?: string;
}

export interface Photo {
  id: number;
  bytes: string;
}

export interface Interval {
  start: Date;
  end: Date;
}

export interface Rating {
  rating: number;
  reviews: number;
  excellent: number;
  good: number;
  average: number;
  poor: number;
  bad: number;
}
