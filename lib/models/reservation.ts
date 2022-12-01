import mongoose, { Schema } from "mongoose";

const reservationsSchema = new Schema({
    hostingId: { type: String },
    guestId: { type: String },
    orderId: { type: String },
    payId: { type: String },
    checkIn: { type: Date },
    checkOut: { type: Date },
    numberOfGuest: { type: Number },
    numberOfAdults: { type: Number },
    numberOfChildren: { type: Number },
    numberOfInfants: { type: Number },
    productId: { type: String },
    productInfo: { type: Object }
});

export default mongoose.models.Reservations || mongoose.model("Reservations", reservationsSchema);