import User from "../models/user.model.js"
import AppError from "../utils/error.util.js"
import cloudinary from 'cloudinary';
import fs from 'fs'; 
import sendEmail from "../utils/sendEmail.js";
import crypto from 'crypto'
import bcrypt from "bcryptjs";


const cookieOptions = {
    maxAge:7*24*60*60*1000,  // 7days
    httpOnly: true,
    secure:true
}

// const register = async (req, res, next) => {
//   const { fullName, email, password } = req.body;

//   if (!fullName || !email || !password) {
//     return next(new AppError('All fields are required', 400));
//   }

//   const UserExists = await User.findOne({ email });

//   if (UserExists) {
//     return next(new AppError('Email already Exists', 400));
//   }

//   const user = await User.create({
//     fullName,
//     email,
//     password,
//     avatar: {
//       public_id: email,
//       secure_url: '',
//     }
//   });

//   if (!user) {
//     return next(new AppError('User registration failed, please try again', 400));
//   }

//   // Upload file if avatar present
//   if (req.file) {
//     try {
//       const result = await cloudinary.v2.uploader.upload(req.file.path, {
//         folder: 'lms',
//         width: 250,
//         height: 250,
//         gravity: 'face',
//         crop: 'fill',
//       });

//       if (result) {
//         user.avatar.public_id = result.public_id;
//         user.avatar.secure_url = result.secure_url;
//       }

//       // Remove local file
//       fs.rmSync(`uploads/${req.file.filename}`);
//     } catch (err) {
//      return next(new AppError(err.message  || 'Failed to upload avatar', 500));
// }

//   }

//   await user.save();
//   user.password = undefined;

//   const token = await user.generateJWTToken();

//   res.cookie('token', token, cookieOptions);

//   res.status(200).json({
//     success: true,
//     message: 'User registration successful',
//     user,
//   });
// };

// Register  
const register = async (req, res, next) => {
    try {
        const { fullName, email, password } = req.body;

        // Check if user misses any fields
        if (!fullName || !email || !password) {
            return next(new AppError("All fields are required", 400));
        }

        // Check if the user already exists
        const userExist = await userModel.findOne({ email });
        if (userExist) {
            return next(new AppError("Email already exists, please login", 400));
        }

        // Save user in the database and log the user in
        const user = await userModel.create({
            fullName,
            email,
            password,
            avatar: {
                public_id: email,
                secure_url: "",
            },
        });

        if (!user) {
            return next(new AppError("User registration failed, please try again", 400));
        }

        // File upload
        if (req.file) {
            try {
                const result = await cloudinary.v2.uploader.upload(req.file.path, {
                    folder: "LMS",
                    width: 250,
                    height: 250,
                    gravity: "faces",
                    crop: "fill",
                });

                if (result) {
                    user.avatar.public_id = result.public_id;
                    user.avatar.secure_url = result.secure_url;

                    // Remove the file from the server
                    fs.rmSync(`uploads/${req.file.filename}`);
                }
            } catch (e) {
                return next(new AppError(e.message || "File not uploaded, please try again", 500));
            }
        }

        await user.save();

        user.password = undefined;

        const token = await user.generateJWTToken();

        res.cookie("token", token, cookieOptions);

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            user,
        });
    } catch (e) {
        return next(new AppError(e.message, 500));
    }
};


//Login-->
   const login= async (req,res,next)=>{
 
    const {fullName,email,password}=req.body
    
    if( !email  || !password){
        return  next(new AppError('All fields are required',400))
    }
    const user =await User.findOne({email}).select('+password')

    if(!user || ! await user.comparePassword(password)){
      return  next(new AppError('Email or password doesnt match',400))
    }
     user.password=undefined

   const token = await user.generateJWTToken()

   res.cookie('token',token,cookieOptions)

   res.status(200).json({
    success:true,
    message:'user login succesfull!',
    user
   })
}
const logout = (req, res) => {
 // res.clearCookie('token');   // in built in express 
 res.cookie('token',null,{     // manually but total control on cookie
    secure:true,
    maxAge:0,
    httpOnly:true
 })
  res.status(200).json({ 
    success: true, 
    message: "Logged out" });
};

