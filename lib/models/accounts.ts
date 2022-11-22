import mongoose, { Schema } from "mongoose";
import Account from "../../interface/account";

const accountSchema = new Schema<Account>({
    email: { type: String, required: true},
    firstname: { type: String, required: true},
    lastname: { type: String, required: true},
    birthday: { type: Date, required: true},
    password: { type: String, required: true},
    marketingDate: { type: Date},
    agreeDate: { type: Date, required: true},
});

export default mongoose.models.Account || mongoose.model("Account", accountSchema);