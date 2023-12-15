export interface Accommodation {
    id?: number,
    ownerId?: number,
    status: string;
    name: string,
    shortDescription: string,
    minCap: number,
    maxCap: number,
    type: string,
    automaticReservation: boolean,
    country: string,
    city: string,
    zipCode: string,
    street: string,
    number: string,
    // latitude: number,
    // longitude: number,
    description: string,
    amenities: number[],
    cancelDuration: number,
    pricePerNight: boolean
    calendar?: any
}

export interface PriceList {
    accommodationId?: number,
    start: Date;
    end: Date;
    price: number;
    weekend?: number;
    holiday?: number;
}


export interface PriceListAdapter {
    accommodationId?: number,
    start: number[];
    end: number[];
    price: number;
}