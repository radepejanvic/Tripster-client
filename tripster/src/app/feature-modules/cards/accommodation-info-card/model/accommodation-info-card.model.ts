export interface AccommodationInfoCard {
	id?: number;
	name: string;
	photo: string;
	url?: string;
	address: string;
	shortDescription: string;
	price: number;
	pricePerNight: number;
	numOfGuests: number;
	duration: number;
	rating: number;
	numOfReviews: number;
}
