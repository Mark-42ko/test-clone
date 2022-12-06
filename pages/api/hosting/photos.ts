import { NextApiHandler, NextConfig } from "next";
import fs from "fs"
import Hostings from "../../../interface/hostings";
import hostings from "../../../lib/models/hostings";
import mongooseInit from "../../../lib/mongo_init";
import formidable from "formidable";
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";
import dbConnect from "../../../lib/dbConnect";
import { firebaseApp } from "../../../lib/firebase-config";

export const config: NextConfig = {
    api: {
        bodyParser: false,
    }
};

const handler: NextApiHandler = async (req, res) => {
    const form = formidable({ multiples: true });
    mongooseInit();
    await dbConnect();
    form.parse(req, async (err, fields, files) => {
        if (err) {
            return console.log("!!!", err);
        }
        
        const storage = getStorage(firebaseApp);
        const dirRef = ref(storage, "hosting/"+fields.itemId);
        
        const fileUrl = [];

        for(let one of files.photos as formidable.File[]) {
            const fileRef = ref(dirRef, one.newFilename);
            const file = fs.readFileSync(one.filepath);
            const result = await uploadBytes(fileRef, file, { contentType: one.mimetype!});
            const url = await getDownloadURL(fileRef);
            fileUrl.push(url);
        }
   
        if (req.method === "POST") {
            const data = await hostings.findOneAndUpdate({_id: fields.user}, {$set:{imageUrl : fileUrl, step: fields.url[0]}}) as Hostings;
            return res.status(200).json({ result: true, data: data});
        } else {
            return res.status(500).json({ result: false });
        }
    });
    
};

export default handler;