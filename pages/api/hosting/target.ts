import { NextApiHandler } from "next";
import Hostings from "../../../interface/hostings";
import hostings from "../../../lib/models/hostings";
import mongooseInit from "../../../lib/mongo_init";
import dbConnect from "../../../lib/dbConnect";

const handler: NextApiHandler = async (req, res) => {
    mongooseInit();
    await dbConnect();
    console.log(req.query)
    if (req.method === "GET") {
        const data = await hostings.findOne({_id : req.query._id}) as Hostings;
        return res.status(200).json({ result: true, data: data});
    } else {
        return res.status(500).json({ result: false });
    }
};

export default handler;