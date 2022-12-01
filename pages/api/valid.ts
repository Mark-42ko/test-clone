import { NextApiHandler } from "next";
import mongooseInit from "../../lib/mongo_init";
import dbConnect from "../../lib/dbConnect";
import reservation from "../../lib/models/reservation";
import Reservation from "../../interface/reservation";

const handler: NextApiHandler = async (req, res) => {
    mongooseInit();
    await dbConnect();
    if (req.method === "POST") {
        const data = await reservation.find({productId: req.body.productId, checkOut : { $gte: req.body.checkIn}, checkIn: { $lte: req.body.checkOut}}) as Reservation[];
        console.log(data);
        if(data.length === 0) {
            return res.status(200).json({ result: true, data: data });
        } else {
            return res.status(200).json({ result: false, data: data});
        }
    } else {
        return res.status(500).json({ result: false });
    }
};

export default handler;