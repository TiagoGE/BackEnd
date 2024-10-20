import ejs from 'ejs'
import msswl from 'mssql'
import dotenv from 'dotenv'
import Connection from '../Helpers/database'
import { sqlconfig } from '../Config/config'
import sendEmail from '../Helpers/sendMail'

dotenv.config();
const db = new Connection();

interface User {
    id: string,
    name: string,
    email: string,
    role: string,
    issent: number;
}

const WelcomeEmail = async () => {

    const users: User[] = (await db.exec("checkuser")).recordset

    for (let user of users) {

        ejs.renderFile('templates/welcome.ejs', { name: user.name },
            async (err, data) => {

                let messageOption = {
                    from: process.env.EMAIL,
                    to: user.email,
                    subject: 'Welcome to Medics Venns',
                    html: data
                }

                try {

                    await sendEmail(messageOption);

                    await db.exec("updateUserEmailSent")

                } catch (error) {
                    console.log(error)
                }
            })
    }
}

export default WelcomeEmail;