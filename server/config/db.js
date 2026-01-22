import mongoose from "mongoose"
// import dotenv from 'dotenv'


// dotenv.config()


const connectDB = async()=>{
    try{
        mongoose.connection.on("connected",()=>{
            console.log("Database Contcted successfully")
        })
        let mongodbURI = process.env.MONGO_URL
       

        const projectName = "ResumeBuilder"
        
        if (!mongodbURI){
            throw new Error("MONGO_URL environment variable not set")
        }

        if(mongodbURI.endsWith('/')){
            mongodbURI = mongodbURI.slice(0, -1)
        }

        await mongoose.connect(`${mongodbURI}/${projectName}`)
    }catch(error){
        console.error("Error connecting to Mongodb:", error)
    }
}


export default connectDB