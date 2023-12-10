
export interface AccommodationInfoCard{
    id?: number,
    name: string,
    city: string,
    street: string,
    number: string,
    shortDescription: string,
    amenities: string[],
    numOfGuests: number,
    duration: number,
    rating: number,
    numOfReviews:number;
}