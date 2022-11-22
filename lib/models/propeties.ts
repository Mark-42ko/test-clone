import mongoose, { Schema } from "mongoose";
import Propeties from "../../interface/propeties";

const propetiesSchema = new Schema<Propeties>({
    group: { type: String, required: true },
    image: { type: String },
    type: [{ property: String, description: String }]
});

export default mongoose.models.propeties || mongoose.model("propeties", propetiesSchema);
