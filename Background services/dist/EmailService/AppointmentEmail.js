"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ejs_1 = __importDefault(require("ejs"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = __importDefault(require("../Helpers/database"));
const sendMail_1 = __importDefault(require("../Helpers/sendMail"));
dotenv_1.default.config();
const db = new database_1.default();
const AppointmentEMail = () => __awaiter(void 0, void 0, void 0, function* () {
    const appointment = (yield db.exec("CheckAppointment")).recordset;
    for (let appoint of appointment) {
        ejs_1.default.renderFile('templates/appointment.ejs', { name: appoint.patient_name, date: appoint.date }, (err, data) => __awaiter(void 0, void 0, void 0, function* () {
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
                yield (0, sendMail_1.default)(messageOption);
                yield db.exec('updateAppointment');
            }
            catch (error) {
                console.log(error);
            }
        }));
    }
});
exports.default = AppointmentEMail;
