import express, { json, NextFunction, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";

const app = express();
  
//to access .env
dotenv.config()

//middlewares for making requests
app.use(cors())
app.use(json())

//accessing .env
const PORT = process.env.PORT || 5000

app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`)
})

app.use((err:Error, req:Request, res:Response, next:NextFunction)=>{
    if(err.message){
        res.status(500).json({error:err.message})
    }
})