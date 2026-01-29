import mongoose from "mongoose"
import bcrypt from "bcrypt"

const UserSchema = mongoose.Schema({
    name :{type:String, required:true},
    email :{type:String, required:true, unique:true},
    password :{type:String, required:true},
    isVerified:{type:Boolean, default:false},
    emailVerifyToken:{type:String},
    emailVerifyTokenExpiry:{type:Date},
    isPremium: {
    type: Boolean,
    default: false
  },

  premiumActivatedAt: Date
},{timestamps: true})

UserSchema.methods.comparePassword = function(password){
    return bcrypt.compareSync(password, this.password)
}

const User = mongoose.model("User",UserSchema)
export default User