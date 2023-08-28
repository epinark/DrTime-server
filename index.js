import express from "express";
import Connection from "./db/dbConnection.js";
import cors from "cors";
import errorHandler from "./middleware/errorHandler.js";
import dotenv from 'dotenv';

// import userRouter from './routes/userRouter.js';
import userProfileRouter from './routes/userProfileRouter.js';
import appointmentRouter from './routes/appointmentRouter.js';
import doctorRouter from './routes/doctorRouter.js';
import authRouter from "./routes/authRouter.js"

dotenv.config();

const app = express();
app.use(express.json());
Connection();
app.use(cors({
    origin: '*'
}));

// app.use('/users', userRouter);
app.use('/appointments', appointmentRouter);
app.use('/doctors', doctorRouter);
app.use('/profiles', userProfileRouter);
app.use('/auth', authRouter);
app.use(errorHandler);
const port = process.env.PORT || 8080;



app.listen(port, () =>
    console.log("Server is running on http://localhost:" + port)
)