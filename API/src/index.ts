import express, { json, NextFunction, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { appointmentRoute, diagnosisRoute, patientRoute, userRoute } from "./routes";

const app = express();
  
//to access .env
dotenv.config()

//middlewares for making requests
app.use(cors())
app.use(json())

//accessing .env
const PORT = process.env.PORT || 5000

//Using Routes from Routes folder
app.use('/api/diagnosis', diagnosisRoute)
app.use('/api/userRoute', userRoute)
app.use('/api/patients', patientRoute)
app.use('/api/appointments', appointmentRoute)

app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`)
})

app.use((err:Error, req:Request, res:Response, next:NextFunction)=>{
    if(err.message){
        res.status(500).json({error:err.message})
    }
})