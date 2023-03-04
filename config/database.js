import mongoose from "mongoose";

mongoose.set('strictQuery',false)

export const connectDB = async()=>{

    const {connection}=await mongoose.connect(process.env.MONGO_URI)

    console.log(`Database Conneceted with: ${connection.host}`)

}



    // mongoose.connect("mongodb://127.0.0.1:27017/").then(()=>{
    //     console.log("working")
    // }).catch((err)=>{
    //     console.log(err)
    // })

    

