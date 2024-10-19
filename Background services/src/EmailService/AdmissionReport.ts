import ejs from 'ejs'
import msswl from 'mssql'
import dotenv from 'dotenv'
import Connection from '../Helpers/database'
import { sqlconfig } from '../Config/config'
import sendEmail from '../Helpers/sendMail'
import { parse } from 'json2csv'

dotenv.config();
const db = new Connection();

interface Patient {
    id: number,
    name: string,
    resident_area: string,
    room_admitted: string,
    admission_no: string,
    id_no: number,
    email: string,
    issent: number,
    status: string;
}

const AdmissionReportEmail = async () => {

    const patients: Patient[] = (await db.exec("checkPatient")).recordset

    //Check if there was patients admitted that day
    if (patients.length) {

        //parse json format to csv
        const csv = parse(patients);

        ejs.renderFile('templates/Report.ejs',
            async (err, data) => {

                let messageOption = {
                    from: process.env.EMAIL,
                    to: process.env.EMAIL,
                    subject: 'HI, HERE IS YOUR DAILY REPORT',
                    html: data,

                    attachments: [
                        {
                            filename: "DailyReport.txt",
                            content: csv
                        }
                    ]
                };

                try {

                    await sendEmail(messageOption);
                    await db.exec('updatePatientsEmailSent')

                } catch (error) {
                    console.log(error);
                }
            }
        )
    }

}

export default AdmissionReportEmail;