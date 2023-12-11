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
    latituded: number,
    longitude: number,
    description: string,
    amenities: string[],
    cancelDuration: number,
    pricePerNight: boolean
}

export interface PriceList {
    accommodationId?: number,
    start: Date;
    end: Date;
    standard: number;
    weekend: number;
    holiday: number;
}