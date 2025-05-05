import { Request } from "express";
import { Document, Types } from "mongoose";

export interface IAuthRequest extends Request {
    authUser: IUser;
};

export interface IUser extends Document  {
    userName: string;
    email: string;
    password: string;
    pinnedDrops: Array<Types.ObjectId>
};


export interface IDrop extends Document  {
    dropName: string;
    tag: string;
    ratings: Array<Types.ObjectId>;
    location: {
        type: "Point"; // GeoJSON type
        coordinates: [number, number]; // [longitude, latitude]
      };
    imageUrls: Array<{secure_url: string, public_id: string}>;
    addBy: Types.ObjectId;
};

export interface IRate extends Document  {
    rateUser: Types.ObjectId;
    ratedDrop: Types.ObjectId;
    rating: number
};
