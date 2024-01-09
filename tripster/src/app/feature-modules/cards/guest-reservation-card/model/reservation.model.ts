export interface Reservation {
  id?: number;
  name: string;
  address: string;
  photo: string;
  url?: string;
  timeStamp: string;
  numOfGuest: number;
  duration: number;
  status: string;
  price: number;
}
