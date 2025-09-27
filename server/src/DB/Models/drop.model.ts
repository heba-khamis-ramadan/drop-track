import { Schema, model } from "mongoose";
import { IDrop } from "../../Utils/common/types";

// schema 
const dropSchema = new Schema<IDrop>({
    dropName: {type: String, required: true},
    tag: {type: String},
    address: {type: String},
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
    addedBy: {type: Schema.Types.ObjectId, ref: "User"}
}, 
{timestamps: true});

// Set the geospatial index
dropSchema.index({ location: '2dsphere' });

// model
const Drop = model<IDrop>("Drop", dropSchema);

export default Drop;