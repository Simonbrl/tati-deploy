import mongoose from 'mongoose';
const DATABASE: string = String(process.env.DATABASE);

mongoose.connect(
    DATABASE,
    (err: any) => {
        if(!err) console.log("Database connected")
        else console.log("Connection error :" + err)
    }
)