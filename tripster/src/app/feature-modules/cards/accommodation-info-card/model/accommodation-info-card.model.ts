export interface AccommodationInfoCard {
	id?: number;
	name: string;
	address: string;
	shortDescription: string;
	amenities: string[];
	price: number;
	pricePerNight: number;
	numOfGuests: number;
	duration: number;
	rating: number;
	numOfReviews: number;
}
