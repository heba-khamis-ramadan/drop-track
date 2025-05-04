import { Schema, model } from "mongoose";
import { IDrop } from "../../Utils/common/types";

// schema 
const dropSchema = new Schema<IDrop>({
    dropName: {type: String, required: true},
    tag: {type: String},
    ratings: [{type: Schema.Types.ObjectId, ref: "Rate"}],
    location: {
        type: {
          type: String,
          enum: ['Point'], // must be 'Point' for GeoJSON
          required: true
        },
        coordinates: {
          type: [Number], // array of numbers [lng, lat]
          required: true
        }
      },
    imageUrls: [{type: {secure_url: {type: String}, public_id: {type: String}}}],
    addBy: {type: Schema.Types.ObjectId, ref: "User"}
}, 
{timestamps: true});

// model
const Drop = model<IDrop>("Drop", dropSchema);

export default Drop;