const getProfile = async (req, res) => {
    const userId = req.user.id // req.user  token se aayega
    const user= await User.findById(userId)
    res.status(200).json({
    success: true, 
    message: "Profile data here" ,
    user});
};

const forgotPassword = async (req,res,next)=>{
    const{email} =req.body
    if(!email){
     return  next(new AppError('Email is required',400))
    }
    const user =await User.findOne({email})
     if(!user){
     return  next(new AppError('Email deos not exists!',400))
    }
    const resetToken=await user.generatePasswordResetToken()
    await user.save()

    const resetPasswordurl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`
    const message = `You can reset your pasword ny clicking ${resetPasswordurl}`
    const subject='Reset password'
    try {
       await sendEmail(email,subject,message) 
       res.status(200).json({
        success:true,
        message:`reset password token has been sent successfully to ${email}`
       })
    } catch (e) {
         user.PasswaordToken= undefined
         user.PasswaordExpiry= undefined
        return  next(new AppError(e.message,400))
    }
}


const resetPassword = async (req, res) => {
  try {
    const { resetToken } = req.params;
    const { password } = req.body;

    // Hash the token to match stored hashed token
    const forgotPasswordToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');

    // Find user with matching token and non-expired token
    const user = await User.findOne({
      forgotPasswordToken: forgotPasswordToken,
      forgotPasswordExpiry: { $gt: Date.now() },  
    });

    if (!user) {
      return res.status(400).json({ message: 'Token is invalid or has expired' });
    }

    // Set new password and clear reset token fields
    user.password = password;
    user.forgotPasswordToken = undefined;
    user.forgotPasswordExpiry = undefined;

    await user.save();

    res.status(200).json({success:true, message: 'Password reset successful' });

  } catch (error) {
    console.error('Reset Password Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


const changePassword = async (req,res)=>{
    const {oldpassword,newpassword}=req.body
    const{id}=req.user

    if(!oldpassword || !newpassword){
          return  next(new AppError('All fields are required',400))
    }
    const user =await User.findById(id).select('+password')

   if(!user){
     return  next(new AppError('user deos not exists!',400))
    }

  const ispasswordValid = await user.comparePassword(oldpassword)
  if(!ispasswordValid){
     return  next(new AppError('invalid old password!',400))
    }

  user.password=newpassword
  await user.save()
  user.password=undefined

  res.status(200).json({
    success:true, 
    message: 'Password change successfully' });

}
const updateUser = async (req, res, next) => {
  try {
    const { fullName } = req.body;
    const { id } = req.user;

    const user = await User.findById(id);

    if (!user) {
      return next(new AppError('User does not exist', 400));
    }

    // Update user fields
    if (req.fullName) {
      user.fullName = fullName;
    }

       if (req.file) {
        await cloudinary.v2.uploader.destroy(user.avatar.public_id)
        // copy paste from register
          try {
        const result= await cloudinary.v2.uploader.upload(req.file.path,{
            folder:'lms',
            width:250,
            height:250,
            gravity:'face',
            crop:'fill'
        })
        if(result){
            user.avatar.public_id=result.public_id
            user.avatar.secure_url=result.secure_url
        }
        //remove from server beacause now it is on cludinary 
        fs.rm(`uploads/${req.file.filename}`)
    } catch (e) {
        return  next(new AppError(e || 'Email already Exists',500))
    }
    }

    await user.save();

    res.status(200).json({
      success: true,
      message: 'User updated successfully',
      user,
    });

  } catch (error) {
    console.error('Update User Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export  {
    register,
    login,
    logout,
    getProfile,
    forgotPassword,
    resetPassword  ,
    changePassword ,
    updateUser 
}