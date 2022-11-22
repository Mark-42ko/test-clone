import { NextApiHandler } from "next";
import Propeties from "../../../interface/propeties";
import propeties from "../../../lib/models/propeties";
import mongooseInit from "../../../lib/mongo_init";
import dbConnect from "../../../lib/dbConnect";

const handler: NextApiHandler = async (req, res) => {
    mongooseInit();
    await dbConnect();
    if (req.method === "GET") {
        const data = await propeties.find() as Propeties[];
        return res.status(200).json({ result: true, data: data });
    } else {
        return res.status(500).json({ result: false });
    }
};

export default handler;