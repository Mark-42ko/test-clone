import { NextApiHandler } from "next";
import Account from "../../../interface/account";
import mongooseInit from "../../../lib/mongo_init";
import Accounts from "../../../lib/models/accounts"
import dbConnect from "../../../lib/dbConnect";

const handler: NextApiHandler = async (req, res) => {
    mongooseInit();
    await dbConnect();
    if(req.method === "POST"){
        const document = req.body as Account;
        const data = await Accounts.find({email: document.email}) as Account[];
        if( data[0] ) {
            return res.status(200).json({result: true, data: data});
        } else {
            return res.status(200).json({result: false});
        }
    }else {
        return res.status(500).json({result: false});
    }
};

export default handler;