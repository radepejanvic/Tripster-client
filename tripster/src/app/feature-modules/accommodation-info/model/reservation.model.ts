export interface Reservation {
    id?: number,
    start: Date,
    end: Date,
    duration: number,
    guestsNo: number,
    price: number,
    guestId: number,
    accommodationId: number
}

export interface Day {
    date: Date,
    price: number
}