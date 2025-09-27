import { Types } from "mongoose";

export interface IImageUrl {
  secure_url: string;
  public_id: string;
}

export interface LocationDTO {
  type: "Point";
  coordinates: [number, number]; // [longitude, latitude]
}

export interface CreateDropDto {
  dropName: string;
  tag?: string;
  address?: string;
  location: LocationDTO;
  imageUrls: IImageUrl[];
  addedBy: Types.ObjectId;
}