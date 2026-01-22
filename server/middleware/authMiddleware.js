import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()
const protect = async(req,res,next)=>{
    const authHeader = req.headers.authorization;

  // 1. Check header exists and starts with Bearer
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized, no token" });
  }

  // 2. Extract token (remove 'Bearer ')
  const token = authHeader.split(" ")[1];

    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        req.userId = decoded.userId
       
        next()
    }catch(error){
        return res.status(401).json({message:"Unauthrized"})
    }
}

export default protect