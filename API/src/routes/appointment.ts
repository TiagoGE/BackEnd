import { Router } from "express";
import { createAppointment } from "../Controllers/appointment";

const router = Router();

router.post('/',createAppointment)


export default router;