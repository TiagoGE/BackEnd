import { Router } from "express";
import { createPatient, deletetePatient, getPatients, updatePatient } from "../Controllers/patients";
import { VerifyToken } from "../Middlewares/verifyToken";

const router = Router();


router.get('/', VerifyToken, getPatients);
router.post('/', VerifyToken, createPatient);
router.put('/:id', VerifyToken, updatePatient);
router.delete('/:id', VerifyToken, deletetePatient);


export default router;
