import { promises } from "dns";
import mongoose from "mongoose";

type ConnectsObject = {
    isConnected?: number

}

const connection:ConnectsObject ={}

async function dbConnect() : Promise<void> {
    if(connection.isConnected){
        console.log("Already connected to data base");
        return
    }
    try {
        const db = await mongoose.connect(process.env.MONGODB_URI  || '',{})
        connection.isConnected = db.connections[0].readyState
        console.log("DB CONNECTED SUCESSFULLY");
        
    } catch (error) {
        console.log("DB connection Faild ");
        process.exit(1);

    }
}
export default dbConnect;