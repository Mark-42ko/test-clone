import mongoose, { Schema } from "mongoose";

const hostingsSchema = new Schema({
    user: { type: String },
    property: { type: String },
    type: { type: String },
    privacy: { type: String },
    lat: { type: Number },
    lng: { type: Number },
    place: { type: String },
    guest: { type: Number },
    bed: { type: Number },
    bathroom: { type: Number },
    firstMenu: { type: Array },
    secondMenu: { type: Array },
    thirdMenu: { type: Array },
    imageUrl: { type: Array },
    name: {type: String},
    price: {type: Number},
    publishing: {type: Boolean},
});

export default mongoose.models.Hostings || mongoose.model("Hostings", hostingsSchema);