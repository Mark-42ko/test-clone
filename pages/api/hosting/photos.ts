import { NextApiHandler, NextConfig } from "next";
import fs from "fs"
import Hostings from "../../../interface/hostings";
import hostings from "../../../lib/models/hostings";
import mongooseInit from "../../../lib/mongo_init";
import formidable from "formidable";
import { initializeApp } from "firebase/app";
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";
import dbConnect from "../../../lib/dbConnect";

/*
    multipart /form-data parser 는 기본 내장이 안되어있어서 추가 설정(multer 같은...)
    formidable 이란 multipart parsing 라이브러리를 이번에 활용
    npm i formidable @types/formidable
*/

const firebaseConfig = {
  apiKey: "AIzaSyC8eIGiF6JZ9h4XQOT_Sl0TJLVtCrWx7So",
  authDomain: "my-project-login-367901.firebaseapp.com",
  projectId: "my-project-login-367901",
  storageBucket: "my-project-login-367901.appspot.com",
  messagingSenderId: "564585516138",
  appId: "1:564585516138:web:64e77f0feb75e5d9e58e13",
  measurementId: "G-KVF534NRXX"
};

const app = initializeApp(firebaseConfig);

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
        console.log(fields);
        console.log(files);
        
        const storage = getStorage(app);
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