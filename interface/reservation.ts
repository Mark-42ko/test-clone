import Hostings from "./hostings";

type Reservation = {
    _id: string;
    hostingId: string;
    guestId: string;
    orderId: string;
    payId: string;
    checkIn: Date;
    checkOut: Date;
    numberOfGuest: string;
    numberOfAdults: number;
    numberOfChildren: number;
    numberOfInfants: number;
    productId: string;
    productInfo: Hostings;
};

export default Reservation;