export interface AccommodationRequest{
    id?: number,
    name: string,
    address: string,
    shortDescription: string,
    amenities: string[],
    timestap: string,
    status: number,
}