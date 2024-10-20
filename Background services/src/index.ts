import express from 'express'
import dotenv from 'dotenv'
import cron from 'node-cron'
import WelcomeEmail from './EmailService/WelcomeEmail';
import AdmissionReportEmail from './EmailService/AdmissionReport';
import AppointmentEMail from './EmailService/AppointmentEmail';
import DiagnosisEmail from './EmailService/DiagnosisEmail';


const app = express();

dotenv.config();

const run = () => {
    var cron = require('node-cron');

    cron.schedule('* * * * *', () => {

        WelcomeEmail();
        AdmissionReportEmail();
        AppointmentEMail();
        DiagnosisEmail();
    });
}

run()

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Background services is running on port ${PORT}`)
})