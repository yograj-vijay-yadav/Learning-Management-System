import dotenv from 'dotenv';
dotenv.config();
import connectionToDB from './configs/dbConnection.js';
import app from './app.js';
import cloudinary from "cloudinary";


const PORT = process.env.PORT || 5001;

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


app.listen(PORT, async () => {
    await connectionToDB()
  console.log(`✅ App is running on http://localhost:${PORT}`);
});
