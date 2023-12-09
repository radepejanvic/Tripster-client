export interface Accommodation {
    id?: number,
    name: string,
    ownerId?: number,
    country: string,
    city: string,
    zipCode: string,
    street: string,
    number: string,
    shortDescription: string,
    description: string,
    amenities: string[],
    minCap: number,
    maxCap: number,
    cancelDuration: number,
    type: string,
    automaticReservation: boolean,
    status: string;
}