type Reservation = {
    _id: string;
    hostingId: string;
    guestId: string;
    orderId: string;
    payId: string;
    checkIn: string;
    checkOut: string;
    numberOfGuest: string;
    numberOfAdults: number;
    numberOfChildren: number;
    numberOfInfants: number;
    productId: string;
};

export default Reservation;