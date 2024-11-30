import mongoose from "mongoose";


async function connectMongoDB(mongo_url){
    mongoose.connect(mongo_url)
    .then(()=>{
        console.log("MongoDB COnnected...")
    }).catch((err)=>{
        console.log("MongoDB Connection Error:", err)
    })
}

export {connectMongoDB};


