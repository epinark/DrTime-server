import express from "express";
import Connection from "./db/dbConnection.js";
import cors from "cors";
import errorHandler from "./middleware/errorHandler.js";
// import dotenv from 'dotenv';


import appointmentRouter from './routes/appointmentRouter.js';
import doctorRouter from './routes/doctorRouter.js';
import authRouter from "./routes/authRouter.js"

// dotenv.config();


const app = express();
app.use(express.json());
Connection();
app.use(cors({
    origin: '*'
}));



app.use('/appointments', appointmentRouter);
app.use('/doctors', doctorRouter);
app.use('/auth', authRouter);
app.use(errorHandler);
const port = process.env.PORT || 8080;



app.listen(port, () =>
    console.log("Server is running on http://localhost:" + port)
)
app.get("/profil",async(req,res)=>{
    re.send("welcome")
})

app.post("/profil", async(req,re)=>{
   const {image} =req.body;
  const uploadedImage = await cloudinary.uploader.upload(image,
  { 
    upload_preset:'unsigned_upload',  
    allowed_formats :['png', 'jpg', 'jpeg', 'svg', 'ico', 'jfif', 'webp' ]
  },
  function(error, result){
    if(error){
        console.log(error)
    }console.log(result); });
   
     try{
        res.status(200).json(uploadedImage)
     }catch(err){
        console.log(err )
     }


})