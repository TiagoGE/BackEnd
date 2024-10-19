import ejs from 'ejs'
import msswl from 'mssql'
import dotenv from 'dotenv'
import Connection from '../Helpers/database'
import { sqlconfig } from '../Config/config'
import sendEmail from '../Helpers/sendMail'

dotenv.config();
const db = new Connection();

interface Appointment {
    id: number,
    patient_name: string,
    doctor_email: string,
    date: string,
    patient_email: string,
    issent: string;
}


const AppointmentEMail = async () => {
    const appointment: Appointment[] = (await db.exec("CheckAppointment")).recordset

    for (let appoint of appointment) {

        ejs.renderFile('template/appointment.ejs', { name: appoint.patient_name, date: appoint.date },
            async (err, data) => {

                let messageOption = {
                    from: process.env.EMAIL,
                    to: appoint.patient_email,
                    subject: 'You have an appointment.',
                    html: data,

                    attachments: [
                        {
                            filename: "sendIt.txt",
                            content: "appointment"
                        }
                    ]
                };

                try {

                    await sendEmail(messageOption);
                    await db.exec('updateAppointment');


                } catch (error) {
                    console.log(error);
                }
            }
        )
    }
}

export default AppointmentEMail;