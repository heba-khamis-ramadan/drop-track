import { NextFunction, Request, Response } from "express";
import { IAuthRequest, IDrop } from "../../Utils/common/types";
import { DBService } from "../../DB/db.service";
import Drop from "../../DB/Models/drop.model";
import { AppError } from "../../Utils/error";
import { CreateDropDto } from "./drop.dto";
import { Types } from 'mongoose';

class DropService {
  private _dropModel = new DBService<IDrop>(Drop);

    create_drop = async (req: IAuthRequest, res: Response, next: NextFunction) => {
        const user_id = req.authUser.id;
        const { dropName, tag, location, imageUrls, address } : CreateDropDto =  req.body;
        // create new drop
        const drop = await this._dropModel.create({
            dropName, 
            tag, 
            location, 
            imageUrls,
            address,
            addedBy: user_id
        });
        return res.status(201).json({ success: true, message: "drop created successfully", data: drop });
    }

    get_drop = async (req: Request, res: Response, next: NextFunction) => {
        const { dropId } = req.params;
        const newDropId = new Types.ObjectId(dropId);
        const drop = await this._dropModel.findById(newDropId);
        if(!drop) return next(new AppError("drop not found", 404));
        return res.status(200).json({success: true, data: drop});
    }

    get_drops = async (req: Request, res: Response, next: NextFunction) => {
        const drops = await this._dropModel.find();
        if(!drops) return next(new AppError("drops not found", 404));
        return res.status(200).json({success: true, data: drops});
    }

    
    get_near_drops = async (req: Request, res: Response, next: NextFunction) => {
        const lng = parseFloat(req.query.lng as string);
        const lat = parseFloat(req.query.lat as string);
        const distance = parseInt(req.query.distance as string) || 5000; // meters

        if (isNaN(lng) || isNaN(lat)) {
          return res.status(400).json({ success: false, message: "Invalid coordinates" });
        }

        const drops = await this._dropModel.find({
          location: {
            $near: {
              $geometry: {
                type: "Point",
                coordinates: [lng, lat]
              },
              $maxDistance: distance // in meters
            }
          }
        });

        res.status(200).json({ success: true, data: drops });
    };

    delete_drop = async (req: Request, res: Response, next: NextFunction) => {
        const { dropId } = req.params;
        const newDropId = new Types.ObjectId(dropId);
        const drop = await this._dropModel.findByIdAndDelete(newDropId);
        if(!drop) return next(new AppError("drop not found", 404));
        return res.status(200).json({success: true, data: drop});
    }
}

  export default new DropService();