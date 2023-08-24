import express from "express";
import Connection from "./db/dbConnection.js";
import cors from "cors";
import dotenv from 'dotenv';



dotenv.config();

const app = express();
app.use(express.json());
Connection();
app.use(cors({
    origin: '*'
}));


const port = process.env.PORT || 8080;



app.listen(port, () =>
    console.log("Server is running on http://localhost:" + port)
)