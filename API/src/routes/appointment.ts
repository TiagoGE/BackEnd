import { Router } from "express";
import { createAppointment } from "../Controllers/appointment";
import { VerifyToken } from "../Middlewares/verifyToken";

const router = Router();

router.post('/', VerifyToken, createAppointment)


export default router;