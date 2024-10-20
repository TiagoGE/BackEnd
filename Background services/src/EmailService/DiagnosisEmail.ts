import ejs from 'ejs'
import msswl from 'mssql'
import dotenv from 'dotenv'
import Connection from '../Helpers/database'
import { sqlconfig } from '../Config/config'
import sendEmail from '../Helpers/sendMail'

dotenv.config();
const db = new Connection();

interface Diagnosis {
    id: number,
    name_treatment: string,
    doctor_name: string,
    patient_email: string,
    bill: number,
    date: string,
    paid: string,
    description: string,
    patient_status: string,
    issent: string;
}

const DiagnosisEmail = async()=>{
    
    const diagnosis: Diagnosis[] = (await db.exec("checkDiagnosis")).recordset

    for(let diagnose of diagnosis){

        ejs.renderFile('templates/diagnosis.ejs', 
            async(err, data)=>{

                let messageOption = {
                    from: process.env.EMAIL,
                    to: diagnose.patient_email,
                    subject: 'Hello, here is the treatment that patient has been assigned.',
                    html: data,

                    attachments:[
                        {
                            filename: "diagnosis.txt",
                            content: `${diagnose.description}`
                        }
                    ]

                }

                try{
                    await sendEmail(messageOption);
                    await db.exec('updateDiagnosisSentEmail')
                } catch(error){
                    console.log(error)
                }

        })
    }
}

export default DiagnosisEmail;