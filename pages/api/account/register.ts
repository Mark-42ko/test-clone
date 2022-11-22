import { NextApiHandler } from "next";
import mongooseInit from "../../../lib/mongo_init";
import Accounts from "../../../lib/models/accounts"
import { hash } from "bcryptjs"
import dbConnect from "../../../lib/dbConnect";

const handler: NextApiHandler = async (req, res) => {
    mongooseInit();
    await dbConnect();
    if (req.method !== "POST") {
        return res.status(405).json({ message: `${req.method} is not alloewed` });
    }

    const { email, firstname, lastname, birthday, password, marketingDate, agreeDate } = req.body;

    const hashPassword = await hash(password, 12);

    if(req.method === "POST"){
        const data = await Accounts.create({ email: email, firstname: firstname, lastname: lastname, birthday: birthday, password: hashPassword, marketingDate: marketingDate, agreeDate: agreeDate});
        return res.status(200).json({result: true, data: data});
    }else {
        return res.status(500).json({result: false});
    }
};

export default handler;