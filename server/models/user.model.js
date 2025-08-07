import { Schema,model } from "mongoose";
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken";
import crypto from 'crypto'

const userSchema = new Schema({
   fullName : {
    type : String,
    require:[true,'name is required'],
    minLength:[5,'name should be atleast 5 character'],
    maxLength:[50,'name should be less than 50 character'],
    lowercase:'true',
    trim:true
   },
   email:{
     type : String,
     unique:true,
     require:[true,'email is required'],
     lowercase:'true',
     trim:true
    // match:[regex fomrat] 
   },
    password:{
     type : String,
     require:[true,'password is required'],
      minLength:[6,'password should be atleast 6 character'],
      select:false  //when i  am quring dont give password bydefault uless and until i specifically mention it
   },
   avatar:{
        public_id:{
            type:String,
        },
        secure_url:{
            type:String,
        }
     },
    role:{
     type:String,
     enum:['USER','ADMIN'],
     default:'USER'
    },
    forgotPasswordToken: String,
    forgotPasswordExpiry: Date

},{
    timestamps:true
})
userSchema.pre('save',async function(next) {
    if(!this.isModified('password')){
        return next()
    }
    this.password= await bcrypt.hash(this.password,10)
})

userSchema.methods={
    generateJWTToken : async function(){
        return await jwt.sign(
            {id : this.id,email:this.email,subscription:this.subscription,role:this.role},
            process.env.JWT_SECRET,
            { expiresIn : process.env.JWT_EXPIRY} ,
            
        )
    },
    comparePassword:async function(plainTextPassword){
        return await bcrypt.compare(plainTextPassword,this.password)
    },
    generatePasswordResetToken: async function(){
        const resetToken=crypto.randomBytes(10).toString('hex')
        const crypto = require("crypto");

        this.forgotPasswordToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");
        this.forgotPasswaordExpiry=Date.now() + 15*60*1000  //15 min from now
    }
}
const User = model('User',userSchema)
export default User