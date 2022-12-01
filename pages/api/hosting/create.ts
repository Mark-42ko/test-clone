import { NextApiHandler } from "next";
import Hostings from "../../../interface/hostings";
import hostings from "../../../lib/models/hostings";
import mongooseInit from "../../../lib/mongo_init";
import dbConnect from "../../../lib/dbConnect";

const handler: NextApiHandler = async (req, res) => {
    mongooseInit();
    await dbConnect();
    if (req.method === "POST") {
        const newData = await hostings.create({ user: req.body.user, step: "//property-type-group" }) as Hostings[];
        return res.status(200).json({ result: true, data: newData });
    } else {
        return res.status(500).json({ result: false });
    }
};

export default handler;