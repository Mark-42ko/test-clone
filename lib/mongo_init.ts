import mongoose from "mongoose";

export default function mongooseInit() {
    const MONGO_URI = process.env.MONGO_URI;
    if (!MONGO_URI) {
        throw new Error(" Please, check MONGO_URI in .env.local ");
    }
    console.log("lib - try connect mongodb")
    mongoose.connect(MONGO_URI, { dbName: "next-tutorial" })
        .then((value) => { console.log("success") })
        .catch((err) => { console.log("error -", err.message) });
}