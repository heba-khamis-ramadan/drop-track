import joi from "joi";
import { IDrop } from "../../Utils/common/types";

export const dropSchema = joi.object<IDrop>({
    dropName: joi.string().required().max(100),
    tag: joi.string().optional().max(50),
    location: joi.object({
      type: joi.string().valid("Point").required(),
      coordinates: joi.array()
        .items(joi.number())
        .length(2) // [lng, lat]
        .required()
    }).required(),
    imageUrls: joi.array().items(
      joi.object({
        secure_url: joi.string().uri().required(),
        public_id: joi.string().required()
      })
    ).required()
});
