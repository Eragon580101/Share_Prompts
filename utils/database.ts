import mongoose,{ConnectOptions} from "mongoose";

let isConnected = false;

export const connectToDatabase = async (calling:string) => {
    console.log('calling: ', calling)
    mongoose.set('strictQuery', true);
    if (isConnected) {
        console.log('MongoDB already connected');
        return;

    }
    try {
        console.log('=> using new database connection');
        await mongoose.connect(process.env.MONGODB_URI as string, {
            dbName: process.env.MONGODB_DB as string,
        });
        isConnected = true;
    } catch (error) {
        console.log('error connecting to db', error);
    }
}

