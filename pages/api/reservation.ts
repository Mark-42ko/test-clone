import { NextApiHandler } from "next";
import mongooseInit from "../../lib/mongo_init";
import dbConnect from "../../lib/dbConnect";
import reservation from "../../lib/models/reservation";
import Reservation from "../../interface/reservation";

const handler: NextApiHandler = async (req, res) => {
    mongooseInit();
    await dbConnect();
    if (req.method === "POST") {
        const data = await reservation.create({
            hostingId: req.body.hostingId,
            guestId: req.body.guestId,
            orderId: req.body.orderId,
            payId: req.body.payId,
            checkIn: req.body.checkIn,
            checkOut: req.body.checkOut,
            numberOfGuest: req.body.numberOfGuest,
            numberOfAdults: req.body.numberOfAdults,
            numberOfChildren: req.body.numberOfChildren,
            numberOfInfants: req.body.numberOfInfants,
            productId: req.body.productId
        }) as Reservation;
        return res.status(200).json({ result: true, data: data });
    } else {
        return res.status(500).json({ result: false });
    }
};

export default handler;