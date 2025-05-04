import { Schema, model } from "mongoose";
import { IRate } from "../../Utils/common/types";

// schema 
const rateSchema = new Schema<IRate>({
    rateUser: {type: Schema.Types.ObjectId, ref: "User"},
    ratedDrop: {type: Schema.Types.ObjectId, ref: "Drop"},
    rating: {type: Number, required: true, min: 1, max: 5}
}, 
{timestamps: true});

// model
const Rate = model<IRate>("Rate", rateSchema);

export default Rate;