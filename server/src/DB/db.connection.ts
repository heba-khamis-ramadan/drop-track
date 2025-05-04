import { connect } from "mongoose";

export const connectDB = async () => {
    await connect(process.env.DB_URL as string).then(() => {
        console.log("DB connected succesfully :)");
    }).catch((err) => {
        console.log(err);
    });
};